# Paginação

Todo endpoint de listagem de uma entidade deve ser paginado, seguindo este padrão via query string:
- itemsPerPage: Quantidade de itens que devem ser retornados por página.
- currentPage: Página que deve ser paginada.

Quando a paginação não for informada, a aplicação deve considerar os seguintes valores como padrão:
- itemsPerPage: 10
- currentPage: 1

A ordenação deve ser sempre decrescente por data de criação da entidade.

Sempre deve ser retornado uma propriedade com as seguintes informações da paginação:
- totalCount: Total de itens que satisfazem a busca.
- itemsPerPage: Quantidade de itens que devem ser retornados por página.
- currentPage: Página atual.
- pageCount: Total de páginas de acordo com a busca.

Exemplo:
GET /entity?itemsPerPage=10&currentPage=1

Response:

    ```
    {
      "entities": [
        {
          "id": "74a85245-bf7b-43f9-b4f8-88c6f8c47dce",
          "name": "ab",
        },
        {
          "id": "74a85245-bf7b-43f9-b4f8-88c6f8c47dce",
          "name": "cd",
        },
      ],
      "pagination": {
        "totalCount": 4,
        "itemsPerPage": 2,
        "currentPage": 1,
        "pageCount": 2,
      }
    }
    ```

# Rotas desprotegidas

  - POST /people

    Objetivo: Realizar a criação de uma pessoa.

    Requisitos:
      - O documento deve ser único por pessoa, deve ser um CPF ou um CNPJ.
      - O documento deve ser retornado sem formatação.

    Request:

    ```json
    {
      "name": "Carolina Rosa Marina Barros",
      "document": "569.679.155-76",
      "password": "senhaforte"
    }
    ```

    Response:

    ```json
    {
      "id": "4ca336a9-b8a5-4cc6-8ef8-a0a3b5b45ed7",
      "name": "Carolina Rosa Marina Barros",
      "document": "56967915576",
      "createdAt": "2022-08-01T14:30:41.203653",
      "updatedAt": "2022-08-01T14:30:41.203653"
    }
    ```

  - POST /login

    Objetivo: Realizar o login de uma pessoa.

    Requisitos:
      - O token deve ser retornado no padrão Bearer.
      - O token deve expirar em 10 minutos.


    Request:

    ```json
    {
      "document": "56967915576",
      "password": "senhaforte"
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

    Requisitos:
      - A agência, propriedade `branch`, deve possuir exatos 3 dígitos.
      - A conta, propriedade `account`, deve ser retornada com a máscara `XXXXXXX-X` conforme exemplo.
      - O número da conta deve ser único no sistema.

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

    Requisitos:
      - Tipo do cartão: Um cartão pode ser do tipo `physical` ou `virtual`.
      - Uma conta pode ter vários cartões, porém é permitido somente um cartão físico por conta. Virtuais são ilimitados.
      - No campo `number`, o número completo do cartão deve ser informado na criação.
      - O cvv deve conter exatos 3 dígitos.
      - No campo `number`, somente os `4 últimos números` do cartão devem ser retornados na resposta.

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

    Requisitos:
    - No campo number, somente os `4 últimos números` do cartão devem ser retornados na resposta.

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

    Requisitos:
    - No campo number, somente os `4 últimos números` do cartão devem ser retornados na resposta.

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

    Requisitos:
     - Caso a operação seja de débito, o saldo deve ser validado. Não é permitido saldo negativo.

    Observação: Transações de débito possuem valor negativo.

    Request:

    ```json
    {
      "value": 100.00,
      "description": "Pizzaria São Tomé"
    }
    ```

    Response:

    ```json
    {
      "id": "05a0ab2d-5ece-45b6-b7d3-f3ecce2713d5",
      "value": 100.00,
      "description": "Calça Jeans",
      "createdAt": "2022-08-01T14:30:41.203653",
      "updatedAt": "2022-08-01T14:30:41.203653"
    }
    ```

  - GET /accounts/:accountId/transactions

    Objetivo: Listagem de todas as transações de uma conta, com filtros opcionais via query string.
    Filtros que devem ser aplicados:
      - type: credit ou debit
      - search: Busca por descrição da transação.

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

    Requisitos:
      - O saldo deve ser validado. Por exemplo: se a transação é um cashin de R$ 100,00, para ser revertida é necessário que a conta tenha o valor da transação em saldo, pois a conta vai deixar de ter os R$ 100.00. O mesmo vale para transferência interna. Não é permitido saldo negativo.
      - Não deve ser permitido reverter a mesma transação mais de uma vez.

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