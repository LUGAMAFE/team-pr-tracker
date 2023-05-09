import { ArrowBack, SaveOutlined } from '@mui/icons-material';
import { Button, FormControl, Grid, TextField, Typography } from '@mui/material';
import PropTypes from 'prop-types';
import { useContext, useState } from 'react';
import { useMutation } from 'react-query';
import { useNavigate } from 'react-router-dom';
import { addUser } from '../../utils/fetch';
import { ComponentButton } from '../common/ComponentButton';
import { ReviewerContext } from '../context/ReviewerContext';

const AddUserInput = ({ user }) => {
  const { onAddReviewer, onAddMember } = useContext(ReviewerContext);
  const [form, setForm] = useState({
    name: '',
    email: '',
  });
  const navigate = useNavigate();

  const OnInputChange = ({ target: { name, value } }) => {
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const { mutate, isLoading, isError, data } = useMutation(addUser);
  const onSubmit = async (event) => {
    try {
      if (!form.name) {
        throw new Error('El nombre no puede estar vacío');
      }
      event.preventDefault();
      if (isLoading) {
        return <div>Cargando la peticion</div>;
      }

      if (isError) {
        return <div>Error al cargar la peticion</div>;
      }

      if (data) {
        mutate(form);
        console.log(data);
      }
      if (data.status === 200) {
        if (user === 'reviewer') {
          onAddReviewer(form);
        } else if (user === 'member') {
          onAddMember(form);
        }
        navigate('/');
      } else {
        throw new Error(`Hubo un problema al agregar el ${user}.`);
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
