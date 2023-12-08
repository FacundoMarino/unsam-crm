import { useSelector } from 'react-redux';
import { CrmLayout } from '../layout/CrmLayout';
import { TurnosPage } from './TurnosPage';

export const CrmPage = () => {
  const page = useSelector((state) => state.crm.page);

  return <CrmLayout>{page === 'turnos' && <TurnosPage />}</CrmLayout>;
};
