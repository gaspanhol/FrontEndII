import { useParams } from "react-router";
import useTarefas from "../../hooks/useTarefas";

const Formulario = () => {
  const { id } = useParams();
  const { buscarTarefa } = useTarefas();
  const tarefa = id ? buscarTarefa(Number(id)) : null;

  return (
    <form action="">
      <label htmlFor="titulo-tarefa" className="form-label">
        Título
      </label>
      <input
        id="titulo-tarefa"
        className="form-control form-control-lg"
        type="text"
        name="titulo"
        placeholder="Titulo da tarefa"
        value={tarefa?.titulo}
      ></input>
    </form>
  );
};

export default Formulario;
