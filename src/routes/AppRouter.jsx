import { Navigate, Route, Routes } from 'react-router-dom';

import { AuthRoute } from '../auth/routes/AuthRoute';
import { useSelector } from 'react-redux';
import { selectAuthStatus } from '../store/auth/authSlider';
import { RegisterPage, ValidateEmail } from '../auth/pages';
import { CrmRoutes } from '../mainPage/routes/CrmRoutes';

export const AppRouter = () => {
  const status = useSelector(selectAuthStatus);

  console.log(status);

  return (
    <Routes>
      {status === 'checking' ? (
        <Route path="/*" element={<CrmRoutes />} />
      ) : (
        <Route path="/auth/*" element={<CrmRoutes />} />
      )}
      {status === 'validateOk' ? (
        <Route path="/auth/register" element={<RegisterPage />} />
      ) : null}
      <Route path="/*" element={<Navigate to="/auth/login" />} />
    </Routes>
  );
};
