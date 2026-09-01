import styled from '@emotion/styled';
import { DeleteForever } from '@mui/icons-material';
import { Box, Button, Modal, Typography } from '@mui/material';
import PropTypes from 'prop-types';
import { useState } from 'react';

export const RemoveIconModal = ({ name, onDelete, error }) => {
  const [open, setOpen] = useState(false);
  const StyledModalBox = styled(Box)({
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    backgroundColor: 'white',

    padding: 30,
    borderRadius: '8px',
    maxWidth: 400,
    minWidth: 300,
    textAlign: 'center',
  });
  const StyledRemove = styled(Box)({
    position: 'absolute',
    right: 0,
    top: 0,
    transition: 'all 0.5s ease',
    width: '0px',
    overflow: 'hidden',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '45px',
  });

  return (
    <div>
      <StyledRemove>
        <DeleteForever
          cursor="pointer"
          onClick={() => setOpen(true)}
          sx={{
            color: 'white',
          }}
        />
      </StyledRemove>

      <Modal open={open} onClose={() => setOpen(false)}>
        <StyledModalBox>
          {error.message && (
            <>
              <Typography variant="h6" gutterBottom>
                {error.message}
              </Typography>
              <Box sx={{ mt: 4 }}>
                <Button
                  variant="outlined"
                  onClick={() => {
                    error.reset();
                    setOpen(false);
                  }}
                >
                  Cerrar
                </Button>
              </Box>
            </>
          )}

          {!error.message && (
            <>
              <Typography variant="h6" gutterBottom>
                ¿Estás seguro de eliminar a {name}?
              </Typography>
              <Typography variant="subtitle1" gutterBottom>
                Esta acción no se puede deshacer.
              </Typography>
              <Box sx={{ mt: 4 }}>
                <Button
                  variant="contained"
                  onClick={() => {
                    onDelete(setOpen);
                  }}
                  sx={{ mr: 2 }}
                >
                  Eliminar
                </Button>
                <Button variant="outlined" onClick={() => setOpen(false)}>
                  Cancelar
                </Button>
              </Box>
            </>
          )}
        </StyledModalBox>
      </Modal>
    </div>
  );
};

RemoveIconModal.propTypes = {
  name: PropTypes.string.isRequired,
  onDelete: PropTypes.func.isRequired,
  error: PropTypes.shape({
    message: PropTypes.string.isRequired,
    reset: PropTypes.func.isRequired,
  }).isRequired,
};
