import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { addMember, deleteMember, fetchMembers } from '../api/services/membersService.js';
import { useReassignReviews } from './useRevisions.js';

export const useMembers = () => {
  return useQuery(['members'], fetchMembers);
};

export const useAddMember = () => {
  const queryClient = useQueryClient();
  return useMutation(addMember, {
    onSuccess: () => {
      queryClient.invalidateQueries(['members']);
    },
  });
};

export const useDeleteMember = () => {
  const { mutate } = useReassignReviews();

  const queryClient = useQueryClient();
  return useMutation(deleteMember, {
    onSuccess: () => {
      mutate();
      queryClient.invalidateQueries(['members']);
    },
  });
};
