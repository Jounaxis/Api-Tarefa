# Api-Tarefa

Projeto desenvolvido para a disciplina de DevOps, com o objetivo de criar uma aplicação Java Spring Boot containerizada com Docker, utilizando banco de dados MySQL e disponibilizada em uma máquina virtual na Azure.

A aplicação consiste em uma API REST para gerenciamento de tarefas, acompanhada de uma interface web simples para interação visual com os dados.

---

## Infraestrutura:

![](docs/Captura de Tela 2026-05-21 às 12.56.49.png)

---

## Visão Geral do Projeto

A aplicação permite realizar operações básicas de CRUD sobre tarefas.

Funcionalidades disponíveis:

- Cadastrar uma nova tarefa
- Listar todas as tarefas
- Buscar tarefas cadastradas
- Editar uma tarefa
- Alterar status da tarefa
- Excluir uma tarefa
- Acessar uma interface web simples pelo navegador
- Persistir os dados em banco MySQL
- Executar a aplicação em containers Docker
- Disponibilizar o sistema em uma VM na Azure por IP externo

---

## Tecnologias Utilizadas

- Java 17
- Spring Boot
- Spring Web
- Spring Data JPA
- Hibernate
- MySQL 8.0
- Maven
- Docker
- Docker Compose
- HTML
- CSS
- JavaScript
- Azure VM
- Ubuntu 22.04

---

## Estrutura do Projeto

A estrutura principal do projeto foi organizada da seguinte forma:

```text
Api-Tarefa
├── Dockerfile
├── docker-compose.yml
├── mvnw
├── mvnw.cmd
├── pom.xml
├── README.md
└── src
    └── main
        ├── java
        │   └── br
        │       └── com
        │           └── fiap
        │               └── apitarefa
        │                   ├── controller
        │                   │   └── TarefaController.java
        │                   ├── model
        │                   │   └── Tarefa.java
        │                   ├── repository
        │                   │   └── TarefaRepository.java
        │                   ├── service
        │                   │   └── TarefaService.java
        │                   └── ApiTarefaApplication.java
        └── resources
            ├── application.properties
            └── static
                ├── index.html
                ├── styles.css
                └── app.js
````

---

## Camadas da Aplicação

### Model

A camada `model` contém a entidade principal da aplicação.

Arquivo:

```text
Tarefa.java
```

Essa classe representa a tabela de tarefas no banco de dados.

Principais atributos:

* `id`
* `titulo`
* `descricao`
* `concluida`

---

### Repository

A camada `repository` é responsável pela comunicação com o banco de dados.

Arquivo:

```text
TarefaRepository.java
```

Ela utiliza o `JpaRepository`, permitindo operações como salvar, listar, buscar, atualizar e deletar registros.

---

### Service

A camada `service` contém as regras de negócio da aplicação.

Arquivo:

```text
TarefaService.java
```

Essa camada faz a ligação entre o controller e o repository, organizando as operações da aplicação.

---

### Controller

A camada `controller` expõe os endpoints REST da API.

Arquivo:

```text
TarefaController.java
```

Ela permite que a aplicação receba requisições HTTP para cadastrar, listar, atualizar e excluir tarefas.

---

## Endpoints da API

A API possui os seguintes endpoints:

| Método | Endpoint        | Descrição                     |
| ------ | --------------- | ----------------------------- |
| GET    | `/tarefas`      | Lista todas as tarefas        |
| GET    | `/tarefas/{id}` | Busca uma tarefa pelo ID      |
| POST   | `/tarefas`      | Cadastra uma nova tarefa      |
| PUT    | `/tarefas/{id}` | Atualiza uma tarefa existente |
| DELETE | `/tarefas/{id}` | Remove uma tarefa             |

---

## Exemplo de JSON para Cadastro

Endpoint:

```text
POST /tarefas
```

Body:

```json
{
  "titulo": "Estudar Docker",
  "descricao": "Revisar Dockerfile e Docker Compose",
  "concluida": false
}
```

---

## Exemplo de JSON para Atualização

Endpoint:

```text
PUT /tarefas/1
```

Body:

```json
{
  "titulo": "Estudar Docker",
  "descricao": "Finalizar revisão de containers",
  "concluida": true
}
```

---

## Interface Web

Além da API REST, o projeto também possui uma interface web simples, criada com HTML, CSS e JavaScript.

Arquivos da interface:

```text
src/main/resources/static/index.html
src/main/resources/static/styles.css
src/main/resources/static/app.js
```

A interface permite que o usuário:

* Cadastre tarefas
* Visualize tarefas cadastradas
* Filtre tarefas por título
* Edite tarefas
* Marque tarefas como concluídas ou pendentes
* Exclua tarefas

A tela pode ser acessada diretamente pelo navegador.

---

## Banco de Dados

O banco utilizado no projeto é o MySQL 8.0, executado em container Docker.

Configurações principais do banco no `docker-compose.yml`:

```yaml
MYSQL_DATABASE: tarefa_db
MYSQL_USER: rm560907
MYSQL_PASSWORD: fiap2026
```

A aplicação se conecta ao banco através da rede interna criada pelo Docker Compose.

URL interna usada pela aplicação:

```text
jdbc:mysql://mysql:3306/tarefa_db
```

---

## Dockerfile

O projeto possui um `Dockerfile` responsável por criar a imagem da aplicação Java.

O Dockerfile utiliza duas etapas:

1. **Build da aplicação com Maven**
2. **Execução do arquivo `.jar` com Java 17**

Principais instruções utilizadas:

* `FROM`
* `WORKDIR`
* `COPY`
* `RUN`
* `LABEL`
* `ENV`
* `VOLUME`
* `EXPOSE`
* `ENTRYPOINT`

---

## Docker Compose

O arquivo `docker-compose.yml` é responsável por subir dois serviços principais:

| Serviço | Descrição                          |
| ------- | ---------------------------------- |
| `mysql` | Container do banco de dados MySQL  |
| `api`   | Container da aplicação Spring Boot |

Também foram configurados:

* Rede Docker própria
* Volume para persistência do MySQL
* Variáveis de ambiente para conexão da API com o banco
* Porta `3306` para o MySQL
* Porta `8080` para a API

---

## Como Executar Localmente com Docker

Na raiz do projeto, execute:

```bash
docker compose up --build
```

Ou, caso esteja usando a versão antiga do Docker Compose:

```bash
docker-compose up --build
```

Para executar em segundo plano:

```bash
docker compose up -d --build
```

Ou:

```bash
docker-compose up -d --build
```

Para verificar os containers ativos:

```bash
docker ps
```

Para parar os containers:

```bash
docker compose down
```

Ou:

```bash
docker-compose down
```

Para parar e remover os volumes do banco:

```bash
docker compose down -v
```

---

## Como Acessar Localmente

Interface web:

```text
http://localhost:8080
```

API REST:

```text
http://localhost:8080/tarefas
```

---

## Deploy em Máquina Virtual Azure

O projeto também foi preparado para execução em uma VM na Azure.

A VM foi criada com Ubuntu 22.04 e configurada para permitir acesso externo pela porta `8080`.

Portas utilizadas:

| Porta | Finalidade                      |
| ----- | ------------------------------- |
| 22    | Acesso SSH                      |
| 80    | HTTP                            |
| 8080  | Aplicação Spring Boot           |
| 3306  | MySQL dentro do ambiente Docker |

---

## IP Público da VM

A aplicação pode ser acessada pelo IP externo da máquina virtual:

```text
20.87.209.235
```

Interface web:

```text
http://20.87.209.235:8080
```

Endpoint da API:

```text
http://20.87.209.235:8080/tarefas
```

---

## Como Testar a Aplicação na VM

### 1. Acessar a interface web

Abra no navegador:

```text
http://20.87.209.235:8080
```

Na tela, é possível cadastrar uma nova tarefa informando:

* título
* descrição

Depois de cadastrar, a tarefa será exibida na lista.

---

### 2. Testar listagem de tarefas

No navegador, Postman, Insomnia ou outro cliente HTTP:

```text
GET http://20.87.209.235:8080/tarefas
```

Resposta esperada caso não existam tarefas:

```json
[]
```

---

### 3. Testar cadastro de tarefa

Endpoint:

```text
POST http://20.87.209.235:8080/tarefas
```

Body:

```json
{
  "titulo": "Testar aplicação na VM",
  "descricao": "Validar acesso externo pelo IP público da Azure",
  "concluida": false
}
```

---

### 4. Testar atualização de tarefa

Endpoint:

```text
PUT http://20.87.209.235:8080/tarefas/1
```

Body:

```json
{
  "titulo": "Testar aplicação na VM",
  "descricao": "Aplicação testada com sucesso pelo IP público",
  "concluida": true
}
```

---

### 5. Testar exclusão de tarefa

Endpoint:

```text
DELETE http://20.87.209.235:8080/tarefas/1
```

---

## Comandos Utilizados na VM

Após clonar o repositório na VM, foi necessário entrar na pasta do projeto:

```bash
cd Api-Tarefa
```

Atualizar os pacotes:

```bash
sudo apt update
```

Instalar Docker e Docker Compose:

```bash
sudo apt install -y docker.io docker-compose
```

Habilitar o Docker:

```bash
sudo systemctl enable docker
sudo systemctl start docker
```

Adicionar o usuário ao grupo Docker:

```bash
sudo usermod -aG docker $USER
```

Após sair e entrar novamente na VM via SSH, executar:

```bash
docker-compose up -d --build
```

Verificar os containers:

```bash
docker ps
```

Verificar logs da aplicação:

```bash
docker logs api-tarefa
```

---

## Fluxo de Funcionamento

O funcionamento geral do projeto ocorre da seguinte forma:

1. O usuário acessa a interface web pelo navegador.
2. O JavaScript da página envia requisições HTTP para a API.
3. A API Spring Boot recebe as requisições no controller.
4. O controller chama a service.
5. A service utiliza o repository.
6. O repository realiza as operações no banco MySQL.
7. O banco MySQL armazena os dados das tarefas.
8. A resposta retorna para a interface web ou para o cliente HTTP.

---

## Resumo do Projeto

Este projeto entrega uma aplicação completa e funcional contendo:

* API REST em Java com Spring Boot
* Organização em camadas
* Persistência de dados com MySQL
* Interface web simples para interação
* Containerização com Docker
* Orquestração com Docker Compose
* Deploy em VM na Azure
* Acesso externo via IP público

O objetivo principal foi demonstrar o uso de uma aplicação backend integrada a banco de dados, executada em containers e disponibilizada em ambiente de nuvem.

