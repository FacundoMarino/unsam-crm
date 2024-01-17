import React, { useState } from 'react';
import {
  Card,
  CardContent,
  Divider,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

export const Legajo = () => {
  const [notas, setNotas] = useState([]);

  const agregarNota = () => {
    setNotas([...notas, { title: 'Nota', content: 'Contenido de la nota' }]);
  };

  return (
    <div>
      <Typography variant="h5" gutterBottom>
        Legajo
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead fullWidth displayFlex>
            <IconButton color="primary" onClick={agregarNota}>
              <AddIcon />
              Notas
            </IconButton>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell>
                <Card>
                  <CardContent>
                    <Typography variant="h6">Empresa</Typography>
                    <Divider />
                    {/* Contenido específico para Empresa */}
                  </CardContent>
                </Card>
              </TableCell>
              <TableCell>
                <Card>
                  <CardContent>
                    <Typography variant="h6">Turno admisión</Typography>
                    <Divider />
                    {/* Contenido específico para Turno admisión */}
                  </CardContent>
                </Card>
              </TableCell>
              <TableCell>
                <Card>
                  <CardContent>
                    <Typography variant="h6">Tarea Documentación</Typography>
                    <Divider />
                    {/* Contenido específico para Tarea Documentación */}
                  </CardContent>
                </Card>
              </TableCell>
              <TableCell>
                <Card>
                  <CardContent>
                    <Typography variant="h6">Formularios</Typography>
                    <Divider />
                    {/* Contenido específico para Formularios */}
                  </CardContent>
                </Card>
              </TableCell>
              <TableCell>
                {notas.map((nota, index) => (
                  <Card key={index}>
                    <CardContent>
                      <Typography variant="h6">{nota.title}</Typography>
                      <Divider />
                      <Typography>{nota.content}</Typography>
                    </CardContent>
                  </Card>
                ))}
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};
