Manual de criação do SiCESV

BackEnd:
Inicialização do projeto com cmj. Nesse caso criaamos apenas o arquivo package.json:

npm init -y

instalação do express:
npm install express --save

instalação do Consign:
npm install consign --save

instalação do middleware:
npm install body-parser --save

imstalação do nodemon para não precisar ficar reinicializando o servidor a cada alteração:
npm install --save-dev nodemon

instalação do sequelize and the driver for the postgresql database:
npm install sequelize --save
npm install pg --save

ESTRUTURA DE DIRETÓRIOS:
api: onde estão os source codes
config: onde estão os arquivos de configuração
models: onde estão os modelos
controllers: onde estão os controllers
routes: onde estão as rotas
