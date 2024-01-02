import React, { useState } from 'react';
import { Tab, TabList, TabPanel, Tabs } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import { FormularioCreate } from '../admin/formulario/FormularioCreate';
import { FormularioEditor } from '../admin/formulario/FormularioEditor';
import { FormularioGestion } from '../admin/formulario/FormularioGestion';

export const FormulariosAdminLayout = () => {
  const [selectedIndex, setSelectedIndex] = useState(0);

  const handleNuevoTurnoClick = () => {
    setSelectedIndex(2);
  };

  const datosFormularioGuardado = [
    {
      id: 1704139199592,
      tipo: 'texto',
      pregunta: 'pregunta 1 ',
      opciones: [''],
      requerido: true,
    },
    {
      id: 1704139242805,
      tipo: 'numero',
      pregunta: 'pregunta 2',
      opciones: [''],
      requerido: true,
    },
    {
      id: 1704139258778,
      tipo: 'checkbox',
      pregunta: 'pregunta 3',
      opciones: ['opcion 1', 'opcion 2'],
      requerido: false,
    },
    {
      id: 1704139273267,
      tipo: 'textarea',
      pregunta: 'pregunta 4',
      opciones: [''],
      requerido: false,
    },
    {
      id: 1704139284446,
      tipo: 'radio',
      pregunta: 'pregunta 5',
      opciones: ['opcion 3', 'opcion 4'],
      requerido: false,
    },
  ];

  return (
    <>
      <Tabs
        style={{ margin: '10px' }}
        selectedIndex={selectedIndex}
        onSelect={(index) => setSelectedIndex(index)}
      >
        <TabList>
          <Tab>Administración de Formularios</Tab>
          <Tab>Gestión de Formularios</Tab>
          <Tab>Crear Tipo Formulario</Tab>
        </TabList>

        <TabPanel>
          <FormularioGestion />
        </TabPanel>
        <TabPanel>
          <FormularioEditor formData={datosFormularioGuardado} />{' '}
        </TabPanel>
        <TabPanel>
          <FormularioCreate />
        </TabPanel>
      </Tabs>
    </>
  );
};
