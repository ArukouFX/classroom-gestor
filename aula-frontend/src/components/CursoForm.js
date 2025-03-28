import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const CursoForm = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  
  const handleSubmit = (e) => {
    e.preventDefault();
    // Lógica para guardar el curso
    navigate('/cursos');
  };

  return (
    <div>
      <h2>{id ? 'Editar Curso' : 'Nuevo Curso'}</h2>
      <form onSubmit={handleSubmit}>
        {/* Campos del formulario */}
        <button type="submit">Guardar</button>
      </form>
    </div>
  );
};

export default CursoForm;