import React, { useState, useEffect } from 'react';
import { getCategorias, deleteCategoria } from '../service/api';
import { useNavigate } from 'react-router-dom';

const CategoriaList = () => {
  const [categorias, setCategorias] = useState([]);
  const navigate = useNavigate();

  const loadCategorias = async () => {
    try {
      const response = await getCategorias();
      setCategorias(response.data);
    } catch (error) {
      console.error("Error cargando categorías:", error);
    }
  };

  useEffect(() => {
    loadCategorias();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm('¿Estás seguro de eliminar esta categoría?')) {
      try {
        await deleteCategoria(id);
        await loadCategorias();
      } catch (error) {
        console.error("Error eliminando categoría:", error);
      }
    }
  };

  return (
    <div className="categoria-container">
      <h2 style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        Categorías
        <button 
          onClick={() => navigate('/categorias/nuevo')}
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
          <span>+</span> Agregar Nueva
        </button>
      </h2>
      
      <div className="categoria-grid">
        {categorias.map(categoria => (
          <div key={categoria.id} className="categoria-card">
            <div className="categoria-info">
              <h3>{categoria.nombre}</h3>
              <div className="categoria-actions">
                <button 
                  onClick={() => navigate(`/categorias/editar/${categoria.id}`)}
                  className="btn-edit"
                >
                  Editar
                </button>
                <button 
                  onClick={() => handleDelete(categoria.id)}
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

export default CategoriaList;