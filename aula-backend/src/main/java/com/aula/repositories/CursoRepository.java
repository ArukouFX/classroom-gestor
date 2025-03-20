package com.aula.repositories;

import com.aula.models.Curso;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CursoRepository extends JpaRepository<Curso, Long> {
    // Buscar cursos por categoría
    List<Curso> findByCategoriaId(Long categoriaId);

    // Buscar cursos por nombre (búsqueda parcial)
    List<Curso> findByNombreContaining(String nombre);
}