module.exports = app => { 
    function existsOrError(value, msg) {
        if(!value) throw msg
        if(Array.isArray(value) && value.length === 0 ) throw msg
        if(typeof value === 'string' && !value.trim()) throw msg
    }
    /*
    Aqui estão as funções de validação da entrada de dados no meu banco de dados,
    as mensagens não irão se renderizar no frontend, porque elas foram crias apenas para que ao 
    iniciar o projeto backend, eu fizesse os teste através do PostMan e assim gerasse relatórios sobre 
    a entrada de dados caso houvesse algum inválido, nulo ou outros.. eu poderia simplesmente apagar as
    variaveis das mensagens (msg) e deixar apenas os Valores (value), entretanto para que vocês vejam
    como o backend foi inicialmente estruturado.. eu irei deixar estas variaveis (msg). Vocês poderiam
    até testar a entrada de dados no postman a princípio para ver o retorno destas funções sendo executadas 
    corretamente.
    */

    function notExistsError(value, msg) {
        try{
            existsOrError(value, msg)
        }catch(msg){
            return
        }
        throw msg
    }

    function equalsOrError (valueA, valueB, msg){
        if(valueA !== valueB) throw msg
    }

    return {existsOrError, notExistsError, equalsOrError}
}