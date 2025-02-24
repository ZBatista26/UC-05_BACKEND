// Importando com (commonjs)
const express = require("express");
const { pool } = require('./src/config/database');
const dotenv = require("dotenv");

dotenv.config();

const port = process.env.PORTA;
const app = express();

// Aplicação use express como json(javascript object notation)
app.use(express.json());


app.get("/produtos", async (requisicao, resposta) => {
  // tratamento de exceções
  try {
    const consulta = `select * from produto`
    const buscando = await
     pool.query(consulta)
    if (buscando.rows.length === 0) {
      return resposta.status(200).json({
        mensagem: "Banco de dados vazio",
      });
    }
    resposta.status(200).json(buscando.rows);
  } catch (error) {
    resposta.status(500).json({
      mensagem: "Erro ao buscar produtos",
      erro: error.message
    });
  }
});

app.post("/produtos", async (requisicao, resposta) => {
  try {
    const {nome, preco, quantidade} = requisicao.body;
    if (!nome || !preco || !quantidade) {
      return resposta.status(200).json({
        mensagem: "Todos os dados devem ser preenchidos!",
      });
    }
    const novoProduto = [nome, preco, quantidade];
    const consulta = `insert into produto(nome, preco, quantidade)
                        values ($1, $2, $3) returning*`              
    await pool.query(consulta, novoProduto)
    
    resposta.status(201).json({ mensagem: "Produto criado com sucesso" });
  } catch (error) {
    resposta.status(500).json({
      mensagem: "Erro ao cadastrar produto",
      erro: error.message,
    });
  }
}); 

app.put("/produtos/:id", async (requisicao, resposta) => {
  try {
    // localhost:3000/produtos/1
    const id = requisicao.params.id;
    const { novoNome, novoPreco, novaQuantidade} = requisicao.body;
    if (!id) {
      return resposta.status(404).json({ mensagem: "Informe um paramentro!" });
    }
    const paramentro = [id]
    const consulta = `select * from produto where id = $1`
    const resultado = await pool.query(consulta, paramentro)

    if (resultado.rows.length === 0) {
      return resposta.status(404).json({ mensagem: "Produto não encontrado!" });
    }

    const dados = [novoNome, novoPreco, novaQuantidade]
    const consulta2 = `update produto set nome = $2, preco = $3, quantidade = $4 where id = $1 returning *`
    await pool.query(consulta2, dados)
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
