import { BrowserRouter, Route, Routes } from "react-router";
import "./App.css";
import { TarefaProvider } from "./contextos/TarefaProvider";
import Cabecalho from "./paginas/Cabecalho";
import Principal from "./paginas/Principal";
import Rodape from "./paginas/Rodape";
import Formulario from "./componentes/Formulario";

function App() {
  return (
    <div className="container">
      <BrowserRouter>
        <Cabecalho titulo="Quadro Kanban" />
        <TarefaProvider>
          <Routes>
            <Route index element={<Principal />} />
            <Route path="sobre" element={<h2>SOBRE</h2>} />
            <Route path="tarefa/:id" element={<Formulario />} />
            <Route path="*" element={<h2>404 - Página não encontrada!</h2>} />
          </Routes>
        </TarefaProvider>
        <Rodape />
      </BrowserRouter>
    </div>
  );
}

export default App;
