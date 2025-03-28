import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const CursoList = () => {
    const [cursos, setCursos] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchCursos = async () => {
            try {
                const response = await axios.get('http://localhost:8080/cursos');
                setCursos(response.data);
            } catch (error) {
                console.error('Error fetching cursos:', error);
            }
        };
        fetchCursos();
    }, []);

    return (
        <div>
            <h1 style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                Lista de Cursos
                <button 
                    onClick={() => navigate('/cursos/nuevo')}
                    style={{
                        backgroundColor: '#4CAF50',
                        color: 'white',
                        border: 'none',
                        padding: '8px 16px',
                        borderRadius: '4px',
                        cursor: 'pointer',
                        fontSize: '1rem'
                    }}
                >
                    + Agregar Curso
                </button>
            </h1>
            <ul>
                {cursos.map((curso) => (
                    <li key={curso.id}>
                        <Link to={`/cursos/detail/${curso.id}`}>{curso.nombre}</Link>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default CursoList;