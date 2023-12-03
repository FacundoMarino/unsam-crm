import { Navigate, Route, Routes } from 'react-router-dom';
import { CrmPage } from '../pages/CrmPage';

export const CrmRoutes = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<CrmPage />} />

        <Route path="/*" element={<Navigate to="/" />} />
      </Routes>
    </div>
  );
};
