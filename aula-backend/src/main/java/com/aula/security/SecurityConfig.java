package com.aula.security;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
public class SecurityConfig {

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
                .authorizeHttpRequests(auth -> auth
                        .requestMatchers("/cursos/**",
                                         "/profesores/**",
                                         "/categorias/**"
                                ).permitAll() // Permite acceso sin autenticación
                        .anyRequest().authenticated() // El resto requiere autenticación
                )
                .csrf(csrf -> csrf.disable()) // Deshabilita CSRF (solo si es una API REST)
                .cors(cors -> cors.configurationSource(request -> {
                    var corsConfig = new org.springframework.web.cors.CorsConfiguration();
                    corsConfig.addAllowedOrigin("http://localhost:3000"); // Origen de React
                    corsConfig.addAllowedMethod("*"); // GET, POST, etc.
                    corsConfig.addAllowedHeader("*");
                    return corsConfig;
                }));

        return http.build();
    }
}