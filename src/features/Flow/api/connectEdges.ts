import { useMutation } from 'react-query';
import { axios } from '../../../lib/axios';
import { queryClient } from '../../../lib/react-query';
import { useNotificationStore } from '../../../stores/notifications';


export async function connectEdges(data: any): Promise<any> {
  return axios.post(`flows/createEdge/${data.domainId}`, data);
}

export const useConnectEdges = () => {
  const { addNotification } = useNotificationStore();

  return useMutation({
    onMutate: async newUser => {
      await queryClient.cancelQueries('edges');

      const previousUsers = queryClient.getQueryData<any[]>('edges');

      queryClient.setQueryData('edges', [...(previousUsers || []), newUser]);

      return previousUsers;
    },
    onError: (error: any, _, context) => {
      if (context) {
        queryClient.setQueryData('edges', context);
        addNotification({
          type: 'error',
          title: 'Erro',
          message: error.response?.data?.message,
        });
      }
    },
    onSuccess: data => {
      queryClient.invalidateQueries('edges');
    },
    mutationFn: connectEdges,
  });
};
