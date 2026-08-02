const display = document.querySelector('#display')
const teclado = document.querySelector('.keys')
const limparHistorico = document.querySelector('.history__clear')
const historico = document.querySelector('#history-list')

let entradaAtual = '0'
let valorAnterior = null
let operador = null

teclado.addEventListener('click', (e) => {
    const botao = e.target
    if (!botao) return

    const digito = botao.dataset.digit
    const operacao = botao.dataset.op
    const acao = botao.dataset.action

    if (digito) {
        inserirDigito(digito)
        atualizarDisplay(entradaAtual)
        return
    }
    if (operacao) {
        registrarOperacao(operacao)
        return
    }
    if (acao) {
        executarAcao(acao)
        return
    }
});

const inserirDigito = digito => {
    
    if (digito === "." && entradaAtual.includes('.')) return
    
    if (entradaAtual === '0') {
        entradaAtual = digito
        atualizarDisplay(entradaAtual)
    } else {
        entradaAtual += digito
        atualizarDisplay(entradaAtual)
    }
}

const atualizarDisplay = (entrada) => {
    display.textContent = entrada
}

const registrarOperacao = (operacao) => {
    if (operacao === 'raiz' || operacao === 'porcento') {
        calcularUnaria(operacao)
        atualizarDisplay()
    }

    calcularBinaria(operacao)
}

const calcularBinaria = (op) => {
    valorAnterior = Number(entradaAtual)
    operador = op
    entradaAtual = '0'
    
}

const calcularUnaria = op => {
    const valor = number(entradaAtual)
    let resultado = 0
    if (op === 'raiz') resultado = Math.sqrt(valor)
    if (op === 'porcento') resultado = valor/100
    entradaAtual = String(resultado)
    atualizarDisplay(entradaAtual)
}

const executarAcao = acao => {
    switch (acao) {

        case 'clear':
            limparTudo()
            break

        case 'backspace':
            removerUltimoNumero()
            break
        
        case 'sign':
            alterarSinal()
            break
        
        case 'equals':
            break
        
        default: return
    }
}

const limparTudo = () => {
    entradaAtual = '0'
    valorAnterior = null
    operador = null
    atualizarDisplay(entradaAtual)
}

const removerUltimoNumero = () => {
    if (entradaAtual.length > 1){
        entradaAtual = entradaAtual.slice(0, -1)
        atualizarDisplay(entradaAtual)
    } else {
        entradaAtual = '0'
        atualizarDisplay(entradaAtual)
    }
    
}

const alterarSinal = () => {
    if (entradaAtual === '0') return
    if (entradaAtual.startsWith('-')) entradaAtual = entradaAtual.slice(1)
    else entradaAtual = '-' + entradaAtual
    atualizarDisplay(entradaAtual)
}

//const registrarOperacao