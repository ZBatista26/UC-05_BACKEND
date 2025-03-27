
// Importando com (commonjs)
const express = require("express");
const dotenv = require("dotenv");
const alunoRoutes = require("./src/modules/aluno/routes/index")
dotenv.config();

const port = process.env.PORTA;
const app = express();

// Aplicação use express como json(javascript object notation)
app.use(express.json());

// passando as rotas de Aluno do route
app.use(alunoRoutes); // ex.: "/api/oQueEstiverVindoDoRoute"

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
