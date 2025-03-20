package com.aula;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@SpringBootApplication
public class AulaApplication {

	public static void main(String[] args) {
		SpringApplication.run(AulaApplication.class, args);
	}

	@Bean
	public WebMvcConfigurer corsConfigurer() {
		return new WebMvcConfigurer() {
			@Override
			public void addCorsMappings(CorsRegistry registry) {
				registry.addMapping("/**") // Permite CORS en todas las rutas
						.allowedOrigins("http://localhost:3000") // Permite solicitudes desde este origen (React)
						.allowedMethods("GET", "POST", "PUT", "DELETE") // Métodos permitidos
						.allowedHeaders("*") // Cabeceras permitidas
						.allowCredentials(true); // Permite credenciales (cookies, autenticación)
			}
		};
	}
}