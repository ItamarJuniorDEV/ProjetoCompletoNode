const mongoose = require('mongoose');

const produtoSchema = mongoose.Schema(
  {
    nome: {
      type: String,
      required: true,
    },
    descricao: {
      type: String,
      required: true,
    },
    preco: {
      type: Number,
      required: true,
    },
    quantidadeEmEstoque: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Produto = mongoose.model('Produto', produtoSchema);

module.exports = Produto;
