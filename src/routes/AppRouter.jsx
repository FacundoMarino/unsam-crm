import { Navigate, Route, Routes } from 'react-router-dom';

import { AuthRoute } from '../auth/routes/AuthRoute';
import { useSelector } from 'react-redux';
import { selectAuthStatus } from '../store/auth/authSlider';
import { RegisterPage, ValidateEmail } from '../auth/pages';

export const AppRouter = () => {
  const status = useSelector(selectAuthStatus);

  console.log(status);

  return (
    <Routes>
      {status === 'checking' ? (
        <Route path="/*" element={<AuthRoute />} />
      ) : (
        <Route path="/auth/*" element={<ValidateEmail />} />
      )}
      {status === 'validateOk' ? (
        <Route path="/auth/register" element={<RegisterPage />} />
      ) : null}
      <Route path="/*" element={<Navigate to="/auth/login" />} />
    </Routes>
  );
};
