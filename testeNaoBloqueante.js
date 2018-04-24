var frase;

var carregaFrase = function (callback) {
    setTimeout(function() {
        //Simula leitura da frase no banco de dados.
        frase = "Minha frase obstrutiva";
        callback();
    }, 3000)
}

var imprimeFrase = function () {
    console.log(frase);
}

carregaFrase(imprimeFrase);

console.log('Olá');