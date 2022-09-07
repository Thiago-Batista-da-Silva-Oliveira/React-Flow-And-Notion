import { useQuery } from 'react-query';
import { axios } from '../../../lib/axios';

export async function getDomains(): Promise<any[]> {
  const response = await axios.get('notions/listNotionsDomains');
  return response.data.payload;
}


export const useNotionDomains = () => {
  return useQuery({
    queryKey: ['notionDomains'],
    queryFn: () => getDomains()
  });
};
