package com.marcelovieira.test_sincro.services;

import com.marcelovieira.test_sincro.infrastructure.entities.Categoria;
import com.marcelovieira.test_sincro.infrastructure.repository.CategoriaRepository;
import com.marcelovieira.test_sincro.infrastructure.repository.ItemRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@Service
@RequiredArgsConstructor
public class CategoriaService {

    //dependencias
    private final CategoriaRepository categoriaRepository;
    private final ItemRepository itemRepository;

    //buscar todas as categorias que existem no banco de dados
    public List<Categoria> findAll() {
        return categoriaRepository.findAll();
    }

    //busca categoria por ID
    public Categoria findById(Long id) {
        return categoriaRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Categoria não encontrada!"));
    }

    //criar nova categoria
    public Categoria save(Categoria categoria) {
        validarCamposObrigatorios(categoria);
        return categoriaRepository.save(categoria);
    }

    // Atualiza os dados de uma categoria
    public Categoria update(Long id, Categoria categoriaAtualizada) {

        // verificar se a categoria existe no banco (se não existir,  erro 404)
        Categoria categoria = findById(id);

        // valida os dados novos que foram enviados (no caso de categoria apenas verificar se não estão vazio)
        validarCamposObrigatorios(categoriaAtualizada);

        // Pega os dados antigos e substitui pelos novos
        categoria.setNome(categoriaAtualizada.getNome());
        categoria.setDescricao(categoriaAtualizada.getDescricao());

        return categoriaRepository.save(categoria);
    }

    // deletar categoria
    public void delete(Long id) {
        //verifica se a categoria existe
        Categoria categoria = findById(id);

        // ItemRepository para buscar se existe algum item vinculado a esta categoria
        // .isEmpty() com "!" na frente para inverter, então é o mesmo que verificar se NÃO está vazia
        boolean possuiItens = !itemRepository.findByCategoriaId(id).isEmpty();
        // "Se a lista NÃO estiver vazia então NÃO deve permitir deletar"
        if (possuiItens) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Erro 400: Não é possível excluir uma categoria que possui itens vinculados!");
        }

        categoriaRepository.delete(categoria);
    }

    // Validações

    private void validarCamposObrigatorios(Categoria categoria) {
        if (categoria.getNome() == null || categoria.getNome().trim().isEmpty()) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "O nome da categoria é obrigatório!");
        }
        if (categoria.getDescricao() == null || categoria.getDescricao().trim().isEmpty()) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "A descrição da categoria é obrigatória!");
        }
    }
}