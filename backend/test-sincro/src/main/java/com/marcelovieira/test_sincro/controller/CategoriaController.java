package com.marcelovieira.test_sincro.controller;

import com.marcelovieira.test_sincro.infrastructure.entities.Categoria;
import com.marcelovieira.test_sincro.services.CategoriaService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/categories")
@RequiredArgsConstructor
public class CategoriaController {

    private final CategoriaService categoriaService;

    @PostMapping
    public ResponseEntity<Categoria> create(@RequestBody Categoria categoria) {
        Categoria novaCategoria = categoriaService.save(categoria);
        return ResponseEntity.status(HttpStatus.CREATED).body(novaCategoria); // Retorna 201 Created
    }

    @GetMapping
    public ResponseEntity<List<Categoria>> findAll() {
        return ResponseEntity.ok(categoriaService.findAll()); // Retorna 200 OK
    }

    @GetMapping("/{id}")
    public ResponseEntity<Categoria> findById(@PathVariable Long id) {
        return ResponseEntity.ok(categoriaService.findById(id)); // Retorna 200 OK
    }

    @PutMapping("/{id}")
    public ResponseEntity<Categoria> update(@PathVariable Long id, @RequestBody Categoria categoria) {
        return ResponseEntity.ok(categoriaService.update(id, categoria)); // Retorna 200 OK
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        categoriaService.delete(id);
        return ResponseEntity.noContent().build(); // Retorna 204 No Content
    }
}