package com.aula.dtos;

import jakarta.validation.constraints.NotBlank;

public record ProfesorDto (@NotBlank long id, @NotBlank String nombre, @NotBlank String apellido, @NotBlank String email, @NotBlank String foto) {
}
