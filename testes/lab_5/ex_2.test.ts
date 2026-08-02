import { describe, expect, test } from "vitest";
import { existsSync, readFileSync } from "fs";
import path from "path";
import ts from "typescript";

const rootDir = path.resolve(__dirname, "../../lab_5");

describe("Laboratório 5 - Exercício 2", () => {
  test("Deve ter pelo menos 3 variáveis com tipos explícitos e 3 com tipos inferidos", () => {
    const srcPath = path.join(rootDir, "src", "ex_2.ts");
    expect(existsSync(srcPath)).toBe(true);

    const sourceText = readFileSync(srcPath, "utf-8");

    const sourceFile = ts.createSourceFile(
      "ex_2.ts",
      sourceText,
      ts.ScriptTarget.ESNext,
      true,
      ts.ScriptKind.TS
    );

    let explicitCount = 0;
    let inferredCount = 0;
    const explicitTypes = new Set<string>();

    function visit(node: ts.Node) {
      if (ts.isVariableDeclaration(node) && ts.isIdentifier(node.name)) {
        const hasTypeAnnotation = !!node.type;
        const hasInitializer = !!node.initializer;

        if (hasTypeAnnotation) {
          explicitCount++;
          explicitTypes.add(node.type!.getText(sourceFile));
        } else if (hasInitializer) {
          inferredCount++;
        }
      }

      ts.forEachChild(node, visit);
    }

    visit(sourceFile);

    expect(explicitCount).toBeGreaterThanOrEqual(3);
    expect(explicitTypes.size).toBeGreaterThanOrEqual(3);

    expect(inferredCount).toBeGreaterThanOrEqual(3);
  });
});
