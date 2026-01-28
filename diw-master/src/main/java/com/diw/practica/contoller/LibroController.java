package com.diw.practica.contoller;

import org.springframework.web.bind.annotation.*;
import java.time.LocalDateTime;
import java.util.*;

@RestController
@RequestMapping("/api/libros")
@CrossOrigin(origins = "http://localhost:5173")
public class LibroController {

    private List<Map<String, Object>> libros = new ArrayList<>();
    private long nextId = 1;

    public LibroController() {
        agregarLibro("Cien años de soledad", "Gabriel García Márquez");
        agregarLibro("Don Quijote", "Miguel de Cervantes");
        agregarLibro("1984", "George Orwell");
    }

    private void agregarLibro(String titulo, String autor) {
        Map<String, Object> libro = new HashMap<>();
        libro.put("id", nextId++);
        libro.put("titulo", titulo);
        libro.put("autor", autor);
        libro.put("fechaCreacion", LocalDateTime.now().toString());
        libros.add(libro);
    }

    @GetMapping
    public List<Map<String, Object>> getAllLibros() {
        return libros;
    }

    @PostMapping
    public Map<String, Object> createLibro(@RequestBody Map<String, String> libro) {
        Map<String, Object> nuevoLibro = new HashMap<>();
        nuevoLibro.put("id", nextId++);
        nuevoLibro.put("titulo", libro.get("titulo"));
        nuevoLibro.put("autor", libro.get("autor"));
        nuevoLibro.put("fechaCreacion", LocalDateTime.now().toString());
        libros.add(nuevoLibro);
        return nuevoLibro;
    }

    @PutMapping("/{id}")
    public Map<String, Object> updateLibro(@PathVariable Long id, @RequestBody Map<String, String> libro) {
        return libros.stream()
                .filter(l -> id.equals(l.get("id")))
                .findFirst()
                .map(l -> {
                    l.put("titulo", libro.get("titulo"));
                    l.put("autor", libro.get("autor"));
                    return l;
                })
                .orElseThrow(() -> new RuntimeException("Libro no encontrado"));
    }

    @DeleteMapping("/{id}")
    public Map<String, String> deleteLibro(@PathVariable Long id) {
        libros.removeIf(libro -> id.equals(libro.get("id")));
        Map<String, String> response = new HashMap<>();
        response.put("message", "Libro eliminado");
        return response;
    }
}