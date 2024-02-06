import React, { useState } from 'react';

import { Tab, TabList, TabPanel, Tabs } from 'react-tabs';
import { ServicioEmpresas } from '../admin/servicios/ServicioEmpresas';
import { ServicioGestion } from '../admin/servicios/ServiciosGestion';

export const ServiciosAdminLayout = () => {
  const [selectedIndex, setSelectedIndex] = useState(0);

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
        </TabList>

        <TabPanel>
          <ServicioGestion />
        </TabPanel>
        <TabPanel>
          <ServicioEmpresas />
        </TabPanel>
      </Tabs>
    </>
  );
};
