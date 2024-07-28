const express = require('express');
const {
  criarProduto,
  obterProdutos,
  obterProdutoPorId,
  atualizarProduto,
  deletarProduto,
} = require('../controladores/controladorProdutos');
const proteger = require('../middleware/middlewareAutenticacao');

const router = express.Router();

router.route('/')
  .post(proteger, criarProduto)
  .get(obterProdutos);

router.route('/:id')
  .get(obterProdutoPorId)
  .put(proteger, atualizarProduto)
  .delete(proteger, deletarProduto);

module.exports = router;
