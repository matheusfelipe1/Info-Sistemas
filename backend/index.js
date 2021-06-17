const app = require('express')()
const consig = require('consign')
const db = require('./config/db')

/**
 * Aqui está nossa configuração de backend em nodejs, utilizando o express
 * conseguimos subir o servidor..
 * este componente "db" é o componente que faz a configuração do banco e criação de tabelas,
 * o consig é o componente que faz a leitura de todo o nosso arquivo presente no backend,
 * e insere dentro app (express) que assim conseguimos utilizar qualquer um destes arquivos em nosso
 * backend sem gerar eventuais erros.
 */

app.db = db

consig()
    .include('./config/passport.js')
    .then('./config/middlewares.js')
    .then('./api/validation.js')
    .then('./api')
    .then('./config/routes.js')
    .into(app)

app.listen(3000, () => {
    console.log('Backend executando...')
})