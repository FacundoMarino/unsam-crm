import React, { useState } from 'react';

import { Tab, TabList, TabPanel, Tabs } from 'react-tabs';
import { UsuariosGestion } from '../admin/usuarios/UsuariosGestion';
import { UsuarioDetail } from '../admin/usuarios/UsuarioDetail';

export const UsuariosAdminLayout = () => {
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
          <Tab>Administración de Usuarios</Tab>
          <Tab style={{ display: displayView }}>Detalle Usuario</Tab>
        </TabList>

        <TabPanel>
          <UsuariosGestion
            setDisplayView={setDisplayView}
            handleNewFormClick={handleNewFormClick}
          />
        </TabPanel>
        <TabPanel>
          <UsuarioDetail />
        </TabPanel>
      </Tabs>
    </>
  );
};
