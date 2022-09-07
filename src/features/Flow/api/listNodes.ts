import { useQuery } from 'react-query';
import { axios } from '../../../lib/axios';

export async function getNodes(id: string): Promise<any[]> {
  const response = await axios.get(`flows/listFlows/${id}`);
  return response.data.payload;
}


export const useNodes = (id: string) => {
  return useQuery({
    queryKey: ['nodes', id],
    queryFn: () => getNodes(id)
  });
};
