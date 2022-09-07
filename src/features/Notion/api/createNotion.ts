import { useMutation } from 'react-query';
import { axios } from '../../../lib/axios';
import { queryClient } from '../../../lib/react-query';
import { useNotificationStore } from '../../../stores/notifications';


export async function createNotion(data: any): Promise<any> {
  return axios.post(`notions/createNotion/${data.domainId}`, data);
}

export const useCreateNotion = () => {
  const { addNotification } = useNotificationStore();

  return useMutation({
    onMutate: async newUser => {
      await queryClient.cancelQueries('notions');

      const previousUsers = queryClient.getQueryData<any[]>('notions');

      queryClient.setQueryData('notions', [...(previousUsers || []), newUser]);

      return previousUsers;
    },
    onError: (error: any, _, context) => {
      if (context) {
        queryClient.setQueryData('notions', context);
        addNotification({
          type: 'error',
          title: 'Erro',
          message: error.response?.data?.message,
        });
      }
    },
    onSuccess: data => {
      queryClient.invalidateQueries('notions');
      addNotification({
        type: 'success',
        title: 'Sucesso',
        message: 'Salvo com sucesso.',
      });
    },
    mutationFn: createNotion,
  });
};
