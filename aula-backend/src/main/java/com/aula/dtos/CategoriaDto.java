package com.aula.dtos;

import jakarta.validation.constraints.NotBlank;

public record CategoriaDto(@NotBlank Long id, @NotBlank String nombre) {
}
