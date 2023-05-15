import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { fetchRevisions, rollReviews } from '../api/services/revisionsService.js';

export const useRevisions = () => {
  return useQuery({ queryKey: ['revisions'], queryFn: fetchRevisions });
};

export const useReassignReviews = () => {
  const queryClient = useQueryClient();
  return useMutation(rollReviews, {
    onSuccess: () => {
      queryClient.invalidateQueries(['revisions']);
    },
  });
};
