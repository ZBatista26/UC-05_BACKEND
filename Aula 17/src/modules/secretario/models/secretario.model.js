const sequelize = require('../../../config/configDb');
const { DataTypes } = require ('sequelize');

const SecretarioModel = sequelize.define('SecretarioModel', {
    matricula: {
        type: DataTypes.CHAR(5),
        primaryKey: true,
        validate: {
            isIn:{
                args:/^[a- zA-Z]\d{4}$/,
                msg:'A matricula deve começar com uma letra e ter quatro números em seguida'
            }
        }
    },
    nome: {
        type: DataTypes.STRING(100),
        allowNull: false,
        validate: {
            isAlpha:{
                msg:'É permitido apenas letras!'
            }
        }

    },
    email: {
        type: DataTypes.STRING(100),
        unique: true,
        allowNull: false,
        validate: {
            isEmail:{
                args:/^[A-Za-z0-9._%+-]+@rn\.senac\.br$/,
                msg: 'E-mail invalido! O e-mail deve pertencer ao sominio @rn.senac.br'
            }
        }
    },
    senha: {
        type: DataTypes.STRING(12),
        allowNull: false,
        validate: {
            len: {
                args:[8,12],
                msg: 'A senha deve ter no mínimo 8 caracteres e no máximo 12!'
            },
            is:{
                args: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+{}\[\]:;<>,.?/~\-]).{8,}$/,
                msg: 'A senha deve ter pelo o menos 8 caracteres, incluindo uma letra maiúscula'

            }
        }
    }
},
{
    tableName: 'secretario',
    createdAt: 'criado_em',
    updatedAt: 'atualizado_em'
}
);

module.exports = SecretarioModel