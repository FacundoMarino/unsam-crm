import React, { useState } from 'react';
import { Tab, TabList, TabPanel, Tabs } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';

export const TareasAdminLayout = () => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [displayView, setDisplayView] = useState('none');

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
          <Tab style={{ color: selectedIndex === 0 ? '#6A51e1' : 'black' }}>
            Administración de Tareas
          </Tab>
          <Tab
            style={{
              color: selectedIndex === 1 ? '#6A51e1' : 'black',
              display: displayView,
            }}
          >
            Legajo
          </Tab>
        </TabList>

        <TabPanel></TabPanel>
        <TabPanel></TabPanel>
      </Tabs>
    </>
  );
};
