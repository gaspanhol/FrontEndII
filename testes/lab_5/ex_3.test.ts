import { describe, expect, test } from 'vitest';
import { existsSync, readFileSync } from 'fs';
import path from 'path';
import ts from 'typescript';

const rootDir = path.resolve(__dirname, '../../lab_5');

describe('Laboratório 5 - Exercício 3', () => {
  test('Deve ter variável any e variável unknown com pelo menos 3 atribuições de tipos diferentes cada', () => {
    const srcPath = path.join(rootDir, 'src', 'ex_3.ts');
    expect(existsSync(srcPath)).toBe(true);

    const sourceText = readFileSync(srcPath, 'utf-8');

    const sourceFile = ts.createSourceFile(
      'ex_3.ts',
      sourceText,
      ts.ScriptTarget.ESNext,
      true,
      ts.ScriptKind.TS
    );

    type VarInfo = {
      name: string | null;
      typeKinds: Set<string>;
    };

    const anyInfo: VarInfo = { name: null, typeKinds: new Set() };
    const unknownInfo: VarInfo = { name: null, typeKinds: new Set() };

    function classifyExpression(expr: ts.Expression | undefined, sf: ts.SourceFile): string | null {
      if (!expr) return null;

      switch (expr.kind) {
        case ts.SyntaxKind.StringLiteral:
          return 'string';
        case ts.SyntaxKind.NumericLiteral:
          return 'number';
        case ts.SyntaxKind.TrueKeyword:
        case ts.SyntaxKind.FalseKeyword:
          return 'boolean';
        case ts.SyntaxKind.ObjectLiteralExpression:
          return 'object';
        case ts.SyntaxKind.ArrayLiteralExpression:
          return 'array';
        case ts.SyntaxKind.ArrowFunction:
        case ts.SyntaxKind.FunctionExpression:
          return 'function';
        default:
          return `other:${expr.getText(sf)}`;
      }
    }

    function visit(node: ts.Node) {
      if (ts.isVariableDeclaration(node) && ts.isIdentifier(node.name)) {
        const varName = node.name.text;
        const varTypeText = node.type?.getText(sourceFile).trim();

        if (varTypeText === 'any') {
          if (!anyInfo.name) {
            anyInfo.name = varName;
          }
          if (anyInfo.name === varName) {
            const kind = classifyExpression(node.initializer!, sourceFile);
            if (kind) {
              anyInfo.typeKinds.add(kind);
            }
          }
        } else if (varTypeText === 'unknown') {
          if (!unknownInfo.name) {
            unknownInfo.name = varName;
          }
          if (unknownInfo.name === varName) {
            const kind = classifyExpression(node.initializer!, sourceFile);
            if (kind) {
              unknownInfo.typeKinds.add(kind);
            }
          }
        }
      }

      if (
        ts.isBinaryExpression(node) &&
        node.operatorToken.kind === ts.SyntaxKind.EqualsToken &&
        ts.isIdentifier(node.left)
      ) {
        const varName = node.left.text;

        if (anyInfo.name && varName === anyInfo.name) {
          const kind = classifyExpression(node.right, sourceFile);
          if (kind) {
            anyInfo.typeKinds.add(kind);
          }
        }

        if (unknownInfo.name && varName === unknownInfo.name) {
          const kind = classifyExpression(node.right, sourceFile);
          if (kind) {
            unknownInfo.typeKinds.add(kind);
          }
        }
      }

      ts.forEachChild(node, visit);
    }

    visit(sourceFile);

    expect(anyInfo.name).not.toBeNull();
    expect(anyInfo.typeKinds.size).toBeGreaterThanOrEqual(3);

    expect(unknownInfo.name).not.toBeNull();
    expect(unknownInfo.typeKinds.size).toBeGreaterThanOrEqual(3);
  });
});
