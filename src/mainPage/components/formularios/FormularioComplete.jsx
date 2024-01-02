import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import {
  Button,
  Checkbox,
  Container,
  Divider,
  FormControlLabel,
  Paper,
  Radio,
  RadioGroup,
  TextareaAutosize,
  Typography,
} from '@mui/material';
import { Refresh } from '@mui/icons-material';

export const FormularioComplete = () => {
  const data = [
    {
      id: 1704139199592,
      tipo: 'texto',
      pregunta: 'pregunta 1 ',
      opciones: [''],
      requerido: true,
    },
    {
      id: 1704139242805,
      tipo: 'numero',
      pregunta: 'pregunta 2',
      opciones: [''],
      requerido: true,
    },
    {
      id: 1704139258778,
      tipo: 'checkbox',
      pregunta: 'pregunta 3',
      opciones: ['opcion 1', 'opcion 2'],
      requerido: false,
    },
    {
      id: 1704139273267,
      tipo: 'textarea',
      pregunta: 'pregunta 4',
      opciones: [''],
      requerido: false,
    },
    {
      id: 1704139284446,
      tipo: 'radio',
      pregunta: 'pregunta 5',
      opciones: ['opcion 3', 'opcion 4'],
      requerido: false,
    },
  ];

  const [radioValues, setRadioValues] = useState({});
  const [formFields, setFormFields] = useState([data]);

  const handleRadioChange = (id, value) => {
    setRadioValues((prevValues) => ({
      ...prevValues,
      [id]: value,
    }));
  };

  const handleResetForm = () => {
    setFormFields([data]);
  };

  const handleSubmit = () => {
    console.log('Datos del formulario:', formFields);
  };

  return (
    <Container component="main" maxWidth="md" style={{ marginTop: '20px' }}>
      <Paper elevation={3} style={{ padding: '20px' }}>
        <form>
          <Typography marginBottom={2} marginTop={2} variant="h5">
            Edición
          </Typography>
          <Divider />

          {data.map((item) => (
            <div key={item.id}>
              {(() => {
                switch (item.tipo) {
                  case 'texto':
                  case 'numero':
                    return (
                      <>
                        <div>
                          <Typography
                            marginBottom={2}
                            marginTop={4}
                            variant="h5"
                          >
                            {item.pregunta}
                          </Typography>
                          <TextField
                            key={item.id}
                            label={item.pregunta}
                            variant="outlined"
                            fullWidth
                            required={item.requerido}
                          />
                        </div>
                        <Divider />
                      </>
                    );
                  case 'checkbox':
                    return (
                      <>
                        <div>
                          <Typography
                            marginBottom={2}
                            marginTop={2}
                            variant="h5"
                          >
                            {item.pregunta}
                          </Typography>
                          {item.opciones.map((opcion, index) => (
                            <FormControlLabel
                              key={index}
                              control={<Checkbox />}
                              label={opcion}
                            />
                          ))}
                        </div>
                        <Divider />
                      </>
                    );
                  case 'textarea':
                    return (
                      <>
                        <Typography marginBottom={2} marginTop={2} variant="h5">
                          {item.pregunta}
                        </Typography>
                        <TextareaAutosize
                          aria-label={item.pregunta}
                          minRows={3}
                          placeholder={item.pregunta}
                        />
                        <Divider />
                      </>
                    );
                  case 'radio':
                    return (
                      <RadioGroup
                        value={radioValues[item.id] || ''}
                        onChange={(e) =>
                          handleRadioChange(item.id, e.target.value)
                        }
                      >
                        <Typography marginBottom={2} marginTop={2} variant="h5">
                          {item.pregunta}
                        </Typography>

                        {item.opciones.map((opcion, index) => (
                          <FormControlLabel
                            key={index}
                            control={<Radio />}
                            label={opcion}
                            value={opcion}
                          />
                        ))}
                      </RadioGroup>
                    );
                  default:
                    return null;
                }
              })()}
            </div>
          ))}
          <Button
            variant="contained"
            color="primary"
            onClick={handleResetForm}
            startIcon={<Refresh />}
            style={{ marginRight: '10px', marginTop: '20px' }}
          >
            Reiniciar Formulario
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={handleSubmit}
            style={{ marginTop: '20px' }}
          >
            Enviar Formulario
          </Button>
        </form>
      </Paper>
    </Container>
  );
};