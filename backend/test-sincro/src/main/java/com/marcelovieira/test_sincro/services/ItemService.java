package com.marcelovieira.test_sincro.services;

import com.marcelovieira.test_sincro.infrastructure.entities.Categoria;
import com.marcelovieira.test_sincro.infrastructure.entities.Item;
import com.marcelovieira.test_sincro.infrastructure.repository.ItemRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ItemService {

    //dependencias
    private final ItemRepository itemRepository;
    private final CategoriaService categoriaService;

    //buscar todos os itens do banco de dados
    public List<Item> findAll() {
        return itemRepository.findAll();
    }

    //buscar itens filtrando pelo ID da categoria
    public List<Item> findByCategoriaId(Long categoriaId) {
        // Se a categoria não existir, o metodo findById do CategoriaService vai retornar Erro 404
        categoriaService.findById(categoriaId);
        return itemRepository.findByCategoriaId(categoriaId);
    }

    //buscar um item pelo ID dele
    public Item findById(Long id) {
        return itemRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Item não encontrado"));
    }

    // cria um novo item no banco de dados (apos passar pelas validações)
    public Item save(Item item) {
        validarCamposObrigatorios(item);
        validarCategoria(item);
        return itemRepository.save(item);
    }

    //atualiza um item existente
    public Item update(Long id, Item itemAtualizado) {

        // verificar se o item existe no banco (se não existir,  erro 404)
        Item item = findById(id);

        // valida os dados novos que foram enviados
        validarCamposObrigatorios(itemAtualizado);
        validarCategoria(itemAtualizado);

        // Pega os dados antigos e substitui pelos novos
        item.setNome(itemAtualizado.getNome());
        item.setSku(itemAtualizado.getSku());
        item.setQuantidade(itemAtualizado.getQuantidade());
        item.setPreco(itemAtualizado.getPreco());
        item.setStatus(itemAtualizado.getStatus());
        item.setCategoria(itemAtualizado.getCategoria());

        return itemRepository.save(item);
    }

    //verifica se o item existe e deleta
    public void delete(Long id) {
        Item item = findById(id);
        itemRepository.delete(item);
    }

    //validações

    private void validarCategoria(Item item) {
        if (item.getCategoria() == null || item.getCategoria().getId() == null) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "A categoria do item é obrigatória!");
        }
        try {
            Categoria categoriaExistente = categoriaService.findById(item.getCategoria().getId());
            item.setCategoria(categoriaExistente);
        } catch (ResponseStatusException e) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Erro 400: Categoria inexistente!");
        }
    }

    private void validarCamposObrigatorios(Item item) {
        if (item.getNome() == null || item.getNome().trim().isEmpty()) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "O nome do item é obrigatório!");
        }
        if (item.getSku() == null || item.getSku().trim().isEmpty()) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "O SKU do item é obrigatório!");
        }
        if (item.getPreco() == null || item.getPreco().doubleValue() < 0) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "O preço não pode ser null ou negativo!");
        }
        if (item.getQuantidade() == null || item.getQuantidade() < 0) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "A quantidade não pode ser null ou negativa!");
        }
        if (item.getStatus() == null) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "O status do item é obrigatório! (ATIVO ou INATIVO)");
        }
    }
}