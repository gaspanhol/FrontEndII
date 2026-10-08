interface TituloProps {
    texto: String
    // nivel: number
}

const Titulo = ({ texto } : TituloProps) => {
    
    return(
        <h1>{texto}</h1>
    )
}

export default Titulo