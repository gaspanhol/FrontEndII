import { describe, test, expect } from "vitest";
import * as funcoes from "../../lab_3/ex_8.js";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";

function pegarFuncao(modulo) {
  if (typeof modulo.default === "function") return modulo.default;

  const funcoes = Object.entries(modulo)
    .filter(([k, v]) => k !== "default" && typeof v === "function")
    .map(([, v]) => v);

  if (funcoes.length === 1) return funcoes[0];

  throw new Error(
    "Não foi possível identificar a função. Exporte apenas UMA função.",
  );
}

const fib = pegarFuncao(funcoes);

function expectFib(recebido, esperadoNumber) {
  if (typeof recebido === "bigint") {
    expect(recebido).toBe(BigInt(esperadoNumber));
  } else {
    expect(recebido).toBe(esperadoNumber);
  }
}

function lerFonteEx8() {
  const url = new URL("../../lab_3/ex_8.js", import.meta.url);
  return readFileSync(fileURLToPath(url), "utf8");
}

function temIndiciosFortesDeMemoization(code) {
  const c = code.replace(/\/\/.*$/gm, "").replace(/\/\*[\s\S]*?\*\//g, "");

  const temCache =
    /\b(memo|cache|dp|tabela|table|store)\b/i.test(c) ||
    /\bnew\s+(Map|WeakMap)\s*\(/.test(c) ||
    /\b(Array)\b/.test(c);

  const temLeituraCache =
    /\b(memo|cache|dp|tabela|table|store)\b\s*\[\s*[^]+\s*\]/i.test(c) || 
    /\b(memo|cache|dp|tabela|table|store)\b\.(get|has)\s*\(/i.test(c) || 
    /\bhasOwnProperty\s*\(/i.test(c) || 
    /\bin\s+\b(memo|cache|dp|tabela|table|store)\b/i.test(c); 

  const temEscritaCache =
    /\b(memo|cache|dp|tabela|table|store)\b\s*\[\s*[^]+\s*\]\s*=/i.test(c) || 
    /\b(memo|cache|dp|tabela|table|store)\b\.(set)\s*\(/i.test(c) || 
    /\bdp\s*\[\s*[^]+\s*\]\s*=/i.test(c); 

  const temRecursaoIngenuaTipica =
    /return\s+.*\(\s*n\s*-\s*1\s*\)\s*\+\s*.*\(\s*n\s*-\s*2\s*\)/.test(c) &&
    !(temLeituraCache && temEscritaCache);

  return temCache && temLeituraCache && temEscritaCache && !temRecursaoIngenuaTipica;
}

describe("Laboratório 2 - Exercício 8:", () => {
  test("Deve exportar uma função", () => {
    expect(typeof fib).toBe("function");
  });

  test("Deve aceitar os casos base (fib(0)=0, fib(1)=1)", () => {
    expectFib(fib(0), 0);
    expectFib(fib(1), 1);
  });

  test("Deve calcular valores pequenos conhecidos", () => {
    expectFib(fib(2), 1);
    expectFib(fib(3), 2);
    expectFib(fib(4), 3);
    expectFib(fib(5), 5);
    expectFib(fib(10), 55);
  });

  test("Deve calcular valor médio conhecido (fib(20)=6765)", () => {
    expectFib(fib(20), 6765);
  });

  test("Deve calcular valor maior conhecido (fib(40)=102334155)", () => {
    expectFib(fib(40), 102334155);
  });

  test("Deve sempre executar com memoization", () => {
    const code = lerFonteEx8();
    expect(temIndiciosFortesDeMemoization(code)).toBe(true);
  });
});