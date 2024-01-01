import React, { useState, useEffect } from 'react';
import { FormularioCreate } from './FormularioCreate';

export const FormularioEditor = ({ formData }) => {
  const [formFields, setFormFields] = useState([]);

  useEffect(() => {
    // Inicializa el estado con los datos del formulario guardado
    setFormFields(formData);
  }, [formData]);

  const handleAddField = () => {
    // Agrega un nuevo campo al estado
    const newField = {
      id: Date.now(),
      tipo: 'texto',
      pregunta: '',
      opciones: [''],
      requerido: false,
    };
    setFormFields([...formFields, newField]);
  };

  const handleRemoveField = (id) => {
    // Elimina un campo del estado
    const updatedFields = formFields.filter((field) => field.id !== id);
    setFormFields(updatedFields);
  };

  const handleAddOption = (id) => {
    // Agrega una nueva opción a un campo específico
    const updatedFields = formFields.map((field) =>
      field.id === id ? { ...field, opciones: [...field.opciones, ''] } : field,
    );
    setFormFields(updatedFields);
  };

  const handleRemoveOption = (id, optionIndex) => {
    // Elimina una opción de un campo específico
    const updatedFields = formFields.map((field) =>
      field.id === id
        ? {
            ...field,
            opciones: field.opciones.filter(
              (_, index) => index !== optionIndex,
            ),
          }
        : field,
    );
    setFormFields(updatedFields);
  };

  const handleSubmit = () => {
    // Aquí puedes enviar los datos editados del formulario a tu API
    console.log('Datos editados del formulario:', formFields);
  };

  // Reemplazar por otro componente de creación de formulario
  return (
    <div>
      <h2>Editor de Formulario</h2>
      <FormularioCreate
        formFields={formFields}
        onAddField={handleAddField}
        onRemoveField={handleRemoveField}
        onAddOption={handleAddOption}
        onRemoveOption={handleRemoveOption}
        onSubmit={handleSubmit}
      />
    </div>
  );
};
