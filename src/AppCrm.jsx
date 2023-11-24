import { AppRouter } from './routes/AppRouter';
import { AppTheme } from './theme/AppTheme';

export const AppCrm = () => {
  return (
    <>
      <AppTheme>
        <AppRouter />
      </AppTheme>
    </>
  );
};
