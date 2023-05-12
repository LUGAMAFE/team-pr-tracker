import { Autorenew } from '@mui/icons-material';
import { IconButton, styled } from '@mui/material';
import { useMutation, useQueryClient } from 'react-query';
import { rollMembers } from '../../../utils/fetch';

const StyledIconButton = styled(IconButton)({
  color: 'white',
  backgroundColor: '#32CD32',
  ':hover': { backgroundColor: '#32CD32', opacity: 0.5 },
  position: 'absolute',
  right: 21,
  top: 83,
});

export const RollMembers = () => {
  const queryClient = useQueryClient();
  const { mutate } = useMutation(rollMembers, {
    onSuccess: () => {
      queryClient.invalidateQueries(['reviewers']);
    },
  });
  const roll = async () => {
    try {
      mutate();
    } catch (e) {
      console.log('error on submit ', e);
    }
  };
  return (
    <StyledIconButton onClick={roll} size="large">
      <Autorenew />
    </StyledIconButton>
  );
};
