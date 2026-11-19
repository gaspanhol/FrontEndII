import { expect, test, vi, beforeEach, describe} from "vitest";
import {fireEvent, render, screen} from "@testing-library/react"
import Exclamacao from ".";


describe("O componente Exclamacao", () => {
    test(" deve ser cinza quando não selecionado", () => {
        render(<Exclamacao selecionado = {false} aoSelecionar={() => {}}/>)
    
        const exclamacao = screen.getByTestId("exclamacao")
    
        expect(exclamacao.getAttribute("color")).toBe('gray')
    })  
    
    test(" deve chamar a função aoSelecionar quando clicado", () => {
        //Arrange
        const funcaoMock = vi.fn()
        render(<Exclamacao selecionado={false} aoSelecionar={funcaoMock}/>)
    
        const exclamacao = screen.getByTestId("exclamacao")
    
        //Act
        fireEvent.click(exclamacao)
    
        //Assert
        expect(funcaoMock).toHaveBeenCalled()
    })

})