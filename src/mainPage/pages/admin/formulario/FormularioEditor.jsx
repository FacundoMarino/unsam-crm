import React, { useState, useEffect } from 'react';
import { FormularioCreate } from './FormularioCreate';
import { FormularioEditorItem } from './FormularioEditorItem';

export const FormularioEditor = ({ formData }) => {
  const [formFields, setFormFields] = useState([formData]);

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

  const handleFieldChange = (index, property, value) => {
    const updatedFields = formFields.map((field, i) =>
      i === index ? { ...field, [property]: value } : field,
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
      <FormularioEditorItem
        formFields={formFields}
        onAddField={handleAddField}
        onRemoveField={handleRemoveField}
        onAddOption={handleAddOption}
        onRemoveOption={handleRemoveOption}
        onSubmit={handleSubmit}
        onFieldChanged={handleFieldChange}
      />
    </div>
  );
};
