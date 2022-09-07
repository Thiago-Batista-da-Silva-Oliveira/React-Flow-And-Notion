import { useMutation } from 'react-query';
import { useNavigate } from 'react-router-dom';
import { axios } from '../../../lib/axios';
import { queryClient } from '../../../lib/react-query';
import { useNotificationStore } from '../../../stores/notifications';


export async function createNotionDomain(data: any): Promise<any> {
  return axios.post('notions/createNotionDomain', data);
}

export const useCreateNotionDomain = () => {
  const navigate = useNavigate();
  const { addNotification } = useNotificationStore();

  return useMutation({
    onMutate: async newUser => {
      await queryClient.cancelQueries('notionDomains');

      const previousUsers = queryClient.getQueryData<any[]>('notionDomains');

      queryClient.setQueryData('notionDomains', [...(previousUsers || []), newUser]);

      return previousUsers;
    },
    onError: (error: any, _, context) => {
      if (context) {
        queryClient.setQueryData('notionDomains', context);
        addNotification({
          type: 'error',
          title: 'Erro',
          message: error.response?.data?.message,
        });
      }
    },
    onSuccess: data => {
      queryClient.invalidateQueries('notionDomains');
      addNotification({
        type: 'success',
        title: 'Sucesso',
        message: 'Salvo com sucesso.',
      });
      navigate(`/notion/${data?.data.payload.id}`);
    },
    mutationFn: createNotionDomain,
  });
};
