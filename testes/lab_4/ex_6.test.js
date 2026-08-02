/** @vitest-environment jsdom */
import { describe, test, expect, beforeEach, vi } from "vitest";
import * as funcoes from "../../lab_4/ex_6.js";

const filtrarPorTexto = funcoes[Object.keys(funcoes)[0]];
const aplicarEstilo = funcoes[Object.keys(funcoes)[1]];

describe("Laboratório 5 - Exercício 6:", () => {
  beforeEach(() => {
    document.body.innerHTML = "";
  });

  test("filtrarPorTexto(texto) deve retornar predicado que usa element.textContent.includes(texto)", () => {
    document.body.innerHTML = `
      <p id="a">lorem ipsum</p>
      <p id="b">LOREM IPSUM</p>
      <p id="c">dolor sit</p>
    `;
    const a = document.getElementById("a");
    const b = document.getElementById("b");
    const c = document.getElementById("c");

    const pred = filtrarPorTexto("lorem");
    expect(pred(a)).toBe(true);
    expect(pred(b)).toBe(true);
    expect(pred(c)).toBe(false);
  });

  test("aplicarEstilo(estilo) deve retornar função que altera style.color", () => {
    document.body.innerHTML = `<p id="x">texto</p>`;
    const x = document.getElementById("x");

    const pintarVermelho = aplicarEstilo("red");
    pintarVermelho(x);

    expect(x.style.color).toBe("red");
  });

  test("composição manual: Array.filter(filtrarPorTexto).forEach(aplicarEstilo)", () => {
    document.body.innerHTML = `
      <p id="p1">lorem A</p>
      <p id="p2">ipsum B</p>
      <p id="p3">lorem C</p>
    `;
    const elementos = Array.from(document.querySelectorAll("p"));

    elementos.filter(filtrarPorTexto("lorem")).forEach(aplicarEstilo("red"));

    expect(document.getElementById("p1").style.color).toBe("red");
    expect(document.getElementById("p2").style.color).toBe("");
    expect(document.getElementById("p3").style.color).toBe("red");
  });
});
