import { api } from "./api";
import type { TarefaDTO } from "@/modelo/dto";
import { paraTarefa } from "@/mappers/tarefaMapper";

const listar = async (signal?: AbortSignal) => {
  const { todos } = await api<{ todos: TarefaDTO[] }>("/todos?limit=10", {
    signal,
  });
  return todos.map(paraTarefa);
};

const atualizar = async () => {};

export { listar };
