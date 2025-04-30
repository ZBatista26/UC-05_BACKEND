const express = require('express')
const router = express.Router();
const AlunoController = require('../controllers/secretario.controller');

//Listar todos os alunos http://localhost:3000/secretario/listar-aluno
router.get('/secretario/listar-aluno', AlunoController.listarAluno);

//Listar aluno por matricula http://localhost:3000/secretario/listar-aluno/a95405290
router.get('/secretario/listar-aluno/:matricula', AlunoController.listarAlunoPorMatricula);

// Criar aluno http://localhost:3000/secretario/criar-aluno
router.post('/secretario/criar-aluno', AlunoController.criarAluno);

// Editar dados do aluno http://localhost:3000/secretario/editar-aluno
router.put('/secretario/editar-aluno', AlunoController.editarAluno);

// Deletar alunos por matricula http://localhost:3000/secretario/deletar-aluno/a95405290
router.delete('/secretario/deletar-aluno/:matricula', AlunoController.deletarAlunoPorMatricula);

// Deletar todos os alunos http://localhost:3000/secretario/deletar-aluno
router.delete('/secretario/deletar-aluno', AlunoController.deletarTodosOsAlunos);

module.exports rou