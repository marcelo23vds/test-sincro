# Teste Interno — Gestão de Inventário (CRUD)

## Objetivo
Validar o CRUD de itens de inventário (cadastrar, visualizar, editar e deletar) em uma solução Java/Spring Boot (backend) e Angular (frontend).

## Link
- https://3000-i7r5ytgk4s30wy5fkr18z-277723e1.us2.manus.computer/items


## Escopo
**Será testado**
- Backend (Spring Boot): APIs REST para CRUD de itens
- Frontend (Angular): telas de listagem, cadastro, detalhe, edição e exclusão
- Validações de campos obrigatórios e mensagens de erro

## Pré-requisitos
- Java 21+ e Maven/Gradle configurados
- Node.js 18+ e Angular CLI
- Banco de dados local (PostgreSQL) configurado
- Acesso ao repositório e permissões de execução

## Ambiente
- Tipo: Desenvolvimento local
- Backend: http://localhost:8080
- Frontend: http://localhost:4200
- Build/Versão: [preencher]

## Dados de Teste (exemplo)
- Item A: "Cadeira Escritório", SKU "CAD-001", Quantidade 10, Preço 99,99, Status Ativo
- Item B: "Mesa Reunião", SKU "MES-002", Quantidade 3, Preço 899,90, Status Ativo

## Plano de Teste
### Casos de Teste — Backend (Spring Boot)
| ID | Cenário | Endpoint | Passos (resumo) | Resultado Esperado | Status |
|---|---|---|---|---|---|
| BE-001 | Cadastrar item | POST /api/items | Enviar payload válido | 201 Created, item persistido | Pendente |
| BE-002 | Listar itens | GET /api/items | Consultar lista | 200 OK, lista paginada | Pendente |
| BE-003 | Buscar item | GET /api/items/{id} | Consultar ID existente | 200 OK, item correto | Pendente |
| BE-004 | Editar item | PUT /api/items/{id} | Atualizar campos | 200 OK, item atualizado | Pendente |
| BE-005 | Deletar item | DELETE /api/items/{id} | Remover item | 204 No Content | Pendente |
| BE-006 | Validação obrigatória | POST /api/items | Enviar payload incompleto | 400 Bad Request, erros de validação | Pendente |

### Casos de Teste — Frontend (Angular)
| ID | Cenário | Tela | Passos (resumo) | Resultado Esperado | Status |
|---|---|---|---|---|---|
| FE-001 | Cadastrar item | Novo Item | Preencher e salvar | Item criado e exibido na lista | Pendente |
| FE-002 | Visualizar item | Detalhe | Abrir item existente | Dados corretos exibidos | Pendente |
| FE-003 | Editar item | Edição | Alterar e salvar | Item atualizado na lista | Pendente |
| FE-004 | Deletar item | Lista | Excluir item | Item removido da lista | Pendente |
| FE-005 | Validação UI | Formulário | Enviar sem obrigatórios | Mensagens de validação | Pendente |

### Critérios de Aceite
- CRUD completo funcionando no backend e frontend
- Validações obrigatórias consistentes entre UI e API
- Mensagens de erro amigáveis ao usuário

### Critérios de Saída
- 100% dos casos críticos aprovados
- Nenhum defeito bloqueante aberto

## Evidências
- Prints/logs: [local/links]
- Relatório: [link ou caminho]

## Entrega
1. Faça um fork deste repositório
2. Implemente a solução
3. Envie o link do seu repositório# test-sincro
