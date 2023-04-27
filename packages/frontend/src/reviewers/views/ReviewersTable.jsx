import { Box, Grid } from '@mui/material';
import { useEffect, useState } from 'react';
import ReviewerItem from '../components/ReviewerItem';

// FIXME: Leer el todo numero 6 de la raíz del proyecto
export const ReviewersTable = () => {
  const [reviewItems, setReviewItems] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        // FIXME: leer el todo numero 2 de la raíz del proyecto
        const assignmentsPath = import.meta.env.VITE_REACT_APP_REST_API + '/reviewers/getTodayAssignation';
        const response = await fetch(assignmentsPath);
        const { assignments } = await response.json();
        console.log('assignment', assignments);
        // FIXME: la deseestructuración de assignments es innecesaria ya que map regresa un arreglo, y al hacer esto metes un arreglo dentro de otro arreglo
        // FIXME: por que los reviewers siempre están en desorden? deberían de estar ordenados por nombre.
        setReviewItems(() => [
          ...assignments.map((assignment) => ({
            name: assignment.reviewer.name,
            members: assignment.reviewer.assigned_students,
          })),
        ]); // change for students
      } catch (e) {
        console.log('error', e);
      }
    })();
  }, []);
  return (
    // FIXME: Hay que priorizar tratar de usar styled components en vez de usar sx. Si son mas de 3 propiedades de sx que se usan o se usan selectores complejos
    <Box
      display="flex"
      spacing={0}
      direction="row"
      alignItems="center"
      justifyContent="center"
      sx={{
        minHeight: 'calc(100vh - 110px)',
        backgroundColor: 'primary.main',
        borderRadius: 3,
      }}
    >
      {/*  FIXME: Hay que priorizar tratar de usar styled components en vez de usar sx. Si son mas de 3 propiedades de sx que
      se usan o se usan selectores complejos */}
      <Grid
        container
        alignItems="center"
        justifyContent="center"
        gridTemplateColumns="repeat(auto-fit, minmax(160px, 250px))"
        // grid-template-columns repeat(auto-fit, minmax(160px, 250px));
        sx={{
          // backgroundColor: "white",
          borderRadius: 3,
          margin: '40px',
          overflow: 'hidden',
        }}
      >
        {reviewItems.map((reviewer) => (
          // FIXME: key={JSON.stringify(reviewer)} es una mala práctica, no se debe usar JSON.stringify en el key de un componente Reviewer ya tiene un id que le regresa el BE
          //  FIXME: reviewer={reviewer.name debería cambiar a name={reviewer.name} el componente ya sabemos que es un Reviewer por el nombre
          <ReviewerItem key={reviewer.id} reviewer={reviewer.name} members={reviewer.members} />
        ))}
      </Grid>
    </Box>
  );
};
