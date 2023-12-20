import { Tab, TabList, TabPanel, Tabs } from 'react-tabs';
import { TurnosForm } from '../admin/TurnosForm';
import { TurnosDisponibles } from '../admin/TurnosAdmin';
import { TurnosAdminPage } from '../admin/TurnosAdminPage';
import 'react-tabs/style/react-tabs.css';

export const TurnosAdminLAyout = () => {
  return (
    <>
      <Tabs>
        <TabList>
          <Tab>Administración de Turno</Tab>
          <Tab>Crear Tipo de Turno</Tab>
          <Tab>Calendario</Tab>
        </TabList>

        <TabPanel>
          <TurnosDisponibles />
        </TabPanel>
        <TabPanel>
          <TurnosForm />
        </TabPanel>
        <TabPanel>
          <TurnosAdminPage />
        </TabPanel>
      </Tabs>
    </>
  );
};
