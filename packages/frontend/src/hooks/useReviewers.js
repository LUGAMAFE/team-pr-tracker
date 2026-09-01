import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { addReviewer, deleteReviewer, fetchReviewers } from '../api/services/reviewersService.js';
import { useReassignReviews } from './useRevisions.js';

export function useReviewers() {
  return useQuery(['reviewers'], fetchReviewers);
}

export function useAddReviewer() {
  const { mutate } = useReassignReviews();

  const queryClient = useQueryClient();
  return useMutation(addReviewer, {
    onSuccess: () => {
      mutate(null, {
        onSettled: () => {
          queryClient.invalidateQueries(['reviewers']);
        },
      });
    },
  });
}

export function useDeleteReviewer() {
  const { mutate } = useReassignReviews();

  const queryClient = useQueryClient();
  return useMutation(deleteReviewer, {
    onSuccess: () => {
      mutate(null, {
        onSettled: () => {
          queryClient.invalidateQueries(['reviewers']);
        },
      });
    },
  });
}
