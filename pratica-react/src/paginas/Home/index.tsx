import Cabecalho from "../Cabecalho"
import Principal from "../Principal"
import Rodape from "../Rodape"

const Home = () => {

    return (
        <div className="vh-100">
            <Cabecalho titulo="Quadro Kanban" />
            <Principal />
            <Rodape />
        </div>
    )
}

export default Home