const {DataTypes  } = require('sequelize');
const sequelize = require ('../../../config/configDb')

const Professor = sequelize.define('professor',{
    matricula: {
       type: DataTypes.CHAR(8),
       primaryKey: true,
       validate:{
            is:{
                args: /^[A-Za-z][0-9]{7}$/,
                msg: 'A matricula deve começar com uma letra e mais 7 números'
            }
       }
    },

    nome: {
       type: DataTypes.STRING(100),
       allowNull: false,
       validate:{
                len:{
                args:[100]
            }
       }
    }, 

    email: {
        type:  DataTypes.STRING(100),
        allowNull: false,
        unique: true,
        validate:{
            isEmail:{
                msg: 'Forneça um e-mail valido!'
            }
        }
    }, 

    senha: {
       type: DataTypes.CHAR(10),
       allowNull: false,
       validate:{
            args: /^(?=.*[a-z])(?=.*[A-Z])(?=.*[^A-Za-z0-9]).{10}$/,
            msg: 'A senha deve ter exatamente 10 caracteres, incluindo uma letra maiúscula, uma letra minúscula, um caractere especial.',

       }
    }
})

module.exports = Professor