import type { TarefaDTO } from "@/modelo/dto";
import type { Tarefa } from "@/modelo/interface";

const paraTarefa = (dto: TarefaDTO): Tarefa => ({
  id: dto.id,
  titulo: dto.todo,
  status: dto.completed ? "feito" : "a fazer",
});

export { paraTarefa };
