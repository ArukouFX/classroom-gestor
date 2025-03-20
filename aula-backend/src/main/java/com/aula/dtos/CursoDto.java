package com.aula.dtos;

import jakarta.validation.constraints.NotBlank;
import java.time.LocalDate;

public record CursoDto(
        @NotBlank Long id,
        @NotBlank String nombre,
        @NotBlank String descripcion,
        @NotBlank LocalDate fechaInicio,
        @NotBlank LocalDate fechaFinal,
        @NotBlank String imagen,
        Long profesorId, // Solo el ID del profesor
        String profesorNombre, // Solo el nombre del profesor
        Long categoriaId, // Solo el ID de la categoría
        String categoriaNombre // Solo el nombre de la categoría
) {}