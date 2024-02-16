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
  const [displayEditForm, setDisplayEditForm] = useState('none');
  const [displayStepForm, setStepEditForm] = useState('none');
  const [displayViewForm, setDisplayViewForm] = useState('none');

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
          <Tab style={{ display: displayEditForm }}>Edición de Formulario</Tab>
          <Tab>Crear Tipo Formulario</Tab>
          <Tab style={{ display: displayViewForm }}>
            Pre Visualización Formulario
          </Tab>
          <Tab style={{ display: displayStepForm }}>Agregar Step</Tab>
        </TabList>

        <TabPanel>
          <FormularioGestion
            setDisplayEditForm={setDisplayEditForm}
            handleNewFormClick={handleNewFormClick}
            setDisplayViewForm={setDisplayViewForm}
            setStepEditForm={setStepEditForm}
          />
        </TabPanel>
        <TabPanel>
          <FormularioEditor />
        </TabPanel>
        <TabPanel>
          <FormularioCreate
            setDisplayEditForm={setDisplayEditForm}
            setDisplayViewForm={setDisplayViewForm}
            setStepEditForm={setStepEditForm}
          />
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
