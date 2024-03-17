import {
  Container,
  Dialog,
  DialogContent,
  DialogTitle,
  Button,
  Grid,
  Typography,
} from '@mui/material';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  descargarrDocumentacion,
  subirDocumentacion,
  updateTask,
} from '../../../../store/tasks/thunks';

export const DocumentacionModal = ({ open, handleClose, props }) => {
  const telekinesis = useSelector((state) => state.auth.telekinesis);
  const dispatch = useDispatch();
  const rol = useSelector((state) => state.auth.rol);
  const [selectedFile, setSelectedFile] = useState({});
  const [updateProps, setUpdateProps] = useState({});

  useEffect(() => {
    setUpdateProps(props);
  }, [props]);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
  };

  const handleFileUpload = () => {
    if (updateProps && selectedFile) {
      dispatch(
        subirDocumentacion({
          telekinesis,
          file: selectedFile,
          service_id: updateProps[0].service_id,
          enterprise_id: updateProps[0].enterprise_id,
          tarea_id: updateProps[0].id,
        }),
      );

      dispatch(
        updateTask({
          telekinesis,
          enterprise_id: updateProps[0].enterprise_id,
          status: 2,
          id: updateProps[0].id,
        }),
      );

      handleClose();
    }
  };

  const handleDownloadFile = () => {
    dispatch(
      descargarrDocumentacion({
        telekinesis,
        service_id: updateProps[0].service_id,
        enterprise_id: updateProps[0].enterprise_id,
        tarea_id: updateProps[0].id,
      }),
    );
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <Container component="main" maxWidth="xs" style={{ width: '500px' }}>
        <DialogTitle>Documentación</DialogTitle>
        <DialogContent>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              {updateProps[0]?.color === 'red' && rol !== 'Admin'
                ? selectedFile && (
                    <>
                      <Grid item xs={12} mb={2}>
                        <input
                          accept="image/*, application/pdf"
                          id="contained-button-file"
                          type="file"
                          fullWidth
                          onChange={handleFileChange}
                        />
                        <label htmlFor="contained-button-file"></label>
                      </Grid>
                      <Button
                        variant="contained"
                        style={{ backgroundColor: '#AC00E3' }}
                        onClick={handleFileUpload}
                      >
                        Enviar Archivo
                      </Button>
                    </>
                  )
                : null}
              {updateProps[0]?.color === 'green' && rol !== 'Admin' ? (
                <Typography>La documentación ya se encuentra subida</Typography>
              ) : (
                <Button
                  variant="contained"
                  style={{
                    display: rol === 'Admin' ? '' : 'none',
                    backgroundColor: '#AC00E3',
                  }}
                  onClick={handleDownloadFile}
                >
                  Descargar Archivo
                </Button>
              )}
            </Grid>
          </Grid>
        </DialogContent>
      </Container>
    </Dialog>
  );
};
