import {
  postShiftStepOne,
  postShiftsTypes,
  postStore,
} from '../../services/shiftProvider';
import { errorApi } from '../auth/authSlider';
import { resetShift, setShift, setShiftType } from './shiftSlider';

export const getShiftsTypes = ({ telekinesis }) => {
  const token = localStorage.getItem('browser_token');
  return async (dispatch) => {
    const data = await postShiftsTypes({
      telekinesis,
      token,
    });

    data.error ? errorApi(data.error) : dispatch(setShiftType(data.shifts));
  };
};

export const postShiftStepOneThunk = ({
  location,
  shift_type,
  telekinesis,
  day,
}) => {
  const token = localStorage.getItem('browser_token');
  return async (dispatch) => {
    const data = await postShiftStepOne({
      location,
      shift_type,
      telekinesis,
      token,
      day,
    });

    data.error ? errorApi(data.error) : dispatch(setShift(data));
  };
};

export const postStoreShift = ({
  location,
  shift_type,
  telekinesis,
  day,
  hour,
  shift_type_id,
}) => {
  const token = localStorage.getItem('browser_token');
  return async (dispatch) => {
    const data = await postStore({
      location,
      shift_type,
      telekinesis,
      token,
      day,
      hour,
      shift_type_id,
    });

    data.error ? errorApi(data.error) : dispatch(resetShift(data));
  };
};
