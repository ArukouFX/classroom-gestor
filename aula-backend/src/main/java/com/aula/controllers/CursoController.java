package com.aula.controllers;

import com.aula.models.Curso;
import com.aula.services.CursoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/cursos")
public class CursoController {

    @Autowired
    private CursoService cursoService;

    // Listar todos los cursos
    @GetMapping
    public ResponseEntity<List<Curso>> listCursos() {
        List<Curso> cursos = cursoService.findAll();
        return new ResponseEntity<>(cursos, HttpStatus.OK);
    }

    // Obtener un curso por su ID
    @GetMapping("/{id}")
    public ResponseEntity<Curso> getCursoById(@PathVariable Long id) {
        Curso curso = cursoService.findById(id);
        if (curso != null) {
            return new ResponseEntity<>(curso, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    // Crear un nuevo curso
    @PostMapping
    public ResponseEntity<Curso> createCurso(@RequestBody Curso curso) {
        Curso savedCurso = cursoService.save(curso);
        return new ResponseEntity<>(savedCurso, HttpStatus.CREATED);
    }

    // Actualizar un curso existente
    @PutMapping("/{id}")
    public ResponseEntity<Curso> updateCurso(@PathVariable Long id, @RequestBody Curso curso) {
        Curso existingCurso = cursoService.findById(id);
        if (existingCurso != null) {
            curso.setId(id); // Asegúrate de que el ID sea el mismo
            Curso updatedCurso = cursoService.save(curso);
            return new ResponseEntity<>(updatedCurso, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    // Eliminar un curso
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteCurso(@PathVariable Long id) {
        Curso curso = cursoService.findById(id);
        if (curso != null) {
            cursoService.deleteById(id);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    // Buscar cursos por categoría
    @GetMapping("/categoria/{id}")
    public ResponseEntity<List<Curso>> cursosPorCategoria(@PathVariable Long id) {
        List<Curso> cursos = cursoService.findByCategoriaId(id);
        return new ResponseEntity<>(cursos, HttpStatus.OK);
    }

    // Buscar cursos por nombre
    @GetMapping("/buscar")
    public ResponseEntity<List<Curso>> buscarCursos(@RequestParam String nombre) {
        List<Curso> cursos = cursoService.findByNombreContaining(nombre);
        return new ResponseEntity<>(cursos, HttpStatus.OK);
    }

    // Obtener detalles de un curso
    @GetMapping("/detail/{id}")
    public ResponseEntity<Curso> detailCurso(@PathVariable Long id) {
        Curso curso = cursoService.findById(id);
        if (curso != null) {
            return new ResponseEntity<>(curso, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
}