import { PersonOutline } from '@mui/icons-material';
import { Grid, ListItem, ListItemIcon, ListItemText, styled } from '@mui/material';
import PropTypes from 'prop-types';
import { useMemo } from 'react';
import { useDeleteMember } from '../../hooks/useMembers';
import { RemoveIconModal } from '../shared/RemoveIconModal';

const StyledListItem = styled(ListItem)({
  overflow: 'hidden',
  ':hover .MuiBox-root': {
    backgroundColor: 'red',
    width: '50px',
    transition: 'all 0.5s ease',
  },
});

const MemberItem = ({ name, email }) => {
  const { mutate, error, reset } = useDeleteMember();

  const errorMessage = useMemo(() => {
    if (error) {
      return `Hubo un problema al eliminar el usuario ${name}`;
    }
    return '';
  }, [error]);

  const onDelete = async (setOpen) => {
    mutate(email, {
      onError: () => {
        setOpen(true);
      },
    });
  };

  return (
    <StyledListItem disablePadding>
      <ListItemIcon sx={{ minWidth: '37px', margin: '12px' }}>
        <PersonOutline />
      </ListItemIcon>

      <RemoveIconModal name={name} onDelete={onDelete} error={{ message: errorMessage, reset }} />
      <Grid container>
        <ListItemText primary={name} />
      </Grid>
    </StyledListItem>
  );
};

MemberItem.propTypes = {
  name: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
};

export { MemberItem };
