import {expect, test} from "vitest"
import { paraTarefa } from "./tarefaMapper"

const dto = {
    id: 0,
    todo: "tarefa teste",
    completed: false,
    userId: 0
}

// resultado = {
//     id: 0,
//     titulo: "tarefa teste",
//     status: "a fazer";
// }

test("A função paraTarefa deve retornar um objeto do tipo Tarefa", () => {
    // Arrange + Act
    const resultado = paraTarefa(dto)

    // Assert
    expect(resultado).toEqual({ id: 0, titulo: "tarefa teste", status: "a fazer" as const })

})
