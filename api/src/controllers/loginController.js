const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

async function authenticate(req, res) {
  const { userName, password } = req.body;

  if (!userName || !password) {
    return res
      .status(401)
      .json({ msg: 'Usuário e senha devem ser preenchidos' });
  }

  try {
    const user = await User.findOne({
      where: { userName },
      attributes: ['id', 'userName', 'name', 'password', 'type'],
    });

    if (!user) {
      return res
        .status(401)
        .json({ msg: 'usário não existe. Tentente novamente' });
    }

    const match = await bcrypt.compare(password, user.password);

    if (!match) {
      return res
        .status(500)
        .json({ msg: 'Seha incorreta, tente novamente!' })
        .end();
    }

    // criando o token para acesso
    const secret = process.env.SECRET;
    const token = jwt.sign(
      {
        id: user.id,
      },
      secret,
      { expiresIn: 60 * 60 * 24 }
    );
    user.password = '';
    return res.status(200).json({ token, user });
  } catch (err) {
    return res.status(500).json({ msg: 'Erro interno' });
  }
}

module.exports = { authenticate };
