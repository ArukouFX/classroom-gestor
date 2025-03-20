package com.aula.services;

import com.aula.models.Curso;
import com.aula.repositories.CursoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CursoService {

    @Autowired
    private CursoRepository cursoRepository;

    // Obtener todos los cursos
    public List<Curso> findAll() {
        return cursoRepository.findAll();
    }

    // Guardar o actualizar un curso
    public Curso save(Curso curso) {
        return cursoRepository.save(curso);
    }

    // Obtener un curso por su ID
    public Curso findById(Long id) {
        return cursoRepository.findById(id).orElse(null);
    }

    // Eliminar un curso por su ID
    public void deleteById(Long id) {
        cursoRepository.deleteById(id);
    }

    // Buscar cursos por categoría
    public List<Curso> findByCategoriaId(Long categoriaId) {
        return cursoRepository.findByCategoriaId(categoriaId);
    }

    // Buscar cursos por nombre (búsqueda parcial)
    public List<Curso> findByNombreContaining(String nombre) {
        return cursoRepository.findByNombreContaining(nombre);
    }
}