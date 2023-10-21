import useSWR from 'swr';

import fetcher from '@/app/libs/fetcher';

const useMessage = (conversationId: string) => {
  const { data, error, isLoading, mutate } = useSWR(conversationId ? `/api/messages/${conversationId}` : null, fetcher);

  return {
    data,
    error,
    isLoading,
    mutate
  }
};

export default useMessage;