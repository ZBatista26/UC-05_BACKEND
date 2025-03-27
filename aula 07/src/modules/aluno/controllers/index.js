const AlunoModel = require('../models/index'); //importanto o module do models Aluno


class AlunoController {
    static async criar(requisicao, resposta) {
        try {
            const { matricula, nome, email, senha } = requisicao.body  // passando os dados da requisicao
            if (!matricula || !nome || !email || !senha) {
                return resposta.status(400).json({ mensagem: "Todos os campos devem ser preenchidos!" })
            }
            const novoAluno = await AlunoModel.criar(matricula, nome, email, senha);
            resposta.status(201).json({ mensagem: "Aluno criado com sucesso", aluno: novoAluno })
        } catch (error) {
            resposta.status(500).json({ mensagem: "Erro ao criar aluno.", erro: error.message })
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
            const matricula = requisicao.params.matricula
            const { nome, email, senha } = requisicao.body  // passando parametro para editar
            if (!nome || !email || !senha) {
                return resposta.status(400).json({ mensagem: "Todos os campos devem ser preenchidos" })
            }
            const aluno = await AlunoModel.editar(matricula, nome, email, senha)
            if (aluno.length === 0) {
                return resposta.status(400).json({ mensagem: "Aluno não encontrado" })
            }
            resposta.status(200).json({ mensagem: "Aluno editado com sucesso!", alunoEditado: aluno })
        } catch (error) {
            resposta.status(500).json({ mensagem: "Erro ao atualizar os dados.", erro: error.message })
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

