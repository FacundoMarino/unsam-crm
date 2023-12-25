import { useSelector } from 'react-redux';
import { CrmLayout } from '../layout/CrmLayout';
import { TurnosPage } from './TurnosPage';
import { TurnosAdminDetail } from './admin/TurnosAdminDetail';
import { useState } from 'react';

import { TurnosAdminLayout } from './layout/TurnosAdminLayout';
import { selectRole } from '../../store/auth/authSlider';

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
  return (
    <CrmLayout>
      {(page === 'turnos' && rol !== 'admin' && <TurnosPage />) || (
        <TurnosAdminLayout onVerDetalle={handleVerDetalle} />
      )}
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
