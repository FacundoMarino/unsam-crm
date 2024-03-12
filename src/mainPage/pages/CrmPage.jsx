import { useSelector } from 'react-redux';
import { CrmLayout } from '../layout/CrmLayout';
import { TurnosPage } from './TurnosPage';
import { TurnosAdminDetail } from './admin/TurnosAdminDetail';
import { useState } from 'react';

import { TurnosAdminLayout } from './layout/TurnosAdminLayout';
import { selectRole } from '../../store/auth/authSlider';
import { FormulariosAdminLayout } from './layout/FormulariosAdminLayout';
import { FormularioComplete } from '../components/formularios/FormularioComplete';
import { Legajo } from './admin/tareas/Legajo';
import { ServiciosAdminLayout } from './layout/ServiciosAdminLayout';
import { ServiciosExternal } from '../components/servicios/ServiciosExternal';
import { Reportes } from './admin/reportes/Reportes';
import { FaqAdminLayout } from './layout/FaqAdminLayout';
import { UsuariosAdminLayout } from './layout/UsuariosAdminLayout';
import { FaqGestion } from './admin/faq/FaqGestion';

export const CrmPage = () => {
  const page = useSelector((state) => state.crm.page);
  const rol = useSelector(selectRole);

  const [selectedTurno, setSelectedTurno] = useState(null);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleVerDetalle = (turno) => {
    setSelectedTurno(turno);
    setIsModalOpen(true);
  };
  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  let contentComponent;

  if (page === 'turnos' && rol !== 'Admin') {
    contentComponent = <TurnosPage />;
  } else if (page === 'formularios' && rol !== 'Admin') {
    contentComponent = <FormularioComplete />;
  } else if (page === 'turnos' && rol !== 'Admin') {
    contentComponent = <TurnosAdminLayout onVerDetalle={handleVerDetalle} />;
  } else if (page === 'formularios' && rol === 'Admin') {
    contentComponent = <FormulariosAdminLayout />;
  } else if (page === 'milegajo' && rol !== 'Admin') {
    contentComponent = <Legajo />;
  } else if (page === 'servicios' && rol === 'Admin') {
    contentComponent = <ServiciosAdminLayout />;
  } else if (page === 'servicios' && rol !== 'Admin') {
    contentComponent = <ServiciosExternal />;
  } else if (page === 'reportes' && rol === 'Admin') {
    contentComponent = <Reportes />;
  } else if (page === 'usuarios' && rol === 'Admin') {
    contentComponent = <UsuariosAdminLayout />;
  } else if (page === 'faq' && rol === 'Admin') {
    contentComponent = <FaqAdminLayout />;
  } else if (page === 'faq' && rol !== 'Admin') {
    contentComponent = <FaqGestion />;
  } else {
    contentComponent = <TurnosAdminLayout onVerDetalle={handleVerDetalle} />;
  }
  return (
    <CrmLayout>
      {contentComponent}

      {selectedTurno && (
        <TurnosAdminDetail
          turno={selectedTurno}
          open={isModalOpen}
          onClose={handleCloseModal}
        />
      )}
    </CrmLayout>
  );
};
