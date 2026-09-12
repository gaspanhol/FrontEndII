// IIFE

(function () {
    var contador = 0
    var numero = document.getElementById('numero')

    function incrementar() {
        contador++
        numero.innerText = contador
    }

    function resetar() {
        contador = 0
        numero.innerText = contador
    }

    window.incrementar = incrementar
    window.resetar = resetar
})()

var App = App || {}

App.contador = (function(){
    var contador = 0
    var numero = document.getElementById('numero')

    function incrementar() {
        contador++
        numero.innerText = contador
    }

    function resetar() {
        contador = 0
        numero.innerText = contador
    }
    window.resetar = resetar
    
    return {
        incrementar: incrementar,
        resetar: resetar
    }
}) ()