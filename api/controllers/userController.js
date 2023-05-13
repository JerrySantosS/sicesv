const services = require('../services/userServices');

const getUsers = async (req, res) => {
  try {
    const users = await services.getUsers();
    res.status(200).json(users).end();
  } catch (err) {
    res.status(500).json(err).end();
  }
}

const getUserById = async (req, res) => {
  try {
    const id = parseInt(req.params.id);

    if(id) {
      const user = await services.getUserById(id);
      res.status(200).json(user).end();
    }else {
      // 400 Bad Request Essa resposta significa que o servidor não entendeu a requisição pois está com uma sintaxe inválida.
      res.status(400).json('Errro: o parâmetro especificado não é válido.').end();
    }
  } catch (err) {
    // 404 not found. significa que o servidor não encontrou um usuário com o id especificado
    res.status(404).json(`Erro: ${err}`).end();
  }
}

const createUser = async (req, res) => {
  try {
    const user = await services.createUser(req.body);
    // o código HTTP 201 inidica que um conteúdo foi criado com sucesso no servidor
    res.status(201).send(`User added with user name: ${user.user_name}`).end();
  } catch (err) {
    //422 Unprocessable Entity
    //O codigo de resposta HTTP 422 Unprocessable Entity indica que o servidor entende o tipo de
    //conteúdo da entidade da requisição, e a sintaxe da requisição esta correta,
    //mas não foi possível processar as instruções presentes.
     res.status(422).send(`cannot create user: ${err}`).end();
  }
}

const updateUser = async (req, res) => {
  try {
    const id = parseInt(req.params.id);

    if(id) {
      req.body.id = id;
      const qtd = await services.updateUser(req.body);
      res.status(200).json('Usuário atualizado com sucesso.' + qtd).end();
    }else {
      // 400 Bad Request Essa resposta significa que o servidor não entendeu a requisição pois está com uma sintaxe inválida.
      res.status(400).json('Erro: o parâmetro especificado não é válido.').end();
    }
  } catch (err) {
    res.status(422).send(`cannot update user: ${err}`).end();
  }
}

const deleteUser = async (req, res) => {
  try {
    const id = parseInt(req.params.id);

    if(id) {
      const reslut = await services.deleteUser(id);
      res.status(200).json('Usuário deletado com sucesso.').end();
    }else {
      // 400 Bad Request Essa resposta significa que o servidor não entendeu a requisição pois está com uma sintaxe inválida.
      res.status(400).json('Errro: o parâmetro especificado não é válido.').end();
    }
  } catch (err) {
    res.status(422).send(`Cannot delete user: ${err}`).end();
  }
}

module.exports = {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
}
