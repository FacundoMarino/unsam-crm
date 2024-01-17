import React, { useState } from 'react';
import { Tab, TabList, TabPanel, Tabs } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import { TareasGestion } from '../admin/tareas/TareasGestion';
import { Legajo } from '../admin/tareas/Legajo';

export const TareasAdminLayout = () => {
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
          <Tab>Administración de Tareas</Tab>

          <Tab>Legajo</Tab>
        </TabList>

        <TabPanel>
          <TareasGestion handleNewFormClick={handleNewFormClick} />
        </TabPanel>
        <TabPanel>
          <Legajo />
        </TabPanel>
      </Tabs>
    </>
  );
};
