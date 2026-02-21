# API REST - Gestão de Inventário

API REST desenvolvida em **Java 21** e **Spring Boot** para o gerenciamento de Categorias e Itens de um inventário.

## Tecnologias Utilizadas
* **Java 21**
* **Spring Boot**
* **PostgreSQL**
* **Maven**

## Estrutura e Arquitetura

A aplicação foi estruturada focando na separação de responsabilidades:
* **Controllers:** Responsáveis por receber as requisições HTTP e retornar os Status Codes corretos.
* **Services:** Regras de negócio (por exemplo: impedir a exclusão de categorias com itens vinculados).
* **Entities/Repositories:** Persistência e comunicação com o banco de dados usando Spring Data JPA.

---

## Como rodar o projeto localmente

### 1. Pré-requisito: Banco de Dados
A aplicação utiliza o **PostgreSQL**. Certifique-se de tê-lo rodando localmente na porta `5432` com as seguintes credenciais (ou altere no arquivo `application.properties` caso necessário):

* **Database:** `inventario_db`
* **Username:** `postgres`
* **Password:** `bcd127`

> **Nota:** Não é necessário rodar scripts de criação de tabelas. O Spring Data JPA (Hibernate) vai gerar o banco de dados automaticamente ao iniciar a aplicação.

### 2. Iniciando a API
Após garantir que o banco de dados está ok, inicie a aplicação via IDE (executando a classe principal).

A API estará disponível em: `http://localhost:8080` (ou altere a porta no arquivo `application.properties` caso necessário)

---

## Endpoints da API

### Categorias (`/api/categories`)
* `POST /api/categories` - Cria uma nova categoria
* `GET /api/categories` - Lista todas as categorias
* `GET /api/categories/{id}` - Busca uma categoria pelo ID
* `PUT /api/categories/{id}` - Atualiza uma categoria existente
* `DELETE /api/categories/{id}` - Deleta uma categoria

### Itens (`/api/items`)
* `POST /api/items` - Cria um novo item.
* `GET /api/items` - Lista todos os itens
* `GET /api/items/{id}` - Busca um item pelo ID
* `PUT /api/items/{id}` - Atualiza um item existente.
* `DELETE /api/items/{id}` - Deleta um item.
* `GET /api/items?categoriaId={id}` - Filtra os itens por uma categoria específica

---

## Documentação e Testes

A documentação completa das rotas com exemplos de requisições e respostas pode ser acessada através do Postman:

**[Acessar Documentação no Postman](https://documenter.getpostman.com/view/48074793/2sBXcEkLWC)**

## Autor

[Marcelo Vieira](<https://www.linkedin.com/in/marcelovieirasilva/>)