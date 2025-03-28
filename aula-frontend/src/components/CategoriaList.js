import React, { useState, useEffect } from 'react';
import { getCategorias, deleteCategoria } from '../service/api';
import { useNavigate } from 'react-router-dom';

const CategoriaList = () => {
  const [categorias, setCategorias] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const loadCategorias = async () => {
    try {
      const response = await getCategorias();
      setCategorias(response.data);
    } catch (error) {
      console.error("Error cargando categorías:", error);
      setError(error);
    } finally {
      setLoading(false);
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

  if (loading) return <div>Cargando categorías...</div>;
  if (error) return <div>Error al cargar las categorías</div>;

  return (
    <div className="categoria-container">
      <h2 style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        Categorías
        <button 
          onClick={() => navigate('/categorias/nuevo')}
          className="btn-add"
        >
          + Agregar Categoría
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