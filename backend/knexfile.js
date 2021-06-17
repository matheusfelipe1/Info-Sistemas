const { db } = require('./.env')

module.exports = {
	client: 'mysql',
	connection: db,
	pool: {
		min: 2,
		max: 10
	},
	migrations: {
		tableName: 'knex_migrations'
	}
};

/* Aqui começa a configuração do banco de dados , os dados do banco como:
port, host, password e etc .. eu os salvei no arquivo .env e assim tenho a opção de escolher
subir para o gitHub o arquivo .env contendo as configurações do meu banco de dados.
Em prol do processo seletivo eu vou subir ele para um entendimento maior do meu projeto.
*/