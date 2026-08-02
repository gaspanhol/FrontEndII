import { describe, expect, test } from 'vitest';
import { existsSync, readFileSync } from 'fs';
import path from 'path';
import ts from 'typescript';

const rootDir = path.resolve(__dirname, '../../lab_5');

describe('Laboratório 5 - Exercício 6', () => {
  test('Deve definir o enum NivelAcesso e um objeto usuario com nível de acesso e outras 3 propriedades', () => {
    const srcPath = path.join(rootDir, 'src', 'ex_6.ts');
    expect(existsSync(srcPath)).toBe(true);

    const sourceText = readFileSync(srcPath, 'utf-8');

    const sourceFile = ts.createSourceFile(
      'ex_6.ts',
      sourceText,
      ts.ScriptTarget.ESNext,
      true,
      ts.ScriptKind.TS
    );

    let hasEnumNivelAcesso = false;
    let hasEnumWithMembers = false;
    let hasUsuarioObject = false;
    let usuarioHas4Props = false;
    let usuarioUsesEnum = false;

    function visit(node: ts.Node) {
      if (ts.isEnumDeclaration(node) && node.name.text === 'NivelAcesso') {
        hasEnumNivelAcesso = true;
        const members = node.members.map((m) => m.name.getText(sourceFile));
        const required = ['ALUNO', 'PROFESSOR', 'ADMIN'];
        if (required.every((r) => members.includes(r))) {
          hasEnumWithMembers = true;
        }
      }

      if (
        ts.isVariableDeclaration(node) &&
        ts.isIdentifier(node.name) &&
        node.name.text === 'usuario' &&
        node.initializer &&
        ts.isObjectLiteralExpression(node.initializer)
      ) {
        hasUsuarioObject = true;
        const objLiteral = node.initializer;

        const props = objLiteral.properties.filter(
          (p) =>
            ts.isPropertyAssignment(p) ||
            ts.isShorthandPropertyAssignment(p) ||
            ts.isMethodDeclaration(p)
        );

        if (props.length >= 4) {
          usuarioHas4Props = true;
        }

        for (const prop of props) {
          let initializer: ts.Expression | undefined;

          if (ts.isPropertyAssignment(prop)) {
            initializer = prop.initializer;
          }

          if (
            initializer &&
            ts.isPropertyAccessExpression(initializer) &&
            ts.isIdentifier(initializer.expression) &&
            initializer.expression.text === 'NivelAcesso'
          ) {
            const memberName = initializer.name.text;
            if (['ALUNO', 'PROFESSOR', 'ADMIN'].includes(memberName)) {
              usuarioUsesEnum = true;
            }
          }
        }
      }

      ts.forEachChild(node, visit);
    }

    visit(sourceFile);

    expect(hasEnumNivelAcesso).toBe(true);
    expect(hasEnumWithMembers).toBe(true);
    expect(hasUsuarioObject).toBe(true);
    expect(usuarioHas4Props).toBe(true);
    expect(usuarioUsesEnum).toBe(true);
  });
});
