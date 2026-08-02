import { describe, expect, test } from "vitest";
import { existsSync, readFileSync } from "fs";
import path from "path";
import ts from "typescript";

const rootDir = path.resolve(__dirname, "../../lab_5");

describe("Laboratório 5 - Exercício 4", () => {
  test("Deve criar um objeto com pelo menos três propriedades de tipos diferentes e usar console.log", () => {
    const srcPath = path.join(rootDir, "src", "ex_4.ts");
    expect(existsSync(srcPath)).toBe(true);

    const sourceText = readFileSync(srcPath, "utf-8");

    const sourceFile = ts.createSourceFile(
      "ex_4.ts",
      sourceText,
      ts.ScriptTarget.ESNext,
      true,
      ts.ScriptKind.TS
    );

    let hasObjectWith3DifferentTypes = false;
    let hasConsoleLog = false;

    function classifyExpression(
      expr: ts.Expression | undefined,
      sf: ts.SourceFile
    ): string | null {
      if (!expr) return null;

      switch (expr.kind) {
        case ts.SyntaxKind.StringLiteral:
          return "string";
        case ts.SyntaxKind.NumericLiteral:
          return "number";
        case ts.SyntaxKind.TrueKeyword:
        case ts.SyntaxKind.FalseKeyword:
          return "boolean";
        case ts.SyntaxKind.ObjectLiteralExpression:
          return "object";
        case ts.SyntaxKind.ArrayLiteralExpression:
          return "array";
        case ts.SyntaxKind.ArrowFunction:
        case ts.SyntaxKind.FunctionExpression:
          return "function";
        default:
          return `other:${expr.getText(sf)}`;
      }
    }

    function visit(node: ts.Node) {
      if (
        ts.isVariableDeclaration(node) &&
        node.initializer &&
        ts.isObjectLiteralExpression(node.initializer)
      ) {
        const objLiteral = node.initializer;
        const typeKinds = new Set<string>();

        for (const prop of objLiteral.properties) {
          if (
            ts.isPropertyAssignment(prop) ||
            ts.isShorthandPropertyAssignment(prop) ||
            ts.isMethodDeclaration(prop)
          ) {
            let initializer: ts.Expression | undefined;

            if (ts.isPropertyAssignment(prop)) {
              initializer = prop.initializer;
            } else if (ts.isShorthandPropertyAssignment(prop)) {
              initializer = prop.name as unknown as ts.Expression;
            } else if (ts.isMethodDeclaration(prop)) {
              initializer = prop as unknown as ts.Expression;
            }

            const kind = classifyExpression(initializer, sourceFile);
            if (kind) {
              typeKinds.add(kind);
            }
          }
        }

        if (objLiteral.properties.length >= 3 && typeKinds.size >= 3) {
          hasObjectWith3DifferentTypes = true;
        }
      }

      if (ts.isCallExpression(node)) {
        const expr = node.expression;
        if (
          ts.isPropertyAccessExpression(expr) &&
          ts.isIdentifier(expr.expression) &&
          expr.expression.text === "console" &&
          expr.name.text === "log"
        ) {
          hasConsoleLog = true;
        }
      }

      ts.forEachChild(node, visit);
    }

    visit(sourceFile);

    expect(hasObjectWith3DifferentTypes).toBe(true);
    expect(hasConsoleLog).toBe(true);
  });
});
