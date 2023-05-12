import { PersonOutline } from '@mui/icons-material';
import { Grid, ListItem, ListItemIcon, ListItemText, styled } from '@mui/material';
import PropTypes from 'prop-types';
import { useMutation, useQueryClient } from 'react-query';
import { deleteMember } from '../../../utils/fetch';
import { RemoveIconModal } from '../../common/RemoveIconModal';

const StyledListItem = styled(ListItem)({
  overflow: 'hidden',
  ':hover .MuiBox-root': {
    backgroundColor: 'red',
    width: '50px',
    transition: 'all 0.5s ease',
  },
});

const MemberItem = ({ name, email }) => {
  const queryClient = useQueryClient(); // Move inside the component

  const { mutate } = useMutation(deleteMember, {
    onSuccess: () => {
      queryClient.invalidateQueries(['members']);
    },
  });
  const onDelete = async () => {
    try {
      mutate(email);
    } catch (e) {
      console.log('error on submit ', e);
    }
  };

  return (
    <StyledListItem disablePadding>
      <ListItemIcon sx={{ minWidth: '37px', margin: '12px' }}>
        <PersonOutline />
      </ListItemIcon>

      <RemoveIconModal name={name} onDelete={onDelete} />
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
