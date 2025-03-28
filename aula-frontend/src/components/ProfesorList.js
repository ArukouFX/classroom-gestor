import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const ProfesorList = () => {
  const [profesores, setProfesores] = useState([]);
  const navigate = useNavigate();

  const loadProfesores = async () => {
    try {
      const response = await axios.get('http://localhost:8080/profesores');
      setProfesores(response.data);
    } catch (error) {
      console.error("Error cargando profesores:", error);
    }
  };

  useEffect(() => {
    loadProfesores();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm('¿Estás seguro de eliminar este profesor?')) {
      try {
        await axios.delete(`http://localhost:8080/profesores/delete/${id}`);
        await loadProfesores();
      } catch (error) {
        console.error("Error eliminando profesor:", error);
      }
    }
  };

  return (
    <div className="profesor-container">
      <h2 style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        Lista de Profesores
        <button 
          onClick={() => navigate('/profesores/nuevo')}
          className="btn-add"
          style={{
            backgroundColor: '#4CAF50',
            color: 'white',
            border: 'none',
            padding: '8px 16px',
            borderRadius: '4px',
            cursor: 'pointer',
            fontSize: '0.9rem',
            display: 'flex',
            alignItems: 'center',
            gap: '5px'
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
                src={profesor.foto || `https://ui-avatars.com/api/?name=${encodeURIComponent(profesor.nombre)}&background=random&size=150`}
                alt={`Foto de ${profesor.nombre}`}
                onError={(e) => {
                  e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(profesor.nombre)}&background=random&size=150`;
                  e.target.alt = 'Avatar generado';
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