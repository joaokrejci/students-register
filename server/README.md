Servidor Apollo da aplicação Students Register.

# Executando

## Produção

```
docker-compose up server
```

## Desenvolvimento

```shell
docker-compose up
# e
yarn start-dev
```

# Apollo Server - Mapeamento de Queries

## Tipos e Inputs

### Student

```
type Student {
  id: ID!
  name: String!
  cpf: String!
  email: String!
  createdAt: Date
  updatedAt: Date
}

input StudentInput {
  id: ID
  name: String!
  cpf: String!
  email: String!
}
```

## Queries

### students

A query students traz todos os alunos baseados em um termo de busca. Se nenhum termo for informado a query traz todos os alunos.

| Parametros | Tipo     | Obrigatório |
| ---------- | -------- | ----------- |
| search     | `String` | Não         |

```typescript
query students(search: String): [Student]
```

### student

Student busca apenas um aluno baseado em um `id` obrigatório.

| Parametros | Tipo | Obrigatório |
| ---------- | ---- | ----------- |
| id         | `ID` | Sim         |

```typescript
query student(id: ID!): Student
```

## Mutations

### saveStudent

`saveStudent` salva um aluno no banco de dados, criando um novo registro caso `student` possua um `id` ou atualizando um registro existente caso contrário.

| Parametros | Tipo                          | Obrigatório |
| ---------- | ----------------------------- | ----------- |
| student    | [StudentInput](#Student)      | Sim         |

```
saveStudent(student: StudentInput!): Student
```

### deleteStudent
`deleteStudent` excluir um aluno baseado em `id`.

| Parametros | Tipo | Obrigatório |
| ---------- | ---- | ----------- |
| id         | `ID` | Sim         |

```
deleteStudent(id: ID!): ID
```