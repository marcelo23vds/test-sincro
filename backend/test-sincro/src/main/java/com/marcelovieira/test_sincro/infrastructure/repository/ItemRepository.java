package com.marcelovieira.test_sincro.infrastructure.repository;

import com.marcelovieira.test_sincro.infrastructure.entities.Item;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ItemRepository extends JpaRepository<Item, Long> {
                                                //<Entidade, TipoDoId>

    //para filtrar os itens de uma categoria especifica
    //"findByCategoriaId" vai gerar "SELECT * FROM tb_item WHERE categoria_id = X"
    List<Item> findByCategoriaId(Long categoriaId);
}