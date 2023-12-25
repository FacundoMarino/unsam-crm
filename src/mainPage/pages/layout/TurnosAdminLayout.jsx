import React, { useState } from 'react';
import { Tab, TabList, TabPanel, Tabs } from 'react-tabs';
import { TurnosForm } from '../admin/TurnosForm';
import { TurnosDisponibles } from '../admin/TurnosAdmin';
import { TurnosAdminPage } from '../admin/TurnosAdminPage';
import { TurnosGestion } from '../admin/TurnosGestion';
import 'react-tabs/style/react-tabs.css';

export const TurnosAdminLayout = () => {
  const [selectedIndex, setSelectedIndex] = useState(0);

  const handleNuevoTurnoClick = () => {
    setSelectedIndex(2);
  };

  return (
    <>
      <Tabs
        selectedIndex={selectedIndex}
        onSelect={(index) => setSelectedIndex(index)}
      >
        <TabList>
          <Tab>Administración de Turno</Tab>
          <Tab>Gestión de Turno</Tab>
          <Tab>Crear Tipo de Turno</Tab>
          <Tab>Calendario</Tab>
        </TabList>

        <TabPanel>
          <TurnosDisponibles />
        </TabPanel>
        <TabPanel>
          <TurnosGestion handleNuevoTurnoClick={handleNuevoTurnoClick} />
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
