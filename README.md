# Desafio técnico para vaga backend junior

**Introdução**
- A Cubos é especialista em tecnologia financeira, implementamos ideias que têm o desejo de inovar e otimizar os serviços do sistema financeiro. e para este desafio técnico vamos construir uma API com as principais funcionalidades de uma aplicação financeira.

# Rodando localmente

## Clone o projeto

```bash
  git clone git@github.com:Ronalt4cs/desafio-cubos.git
```

## Entre no diretório do projeto

```bash
  cd my-project
```

## Instale as dependências

```bash
  npm install
```

## Rode a imagem do docker

```bash
  npx prisma migrate dev
```

## Instale as migration do prisma

```bash
  npx prisma migrate dev
```

## Inicie o servidor

```bash
  npm run dev
```

## Variaveis de ambiente
  Exemplos no arquivo **.env.example**

 `DATABASE_URL`

 `JWT_SECRET`
 
 `NODE_ENV`
 
 `PORT`


## Rodando os testes unitário

```bash
  npm run test:watch
```
# Rotas desprotegidas

  - POST /people

    Objetivo: Realizar a criação de uma pessoa.

    Request:

    ```json
    {
      "name": "John Doe",
      "document": "123.456.789-00",
      "password": "password"
    }
    ```

    Response:

    ```json
    {
      "id": "4ca336a9-b8a5-4cc6-8ef8-a0a3b5b45ed7",
      "name": "John Doe",
      "document": "12345678900",
      "createdAt": "2022-08-01T14:30:41.203653",
      "updatedAt": "2022-08-01T14:30:41.203653"
    }
    ```

  - POST /login

    Objetivo: Realizar o login de uma pessoa.

    Request:

    ```json
    {
      "document": "12345678900",
      "password": "password"
    }
    ```

    Response:

    ```json
    {
      "token": "Bearer "
    }
    ```

# Rotas protegidas

  ### Atenção
  De agora em diante, as ações devem ser realizadas na pessoa/conta(s) da pessoa autenticada.
  Toda rota deve estar protegida. O token retornado do login deve ser enviado no header com o nome de `Authorization`.

  Exemplo:
    ```
    Authorization: Bearer {TOKEN_AQUI}
    ```

  - POST /accounts

    Objetivo: Realizar a criação de uma conta para uma pessoa.

    Request:

    ```json
    {
      "branch": "001",
      "account": "20333925",
    }
    ```

    Response:

    ```json
    {
      "id": "b0a0ec35-6161-4ebf-bb4f-7cf73cf6448f",
      "branch": "001",
      "account": "2033392-5",
      "createdAt": "2022-08-01T14:30:41.203653",
      "updatedAt": "2022-08-01T14:30:41.203653"
    }

  - GET /accounts

    Objetivo: Realizar a listagem de todas as contas da pessoa.

    Response:

    ```json
    {
      "cards": [
        {
          "id": "48bb7773-8ccc-4686-83f9-79581a5e5cd8",
          "branch": "001",
          "account": "2033392-5",
          "createdAt": "2022-08-01T14:30:41.203653",
          "updatedAt": "2022-08-01T14:30:41.203653"
        }
      ]
    }
    ```

  - POST /accounts/:accountId/cards

    Objetivo: Realizar a criação de um cartão em uma conta.

    Request:

    ```json
    {
      "type": "virtual",
      "number": "5179 7447 8594 6978",
      "cvv": "512"
    }
    ```

    Response:

    ```json
    {
      "id": "b0a0ec35-6161-4ebf-bb4f-7cf73cf6448f",
      "type": "virtual",
      "number": "6978",
      "cvv": "512",
      "createdAt": "2022-08-01T14:30:41.203653",
      "updatedAt": "2022-08-01T14:30:41.203653"
    }
    ```

  - GET /accounts/:accountId/cards

    Objetivo: Realizar a listagem de todos os cartões de uma conta.\

    Response:

    ```json
    {
      "cards": [
        {
          "id": "05a0ab2d-5ece-45b6-b7d3-f3ecce2713d5",
          "type": "physical",
          "number": "5978",
          "cvv": "231",
          "createdAt": "2022-08-01T14:30:41.203653",
          "updatedAt": "2022-08-01T14:30:41.203653"
        },
        {
          "id": "b0a0ec35-6161-4ebf-bb4f-7cf73cf6448f",
          "type": "virtual",
          "number": "1325",
          "cvv": "512",
          "createdAt": "2022-08-01T14:30:41.203653",
          "updatedAt": "2022-08-01T14:30:41.203653"
        }
      ]
    }
    ```

  - GET /accounts/cards

    Objetivo: Realizar a listagem de todos os cartões de uma pessoa.

    Response:

    ```json
    {
      "cards": [
        {
          "id": "05a0ab2d-5ece-45b6-b7d3-f3ecce2713d5",
          "type": "physical",
          "number": "0423",
          "cvv": "231",
          "createdAt": "2022-08-01T14:30:41.203653",
          "updatedAt": "2022-08-01T14:30:41.203653"
        },
        {
          "id": "b0a0ec35-6161-4ebf-bb4f-7cf73cf6448f",
          "type": "virtual",
          "number": "6978",
          "cvv": "512",
          "createdAt": "2022-08-01T14:30:41.203653",
          "updatedAt": "2022-08-01T14:30:41.203653"
        }
      ]
    }
    ```

  - POST /accounts/:accountId/transactions

    Objetivo: Realizar a criação de uma transação em uma conta. Uma transação pode ser de débito ou crédito.

    Request:

    ```json
    {
      "type": "credit",
      "value": 100.00,
      "description": "Pizzaria São Tomé"
    }
    ```

    Response:

    ```json
    {
      "id": "05a0ab2d-5ece-45b6-b7d3-f3ecce2713d5",
      "value": 100.00,
      "type": "credit",
      "description": "Calça Jeans",
      "createdAt": "2022-08-01T14:30:41.203653",
      "updatedAt": "2022-08-01T14:30:41.203653"
    }
    ```

  - GET /accounts/:accountId/transactions

    Response:

    ```json
    {
      "transactions": [
        {
          "id": "05a0ab2d-5ece-45b6-b7d3-f3ecce2713d5",
          "value": 100.00,
          "description": "Pagamento João",
          "createdAt": "2022-08-01T14:30:41.203653",
          "updatedAt": "2022-08-01T14:30:41.203653"
        }
      ]
    }
    ```

  - GET /accounts/:accountId/balance

    Objetivo: Retorna o saldo de uma conta.

    Response:

    ```json
    {
      "balance": 100.00
    }
    ```

  - POST /accounts/:accountId/transactions/:transactionId/revert [Opcional]

    Objetivo: Realizar a reversão de uma transação. A ação inversa deve ser realizada: caso a transação seja de crédito, deve ser feito um débito e vice-versa.
    Request:

    ```json
    {
      "description": "Estorno de cobrança indevida"
    }
    ```

    Response:
    ```json
    {
      "id": "092ec73f-d7c3-4afb-bac0-9c7e8eb33eae",
      "value": 100.00,
      "description": "Estorno de cobrança indevida.",
      "createdAt": "2022-08-01T14:30:41.203653",
      "updatedAt": "2022-08-01T14:30:41.203653"
    }
    ```

## Stack utilizada

Node, Express, Prisma, Vistest, Docker
