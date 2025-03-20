package com.aula.controllers;

import com.aula.models.Profesor;
import com.aula.services.ProfesorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/profesores")
public class ProfesorController {

    @Autowired
    private ProfesorService profesorService;

    // Listar todos los profesores
    @GetMapping
    public ResponseEntity<List<Profesor>> listProfesores() {
        List<Profesor> profesores = profesorService.findAll();
        return new ResponseEntity<>(profesores, HttpStatus.OK);
    }

    // Obtener un profesor por su ID
    @GetMapping("/{id}")
    public ResponseEntity<Profesor> getProfesorById(@PathVariable Long id) {
        Profesor profesor = profesorService.findById(id);
        if (profesor != null) {
            return new ResponseEntity<>(profesor, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    // Crear un nuevo profesor
    @PostMapping
    public ResponseEntity<Profesor> createProfesor(@RequestBody Profesor profesor) {
        Profesor savedProfesor = profesorService.save(profesor);
        return new ResponseEntity<>(savedProfesor, HttpStatus.CREATED);
    }

    // Actualizar un profesor existente
    @PutMapping("/{id}")
    public ResponseEntity<Profesor> updateProfesor(@PathVariable Long id, @RequestBody Profesor profesor) {
        Profesor existingProfesor = profesorService.findById(id);
        if (existingProfesor != null) {
            profesor.setId(id); // Asegúrate de que el ID sea el mismo
            Profesor updatedProfesor = profesorService.save(profesor);
            return new ResponseEntity<>(updatedProfesor, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    // Eliminar un profesor
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteProfesor(@PathVariable Long id) {
        Profesor profesor = profesorService.findById(id);
        if (profesor != null) {
            profesorService.deleteById(id);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
}