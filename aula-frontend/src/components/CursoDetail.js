import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';

const CursoDetail = () => {
    const { id } = useParams();
    const [curso, setCurso] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchCurso = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/cursos/detail/${id}`);
                setCurso(response.data);
            } catch (error) {
                console.error('Error fetching curso details:', error);
                setError(error);
            } finally {
                setLoading(false);
            }
        };
        fetchCurso();
    }, [id]);

    if (loading) return <div>Cargando...</div>;
    if (error) return <div>Error al cargar los detalles del curso.</div>;
    if (!curso) return <div>Curso no encontrado.</div>;

    return (
        <div>
            <h1>{curso.nombre}</h1>
            <p>{curso.descripcion}</p>
            <p>Fecha de Inicio: {curso.fechaInicio}</p>
            <p>Fecha Final: {curso.fechaFinal}</p>
            <img src={curso.imagen} alt={curso.nombre} width="100" />
            {curso.profesor && <p>Profesor: {curso.profesor.nombre}</p>}
            {curso.categoria && <p>Categoría: {curso.categoria.nombre}</p>}
            <Link to="/">Volver a la lista</Link>
        </div>
    );
};

export default CursoDetail;