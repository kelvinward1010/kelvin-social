import useSWR from 'swr';

import fetcher from '@/app/libs/fetcher';

const useConversationId = (conversationId: string) => {
  const { data, error, isLoading, mutate } = useSWR(conversationId ? `/api/conversations/${conversationId}` : null, fetcher);

  return {
    data,
    error,
    isLoading,
    mutate
  }
};

export default useConversationId;