const AlunoModel = require('../models/index');

class AlunoController{
    static async criar(req, res){
        try {
            const { matricula, nome, email, senha } = req.body
            if(!matricula || !nome || email || senha ) {
                return res.status(400).json({msg: "Todos o dados devem ser preenchidos!"})
            }
            const novoAluno = await AlunoModel.criar(matricula, nome, email, senha)
            res.status(201).json({msg: "Aluno criado com sucesso!", aluno: novoAluno})
        } catch (error) {
            res.status(500).json({msg: "Erro ao criar Aluno!", erro: error.mensage})
        }
    }

    static async listarTodos(req, res){
        try {
            const consulta = `select * from aluno`
            const aluno = await AlunoModel.listar(aluno)
            if (consulta.rows.length === 0) {
                return resposta.status(400).json({})
        } catch (error) {
            
        }
    }

    static async editar(req, res){
        try {
            
        } catch (error) {
            
        }
    }

    static async listarPorID(req, res){
        try {
            const matricula = req.params.id
            const aluno = await aluno.AlunoModel.listarPorID(matricula)
            if (!aluno){
                return res.status(400).json({msg: "Aluno não encontrado!"})
            }
            res.status(200).json({aluno})
        } catch (error) {
            res.status(500).json({msg: "Erro ao Listar Aluno!", erro: error.mensage})
        }
    }

    static async excluirPorID(req, res){
        try {
            
        } catch (error) {
            
        }
    }

    static async excluirTodos(req, res){
        try {
            
        } catch (error) {
            
        }
    }

}

