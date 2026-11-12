import { useEffect, useState, type ReactNode } from "react"
import type { Tarefa } from "../modelo/interface"
import { TarefaContext } from "./TarefaContext"
import type { TarefaDTO } from "@/modelo/dto"
import { paraTarefa } from "@/mappers/tarefaMapper"

const TarefaProvider = ({ children }: { children: ReactNode }) => {
    const [tarefas, setTarefas] = useState<Tarefa[]>([
        {
            id: 1,
            titulo: 'estudar react e funcional',
            status: 'a fazer',
        },
        {
            id: 2,
            titulo: 'fazer trabalho FE2',
            status: 'a fazer'
        }
    ])

    useEffect(() => {
        // const carregarTarefas = async () => {
        //     try {
        //         const resposta = await fetch("https://dummyjson.com/todos?limit=10")
        //         const json = await resposta.json()
        //         const tarefasRecebidas: TarefaDTO[] = json['todos']
        //         const tarefasTraduzidas: Tarefa[] = tarefasRecebidas.map(paraTarefa)
        //         setTarefas(tarefasTraduzidas)
        //         console.log(json)
        //     } catch (erro){
        //         console.log(erro)
        //     }
        // }

        const carregarTarefas = async () => {
             const tarefasTraduzidas = await fetch('https://dummyjson.com/todos?limit=10')
                .then(resposta => resposta.json())
                .then(dto => dto['todos'])
                .then(todos => todos.map(paraTarefa))
                .catch(erro => console.log(erro))
            setTarefas(tarefasTraduzidas)
        }



        carregarTarefas()
    }, [])

    return (
        <TarefaContext value={{tarefas, setTarefas}}>
            {children}
        </TarefaContext>
    )

}

export { TarefaProvider }