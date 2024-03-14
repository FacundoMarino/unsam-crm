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
          <Tab style={{ color: selectedIndex === 0 ? '#6A51e1' : 'black' }}>
            Administración de Formularios
          </Tab>
          <Tab
            style={{
              display: displayEditForm,
              color: selectedIndex === 1 ? '#6A51e1' : 'black',
            }}
          >
            Edición de Formulario
          </Tab>
          <Tab style={{ color: selectedIndex === 2 ? '#6A51e1' : 'black' }}>
            Crear Tipo Formulario
          </Tab>
          <Tab
            style={{
              display: displayViewForm,
              color: selectedIndex === 3 ? '#6A51e1' : 'black',
            }}
          >
            Pre Visualización Formulario
          </Tab>
          <Tab
            style={{
              display: displayStepForm,
              color: selectedIndex === 4 ? '#6A51e1' : 'black',
            }}
          >
            Agregar Step
          </Tab>
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
