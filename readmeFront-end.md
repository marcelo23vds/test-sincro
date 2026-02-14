# Front-end — Angular ou React/Next.js

## 🎯 Missão
Criar as interfaces de usuário para gerenciar **Categorias** e **Itens** de inventário.

**Você pode escolher:** Angular ou React com Next.js

## 📊 Relacionamento dos Dados
**1 Categoria → N Itens**  
- Uma categoria pode ter vários itens
- Um item pertence a apenas uma categoria (obrigatório)

## 🎨 Telas Necessárias

### Categorias
- **Lista de Categorias** - Exibir todas, com botões de editar e deletar
- **Formulário Categoria** - Criar/editar (nome, descrição)
- **Detalhes da Categoria** - Mostrar dados + lista de itens vinculados

### Itens
- **Lista de Itens** - Exibir todos com suas categorias, com filtro por categoria
- **Formulário Item** - Criar/editar (nome, SKU, quantidade, preço, status, dropdown de categoria)
- **Detalhes do Item** - Mostrar dados + categoria associada

## ✅ Requisitos Importantes

### Validações
- Categoria é obrigatória ao cadastrar/editar item
- Campos obrigatórios: nome, SKU, quantidade, preço
- Mensagens de erro claras e amigáveis

### UX
- Confirmação antes de deletar
- Loading durante requisições
- Mensagens de sucesso/erro após operações
- Interface responsiva

### Integração
- Consumir APIs REST do backend (http://localhost:8080/api)
- Services/hooks para categorias e itens
- Tratamento de erros da API

## 🔧 Stack Técnica

**Opção 1 - Angular:**
- Angular 19+
- TypeScript
- Node.js 18+
- Angular CLI

**Opção 2 - React/Next.js:**
- React 18+
- Next.js 15+
- TypeScript
- Node.js 18+

## 📦 Entrega
1. Fork este repositório
2. Implemente as interfaces
3. Envie o link do seu repo


https://inventario-mea3kquj.manus.space/items
O Design das Interfaces se encontra na pasta imgs