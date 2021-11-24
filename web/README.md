Cliente web para a aplicação Students Register

# Executando
## Produção
```
docker-compose up
```

## Desenvolvimento
Para executar no modo de desenvolvimento é necessário que o servidor da API esteja em execução. Para isso utilize:

```
docker-compose up server
```
no diretório raiz do projeto. E então utilize
```
yarn start
```
no diretório `web`