import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const CursoList = () => {
    const [cursos, setCursos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchCursos = async () => {
            try {
                const response = await axios.get('http://localhost:8080/cursos');
                setCursos(response.data);
            } catch (error) {
                console.error('Error fetching cursos:', error);
                setError(error);
            } finally {
                setLoading(false);
            }
        };
        fetchCursos();
    }, []);

    const handleDelete = async (id) => {
        if (window.confirm('¿Estás seguro de eliminar este curso?')) {
            try {
                await axios.delete(`http://localhost:8080/cursos/delete/${id}`);
                setCursos(cursos.filter(curso => curso.id !== id));
            } catch (error) {
                console.error('Error eliminando curso:', error);
            }
        }
    };

    if (loading) return <div>Cargando cursos...</div>;
    if (error) return <div>Error al cargar los cursos</div>;

    return (
        <div className="curso-list-container">
            <h1 style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                Lista de Cursos
                <button 
                    onClick={() => navigate('/cursos/nuevo')}
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
                    + Agregar Curso
                </button>
            </h1>
            
            <div className="curso-grid">
                {cursos.map((curso) => (
                    <div key={curso.id} className="curso-card">
                        <div className="curso-info">
                            <h3>
                                <Link to={`/cursos/detail/${curso.id}`}>{curso.nombre}</Link>
                            </h3>
                            <p className="curso-descripcion">{curso.descripcion.substring(0, 100)}...</p>
                            <div className="curso-meta">
                                <span>Inicia: {new Date(curso.fechaInicio).toLocaleDateString()}</span>
                                <span>Finaliza: {new Date(curso.fechaFinal).toLocaleDateString()}</span>
                            </div>
                        </div>
                        <div className="curso-actions">
                            <button 
                                onClick={() => navigate(`/cursos/editar/${curso.id}`)}
                                className="btn-edit"
                            >
                                Editar
                            </button>
                            <button 
                                onClick={() => handleDelete(curso.id)}
                                className="btn-delete"
                            >
                                Eliminar
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CursoList;