import React, { useState } from 'react';
import { Tab, TabList, TabPanel, Tabs } from 'react-tabs';
import { TurnosForm } from '../admin/TurnosForm';
import { TurnosDisponibles } from '../admin/TurnosAdmin';
import { TurnosAdminPage } from '../admin/TurnosAdminPage';
import { TurnosGestion } from '../admin/TurnosGestion';
import 'react-tabs/style/react-tabs.css';

export const TurnosAdminLayout = () => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [displayCreateShift, setDisplayCreateShift] = useState('none');

  const handleNuevoTurnoClick = () => {
    setSelectedIndex(2);
    setDisplayCreateShift('');
  };

  return (
    <>
      <Tabs
        style={{ margin: '10px' }}
        selectedIndex={selectedIndex}
        onSelect={(index) => setSelectedIndex(index)}
      >
        <TabList>
          <Tab>Administración de Turno</Tab>
          <Tab>Gestión de Turno</Tab>
          <Tab style={{ display: displayCreateShift }}>Crear Tipo de Turno</Tab>
          <Tab>Calendario</Tab>
        </TabList>

        <TabPanel>
          <TurnosDisponibles setDisplayCreateShift={setDisplayCreateShift} />
        </TabPanel>
        <TabPanel>
          <TurnosGestion
            setDisplayCreateShift={setDisplayCreateShift}
            handleNuevoTurnoClick={handleNuevoTurnoClick}
          />
        </TabPanel>
        <TabPanel>
          <TurnosForm setDisplayCreateShift={setDisplayCreateShift} />
        </TabPanel>
        <TabPanel>
          <TurnosAdminPage setDisplayCreateShift={setDisplayCreateShift} />
        </TabPanel>
      </Tabs>
    </>
  );
};
