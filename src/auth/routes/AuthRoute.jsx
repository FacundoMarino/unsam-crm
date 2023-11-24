import { Navigate, Route, Routes } from 'react-router-dom';
import { LoginPage } from '../pages';

export const AuthRoute = () => {
  return (
    <>
      <Routes>
        <Route path="/auth/login" element={<LoginPage />} />

        {/* <Route path="register" element={<RegisterPage />} />*/}

        <Route path="/*" element={<Navigate to="/auth/login" />} />
      </Routes>
    </>
  );
};
