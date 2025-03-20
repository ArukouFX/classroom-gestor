import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const CursoList = () => {
    const [cursos, setCursos] = useState([]);

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
            <h1>Lista de Cursos</h1>
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