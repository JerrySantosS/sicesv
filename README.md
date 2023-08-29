Manual de criação do SiCESV

BackEnd:
Inicialização do projeto com cmj. Nesse caso criaamos apenas o arquivo package.json:

npm init -y

instalação do express:
npm install express --save

instalação do cors:
npm install cors --save

instalação do dotenv para gerenciar as variaveis de ambinete:
npm install dotenv --save

instalação do Consign:
npm install consign --save

instalação do middleware:
npm install body-parser --save

imstalação do nodemon para não precisar ficar reinicializando o servidor a cada alteração:
npm install --save-dev nodemon

instalação do sequelize and the driver for the postgresql database:
npm install sequelize --save
npm install pg --save

instalação o bcrypt:
npm install bcrypt --save

instalação do gerenciador de Tokens
npm install jsonwebtoken --save

ESTRUTURA DE DIRETÓRIOS:
api: onde estão os source codes;
config: onde estão os arquivos de configuração;
models: onde estão os modelos;
controllers: onde estão os controllers;
routes: onde estão as rotas;
rules: onde estão as regras de negócio
services: onde estão s serviços

URLs para acessar a api:
USER:
GET /api/users/active - retorna todos os usuários ativos no sistema
GET /api/users/active/:id - o usuário referente ao id
POST /api/users/active - envia as informações para o cadastro de um novo usuário
PUT /api/users/active/:id - envia as informações para atuaçização do usuário referente ao id
