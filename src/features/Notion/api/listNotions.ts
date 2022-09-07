import { useQuery } from 'react-query';
import { axios } from '../../../lib/axios';

export async function getNotions(id: any): Promise<any[]> {
  const response = await axios.get(`notions/listNotions/${id}`);
  return response.data.payload;
}


export const useNotions = (id: any) => {
  return useQuery({
    queryKey: ['notions', id],
    queryFn: () => getNotions(id)
  });
};
