import { useMutation } from 'react-query';
import { axios } from '../../../lib/axios';
import { queryClient } from '../../../lib/react-query';
import { useNotificationStore } from '../../../stores/notifications';


export async function deleteNode(data: any): Promise<any> {
  return axios.delete(`flows/delete/${data}`, data);
}

export const useDeleteNode = () => {
  const { addNotification } = useNotificationStore();

  return useMutation({
    onMutate: async newUser => {
      await queryClient.cancelQueries('nodes');

      const previousUsers = queryClient.getQueryData<any[]>('nodes');

      queryClient.setQueryData('nodes', [...(previousUsers || []), newUser]);

      return previousUsers;
    },
    onError: (error: any, _, context) => {
      if (context) {
        queryClient.setQueryData('nodes', context);
        addNotification({
          type: 'error',
          title: 'Erro',
          message: error.response?.data?.message,
        });
      }
    },
    onSuccess: data => {
      queryClient.invalidateQueries('nodes');
    },
    mutationFn: deleteNode,
  });
};
