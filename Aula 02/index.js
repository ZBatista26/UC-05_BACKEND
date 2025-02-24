// Importando com (commonjs)
const express = require("express");
const dotenv = require("dotenv");

dotenv.config();

const port = process.env.PORTA;
const app = express();

// Aplicação use express como json(javascript object notation)
app.use(express.json());

const bancoDados = [];

app.get("/produtos", (requisicao, resposta) => {
  // tratamento de exceções
  try {
    if (bancoDados.length === 0) {
      return resposta.status(200).json({
        mensagem: "Banco de dados vazio",
      });
    }
    resposta.status(200).json(bancoDados);
  } catch (error) {
    resposta.status(500).json({
      mensagem: "Erro ao buscar produtos",
      erro: error.message
    });
  }
});

app.post("/produtos", (requisicao, resposta) => {
  try {
    const { id, nome, preco } = requisicao.body;
    if (!id || !nome || !preco) {
      return resposta.status(200).json({
        mensagem: "Todos os dados devem ser preenchidos!",
      });
    }
    const novoProduto = { id, nome, preco };
    bancoDados.push(novoProduto);
    resposta.status(201).json({ mensagem: "Produto criado com sucesso" });
  } catch (error) {
    resposta.status(500).json({
      mensagem: "Erro ao cadastrar produto",
      erro: error.message,
    });
  }
});

app.put("/produtos/:id", (requisicao, resposta) => {
  try {
    // localhost:3000/produtos/1
    const id = requisicao.params.id;
    const { novoNome, novoPreco } = requisicao.body;
    if (!id) {
      return resposta.status(404).json({ mensagem: "Informe um paramentro!" });
    }
    const produto = bancoDados.find((elemento) => elemento.id === id);
    if (!produto) {
      return resposta.status(404).json({ mensagem: "Produto não encontrado!" });
    }
    produto.nome = novoNome || produto.nome;
    produto.preco = novoPreco || produto.preco;
    resposta.status(200).json({ mensagem: "Produto atualizado com sucesso!" });
  } catch (error) {
    resposta.status(500).json({
      mensagem: "Erro ao editar produto",
      erro: error.message
    });
  }
});

app.delete("/produtos/:id", (requisicao, resposta) => {
  try {
    const id = requisicao.params.id;
    const index = bancoDados.findIndex((elemento) => elemento.id === id);
    if (index === -1) {
      return resposta.status(404).json({ mensagem: "Produto não encontrado" });
    }
    bancoDados.splice(index, 1);
    resposta.status(200).json({ mensagem: "Produto deletado com sucesso" });
  } catch (error) {
    resposta.status(500).json({
      mensagem: "Erro ao excluir produto",
      erro: error.message
    });
  }
});

app.delete('/produtos', (requisicao, resposta) => {
  try {
    bancoDados.length = 0;
  } catch (error) {
    resposta.status(500).json({mensagem: "Erro ao excluir produto", erro:error.message});
  }
})

app.get("/produtos/:id", (requisicao, resposta) => {
  try {
    const id = requisicao.params.id;
    const produto = bancoDados.find(elemento => elemento.id === id);
    if(!produto){
      return resposta.status(404).json({mensagem:"Produto não encontrado"})
    }
    resposta.status(200).json(produto)
  } catch (error) {
    resposta.status(500).json({
      mensagem: "Erro ao buscar produto",
      erro: error.message
    });
  }
})


app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
