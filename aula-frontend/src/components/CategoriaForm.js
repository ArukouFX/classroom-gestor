import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const CategoriaForm = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  
  const handleSubmit = (e) => {
    e.preventDefault();
    // Lógica para guardar la categoría
    navigate('/categorias');
  };

  return (
    <div>
      <h2>{id ? 'Editar Categoría' : 'Nueva Categoría'}</h2>
      <form onSubmit={handleSubmit}>
        {/* Campos del formulario */}
        <button type="submit">Guardar</button>
      </form>
    </div>
  );
};

export default CategoriaForm;