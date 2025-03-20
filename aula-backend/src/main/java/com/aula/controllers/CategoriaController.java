package com.aula.controllers;

import com.aula.models.Categoria;
import com.aula.services.CategoriaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/categorias")
public class CategoriaController {

    @Autowired
    private CategoriaService categoriaService;

    // Listar todas las categorías
    @GetMapping
    public ResponseEntity<List<Categoria>> listCategorias() {
        List<Categoria> categorias = categoriaService.findAll();
        return new ResponseEntity<>(categorias, HttpStatus.OK);
    }

    // Obtener una categoría por su ID
    @GetMapping("/{id}")
    public ResponseEntity<Categoria> getCategoriaById(@PathVariable Long id) {
        Categoria categoria = categoriaService.findById(id);
        if (categoria != null) {
            return new ResponseEntity<>(categoria, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    // Crear una nueva categoría
    @PostMapping
    public ResponseEntity<Categoria> createCategoria(@RequestBody Categoria categoria) {
        Categoria savedCategoria = categoriaService.save(categoria);
        return new ResponseEntity<>(savedCategoria, HttpStatus.CREATED);
    }

    // Actualizar una categoría existente
    @PutMapping("/{id}")
    public ResponseEntity<Categoria> updateCategoria(@PathVariable Long id, @RequestBody Categoria categoria) {
        Categoria existingCategoria = categoriaService.findById(id);
        if (existingCategoria != null) {
            categoria.setId(id); // Asegúrate de que el ID sea el mismo
            Categoria updatedCategoria = categoriaService.save(categoria);
            return new ResponseEntity<>(updatedCategoria, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    // Eliminar una categoría
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteCategoria(@PathVariable Long id) {
        Categoria categoria = categoriaService.findById(id);
        if (categoria != null) {
            categoriaService.deleteById(id);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
}