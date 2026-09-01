import { AddOutlined } from '@mui/icons-material';
import { Alert, Box, Divider, Drawer, List, Toolbar, Typography, styled, useMediaQuery } from '@mui/material';
import { memo, useContext } from 'react';
import { NavbarContext } from '../../contexts/NavbarContext';
import { useMembers } from '../../hooks/useMembers';
import { MemberItem } from '../MemberItem';
import AddButton from '../shared/AddButton';

// @ts-ignore
const LoadingState = () => <Alert severity="info">Cargando los datos de los miembros.</Alert>;
// @ts-ignore
const ErrorState = () => <Alert severity="error">Error al cargar los datos de los miembros.</Alert>;

const StyledDrawer = styled(Drawer)({
  display: 'block',
  '& .MuiDrawer-paper': { boxSizing: 'border-box', width: 300 },
});

const MemberItemMemo = memo(MemberItem);

const Sidebar = () => {
  const { open, setOpen } = useContext(NavbarContext);
  const { data: { members } = {}, isLoading, isError, isSuccess } = useMembers();
  // data: { members } = {} es equivalente a const members = data?.members; en el ejemplo de arriba.
  // Ambos evitarán que se lance un error si data es undefined.
  // members = data?.members;
  const isSmallScreen = useMediaQuery((theme) => theme.breakpoints.down('sm'));
  return (
    <Box component="nav" sx={{ width: { sm: 300 }, flexShrink: { sm: 0 } }} onClick={() => setOpen(false)}>
      <StyledDrawer variant={isSmallScreen ? 'temporary' : 'permanent'} open={!isSmallScreen || open}>
        <Toolbar>
          <Typography variant="h6" noWrap component="div">
            ReviewApp
          </Typography>
        </Toolbar>
        <Divider />
        {isLoading && <LoadingState />}
        {isError && <ErrorState />}
        {isSuccess && members && (
          <List>
            {members.map((member) => (
              <MemberItemMemo key={member.id} name={member.name} email={member.email} />
            ))}
          </List>
        )}

        <AddButton route={'/add-member'} right={3} bottom={6}>
          <AddOutlined sx={{ fontSize: 30 }} />
        </AddButton>
      </StyledDrawer>
    </Box>
  );
};

export default Sidebar;
