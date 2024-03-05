import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
} from '@mui/material';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { verTodasPreguntas } from '../../../../store/faq/thunks';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

export const FaqGestion = () => {
  const telekinesis = useSelector((state) => state.auth.telekinesis);
  const faqs = useSelector((state) => state.faq.faqs);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(verTodasPreguntas({ telekinesis }));
  }, [dispatch, telekinesis]);

  return (
    <div>
      {faqs.map((faq, index) => (
        <Accordion key={index}>
          <AccordionSummary
            aria-controls={`panel-content-${index}`}
            id={`panel-header-${index}`}
            expandIcon={<ExpandMoreIcon />}
          >
            <Typography style={{ fontWeight: 'bold' }}>
              {faq.question}
            </Typography>
          </AccordionSummary>
          <AccordionDetails style={{ backgroundColor: '#f6f6f6' }}>
            <Typography variant="span">{faq.response}</Typography>
          </AccordionDetails>
        </Accordion>
      ))}
    </div>
  );
};
