import { Autorenew } from '@mui/icons-material';
import { IconButton, styled } from '@mui/material';
import { useReassignReviews } from '../../hooks/useRevisions';

const StyledIconButton = styled(IconButton)(({ theme }) => ({
  color: 'white',
  backgroundColor: '#32CD32',
  ':hover': { backgroundColor: '#32CD32', opacity: 0.5 },
  position: 'absolute',
  right: theme.spacing(3),
  top: theme.spacing(3),
}));

const RollMembersButton = () => {
  const { mutate } = useReassignReviews();

  const roll = () => {
    mutate();
  };
  return (
    <StyledIconButton onClick={roll} size="large">
      <Autorenew />
    </StyledIconButton>
  );
};

export default RollMembersButton;
