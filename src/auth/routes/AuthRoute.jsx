import { Navigate, Route, Routes } from 'react-router-dom';
import { LoginPage, RegisterPage, ValidateEmail } from '../pages';

export const AuthRoute = () => {
  return (
    <>
      <Routes>
        <Route path="/auth/login" element={<LoginPage />} />

        <Route path="/auth/register" element={<RegisterPage />} />

        <Route path="/auth/validate" element={<ValidateEmail />} />

        <Route path="/*" element={<Navigate to="/auth/login" />} />
      </Routes>
    </>
  );
};
