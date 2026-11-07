import { Link } from "react-router"

const Cabecalho = ({ titulo }: { titulo: string }) => {

    return (
        <header>
            <nav className="navbar navbar-expand-lg bg-1 fg-2">
                <div className="container-fluid">
                    <a className="navbar-brand" href="#">
                        <img src="src/assets/react.svg" alt="Logo" width="30" height="24" className="d-inline-block align-text-top" />
                        {titulo}
                    </a>
                </div>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <Link className="nav-link" to={'/'}>Principal</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to={'sobre'}>Sobre</Link>
                        </li>
                    </ul>
                </div>
            </nav>
        </header>
    )
}

export default Cabecalho