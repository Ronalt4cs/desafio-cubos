# Pessoa Backend Junior

## Introdução
A Cubos pode ser definida como um hub de conhecimento e inovação, capaz de criar empresas digitais próprias e apoiar negócios distintos na tomada de decisões, além do desenvolvimento e resolução de desafios técnicos complexos.

Veja o que já construímos ao longo de 10 anos [clicando aqui](https://cases.cubos.io).


## Contexto

A Cubos é especialista em tecnologia financeira, implementamos ideias que têm o desejo de inovar e otimizar os serviços do sistema financeiro. e para este desafio técnico vamos construir uma API com as principais funcionalidades de uma aplicação financeira.


## Sobre a aplicação
  Você já recebeu previamente a instrução sobre a linguagem na qual a aplicação deve ser desenvolvida. Agora, verifique os requisitos que correspondem a essa linguagem.
  - NodeJS/Typescript:
    - A aplicação deve ser construída utilizando NodeJS, Typescript com o framework Express. Utilize o ORM de sua preferência.
  - C# .NET:
    - A aplicação deve ser construída utilizando C# .NET a partir da versão 5. Como ORM, você deve utilizar o Entity Framework ou Dapper.
- O banco de dados deve ser o [PostgreSQL](https://www.postgresql.org/)
- Migrations devem ser utilizadas.
- Testes de integração e/ou unitários são bem vindos, mas não são obrigatórios.
- As rotas devem ser protegidas no padrão [Bearer Authentication](https://swagger.io/docs/specification/authentication/bearer-authentication).


## Requisitos
Uma pessoa deseja se cadastrar em sua aplicação para usufruir dos serviços financeiros oferecidos:

- Pessoa pode ter várias contas.
- Conta pode ter vários cartões.
- Cartão pode ser do tipo físico ou virtual, onde é possível ter apenas um físico e vários virtuais por conta.
- Conta possui diversas transações de crédito e débito.


## Funcionalidades
- Criar uma pessoa, o documento deve ser único por pessoa, deve ser um CPF ou um CNPJ.
- Adicionar e listar contas de uma pessoa.
- Adicionar e listar cartões de uma conta.
- Listar cartões de uma pessoa.
- Realizar transações em uma conta, validando o saldo (não é permitido saldo negativo).
- Listar transações em uma conta com filtros.
- Consultar o saldo de uma conta.
- [Opcional] Reverter uma transação.


## Endpoints
Os endpoints necessários estão descritos [aqui](endpoints/endpoints.md)

Siga exatamente os padrões de request e response.
Fique de olho nos requisitos, afinal, eles são as regras de negócio da aplicação.
Como um teste final, copie os exemplos e execute-os, verificando se o resultado é o mesmo! :)

## Entrega
Utilizando o github, nos envie o seu repositório. Nele deve conter as instruções de como executar a aplicação.

Observação: Caso configure o repositório como privado, nos solicite as contas que devem ter acesso para realizar a correção.


Aguardamos você! :)
