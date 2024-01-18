import { getEnterprisesProvider } from '../../services/tasksProvider';
import { errorApi } from '../auth/authSlider';
import { setEnterprises } from './taskSlider';

export const getEnterprises = ({ telekinesis }) => {
  const token = localStorage.getItem('browser_token');
  return async (dispatch) => {
    const data = await getEnterprisesProvider({ token, telekinesis });
    data.error
      ? errorApi(data.error)
      : dispatch(setEnterprises(data.enterprises));
  };
};
