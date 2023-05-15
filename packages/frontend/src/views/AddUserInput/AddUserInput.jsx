import { zodResolver } from '@hookform/resolvers/zod';
import { ArrowBack, SaveOutlined } from '@mui/icons-material';
import { Alert, Button, FormControl, Grid, TextField, Typography } from '@mui/material';
import PropTypes from 'prop-types';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { z } from 'zod';
import AddButton from '../../components/shared/AddButton';
import { useAddMember } from '../../hooks/useMembers';
import { useAddReviewer } from '../../hooks/useReviewers';

const schema = z.object({
  name: z.string().nonempty({ message: 'El nombre es requerido' }),
  email: z.string().nonempty({ message: 'El correo es requerido' }).email({ message: 'El correo es inválido' }),
});

const AddUserInput = ({ user }) => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  });

  const { mutate, isError } = user === 'reviewer' ? useAddReviewer() : useAddMember();

  const onSubmit = (data) => {
    mutate(data, {
      onSuccess: () => {
        navigate('/');
      },
      onError: (error) => {
        console.log(`Hubo un problema al agregar el ${user}.`, error);
      },
    });
  };

  return (
    <Grid container direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 1 }}>
      <Grid item>
        <Typography fontSize={39} fontWeight="light">
          Agregar {user}:
        </Typography>
      </Grid>

      <Grid container>
        <form onSubmit={handleSubmit(onSubmit)}>
          <FormControl fullWidth>
            <TextField
              {...register('name')}
              error={!!errors.name}
              helperText={errors.name?.message || ''}
              type="text"
              variant="filled"
              fullWidth
              placeholder="Ingrese un nombre"
              label="nombre:"
              sx={{ border: 'none', mb: 3, mt: 3 }}
            />
            <TextField
              {...register('email')}
              error={!!errors.email}
              helperText={errors.email?.message || ''}
              type="text"
              variant="filled"
              fullWidth
              placeholder="Ingrese un correo"
              label="correo:"
              sx={{ border: 'none', mb: 3 }}
            />
            <Grid item alignSelf="flex-end">
              <Button type="submit" color="primary" sx={{ padding: 2 }}>
                <SaveOutlined sx={{ fontSize: 30, mr: 1 }} />
                Guardar
              </Button>
            </Grid>
          </FormControl>
        </form>

        {isError && <Alert severity="error">Hubo un problema al agregar el {user}.</Alert>}

        <AddButton route={'/'} right={3} bottom={-6}>
          <ArrowBack sx={{ fontSize: 30 }} />
        </AddButton>
      </Grid>
    </Grid>
  );
};

AddUserInput.propTypes = {
  user: PropTypes.string.isRequired,
};

export default AddUserInput;
