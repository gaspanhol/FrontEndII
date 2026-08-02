import { describe, test, expect } from "vitest";
import * as funcoes from "../../lab_3/ex_9.js";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";

function pegarFabrica(modulo) {
  if (typeof modulo.default === "function") return modulo.default;

  const funcoes = Object.entries(modulo)
    .filter(([k, v]) => k !== "default" && typeof v === "function")
    .map(([, v]) => v);

  if (funcoes.length === 1) return funcoes[0];

  throw new Error(
    "Não foi possível identificar a função. Exporte apenas UMA função.",
  );
}

const potenciaMemo = pegarFabrica(funcoes);

function lerFonteEx9() {
  const url = new URL("../../lab_3/ex_9.js", import.meta.url);
  return readFileSync(fileURLToPath(url), "utf8");
}

function temIndiciosFortesDeMemoizationFactory(code) {
  const c = code.replace(/\/\/.*$/gm, "").replace(/\/\*[\s\S]*?\*\//g, "");

  const ehFabrica = /return\s+function\b/.test(c) || /=>\s*\(\s*.*=>/.test(c);

  const temCache =
    /\b(cache|memo|dp|tabela|table|store)\b/i.test(c) ||
    /\bnew\s+(Map|WeakMap)\s*\(/.test(c) ||
    /\bObject\.create\s*\(\s*null\s*\)/.test(c);

  const temChaveComposta =
    /`[^`]*\$\{[^}]+\}[^`]*,\s*\$\{[^}]+\}[^`]*`/.test(c) ||
    /JSON\.stringify\s*\(\s*\[\s*[^,]+,\s*[^]+\]\s*\)/.test(c) ||
    /\[\s*[^,]+,\s*[^]+\s*\]\s*\.join\s*\(/.test(c);

  const temLeituraCache =
    /\b(cache|memo|dp|tabela|table|store)\b\.(get|has)\s*\(/i.test(c) ||
    /\b(cache|memo|dp|tabela|table|store)\b\s*\[\s*[^]+\s*\]/i.test(c) ||
    /\bin\s+\b(cache|memo|dp|tabela|table|store)\b/i.test(c) ||
    /\bhasOwnProperty\s*\(/i.test(c);

  const temEscritaCache =
    /\b(cache|memo|dp|tabela|table|store)\b\.(set)\s*\(/i.test(c) ||
    /\b(cache|memo|dp|tabela|table|store)\b\s*\[\s*[^]+\s*\]\s*=/i.test(c);

  return ehFabrica && temCache && temChaveComposta && temLeituraCache && temEscritaCache;
}

function makeBaseComContador(n, counters) {
  return {
    toString() {
      counters.toString++;
      return String(n);
    },
    valueOf() {
      counters.valueOf++;
      return n;
    },
  };
}

describe("Laboratório 2 - Exercício 9:", () => {
  test("Deve exportar uma função fábrica que retorna a função de potência", () => {
    expect(typeof potenciaMemo).toBe("function");
    const potencia = potenciaMemo();
    expect(typeof potencia).toBe("function");
  });

  test("Deve calcular potências básicas corretamente", () => {
    const potencia = potenciaMemo();

    expect(potencia(2, 0)).toBe(1);
    expect(potencia(2, 1)).toBe(2);
    expect(potencia(2, 3)).toBe(8);
    expect(potencia(5, 2)).toBe(25);
    expect(potencia(3, 10)).toBe(59049);
  });

  test("Deve ser determinística dentro da mesma instância", () => {
    const potencia = potenciaMemo();
    const r1 = potencia(7, 6);
    const r2 = potencia(7, 6);
    expect(r1).toBe(r2);
  });

  test("Deve sempre verificar memoization (segunda chamada com mesmos argumentos NÃO recalcula)", () => {
    const potencia = potenciaMemo();

    const counters = { toString: 0, valueOf: 0 };
    const base = makeBaseComContador(2, counters);

    potencia(base, 12);
    const depoisPrimeira = counters.valueOf;

    potencia(base, 12);
    const depoisSegunda = counters.valueOf;

    expect(depoisPrimeira).toBeGreaterThan(0);
    expect(depoisSegunda).toBe(depoisPrimeira);
  });

  test("Deve sempre verificar padrão de fábrica", () => {
    const potencia1 = potenciaMemo();
    const potencia2 = potenciaMemo();

    const counters = { toString: 0, valueOf: 0 };
    const base = makeBaseComContador(2, counters);

    potencia1(base, 12);
    const aposPot1 = counters.valueOf;

    potencia1(base, 12);
    const aposPot1DeNovo = counters.valueOf;
    expect(aposPot1DeNovo).toBe(aposPot1);

    potencia2(base, 12);
    const aposPot2 = counters.valueOf;
    expect(aposPot2).toBeGreaterThan(aposPot1);
  });

  test("Deve sempre executar com memoization", () => {
    const code = lerFonteEx9();
    expect(temIndiciosFortesDeMemoizationFactory(code)).toBe(true);
  });
});