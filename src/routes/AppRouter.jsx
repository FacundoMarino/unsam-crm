import { Navigate, Route, Routes } from 'react-router-dom';

import { AuthRoute } from '../auth/routes/AuthRoute';
import { useSelector } from 'react-redux';
import { selectAuthStatus } from '../store/auth/authSlider';
import { RegisterPage } from '../auth/pages';
import { CrmRoutes } from '../mainPage/routes/CrmRoutes';

export const AppRouter = () => {
  const status = useSelector(selectAuthStatus);

  return (
    <Routes>
      {status === 'checking' ? (
        <Route path="/*" element={<AuthRoute />} />
      ) : (
        <Route path="/*" element={<CrmRoutes />} />
      )}
      {status === 'validateOk' ? (
        <Route path="/auth/register" element={<RegisterPage />} />
      ) : null}
      <Route path="/*" element={<Navigate to="/auth/login" />} />
    </Routes>
  );
};
