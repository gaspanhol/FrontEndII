import { TarefaProvider } from "../../contextos/TarefaProvider"
import Cabecalho from "../Cabecalho"
import Principal from "../Principal"
import Rodape from "../Rodape"

const Home = () => {

    return (
        <div className="container">
            <Cabecalho titulo="Quadro Kanban" />
            <TarefaProvider>
                <Principal />
            </TarefaProvider>
            <Rodape />
        </div>
    )
}

export default Home