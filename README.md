# Executando projeto DAY-PLANNER-360

## Passo a passo para executar o projeto com o Docker-Compose:

1. Certifique-se de ter o `node.js`, `docker` e o `docker-compose` na sua máquina;
2. Solicite o arquivo `.env` para o dono do projeto e ao adquirir ele, coloque-o na raiz do projeto;
3. Na raiz do projeto execute o comando `docker-compose build`;
4. Posteriomente, ainda na raiz do projeto, execute `docker-compose up -d`;
5. Entre no container da API em node com o comando: `docker exec -it  {idDoContainerDaAPINode} /bin/bash`;
6. Dentro do container execute: `npx typeorm migration:run` ou `npm run migrations:run`.
7. Passo a passo finalizado, já é possível utilizar as rotas da API, usando como base o client `Insomnia`, com o arquivo: `day_planner_360_collection`.

## Passo a passo opicional para executar o projeto localmente de modo que o banco de dados execute com o Docker e a API node execute na sua máquina sem uso de conteineres:

1. Certifique-se de ter o `node.js`, `docker` e o `docker-compose` na sua máquina;
2. Solicite o arquivo `.env` para o dono do projeto;
3. Comente todo o trecho de código no arquivo `docker-compose.yml` referente à execução do `app`. Ou seja:

```
  # app:
  #   build: .
  #   container_name: day_planner_360
  #   env_file:
  #     - .env
  #   ports:
  #     - 8080:8080
  #   links:
  #     - database
  #   depends_on:
  #     - database
```

4. Na raiz do projeto execute o comando `docker-compose build`;
5. Posteriomente, ainda na raiz do projeto, execute `docker-compose up -d` e assim o banco de dados e o portal admin do Postgres estará executando perfeitamente;
6. No seu shell, e na raiz do projeto, execute `npm i` para instalar as dependências;
7. Ainda na raiz do projeto, altere o valor da chave `host` do arquivo `ormconfig.json` para `localhost`.

```
{
  "username": "postgres",
  "password": "jsnulvonmktoqbtb",
  "type": "postgres",
  "host": "localhost",  // antes era "database"
  "port": 5432,
  "database": "day_planner_360",
  "entities": ["./dist/modules/**/entities/*.js"],
  "migrations": ["./dist/database/migrations/*.js"],
  "cli": {
    "migrationsDir": "./src/database/migrations"
  }
}
```

7. Após isso execute: `npx typeorm migration:run` ou `npm run migrations:run`.
8. Por fim, execute o comando `npm run dev` para iniciar o servidor;
9. Passo a passo finalizado, já é possível utilizar as rotas da API, usando como base o client `Insomnia`, com o arquivo: `day_planner_360_collection`.
