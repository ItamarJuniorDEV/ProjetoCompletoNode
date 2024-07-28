const Produto = require('../modelos/Produto');

const criarProduto = async (req, res) => {
  const { nome, descricao, preco, quantidadeEmEstoque } = req.body;

  try {
    const produto = new Produto({
      nome,
      descricao,
      preco,
      quantidadeEmEstoque,
    });

    const produtoCriado = await produto.save();
    res.status(201).json(produtoCriado);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao criar produto' });
  }
};

const obterProdutos = async (req, res) => {
  try {
    const produtos = await Produto.find({});
    res.json(produtos);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao buscar produtos' });
  }
};

const obterProdutoPorId = async (req, res) => {
  try {
    const produto = await Produto.findById(req.params.id);

    if (produto) {
      res.json(produto);
    } else {
      res.status(404).json({ message: 'Produto não encontrado' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Erro ao buscar produto' });
  }
};

const atualizarProduto = async (req, res) => {
  const { nome, descricao, preco, quantidadeEmEstoque } = req.body;

  try {
    const produto = await Produto.findById(req.params.id);

    if (produto) {
      produto.nome = nome || produto.nome;
      produto.descricao = descricao || produto.descricao;
      produto.preco = preco || produto.preco;
      produto.quantidadeEmEstoque = quantidadeEmEstoque || produto.quantidadeEmEstoque;

      const produtoAtualizado = await produto.save();
      res.json(produtoAtualizado);
    } else {
      res.status(404).json({ message: 'Produto não encontrado' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Erro ao atualizar produto' });
  }
};

const deletarProduto = async (req, res) => {
  try {
    const produto = await Produto.findById(req.params.id);

    if (produto) {
      await produto.remove();
      res.json({ message: 'Produto removido' });
    } else {
      res.status(404).json({ message: 'Produto não encontrado' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Erro ao deletar produto' });
  }
};

module.exports = {
  criarProduto,
  obterProdutos,
  obterProdutoPorId,
  atualizarProduto,
  deletarProduto,
};
