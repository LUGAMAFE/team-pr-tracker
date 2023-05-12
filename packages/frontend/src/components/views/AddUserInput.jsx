import { ArrowBack, SaveOutlined } from '@mui/icons-material';
import { Button, FormControl, Grid, TextField, Typography } from '@mui/material';
import PropTypes from 'prop-types';
import { useState } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import { useNavigate } from 'react-router-dom';
import { addMember, addReviewer } from '../../utils/fetch';
import { ComponentButton } from '../common/ComponentButton';

const AddUserInput = ({ user }) => {
  const [form, setForm] = useState({
    name: '',
    email: '',
  });
  const navigate = useNavigate();

  const queryClient = useQueryClient();
  const OnInputChange = ({ target: { name, value } }) => {
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const { status, mutate, isSuccess } = useMutation(user === 'reviewer' ? addReviewer : addMember, {
    onSuccess: () => {
      queryClient.invalidateQueries([user === 'reviewer' ? 'reviewers' : 'members']);
    },
  });
  const onSubmit = async (event) => {
    try {
      event.preventDefault();
      if (!form.name || !form.email) {
        throw new Error('El nombre no puede estar vacío');
      } else {
        if (status === 'loading') {
          return <div>Cargando los datos de los reviewers.</div>;
        }

        if (status === 'error') {
          return <div>Error al cargar los datos de los reviewers</div>;
        }
        mutate(form);

        if (!isSuccess) {
          navigate('/');
        } else {
          throw new Error(`Hubo un problema al agregar el ${user}.`);
        }
      }
    } catch (e) {
      console.log('error on submit ', e);
    }
  };

  return (
    <Grid container direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 1 }}>
      <Grid item>
        <Typography fontSize={39} fontWeight="light">
          Agregar {user}:
        </Typography>
      </Grid>

      <Grid container>
        <form onSubmit={onSubmit}>
          <FormControl fullWidth>
            <TextField
              name="name"
              type="text"
              variant="filled"
              fullWidth
              placeholder="Ingrese un nombre"
              label="nombre:"
              value={form.name}
              onChange={OnInputChange}
              sx={{ border: 'none', mb: 3, mt: 3 }}
            />
            <TextField
              name="email"
              type="text"
              variant="filled"
              fullWidth
              placeholder="Ingrese un correo"
              label="correo:"
              value={form.email}
              onChange={OnInputChange}
              sx={{ border: 'none', mb: 3 }}
            />
            <Grid item alignSelf="flex-end">
              <Button type="submit" color="primary" onClick={onSubmit} sx={{ padding: 2 }}>
                <SaveOutlined sx={{ fontSize: 30, mr: 1 }} />
                Guardar
              </Button>
            </Grid>
          </FormControl>
        </form>

        <ComponentButton route={'/'} right={18} bottom={35}>
          <ArrowBack sx={{ fontSize: 30 }} />
        </ComponentButton>
      </Grid>
    </Grid>
  );
};

AddUserInput.propTypes = {
  user: PropTypes.string.isRequired,
};

export default AddUserInput;
