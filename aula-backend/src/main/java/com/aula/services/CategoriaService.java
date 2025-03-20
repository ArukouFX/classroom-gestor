package com.aula.services;

import com.aula.models.Categoria;
import com.aula.repositories.CategoriaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CategoriaService {

    @Autowired
    private CategoriaRepository categoriaRepository;

    // Obtener todas las categorías
    public List<Categoria> findAll() {
        return categoriaRepository.findAll();
    }

    // Guardar o actualizar una categoría
    public Categoria save(Categoria categoria) {
        return categoriaRepository.save(categoria);
    }

    // Obtener una categoría por su ID
    public Categoria findById(Long id) {
        return categoriaRepository.findById(id).orElse(null);
    }

    // Eliminar una categoría por su ID
    public void deleteById(Long id) {
        categoriaRepository.deleteById(id);
    }
}