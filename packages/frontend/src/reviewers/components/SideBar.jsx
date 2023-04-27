import { AddOutlined } from '@mui/icons-material';
import { Box, Divider, Drawer, IconButton, List, Toolbar, Typography } from '@mui/material';
import { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { StudentItem } from './StudentItem';
import { ReviewerContext } from './context/ReviewerContext';

// FIXME: Este componente no debería estar en esta carpeta, debería estar en la carpeta de layout y debería ser una carpeta llamada sidebar y dentro de esa carpeta este componente como index.jsx
export const SideBar = () => {
  // FIXME: no usar el drawerWidth en el contexto en todo caso debería ser una variable global
  // FIXME: tratar de forzar el width asi es una mala practica, El papa del navbar debería ser un contenedor grid y decirle a AppBar que width debería tener
  const { drawerWidth, students, setStudents } = useContext(ReviewerContext);
  useEffect(() => {
    (async () => {
      // FIXME: leer el todo numero 2 de la raíz del proyecto
      const endPoint = import.meta.env.VITE_REACT_APP_REST_API + '/members/getAll';
      const response = await fetch(endPoint, { method: 'GET', headers: { 'Content-Type': 'aplication/json' } });
      const data = await response.json();
      const { members } = data;
      console.log(members);
      setStudents(members);
    })();
  }, []);

  return (
    // FIXME: Hay que priorizar tratar de usar styled components en vez de usar sx.
    <Box component="nav" sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}>
      {/* FIXME: Hay que priorizar tratar de usar styled components en vez de usar sx. Si son mas de 3 propiedades de sx que se usan o se usan selectores complejos*/}
      {/* FIXME: Hay que hacer esto responsive */}
      <Drawer
        variant="permanent" // temporary
        open
        sx={{
          display: { xs: 'block' },
          '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
        }}
      >
        <Toolbar>
          <Typography variant="h6" noWrap component="div">
            ReviewApp
          </Typography>
        </Toolbar>
        <Divider />

        <List>
          {/* FIXME: Ver el TODO numero 3 de la raíz del proyecto */}
          {students.map((student) => (
            // FIXME: hacer esto: key={JSON.stringify(student)} esta pésimo student ya tiene un propiedad id que es unica que le trae el backend
            //  FIXME: student={student.name} debería cambiar a name={student.name} y studentEmail={student.email} a solo email={student.email}
            //  el componente ya sabemos que es un Estudiante
            <StudentItem key={JSON.stringify(student)} student={student.name} studentEmail={student.email} />
          ))}
        </List>
        {/* FIXME: Hay que priorizar tratar de usar styled components en vez de usar sx. Si son mas de 3 propiedades de sx que se usan*/}
        {/* FIXME: Si este botón ya se había usado en otra parte de la aplicación lo mas seguro es que necesite ser un componente y ser reutilizado */}
        <IconButton
          component={Link}
          to="/add-student"
          size="large"
          sx={{
            color: 'white',
            backgroundColor: 'error.main',
            ':hover': { backgroundColor: 'error.main', opacity: 0.9 },
            position: 'absolute',
            right: 20,
            bottom: 10,
          }}
        >
          <AddOutlined sx={{ fontSize: 20 }} />
        </IconButton>
      </Drawer>
    </Box>
  );
};
