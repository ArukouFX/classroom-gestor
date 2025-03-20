import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:8080', // URL de tu backend Spring Boot
});

export const getCursos = () => api.get('/cursos');
export const getCursoById = (id) => api.get(`/cursos/detail/${id}`);
export const createCurso = (curso) => api.post('/cursos/save', curso);
export const updateCurso = (id, curso) => api.put(`/cursos/edit/${id}`, curso);
export const deleteCurso = (id) => api.delete(`/cursos/delete/${id}`);