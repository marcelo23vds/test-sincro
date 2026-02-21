package com.marcelovieira.test_sincro.infrastructure.repository;

import com.marcelovieira.test_sincro.infrastructure.entities.Categoria;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CategoriaRepository extends JpaRepository<Categoria, Long> {
                                                        //<Entidade, TipoDoId>
}