import {
  Container,
  Dialog,
  DialogContent,
  DialogTitle,
  Button,
  Grid,
} from '@mui/material';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { subirDocumentacion } from '../../../../store/tasks/thunks';

export const DocumentacionModal = ({ open, handleClose, props }) => {
  const telekinesis = useSelector((state) => state.auth.telekinesis);
  const dispatch = useDispatch();
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
      console.log(selectedFile);

      dispatch(
        subirDocumentacion({
          telekinesis,
          file: selectedFile,
          service_id: updateProps[0].service_id,
          enterprise_id: updateProps[0].enterprise_id,
          tarea_id: updateProps[0].id,
        }),
      );
    }
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <Container component="main" maxWidth="xs" style={{ width: '500px' }}>
        <DialogTitle>Documentación</DialogTitle>
        <DialogContent>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <input
                accept="image/*, application/pdf"
                id="contained-button-file"
                type="file"
                fullWidth
                onChange={handleFileChange}
              />
              <label htmlFor="contained-button-file"></label>
            </Grid>
            <Grid item xs={12}>
              {selectedFile && (
                <Button variant="contained" onClick={handleFileUpload}>
                  Enviar Archivo
                </Button>
              )}
            </Grid>
          </Grid>
        </DialogContent>
      </Container>
    </Dialog>
  );
};
