import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

const CategoriaForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [nombre, setNombre] = useState('');

  useEffect(() => {
    if (id) {
      const loadCategoria = async () => {
        try {
          const response = await axios.get(`http://localhost:8080/categorias/${id}`);
          setNombre(response.data.nombre);
        } catch (error) {
          console.error('Error cargando categoría:', error);
        }
      };
      loadCategoria();
    }
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const categoriaData = { nombre };
      
      if (id) {
        await axios.put(`http://localhost:8080/categorias/edit/${id}`, categoriaData);
      } else {
        await axios.post('http://localhost:8080/categorias/save', categoriaData);
      }
      navigate('/categorias');
    } catch (error) {
      console.error('Error guardando categoría:', error);
    }
  };

  return (
    <div className="categoria-form-container">
      <h2>{id ? 'Editar Categoría' : 'Nueva Categoría'}</h2>
      <form onSubmit={handleSubmit} className="categoria-form">
        <div className="form-group">
          <label>Nombre:</label>
          <input
            type="text"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            required
            placeholder="Nombre de la categoría"
          />
        </div>

        <div className="form-actions">
          <button type="submit" className="btn-submit">
            {id ? 'Actualizar' : 'Guardar'}
          </button>
          <button 
            type="button" 
            onClick={() => navigate('/categorias')}
            className="btn-cancel"
          >
            Cancelar
          </button>
        </div>
      </form>
    </div>
  );
};

export default CategoriaForm;