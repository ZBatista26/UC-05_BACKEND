const sequelize = require('../../../config/configDb');
const { DataTypes } = require('sequelize');

const ProfessorModel = sequelize.define('ProfessorModel', {
    matricula: {
        type: DataTypes.CHAR(5),
        primaryKey: true,
        validate: {
            is: {
                args: /^[a-zA-Z]\d{4}$/,
                msg: 'A matrícula deve começar com uma letra e ter quatro números em seguida'
            }
        }
    },
    nome: {
        type: DataTypes.STRING(100),
        allowNull: false,
        validate: {
            isAlpha: {
                msg: 'É permitido apenas letras!'
            }
        }
    },
    email: {
        type: DataTypes.STRING(100),
        unique: true,
        allowNull: false,
        validate: {
            is: {
                args: /^[A-Za-z0-9._%+-]+@rn\.senac\.br$/,
                msg: 'E-mail inválido! O e-mail deve pertencer ao domínio @rn.senac.br'
            }
        }
    },
    senha: {
        type: DataTypes.STRING(12),
        allowNull: false,
        validate: {
            len: {
                args: [8, 12],
                msg: 'A senha deve ter entre 8 e 12 caracteres!'
            },
            is: {
                args: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/,
                msg: 'A senha deve conter ao menos uma letra maiúscula, uma minúscula, um número e um caractere especial!'
            }
        }
    }
}, {
    tableName: 'professor',
    createdAt: 'criando_em',
    updatedAt: 'atualizado_em'
});

module.exports = ProfessorModel;
