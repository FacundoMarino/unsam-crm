import React, { useState } from 'react';
import {
  Card,
  CardContent,
  Typography,
  Divider,
  Grid,
  Button,
} from '@mui/material';
import { useSelector } from 'react-redux';
import { selectRole } from '../../../../store/auth/authSlider';

export const Legajo = () => {
  const rol = useSelector(selectRole);
  const [cards, setCards] = useState([
    { title: 'Empresa', content: 'Contenido de la Empresa' },
    { title: 'Turno admision', content: 'Contenido del Turno admision' },
    {
      title: 'Tarea Documentación',
      content: 'Contenido de la Tarea Documentación',
    },
    { title: 'Formularios', content: 'Contenido de los Formularios' },
  ]);

  const handleAddCard = () => {
    const newCard = { title: 'Nota', content: 'Contenido de la Nota' };
    setCards((prevCards) => [...prevCards, newCard]);
  };

  return (
    <div>
      <Grid container spacing={2}>
        {cards.map((card, index) => (
          <Grid key={index} item xs={12} sm={6} md={3}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  {card.title}
                </Typography>
                <Divider />
                <Typography>{card.content}</Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {rol === 'Admin' && (
        <Button
          style={{ marginTop: '20px' }}
          variant="outlined"
          onClick={handleAddCard}
        >
          Agregar Nota
        </Button>
      )}
    </div>
  );
};
