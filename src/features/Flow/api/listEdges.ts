import { useQuery } from 'react-query';
import { axios } from '../../../lib/axios';

export async function getEdges(id: string): Promise<any[]> {
  const response = await axios.get(`flows/listEdge/${id}`);
  return response.data.payload;
}


export const useEdges= (id: string) => {
  return useQuery({
    queryKey: ['edges', id],
    queryFn: () => getEdges(id)
  });
};
