const mongoose = require('mongoose');

const usuarioSchema = mongoose.Schema(
  {
    nome: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    senha: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Usuario = mongoose.model('Usuario', usuarioSchema);

module.exports = Usuario;
