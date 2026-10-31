import { useContext } from "react"
import { TarefaContext } from "../contextos/TarefaContext"

const useTarefas = () => {

    const contexto = useContext(TarefaContext)
    
    if (!contexto) { 
        throw new Error("useTarefas deve ser usado dentro de TarefasProvider")
    }
    const {tarefas, setTarefas} = contexto 

    const alterarPrioridade = (id: number, prioridade: number): void => {
        setTarefas(tarefas.map(tarefa => (tarefa.id === id ? { ...tarefa, prioridade } : tarefa)))
    }
    return {alterarPrioridade}
}

export default useTarefas