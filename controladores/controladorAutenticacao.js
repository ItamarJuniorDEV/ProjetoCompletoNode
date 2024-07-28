const Usuario = require('../modelos/Usuario');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const registrarUsuario = async (req, res) => {
  const { nome, email, senha } = req.body;

  try {
    const usuarioExiste = await Usuario.findOne({ email });

    if (usuarioExiste) {
      return res.status(400).json({ message: 'Usuário já existe' });
    }

    const salt = await bcrypt.genSalt(10);
    const senhaCriptografada = await bcrypt.hash(senha, salt);

    const usuario = await Usuario.create({
      nome,
      email,
      senha: senhaCriptografada,
    });

    const token = jwt.sign({ id: usuario._id }, process.env.JWT_SECRET, {
      expiresIn: '30d',
    });

    res.status(201).json({ token });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao registrar usuário' });
  }
};

const logarUsuario = async (req, res) => {
  const { email, senha } = req.body;

  try {
    const usuario = await Usuario.findOne({ email });

    if (usuario && (await bcrypt.compare(senha, usuario.senha))) {
      const token = jwt.sign({ id: usuario._id }, process.env.JWT_SECRET, {
        expiresIn: '30d',
      });

      res.json({ token });
    } else {
      res.status(401).json({ message: 'Credenciais inválidas' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Erro ao autenticar usuário' });
  }
};

module.exports = { registrarUsuario, logarUsuario };
