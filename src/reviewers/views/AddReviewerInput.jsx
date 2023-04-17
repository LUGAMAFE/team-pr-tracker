import { SaveOutlined } from "@mui/icons-material";
import {
  Button,
  FormControl,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";

export const AddReviewerInput = () => {
  const [inputValue, setInputValue] = useState("Gabriel");

  const OnInputChange = ({ target }) => {
    setInputValue(target.value);
  };

  const onSubmit = (event) => {
    event.preventDefault();
    console.log(inputValue);
  };
  return (
    <Grid
      container
      direction="row"
      justifyContent="space-between"
      alignItems="center"
      sx={{ mb: 1 }}
    >
      <Grid item>
        <Typography fontSize={39} fontWeight="light">
          Agregar Reviewer:
        </Typography>
      </Grid>

      <Grid container>
        <form onSubmit={onSubmit}>
          <FormControl fullWidth>
            <TextField
              type="text"
              variant="filled"
              fullWidth
              placeholder="Ingrese un nombre"
              label="nombre:"
              value={inputValue}
              onChange={OnInputChange}
              sx={{ border: "none", mb: 1 }}
            />
            <Grid item alignSelf="flex-end">
              <Button color="primary" sx={{ padding: 2 }}>
                <SaveOutlined sx={{ fontSize: 30, mr: 1 }} />
                Guardar
              </Button>
            </Grid>
          </FormControl>
        </form>
      </Grid>
    </Grid>
  );
};
