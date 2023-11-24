import { Navigate, Route, Routes } from 'react-router-dom';

import { AuthRoute } from '../auth/routes/AuthRoute';

export const AppRouter = () => {
  const status = 'authenticated';
  return (
    <Routes>
      {status === 'authenticated' ? (
        <Route path="/*" element={<AuthRoute />} />
      ) : (
        <Route path="/auth/*" element={<AuthRoute />} />
      )}

      <Route path="/*" element={<Navigate to="/auth/login" />} />
    </Routes>
  );
};
