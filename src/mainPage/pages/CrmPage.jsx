import { useSelector } from 'react-redux';
import { CrmLayout } from '../layout/CrmLayout';
import { TurnosPage } from './TurnosPage';
import { TurnosAdminPage } from './admin/TurnosAdminPage';
import { TurnosAdminDetail } from './admin/TurnosAdminDetail';
import { useState } from 'react';
import { TurnosForm } from './admin/TurnosForm';
import { TurnosDisponibles } from './admin/TurnosAdmin';
import { TurnosAdminLAyout } from './layout/TurnosAdminLayout';

export const CrmPage = () => {
  const page = useSelector((state) => state.crm.page);
  const rol = useSelector((state) => state.auth.rol);

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
        <TurnosAdminLAyout onVerDetalle={handleVerDetalle} />
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
