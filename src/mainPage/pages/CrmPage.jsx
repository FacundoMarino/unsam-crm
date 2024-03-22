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

  if (page === 'turnos' && rol === 'Externo') {
    contentComponent = <TurnosPage />;
  } else if (page === 'formularios' && rol === 'Externo') {
    contentComponent = <FormularioComplete />;
  } else if (page === 'turnos' && rol !== 'Externo') {
    contentComponent = <TurnosAdminLayout onVerDetalle={handleVerDetalle} />;
  } else if (page === 'formularios' && rol !== 'Externo') {
    contentComponent = <FormulariosAdminLayout />;
  } else if (page === 'milegajo' && rol === 'Externo') {
    contentComponent = <Legajo />;
  } else if (page === 'servicios' && rol !== 'Externo') {
    contentComponent = <ServiciosAdminLayout />;
  } else if (page === 'servicios' && rol === 'Externo') {
    contentComponent = <ServiciosExternal />;
  } else if (page === 'reportes' && rol !== 'Externo') {
    contentComponent = <Reportes />;
  } else if (page === 'usuarios' && rol !== 'Externo') {
    contentComponent = <UsuariosAdminLayout />;
  } else if (page === 'faq' && rol !== 'Externo') {
    contentComponent = <FaqAdminLayout />;
  } else if (page === 'faq' && rol === 'Externo') {
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
