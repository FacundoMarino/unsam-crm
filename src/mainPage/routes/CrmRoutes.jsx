import { Navigate, Route, Routes } from 'react-router-dom';
import { CrmPage } from '../pages/CrmPage';
import { TurnosForm } from '../pages/admin/TurnosForm';

export const CrmRoutes = () => {
  return (
    <div>
      <Routes>
        <Route path="/crm" element={<CrmPage />} />
        <Route path="/turnos" element={<TurnosForm />} />

        <Route path="/*" element={<Navigate to="/crm" />} />
      </Routes>
    </div>
  );
};
