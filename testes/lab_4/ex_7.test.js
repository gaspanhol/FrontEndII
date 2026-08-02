/** @vitest-environment jsdom */
import { describe, test, expect, beforeEach } from "vitest";
import * as funcoes from "../../lab_4/ex_7.js";

const contadorCliques = funcoes[Object.keys(funcoes)[0]];

describe("Laboratório 5 - Exercício 7:", () => {
  beforeEach(() => {
    document.body.innerHTML = "";
  });

  test("Deve incrementar e exibir a contagem no botão", () => {
    document.body.innerHTML = `<button id="btn">Clique: 0</button>`;
    const btn = document.getElementById("btn");

    const handler = contadorCliques();
    btn.addEventListener("click", handler);

    expect(btn.textContent).toBe("Clique: 0");

    btn.click();
    expect(btn.textContent).toBe("Clique: 1");

    btn.click();
    expect(btn.textContent).toBe("Clique: 2");

    btn.click();
    expect(btn.textContent).toBe("Clique: 3");
  });

  test("Deve manter estados independentes entre duas instâncias (closures diferentes)", () => {
    document.body.innerHTML = `
      <button id="a">Clique: 0</button>
      <button id="b">Clique: 0</button>
    `;
    const a = document.getElementById("a");
    const b = document.getElementById("b");

    const ha = contadorCliques();
    const hb = contadorCliques();

    a.addEventListener("click", ha);
    b.addEventListener("click", hb);

    a.click(); // a: 1
    a.click(); // a: 2
    b.click(); // b: 1

    expect(a.textContent).toBe("Clique: 2");
    expect(b.textContent).toBe("Clique: 1");

    b.click(); // b: 2
    expect(b.textContent).toBe("Clique: 2");
  });

  test("Deve funcionar com chamada direta usando this via .call (sem addEventListener)", () => {
    document.body.innerHTML = `<button id="btn">x</button>`;
    const btn = document.getElementById("btn");

    const h = contadorCliques();
    h.call(btn); // 1
    expect(btn.textContent).toBe("Clique: 1");

    h.call(btn); // 2
    expect(btn.textContent).toBe("Clique: 2");
  });

  test("Deve lançar erro quando invocado sem contexto (this indefinido em módulos ES/strict)", () => {
    const h = contadorCliques();
    expect(() => h()).toThrow(TypeError);
  });

  test("Deve preservar estado ao remover e reanexar o mesmo handler", () => {
    document.body.innerHTML = `<button id="btn">Clique: 0</button>`;
    const btn = document.getElementById("btn");

    const h = contadorCliques();
    btn.addEventListener("click", h);

    btn.click(); // 1
    expect(btn.textContent).toBe("Clique: 1");

    btn.removeEventListener("click", h);
    // (nenhum clique contado enquanto não anexado)
    btn.addEventListener("click", h);

    btn.click(); // continua de 1 -> 2
    expect(btn.textContent).toBe("Clique: 2");
  });

  test('Deve ignorar texto inicial pré-existente e sempre sobrepõe para "Clique: n"', () => {
    document.body.innerHTML = `<button id="btn">Qualquer coisa</button>`;
    const btn = document.getElementById("btn");

    const h = contadorCliques();
    btn.addEventListener("click", h);

    btn.click(); // 1
    expect(btn.textContent).toBe("Clique: 1");
  });
});
