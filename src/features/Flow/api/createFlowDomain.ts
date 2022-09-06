import { useMutation } from 'react-query';
import { useNavigate } from 'react-router-dom';
import { axios } from '../../../lib/axios';
import { queryClient } from '../../../lib/react-query';
import { useNotificationStore } from '../../../stores/notifications';


export async function createFlowDomain(data: any): Promise<any> {
  return axios.post('flows/createFlowDomain', data);
}

export const useCreateFlowDomain = () => {
  const navigate = useNavigate();
  const { addNotification } = useNotificationStore();

  return useMutation({
    onMutate: async newUser => {
      await queryClient.cancelQueries('flowsDomains');

      const previousUsers = queryClient.getQueryData<any[]>('flowsDomains');

      queryClient.setQueryData('flowsDomains', [...(previousUsers || []), newUser]);

      return previousUsers;
    },
    onError: (error: any, _, context) => {
      if (context) {
        queryClient.setQueryData('flowsDomains', context);
        addNotification({
          type: 'error',
          title: 'Erro',
          message: error.response?.data?.message,
        });
      }
    },
    onSuccess: data => {
      queryClient.invalidateQueries('flowsDomains');
      addNotification({
        type: 'success',
        title: 'Sucesso',
        message: 'Salvo com sucesso.',
      });
      console.log(data?.data.payload.id)
      navigate(`/flow/${data?.data.payload.id}`);
    },
    mutationFn: createFlowDomain,
  });
};
