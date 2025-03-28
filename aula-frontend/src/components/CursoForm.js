import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

const CursoForm = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [profesores, setProfesores] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [curso, setCurso] = useState({
    nombre: '',
    descripcion: '',
    fechaInicio: '',
    fechaFinal: '',
    imagen: '',
    profesorId: '',
    categoriaId: ''
  });

  // Cargar datos para los selects
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [profResponse, catResponse] = await Promise.all([
          axios.get('http://localhost:8080/profesores'),
          axios.get('http://localhost:8080/categorias')
        ]);
        setProfesores(profResponse.data);
        setCategorias(catResponse.data);
        
        if (id) {
          const cursoResponse = await axios.get(`http://localhost:8080/cursos/detail/${id}`);
          setCurso({
            ...cursoResponse.data,
            profesorId: cursoResponse.data.profesor?.id || '',
            categoriaId: cursoResponse.data.categoria?.id || ''
          });
        }
      } catch (error) {
        console.error('Error cargando datos:', error);
      }
    };
    
    fetchData();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCurso(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const cursoData = {
        ...curso,
        profesor: curso.profesorId ? { id: curso.profesorId } : null,
        categoria: curso.categoriaId ? { id: curso.categoriaId } : null
      };

      if (id) {
        await axios.put(`http://localhost:8080/cursos/edit/${id}`, cursoData);
      } else {
        await axios.post('http://localhost:8080/cursos/save', cursoData);
      }
      navigate('/cursos');
    } catch (error) {
      console.error('Error guardando curso:', error);
    }
  };

  return (
    <div className="curso-form-container">
      <h2>{id ? 'Editar Curso' : 'Nuevo Curso'}</h2>
      <form onSubmit={handleSubmit} className="curso-form">
        <div className="form-group">
          <label>Nombre:</label>
          <input
            type="text"
            name="nombre"
            value={curso.nombre}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Descripción:</label>
          <textarea
            name="descripcion"
            value={curso.descripcion}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>Fecha de Inicio:</label>
            <input
              type="date"
              name="fechaInicio"
              value={curso.fechaInicio}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Fecha Final:</label>
            <input
              type="date"
              name="fechaFinal"
              value={curso.fechaFinal}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <div className="form-group">
          <label>URL de la Imagen:</label>
          <input
            type="url"
            name="imagen"
            value={curso.imagen}
            onChange={handleChange}
            placeholder="https://ejemplo.com/imagen.jpg"
          />
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>Profesor:</label>
            <select
              name="profesorId"
              value={curso.profesorId}
              onChange={handleChange}
              required
            >
              <option value="">Seleccione un profesor</option>
              {profesores.map(profesor => (
                <option key={profesor.id} value={profesor.id}>
                  {profesor.nombre}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label>Categoría:</label>
            <select
              name="categoriaId"
              value={curso.categoriaId}
              onChange={handleChange}
              required
            >
              <option value="">Seleccione una categoría</option>
              {categorias.map(categoria => (
                <option key={categoria.id} value={categoria.id}>
                  {categoria.nombre}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="form-actions">
          <button type="submit" className="btn-submit">
            {id ? 'Actualizar Curso' : 'Crear Curso'}
          </button>
          <button 
            type="button" 
            onClick={() => navigate('/cursos')}
            className="btn-cancel"
          >
            Cancelar
          </button>
        </div>
      </form>
    </div>
  );
};

export default CursoForm;