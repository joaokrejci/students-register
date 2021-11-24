# Students Register

## Rodando o projeto

Para executar todos os serviços do projeto basta utilizar o comando

```
$ docker-compose up
```

## Ambientes de desenvolvimento

### Servidor

Para utilizar o servidor no modo desenvolvimento é necessário que o serviço de banco de dados esteja ativo, este pode ser ativado utilizando o comando

```
$ docker-compose up db
```

E para iniciar o servidor basta executar o comando

```
$ yarn start-dev
```

dentro do diretório `server`

### Cliente

O cliente, localizado no diretório `web, pode ser executado no modo de desenvolvimento com o comando

```
$ yarn start
```

é recomendado que o serviço `server` esteja sendo executado enquanto o cliente é utilizado, pois assim terá acesso a API. Isso pode ser feito tanto com o servidor executando em modo de desenvolvimento quanto com

```
    docker-compose up db server
```
