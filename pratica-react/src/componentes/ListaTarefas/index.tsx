import { Link } from "react-router";
import type { Tarefa } from "../../modelo/interface";
import Prioridade from "../Prioridade";
import style from "./style.module.css";

interface ListaTarefasProps {
  lista: Tarefa[];
}

const ListaTarefas = ({ lista }: ListaTarefasProps) => {
  return (
    <ul className="list-group">
      {lista.map((tarefa) => (
        <li
          key={tarefa.id}
          className="list-group-item d-flex justify-content-between"
        >
          <Link className={`mb-0 ${style.link}`} to={`tarefa/${tarefa.id}`}>
            {tarefa.titulo}
          </Link>
          <Prioridade id={tarefa.id} />
        </li>
      ))}
    </ul>
  );
};

export default ListaTarefas;
