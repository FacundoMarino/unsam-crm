import React, { useState } from 'react';
import { Tab, TabList, TabPanel, Tabs } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import { FormularioCreate } from '../admin/formulario/FormularioCreate';
import { FormularioEditor } from '../admin/formulario/FormularioEditor';
import { FormularioGestion } from '../admin/formulario/FormularioGestion';
import { FormularioComplete } from '../../components/formularios/FormularioComplete';
import { FormularioAddStep } from '../admin/formulario/FormularioAddStep';

export const FormulariosAdminLayout = () => {
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
          <Tab>Administración de Formularios</Tab>
          <Tab>Edición de Formulario</Tab>
          <Tab>Crear Tipo Formulario</Tab>
          <Tab>Pre Visualización Formulario</Tab>
          <Tab>Agregar Step</Tab>
        </TabList>

        <TabPanel>
          <FormularioGestion handleNewFormClick={handleNewFormClick} />
        </TabPanel>
        <TabPanel>
          <FormularioEditor />
        </TabPanel>
        <TabPanel>
          <FormularioCreate />
        </TabPanel>
        <TabPanel>
          <FormularioComplete />
        </TabPanel>
        <TabPanel>
          <FormularioAddStep />
        </TabPanel>
      </Tabs>
    </>
  );
};
