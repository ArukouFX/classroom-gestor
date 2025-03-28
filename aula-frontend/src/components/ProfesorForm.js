import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const ProfesorList = () => {
  const [profesores, setProfesores] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfesores = async () => {
      try {
        const response = await axios.get('http://localhost:8080/profesores');
        setProfesores(response.data);
      } catch (error) {
        console.error('Error fetching profesores:', error);
        setError(error);
      } finally {
        setLoading(false);
      }
    };
    fetchProfesores();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm('¿Estás seguro de eliminar este profesor?')) {
      try {
        await axios.delete(`http://localhost:8080/profesores/delete/${id}`);
        setProfesores(profesores.filter(profesor => profesor.id !== id));
      } catch (error) {
        console.error('Error eliminando profesor:', error);
      }
    }
  };

  if (loading) return <div>Cargando...</div>;
  if (error) return <div>Error al cargar la lista de profesores.</div>;

  return (
    <div className="profesor-container">
      <h2 style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        Lista de Profesores
        <button 
          onClick={() => navigate('/profesores/nuevo')}
          style={{
            backgroundColor: '#4CAF50',
            color: 'white',
            border: 'none',
            padding: '8px 16px',
            borderRadius: '4px',
            cursor: 'pointer',
            fontSize: '0.9rem'
          }}
        >
          + Agregar Profesor
        </button>
      </h2>
      
      <div className="profesor-grid">
        {profesores.map(profesor => (
          <div key={profesor.id} className="profesor-card">
            <div className="profesor-avatar">
              <img 
                src={`http://localhost:8080${profesor.foto}`} 
                alt={`Foto de ${profesor.nombre}`}
                onError={(e) => {
                  e.target.src = 'https://via.placeholder.com/150';
                  e.target.alt = 'Foto no disponible';
                }}
                loading="lazy"
              />
            </div>
            <div className="profesor-info">
              <h3>{profesor.nombre}</h3>
              <p className="profesor-email">{profesor.email}</p>
              <div className="profesor-actions">
                <button 
                  onClick={() => navigate(`/profesores/editar/${profesor.id}`)}
                  className="btn-edit"
                >
                  Editar
                </button>
                <button 
                  onClick={() => handleDelete(profesor.id)}
                  className="btn-delete"
                >
                  Eliminar
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProfesorList;