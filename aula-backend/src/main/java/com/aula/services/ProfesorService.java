package com.aula.services;

import com.aula.models.Profesor;
import com.aula.repositories.ProfesorRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProfesorService {

    @Autowired
    private ProfesorRepository profesorRepository;

    // Obtener todos los profesores
    public List<Profesor> findAll() {
        return profesorRepository.findAll();
    }

    // Guardar o actualizar un profesor
    public Profesor save(Profesor profesor) {
        return profesorRepository.save(profesor);
    }

    // Obtener un profesor por su ID
    public Profesor findById(Long id) {
        return profesorRepository.findById(id).orElse(null);
    }

    // Eliminar un profesor por su ID
    public void deleteById(Long id) {
        profesorRepository.deleteById(id);
    }
}