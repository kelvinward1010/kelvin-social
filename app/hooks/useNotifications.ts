import useSWR from 'swr';

import fetcher from '@/app/libs/fetcher';

const useNotifications = (userId?: string) => {
  const url = userId ? `/api/notifications` : null;
  const { data, error, isLoading, mutate } = useSWR(url, fetcher);

  return {
    data,
    error,
    isLoading,
    mutate
  }
};

export default useNotifications;
