import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:8080', // URL de tu backend Spring Boot
});

// Endpoints para Cursos (ya existentes)
export const getCursos = () => api.get('/cursos');
export const getCursoById = (id) => api.get(`/cursos/detail/${id}`);
export const createCurso = (curso) => api.post('/cursos/save', curso);
export const updateCurso = (id, curso) => api.put(`/cursos/edit/${id}`, curso);
export const deleteCurso = (id) => api.delete(`/cursos/delete/${id}`);

// Endpoints para Categorías
export const getCategorias = () => api.get('/categorias');
export const getCategoriaById = (id) => api.get(`/categorias/${id}`);
export const createCategoria = (categoria) => api.post('/categorias/save', categoria);
export const updateCategoria = (id, categoria) => api.put(`/categorias/edit/${id}`, categoria);
export const deleteCategoria = (id) => api.delete(`/categorias/delete/${id}`);

// Endpoints para Profesores
export const getProfesores = () => api.get('/profesores');
export const getProfesorById = (id) => api.get(`/profesores/${id}`);
export const createProfesor = (profesor) => api.post('/profesores/save', profesor);
export const updateProfesor = (id, profesor) => api.put(`/profesores/edit/${id}`, profesor);
export const deleteProfesor = (id) => api.delete(`/profesores/delete/${id}`)