import { AddOutlined } from '@mui/icons-material';
import { IconButton } from '@mui/material';
import { useDispatch } from 'react-redux';
import { CrmLayout } from '../layout/CrmLayout';

export const CrmPage = () => {
  const dispatch = useDispatch();

  const isSaving = false;

  const clickNewNoteHandler = () => {};

  return <CrmLayout></CrmLayout>;
};
