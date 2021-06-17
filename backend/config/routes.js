module.exports = app => {


    app.route('/veiculos')
        .post(app.api.veiculos.save)
        .get(app.api.veiculos.get)

    app.route('/veiculos/:id')
        .get(app.api.veiculos.getById)
        .put(app.api.veiculos.update)
        .delete(app.api.veiculos.remove)

    /**
     * Aqui estão as rotas com seus Metodos para cada função que está sendo exportada em "veiculos.js"
     */

  
}