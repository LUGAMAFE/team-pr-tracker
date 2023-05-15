import { MenuOpenOutlined, MenuOutlined } from '@mui/icons-material';
import { AppBar, Grid, IconButton, Toolbar, Typography, useMediaQuery } from '@mui/material';
import { useContext } from 'react';
import { NavbarContext } from '../../contexts/NavbarContext';
import { useRevisions } from '../../hooks/useRevisions';

const Navbar = () => {
  const { open, setOpen } = useContext(NavbarContext);
  const { data: { date } = {}, isSuccess } = useRevisions();

  const isSmallScreen = useMediaQuery((theme) => theme.breakpoints.down('sm'));

  return (
    <AppBar position="fixed">
      <Toolbar sx={{ pl: 1 }}>
        <IconButton onClick={() => setOpen(!open)} sx={{ color: 'white', p: '3px' }}>
          {open ? <MenuOpenOutlined /> : <MenuOutlined />}
        </IconButton>
        <Grid container direction="row" justifyContent="center" alignItems="center">
          <Typography
            variant="h4"
            noWrap
            component="div"
            sx={{
              ml: isSmallScreen ? 0 : 31,
              fontSize: isSmallScreen ? '1.7rem' : '2.12rem',
            }}
          >
            {isSuccess && <span>Fecha: {date}</span>}
          </Typography>
        </Grid>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
