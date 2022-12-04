![Dr Consulta](https://drconsulta.com/_next/image?url=%2Fimages%2FLogo-Dr-Consulta-Branco.png&w=128&q=100 "DrConsulta")

# Bem vindos

Primeiramente, quero agradecer a oportunidade de participar da seleção para desenvolvedor backend no Dr. Consulta.

Como desenvolvedor, tenho a oportunidade de estar inserido no ramo da saúde a alguns anos desenvolvendo sites, sistemas e aplicativos.

Casado com uma enfermeira a 10 anos me aproximei muito desse contexto e juntos montamos o Guia Diário da Saúde. Esse projeto de ensino coloca minha esposa Aline lecionando e motivando profissionais da área da saúde entregando dicas de cálculo de medicamentos, leis, questões de concurso, entre outros. Para que ela possa atuar virtualmente no ramo eu a auxilio com as questões técnicas de TI.

Meu lema para 2022 / 2023 é: "Web especializada em aproximar profissionais da área da saúde e seus pacientes" e exatamente por isso que estou tão animado em fazer parte do time do Dr. Consulta.

Sendo assim abaixo deixo detalhado o passo a passo para colocar o projeto para rodar conforme solicitado.

Mais uma vez, muito obrigado e espero começar o quanto antes a trabalhar com vocês!

Atenciosamente,
André Menezes - Desenvolvedor Fullstack com o coração voltado para a tecnologia em saúde.

# Pré Requisitos

- Ter o [docker](https://www.docker.com/) instalado.
- Ter o [git](https://git-scm.com/) instalado.

# Instalação

Baixe o repositório através do comando

```shell
$ git clone https://github.com/andrecsmenezes/desafio-entrevista-nodejs.git
```

Após baixar o repositório na branch `master` execute

```shell
$ docker-compose up --build --remove-orphans
```

Aguarde a instalação total e você poderá ver o projeto rodando através do *Swagger* no endereço: [localhost:3000/swagger](http://localhost:3000/swagger)

# Seed

Para rodar o projeto é necessário que haja um usuário, para isso use o *Swagger* para rodar o *endpoint* `/1.0/users/seed` e gerar o usuário de testes.

# Autorização

Após realizado o processo de *seeding*, você poderá logar no sistema através do *endpoint* `/1.0/auth`. O usuário de teste já estará inserido. Basta executar.

Após a execução, no corpo da resposta será retornado um *token*, basta copiá-lo e inseri-lo no campo de *Bearer Token* no canto superior direito da página do Swagger clicando no botão *Authorize* e ao abrir o *pop-up* colar no *input Value*. Após isso basta clicar no botão *Authorize* e depois em *Close*.

Ao finalizar o login todos os outros endpoints estarão disponíveis para acesso e teste.

# Chamadas de serviços

Detalhes de cada chamada se encontram no swagger através do link [localhost:3000/swagger](http://localhost:3000/swagger)

## Hello World (GET /api/v1.0)

Essa chamada serve apenas para validar que o sistema está ok e logado!

## Auth (POST /api/v1.0/auth)

Chamada para logar no sistema

## Estabelecimentos

### Tipos de etabelecimentos

EstablishmentMovementType
- 0 = ENTRANCE,
- 1 = EXIT,

### Endpoints

- Cadastrar (POST /api/v1.0/establishments)
- Visualizar lista (GET /api/v1.0/establishments)
- Visualizar por ID (GET /api/v1.0/establishments/{id})
- Atualizar por ID (PATCH /api/v1.0/establishments/{id})
- Deletar por ID (DELETE /api/v1.0/establishments/{id})
- Inserir veículo (POST /api/v1.0/establishments/{id}/insert-vehicle)
- Remover veículo (POST /api/v1.0/establishments/{id}/remove-vehicle)
- Listar movimentação por range de datas (GET /api/v1.0/establishments/{id}/movement)
- Resumo de movimentação por hora (GET /api/v1.0/establishments/{id}/movement-per-hour)

## Veículos

### Tipos de vículos

VehicleType
- 0 = MOTORCYCLE,
- 1 = CAR,

### Tipos de carros

CarType
- 0 = CONVERTIBLE,
- 1 = SILK,
- 2 = HATCH,
- 3 = COUPE,
- 4 = SW,
- 5 = SUV,
- 6 = PICKUP,
- 7 = MINIVAN,
- 8 = VAN,
- 9 = BUGGY,

### Marcas de carros

CarBrand
- 0 = VOLKSWAGEN
- 1 = CHEVROLET
- 2 = FIAT
- 3 = HYUNDAI
- 4 = TOYOTA
- 5 = JEEP
- 6 = CAOA
- 7 = CHERY
- 8 = RENAULT
- 9 = NISSAN
- 10 = HONDA
- 11 = PEUGEOT
- 12 = FORD
- 13 = CITROEN
- 14 = MITSUBISHI
- 15 = AUDI
- 16 = BWM
- 17 = VOLVO
- 18 = MERCEDESBENZ
- 19 = JAC
- 20 = MOTORS
- 21 = KIA
- 22 = LANDROVER
- 23 = SUZUKI
- 24 = RAM
- 25 = PORSCHE
- 26 = MINI
- 27 = FERRARI
- 28 = LAMBORGHINI
- 29 = TESLA
- 30 = JAGUAR
- 31 = LEXUS
- 32 = MASERATI
- 33 = MCLAREN
- 34 = SUBARU

### Tipos de motos

MotorcycleType
- 0 = BIGTRAIL
- 1 = CUSTOM
- 2 = SPORTIVE
- 3 = NAKED
- 4 = SCOOTER
- 5 = STREET
- 6 = TOURING
- 7 = TRAIL
- 8 = OFFROAD

MotorcycleBrand
- 0 = AVELLOZ
- 1 = BMW
- 2 = DAFRA
- 3 = DUCATI
- 4 = HAOJUE
- 5 = HARLEYDAVIDSON
- 6 = HONDA
- 7 = KAWASAKI
- 8 = KTM
- 9 = KYMCO
- 10 = MXF
- 11 = PIAGGIO
- 12 = PROTORKMINI
- 13 = ROYALENFIELD
- 14 = SHINERAY
- 15 = SOUSA
- 16 = SUZUKI
- 17 = TRIUMPH
- 18 = VOLTZ
- 19 = YAMAHA

### Endpoints

- Cadastrar (POST /api/v1.0/vehicles)
- Visualizar lista (GET /api/v1.0/vehicles)
- Visualizar por ID (GET /api/v1.0/vehicles/{id})
- Atualizar por ID (PATCH /api/v1.0/vehicles/{id})
- Deletar por ID (DELETE /api/v1.0/vehicles/{id})

## Usuários

- Seed (GET /api/v1.0/users/seed)
- Cadastrar (POST /api/v1.0/users)
- Visualizar lista (GET /api/v1.0/users)
- Visualizar por ID (GET /api/v1.0/users/{id})
- Atualizar por ID (PATCH /api/v1.0/users/{id})
- Deletar por ID (DELETE /api/v1.0/users/{id})

## Relatórios

- Resumo de dados (GET /api/v1.0/reports/resume)

<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>

# Conteúdo original do desafio

*"Salvar vidas e cuidar das pessoas porque elas não podem esperar nas filas da saúde."*
Conheça: www.drconsulta.com

## Objetivo
O teste é destinado para vaga de Desenvolvedor Back-end entendo como o candidato efetuou a solução e o raciocinio de criação

## Project - API
Criar uma API REST para gerenciar um estacionamento de carros e motos.

#### Stack tecnológica
- NestJS
- TypeOrm
- Mysql
- Swagger

#### Cadastro de estabelecimento
Criar um cadastro da empresa com os seguintes campos:
- Nome;
- CNPJ;
- Endereço;
- Telefone;
- Quantidade de vagas para motos;
- Quantidade de vagas para carros.

**Todos** os campos são de preenchimento obrigatório.

#### Cadastro de veículos
Criar um cadastro de veículos com os seguintes campos:
- Marca;
- Modelo;
- Cor;
- Placa;
- Tipo.

**Todos** os campos são de preenchimento obrigatório.

#### Funcionalidades
- **Estabelecimento:** CRUD;
- **Veículos:** CRUD;
- **Controle de entrada e saída de veículos.**

#### Requisitos
- Controle JWT via Handshake
- Modelagem de dados;
- O retorno deverá ser em formato JSON;
- Requisições GET, POST, PUT ou DELETE, conforme a melhor prática;
- A persistência dos dados deverá ser em banco *relacional MYSQL*
- Criar README do projeto descrevendo as tecnologias utilizadas, chamadas dos serviços e configurações necessário para executar a aplicação.
   
#### Ganha mais pontos
- Sumário da quantidade de entrada e saída;
- Sumário da quantidade de entrada e saída de veículos por hora;
- Criação relatórios para visão ao dono do estabelecimento;
- Desenvolver utilizando TDD;

## DevOps (Diferencial)
Efetuar deploy da nossa API no ambiente do Google Cloud Platform utilizando os serviços

#### Serviços do GCP
- Container Registry (Subir a imagem docker)
- Cloud Run

## Submissão
Crie um fork do teste para acompanharmos o seu desenvolvimento através dos seus commits.

## Obrigado!
Agradecemos sua participação no teste. Boa sorte! 😄
