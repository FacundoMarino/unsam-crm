import React, { useState } from 'react';

import { Tab, TabList, TabPanel, Tabs } from 'react-tabs';
import { ServicioEmpresas } from '../admin/servicios/ServicioEmpresas';
import { ServicioGestion } from '../admin/servicios/ServiciosGestion';
import { TareasGestion } from '../admin/tareas/TareasGestion';
import { Legajo } from '../admin/tareas/Legajo';

export const ServiciosAdminLayout = () => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [displayView, setDisplayView] = useState('none');
  const [displayViewLegajo, setDisplayViewLegajo] = useState('none');

  const handleNewFormClick = (num) => {
    setSelectedIndex(num);
  };

  return (
    <>
      <Tabs
        style={{ margin: '10px' }}
        selectedIndex={selectedIndex}
        onSelect={(index) => setSelectedIndex(index)}
      >
        <TabList>
          <Tab>Administración de Servicios</Tab>
          <Tab>Empresas</Tab>
          <Tab>Administración de Tareas</Tab>
          <Tab style={{ display: displayViewLegajo }}>Legajo</Tab>
        </TabList>

        <TabPanel>
          <ServicioGestion />
        </TabPanel>
        <TabPanel>
          <ServicioEmpresas
            handleNewFormClick={handleNewFormClick}
            setDisplayView={setDisplayView}
            setDisplayViewLegajo={setDisplayViewLegajo}
          />
        </TabPanel>
        <TabPanel>
          <TareasGestion
            setDisplayViewLegajo={setDisplayViewLegajo}
            handleNewFormClick={handleNewFormClick}
          />
        </TabPanel>
        <TabPanel>
          <Legajo setDisplayViewLegajo={setDisplayViewLegajo} />
        </TabPanel>
      </Tabs>
    </>
  );
};
