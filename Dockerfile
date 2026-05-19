# Imagem base para fazer o build da aplicação com Maven
FROM maven:3.9.6-eclipse-temurin-17 AS builder

# Define o diretório de trabalho dentro do container
WORKDIR /app

# Copia o arquivo pom.xml para dentro do container
COPY pom.xml .

# Copia a pasta src para dentro do container
COPY src ./src

# Executa o build da aplicação sem rodar os testes
RUN mvn clean package -DskipTests


# Imagem base para executar a aplicação
FROM eclipse-temurin:17-jre

# Adiciona metadados na imagem
LABEL authors="Joao Victor"
LABEL description="API de tarefas desenvolvida em Java Spring Boot com MySQL"
LABEL version="1.0"

# Define variáveis de ambiente padrão
ENV APP_NAME=api-tarefa
ENV APP_PORT=8080

# Define o diretório de trabalho dentro do container
WORKDIR /app

# Copia o arquivo .jar gerado na etapa builder
COPY --from=builder /app/target/*.jar app.jar

# Cria um volume para dados temporários da aplicação
VOLUME /tmp

# Documenta a porta usada pela aplicação
EXPOSE 8080

# Configura o container para executar a aplicação
ENTRYPOINT ["java", "-jar", "app.jar"]