import { useQuery } from 'react-query';
import { axios } from '../../../lib/axios';

export async function getDomains(): Promise<any[]> {
  const response = await axios.get('flows/listFlowDomains');
  return response.data.payload;
}


export const useFlowDomains = () => {
  return useQuery({
    queryKey: ['flowsDomains'],
    queryFn: () => getDomains()
  });
};
