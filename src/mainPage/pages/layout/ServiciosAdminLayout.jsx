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
          <Tab style={{ color: selectedIndex === 0 ? '#AC00E3' : 'black' }}>
            Bandeja de Servicios
          </Tab>
          <Tab style={{ color: selectedIndex === 1 ? '#AC00E3' : 'black' }}>
            Empresas
          </Tab>
          <Tab style={{ color: selectedIndex === 2 ? '#AC00E3' : 'black' }}>
            Administración de Servicios
          </Tab>
          <Tab
            style={{
              display: displayViewLegajo,
              color: selectedIndex === 3 ? '#AC00E3' : 'black',
            }}
          >
            Legajo
          </Tab>
        </TabList>

        <TabPanel>
          <TareasGestion
            setDisplayViewLegajo={setDisplayViewLegajo}
            handleNewFormClick={handleNewFormClick}
          />
        </TabPanel>
        <TabPanel>
          <ServicioEmpresas
            handleNewFormClick={handleNewFormClick}
            setDisplayView={setDisplayView}
            setDisplayViewLegajo={setDisplayViewLegajo}
          />
        </TabPanel>
        <TabPanel>
          <ServicioGestion />
        </TabPanel>
        <TabPanel>
          <Legajo setDisplayViewLegajo={setDisplayViewLegajo} />
        </TabPanel>
      </Tabs>
    </>
  );
};
