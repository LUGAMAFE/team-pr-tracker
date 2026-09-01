import { PersonOutline } from '@mui/icons-material';
import { Box, Grid, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Typography, styled } from '@mui/material';
import PropTypes from 'prop-types';
import { useMemo } from 'react';
import { useDeleteReviewer } from '../../hooks/useReviewers';
import { RemoveIconModal } from '../shared/RemoveIconModal';

const StyledIconBox = styled(Box)({
  position: 'relative',
  justifyContent: 'center',
  display: 'flex',
  background: '#5C5B85',
  borderRadius: 10,
  margin: 8,
  padding: 6,
  ':hover .MuiBox-root': { backgroundColor: 'red', width: '50px', transition: 'all 0.5s ease' },
  overflow: 'hidden',
});

const ReviewerItem = ({ name, email, members = [] }) => {
  const { mutate, error, reset } = useDeleteReviewer();

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
    <Grid
      item
      xs={4}
      sx={{
        minWidth: '245px',
        minHeight: '140px',
      }}
    >
      <StyledIconBox>
        <Typography color="white" variant="h6" textAlign="center">
          {name}
        </Typography>

        <RemoveIconModal name={name} onDelete={onDelete} error={{ message: errorMessage, reset }} />
      </StyledIconBox>

      <List sx={{ background: 'white', borderRadius: 3, margin: 1 }}>
        {members.map((member, index) => (
          <ListItem key={`${index} ${member.id}`} disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <PersonOutline sx={{ color: 'primary.main' }} />
              </ListItemIcon>

              <ListItemText primary={member.name} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Grid>
  );
};

ReviewerItem.propTypes = {
  name: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  members: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
    })
  ),
};

ReviewerItem.defaultProps = {
  members: [],
};

export default ReviewerItem;
