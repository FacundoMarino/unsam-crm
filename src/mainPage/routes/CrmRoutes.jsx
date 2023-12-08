import { Navigate, Route, Routes } from 'react-router-dom';
import { CrmPage } from '../pages/CrmPage';
import { TurnosPage } from '../pages/TurnosPage';

export const CrmRoutes = () => {
  return (
    <div>
      <Routes>
        <Route path="/crm" element={<CrmPage />} />
        <Route path="/turnos" element={<TurnosPage />} />

        <Route path="/*" element={<Navigate to="/crm" />} />
      </Routes>
    </div>
  );
};
