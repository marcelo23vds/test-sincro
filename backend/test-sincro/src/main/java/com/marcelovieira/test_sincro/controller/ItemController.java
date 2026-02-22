package com.marcelovieira.test_sincro.controller;

import com.marcelovieira.test_sincro.infrastructure.entities.Item;
import com.marcelovieira.test_sincro.services.ItemService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/items")
@CrossOrigin("*")
@RequiredArgsConstructor
public class ItemController {

    private final ItemService itemService;

    @PostMapping
    public ResponseEntity<Item> create(@RequestBody Item item) {
        Item novoItem = itemService.save(item);
        return ResponseEntity.status(HttpStatus.CREATED).body(novoItem); // Retorna 201 Created
    }

    @GetMapping
    public ResponseEntity<List<Item>> find(
            @RequestParam(required = false) Long categoriaId) {

        // SE a URL tiver "?categoriaId=1", lista filtrando por categoria, se não lista todos
        if (categoriaId != null) {
            return ResponseEntity.ok(itemService.findByCategoriaId(categoriaId));
        } else {
            return ResponseEntity.ok(itemService.findAll());
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<Item> findById(@PathVariable Long id) {
        return ResponseEntity.ok(itemService.findById(id)); // Retorna 200 OK
    }

    @PutMapping("/{id}")
    public ResponseEntity<Item> update(@PathVariable Long id, @RequestBody Item item) {
        return ResponseEntity.ok(itemService.update(id, item)); // Retorna 200 OK
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        itemService.delete(id);
        return ResponseEntity.noContent().build(); // Retorna 204 No Content
    }
}