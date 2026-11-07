import { useState } from "react"
import type { Tarefa } from "../../modelo/interface"
import Coluna from "../Coluna"

const Principal = () => {

    return (
        <main className="h-100">
            <div className="row">
                <Coluna tamanho={4} titulo='a fazer' />
                <Coluna tamanho={4} titulo='fazendo' />
                <Coluna tamanho={4} titulo='feito' />
            </div>
        </main>
    )
}

export default Principal