require('dotenv').config(); // Carrega as variáveis do arquivo .env
const { Sequelize } = require('sequelize');
// Configuração da conexão com o banco de dados
const sequelize = new Sequelize(
 process.env.DEV_DB_NOME,
 process.env.DEV_DB_USER,
 process.env.DEV_DB_PASSWORD, {
 host: process.env.DEV_DB_HOST,
 dialect: process.env.DIALECT, // Exemplo: 'postgres'
 port: process.env.DEV_DB_PORTA, // Porta do banco de dados
 dialect: 'postgres', 
 logging: true // Define se os logs de SQL serão exibidos
 }
);
module.exports = sequelize;
