
const fs = require('fs')
module.exports = app => {
    const {existsOrError, notExistsError} = app.api.validation // estas varias estão sendo exportadas para fazer a validação dos dados.
    const save = async (req, res) => {
            const veiculos = {...req.body}
            if(req.params.id) veiculos.id = req.params.id
            /**
             * aqui eu concatenei a requisição do corpo numa variável e
             * e depois eu atribui o mesmo valor do corpo nos parametros através do ID.
             */

            try{
                /**
                 * Aqui é a função da validação dos dados e vocês poderão visualiza-las melhor
                 * se a princípio utilizar o PostMan para entender melhor a entrada de dados no meu banco.
                 */
                existsOrError(veiculos.placa, 'Placa não informada!')
                existsOrError(veiculos.chassi, 'Chassi não informada!')
                existsOrError(veiculos.renavam, 'Renavam não informada!')
                existsOrError(veiculos.modelo, 'Modelo não informada!')
                existsOrError(veiculos.marca, 'Marca não informada!')
                existsOrError(veiculos.ano, 'Ano não informada!')
                /**
                 * Aqui está acontecendo o seguinte, está entrando dados e no meu banco
                 * eu pedi para que algumas chaves fossem do tipo Unica, até porque é um sistema de cadastro
                 * de veículos e como tal , existe dados nos veículos que são como nosso CPF, tais
                 *  como (placas, renavans e chassi) que não podem
                 * existir iguais, isso pode caracterizar até como (clonar veículos), e esta função averigua
                 * se  já existe estes dados no nosso banco e assim retorna um erro caso exista e caso não 
                 * coexistir no meu banco ele apenas prossegue a função
                 */

                const veiculosFromDB = await app.db('veiculos').where({'placa': veiculos.placa} 
                    || {'renavam': veiculos.renavam} || {'chassi': veiculos.chassi}).first()

                notExistsError(veiculosFromDB, 'Veículo já cadastrado')
            }catch (erro){
                return res.status(400).send(erro)
            }
            /**
             * esta função abaixo ela faz com que o dado recebido seja guardado em um arquivo .txt
             * eu fiz este algoritmo para guardar estes valores no arquivo APENAS para que vocês possam 
             * ver que eu sei como fazer para salvar em um arquivo e afins... mas ela não terá tamanha
             * importancia no nosso código não.
             */
            const contentString = JSON.stringify(veiculos)

            fs.writeFileSync('arquivo.txt', contentString);
            /**
             * finalmente aqui guarda os valores dentro do banco,
             * como no inicio eu disse que concatenei os valores do corpo da requisição
             * dentro de uma variável , aqui eu pego os valores dentro das variáveis e insiro 
             * dentro do banco, caso ocorra algum erro , o mesmo será retornado.
             */

            app.db('veiculos')
                .insert(veiculos)
                .then(_ => res.status(204).send())
                .catch(erro => res.status(500).send(erro))
    }

    const get =  (req, res) => {
        /**
         * Aqui eu busco os dados dentro do meu banco e retorno eles dentro de JSON,
         * assim quando for requisitado a URL para obter estes dados, será retornado
         * este (select) em forma de JSON e assim poderá ser renderizado no nosso frontend.
         */
            return app.db('veiculos')
                .select('id','marca', 'modelo', 'ano', 'placa', 'chassi', 'renavam')
                .then(veiculo => res.json(veiculo))
                .catch(erro => res.status(500).send(erro))

    }

    const getById = (req, res) => {
        /**
         * Aqui eu faço a mesma coisa na função acima porém , ao invés de retornar um Array
         * como na função acima eu irei retornar apenas 1 objeto em forma de JSON, que será 
         * obtido através do ID passado pelo parametro no frontend.
         */
            return app.db('veiculos')
                .select( 'id', 'marca', 'modelo', 'ano', 'placa', 'chassi', 'renavam')
                .where({'id': req.params.id})
                .then(veiculo => res.json(veiculo))
                .catch(erro => res.status(500).send(erro))
    }

    const update = async (req, res) => {
        /**
         * Aqui é uma função de atualização, os dados recebidos que forem 
         * passados através de um método PUT , possuem um ID setado , e assim
         * através de ID serão passados novos valores aonde este ID passado se 
         * encontrar dentro do nosso banco
         */
        await app.db('veiculos')
            .update(req.body)
            .where({'id': req.params.id})
            .then(veiculo => res.json(veiculo))
            .catch(erro => res.status(500).send(erro))
    }

    const remove = async (req, res) => {
        /**
         * Como na função acima.. será atualizado através do ID passado
         * aqui será removido o registro dos dados aonde aquele ID coexistir.
         */
        try{
            app.db('veiculos')
            .where({'id': req.params.id})
            .del()
            .then(veiculo => res.json(veiculo))
            .catch(erro => res.status(500).send(erro))
           
        }catch(msg){
             throw new Error(msg)
        }

    }
    /**
     * Aqui as funções estão sendo exportadas para que no routes.js possa ser passado os metodos
     * (GET, POST, UPDATE e DELETE) para cada função
     */

    return {save, get, getById, update, remove}
}