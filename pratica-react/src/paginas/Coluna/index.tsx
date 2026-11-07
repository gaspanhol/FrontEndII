import { useContext } from "react"
import ListaTarefas from "../../componentes/ListaTarefas"
import type { Status, Tarefa } from "../../modelo/interface"
import { TarefaContext } from "../../contextos/TarefaContext"
import useTarefas from "../../hooks/useTarefas"

interface ColunaProps {
    tamanho?: number,
    titulo: Status,
}

const Coluna = ({ tamanho, titulo }: ColunaProps) => {

    const { listarTarefas } = useTarefas()
    const tarefas = listarTarefas()

    const listaTarefas = tarefas.filter(tarefa => tarefa.status === titulo)

    return (
        <div className={`col${tamanho ? `-${tamanho}` : ''}`}>
            <h2>{titulo}</h2>
            <ListaTarefas lista={listaTarefas} />
        </div>
    )
}

export default Coluna