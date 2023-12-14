import { Navigate, Route, Routes } from 'react-router-dom';

import { AuthRoute } from '../auth/routes/AuthRoute';
import { useSelector } from 'react-redux';
import { selectAuthStatus } from '../store/auth/authSlider';
import { ValidateEmail } from '../auth/pages';
import { CrmRoutes } from '../mainPage/routes/CrmRoutes';

export const AppRouter = () => {
  const status = useSelector(selectAuthStatus);

  return (
    <Routes>
      {status === 'checking' && <Route path="/*" element={<AuthRoute />} />}
      {status === 'authenticated' && (
        <Route path="/*" element={<CrmRoutes />} />
      )}
      {status === 'validate' && <Route path="/*" element={<ValidateEmail />} />}
      {status === 'validateOk' && (
        <Route path="/*" element={<ValidateEmail />} />
      )}

      <Route path="/*" element={<Navigate to="/auth/login" />} />
    </Routes>
  );
};
