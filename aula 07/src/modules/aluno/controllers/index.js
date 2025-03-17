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

    static async listarTodos(req,res){
        try {
            const alunos = await AlunoModel.listar()
            if(alunos.listar === 0){
                return res.status(400).json({msg: "Não foi encontrado nenhum aluno"})
            }
            res.status(200).json(alunos)
        } catch (error) {
            res.status(500).json({msg: "Erro ao criar o aluno!", erro: error.message})
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

    static async editar(requisicao, resposta) {
        try {
            const matricula = requisicao.params.id;
            const { nome, email, senha } = requisicao.body;
            
            if (!nome && !email && !senha) {
                return resposta.status(400).json({ mensagem: "Pelo menos um campo deve ser atualizado." });
            }
            const alunoAtualizado = await AlunoModel.editar(matricula, { nome, email, senha });
            if (!alunoAtualizado) {
                return resposta.status(400).json({ mensagem: "Aluno não encontrado." });
            }
            resposta.status(200).json({ mensagem: "Aluno atualizado com sucesso", aluno: alunoAtualizado });
        } catch (error) {
            resposta.status(500).json({ mensagem: "Erro ao editar aluno.", erro: error.message });
        }
    }

    static async excluirPorID(requisicao, resposta) {
        try {
            const matricula = requisicao.params.id;
            const alunoExcluido = await AlunoModel.excluirPorID(matricula);
            if (!alunoExcluido) {
                return resposta.status(400).json({ mensagem: "Aluno não encontrado." });
            }
            resposta.status(200).json({ mensagem: "Aluno excluído com sucesso." });
        } catch (error) {
            resposta.status(500).json({ mensagem: "Erro ao excluir aluno.", erro: error.message });
        }
    }


    static async excluirTodos(requisicao, resposta) {
        try {
            await AlunoModel.excluirTodos();
            resposta.status(200).json({ mensagem: "Todos os alunos foram excluídos com sucesso." });
        } catch (error) {
            resposta.status(500).json({ mensagem: "Erro ao excluir todos os alunos.", erro: error.message });
        }
    }
}

module.exports = AlunoController;
