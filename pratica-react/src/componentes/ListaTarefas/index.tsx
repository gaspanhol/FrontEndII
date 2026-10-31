import type { Tarefa } from "../../modelo/interface"
import Prioridade from "../Prioridade"

interface ListaTarefasProps {
    lista: Tarefa[],
}

const ListaTarefas = ({ lista }: ListaTarefasProps) => {

    return (
        <ul className="list-group">
            {lista.map(tarefa => (
                <li key={tarefa.id} className="list-group-item d-flex justify-content-between">
                    <p className="mb-0">{tarefa.titulo}</p>
                    <Prioridade id={tarefa.id} />
                </li>
            ))}
        </ul>
    )
}

export default ListaTarefas