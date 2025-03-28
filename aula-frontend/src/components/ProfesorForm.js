import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

const ProfesorForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    foto: ''
  });

  useEffect(() => {
    if (id) {
      const loadProfesor = async () => {
        try {
          const response = await axios.get(`http://localhost:8080/profesores/${id}`);
          setFormData(response.data);
        } catch (error) {
          console.error('Error cargando profesor:', error);
        }
      };
      loadProfesor();
    }
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (id) {
        await axios.put(`http://localhost:8080/profesores/edit/${id}`, formData);
      } else {
        await axios.post('http://localhost:8080/profesores/save', formData);
      }
      navigate('/profesores');
    } catch (error) {
      console.error('Error al guardar:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="profesor-form-container">
      <h2>{id ? 'Editar Profesor' : 'Nuevo Profesor'}</h2>
      <form onSubmit={handleSubmit} className="profesor-form">
        <div className="form-group">
          <label>Nombre:</label>
          <input
            type="text"
            name="nombre"
            value={formData.nombre}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>URL de la Foto:</label>
          <input
            type="url"
            name="foto"
            value={formData.foto}
            onChange={handleChange}
            placeholder="https://ejemplo.com/foto.jpg"
          />
        </div>

        <div className="form-actions">
          <button type="submit" className="btn-submit">
            {id ? 'Actualizar' : 'Guardar'}
          </button>
          <button 
            type="button" 
            onClick={() => navigate('/profesores')}
            className="btn-cancel"
          >
            Cancelar
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProfesorForm;