import { describe, expect, test } from 'vitest';
import { existsSync, readFileSync } from 'fs';
import path from 'path';
import ts from 'typescript';

const rootDir = path.resolve(__dirname, '../../lab_5');

describe('Laboratório 5 - Exercício 5', () => {
  test('Deve definir um tipo de objeto com propriedades obrigatórias e index signature e adicionar 5 propriedades extras em uma instância', () => {
    const srcPath = path.join(rootDir, 'src', 'ex_5.ts');
    expect(existsSync(srcPath)).toBe(true);

    const sourceText = readFileSync(srcPath, 'utf-8');

    const sourceFile = ts.createSourceFile(
      'ex_5.ts',
      sourceText,
      ts.ScriptTarget.ESNext,
      true,
      ts.ScriptKind.TS
    );

    let hasFlexibleObjectType = false;

    const instanceMap = new Map<
      string,
      { baseProps: Set<string>; extraProps: Set<string> }
    >();

    function registerBaseProps(varName: string, objLiteral: ts.ObjectLiteralExpression) {
      let info = instanceMap.get(varName);
      if (!info) {
        info = { baseProps: new Set(), extraProps: new Set() };
        instanceMap.set(varName, info);
      }

      for (const prop of objLiteral.properties) {
        if (ts.isPropertyAssignment(prop) || ts.isShorthandPropertyAssignment(prop)) {
          const name = prop.name?.getText(sourceFile);
          if (name) {
            info.baseProps.add(name);
          }
        }
      }
    }

    function registerExtraProp(varName: string, propName: string) {
      const info = instanceMap.get(varName);
      if (!info) return;

      if (!info.baseProps.has(propName)) {
        info.extraProps.add(propName);
      }
    }

    function visit(node: ts.Node) {
      if (ts.isInterfaceDeclaration(node)) {
        const typeLiteral = node.members as ts.NodeArray<ts.TypeElement>;
        const requiredProps = typeLiteral.filter(
          (m) =>
            ts.isPropertySignature(m) &&
            !m.questionToken
        );
        const hasIndexSignature = typeLiteral.some((m) =>
          ts.isIndexSignatureDeclaration(m)
        );
        if (requiredProps.length >= 3 && hasIndexSignature) {
          hasFlexibleObjectType = true;
        }
      }

      if (ts.isTypeAliasDeclaration(node) && ts.isTypeLiteralNode(node.type)) {
        const typeLiteral = node.type.members;
        const requiredProps = typeLiteral.filter(
          (m) =>
            ts.isPropertySignature(m) &&
            !m.questionToken
        );
        const hasIndexSignature = typeLiteral.some((m) =>
          ts.isIndexSignatureDeclaration(m)
        );
        if (requiredProps.length >= 3 && hasIndexSignature) {
          hasFlexibleObjectType = true;
        }
      }

      if (ts.isVariableDeclaration(node) && node.type && ts.isTypeLiteralNode(node.type)) {
        const typeLiteral = node.type.members;
        const requiredProps = typeLiteral.filter(
          (m) =>
            ts.isPropertySignature(m) &&
            !m.questionToken
        );
        const hasIndexSignature = typeLiteral.some((m) =>
          ts.isIndexSignatureDeclaration(m)
        );
        if (requiredProps.length >= 3 && hasIndexSignature) {
          hasFlexibleObjectType = true;
        }
      }

      if (
        ts.isVariableDeclaration(node) &&
        ts.isIdentifier(node.name) &&
        node.initializer &&
        ts.isObjectLiteralExpression(node.initializer)
      ) {
        const varName = node.name.text;
        registerBaseProps(varName, node.initializer);
      }

      if (
        ts.isBinaryExpression(node) &&
        node.operatorToken.kind === ts.SyntaxKind.EqualsToken
      ) {
        if (
          ts.isPropertyAccessExpression(node.left) &&
          ts.isIdentifier(node.left.expression)
        ) {
          const varName = node.left.expression.text;
          const propName = node.left.name.text;
          registerExtraProp(varName, propName);
        }

        if (
          ts.isElementAccessExpression(node.left) &&
          ts.isIdentifier(node.left.expression) &&
          ts.isStringLiteral(node.left.argumentExpression)
        ) {
          const varName = node.left.expression.text;
          const propName = node.left.argumentExpression.text;
          registerExtraProp(varName, propName);
        }
      }

      ts.forEachChild(node, visit);
    }

    visit(sourceFile);

    let hasInstanceWith5Extras = false;
    for (const [, info] of instanceMap) {
      if (info.baseProps.size >= 3 && info.extraProps.size >= 5) {
        hasInstanceWith5Extras = true;
        break;
      }
    }

    expect(hasFlexibleObjectType).toBe(true);
    expect(hasInstanceWith5Extras).toBe(true);
  });
});
