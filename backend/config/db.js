const config = require('../knexfile')
const knex = require('knex')(config)

knex.migrate.latest([config]);
module.exports = knex;

/**
 * Este arquivo knex que está sendo chamado é um arquivo de configuração
 *  muito importante para a criação das tabelas de dados no
 * mysql através do nosso backend em NodeJS
 */