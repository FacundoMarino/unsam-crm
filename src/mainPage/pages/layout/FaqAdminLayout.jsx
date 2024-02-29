import React, { useState } from 'react';
import { Tab, TabList, TabPanel, Tabs } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import { FaqGestion } from '../admin/faq/FaqGestion';
import { FaqCreate } from '../admin/faq/FaqCreate';

export const FaqAdminLayout = () => {
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
          <Tab>Administración de FAQ</Tab>
          <Tab>FAQ</Tab>
        </TabList>
        <TabPanel>
          <FaqCreate />
        </TabPanel>
        <TabPanel>
          <FaqGestion />
        </TabPanel>
      </Tabs>
    </>
  );
};
