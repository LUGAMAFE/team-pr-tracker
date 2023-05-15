import { Box, styled } from '@mui/material';
import PropTypes from 'prop-types';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';

const MainContainer = styled(Box)(({ theme }) => ({
  padding: theme.spacing(2),
  paddingBottom: 0,
  flexGrow: 1,
  marginTop: theme.spacing(8),
  position: 'relative',
}));

const ReviewerLayout = ({ children }) => {
  return (
    <Box sx={{ display: 'flex' }}>
      <Navbar />
      <Sidebar />
      <MainContainer component="main">{children}</MainContainer>
    </Box>
  );
};

ReviewerLayout.propTypes = {
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]).isRequired,
};

export { ReviewerLayout };
