/** @vitest-environment jsdom */
import { describe, test, expect, beforeEach } from "vitest";
import * as funcoes from "../../lab_4/ex_5.js";

const percorrerDOM = funcoes[Object.keys(funcoes)[0]];

describe("Laboratório 5 - Exercício 5:", () => {
  beforeEach(() => {
    document.body.innerHTML = "";
  });

  test("Deve retornar string vazia quando não há <p> no subárvore", () => {
    document.body.innerHTML = `
      <div id="root">
        <span>Sem parágrafos</span>
        <section><div><span>OK</span></div></section>
      </div>
    `;
    const root = document.getElementById("root");
    
    expect(percorrerDOM(root)).toStrictEqual([]);
  });

  test("Deve capturar um único <p> no nível atual", () => {
    document.body.innerHTML = `
      <div id="root">
        <p>Olá</p>
      </div>
    `;
    const root = document.getElementById("root");
    expect(percorrerDOM(root)).toStrictEqual(["Olá"]);
  });

  test("Deve percorrer recursivamente em profundidade e manter a ordem (pré-ordem por filhos)", () => {
    document.body.innerHTML = `
      <div id="root">
        <p>Um</p>
        <div>
          <p>Dois</p>
          <div>
            <span>Outro nó</span>
            <p>Três</p>
          </div>
        </div>
        <section>
          <p>Quatro</p>
        </section>
      </div>
    `;
    const root = document.getElementById("root");
    // Ordem esperada: "Um" (irmão 1), "Dois" (filho de div), "Três" (neto), "Quatro" (irmão no final)
    expect(percorrerDOM(root)).toStrictEqual(["Um", "Dois", "Três", "Quatro"]);
  });

  test("Deve funcionar iniciando diretamente em um elemento <p>", () => {
    document.body.innerHTML = `
      <div>
        <p id="alvo">Texto alvo</p>
        <p>Outro</p>
      </div>
    `;
    const alvo = document.getElementById("alvo");
    expect(percorrerDOM(alvo)).toStrictEqual(["Texto alvo"]);
  });

  test("Deve ignorar nós de texto e comentários", () => {
    document.body.innerHTML = `
      <div id="root">
        Texto solto
        <!-- comentário -->
        <p>Primeiro</p>
        <div>
          Texto
          <p>Segundo</p>
        </div>
      </div>
    `;
    const root = document.getElementById("root");
    // Apenas textos de <p> entram na concatenação
    expect(percorrerDOM(root)).toStrictEqual(["Primeiro", "Segundo"]);
  });
});
