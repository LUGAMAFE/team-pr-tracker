import { IconButton, styled } from '@mui/material';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const StyledIconButton = styled(IconButton, {
  shouldForwardProp: (prop) => prop !== 'right' && prop !== 'bottom',
})(({ theme, right, bottom }) => ({
  color: 'white',
  backgroundColor: theme.palette.error.main,
  ':hover': { backgroundColor: theme.palette.error.main, opacity: 0.5 },
  position: 'absolute',
  right: theme.spacing(right),
  bottom: theme.spacing(bottom),
}));

const AddButton = ({ children, route, right, bottom }) => {
  return (
    <Link to={route}>
      <StyledIconButton size="large" right={right} bottom={bottom}>
        {children}
      </StyledIconButton>
    </Link>
  );
};

export default AddButton;

AddButton.propTypes = {
  children: PropTypes.node.isRequired,
  route: PropTypes.string.isRequired,
  right: PropTypes.number.isRequired,
  bottom: PropTypes.number.isRequired,
};
