import { describe, expect, beforeAll, vi, test } from 'vitest';
import { existsSync, readFileSync } from 'node:fs';
import path from 'node:path';
import { execSync } from 'node:child_process';

const rootDir = path.resolve(__dirname, '../../lab_5');

describe('Laboratório 5 - Exercício 1:', () => {
  beforeAll(() => {
    execSync('npx tsc -p tsconfig.json', {
      cwd: rootDir,
      stdio: 'ignore',
    });
  });

  test('Deve ter TypeScript instalado localmente no projeto', () => {
    const pkgPath = path.join(rootDir, 'package.json');
    expect(existsSync(pkgPath)).toBe(true);

    const pkgJson = JSON.parse(readFileSync(pkgPath, 'utf-8'));

    const hasTsInDev = pkgJson.devDependencies?.typescript;
    const hasTsInDeps = pkgJson.dependencies?.typescript;

    expect(hasTsInDev || hasTsInDeps).toBeTruthy();
  });

  test('Deve ter tsconfig.json com rootDir "src" e outDir "dist/js"', () => {
    const tsconfigPath = path.join(rootDir, 'tsconfig.json');
    console.log(tsconfigPath)
    expect(existsSync(tsconfigPath)).toBe(true);

    const tsconfig = JSON.parse(readFileSync(tsconfigPath, 'utf-8'));
    const opts = tsconfig.compilerOptions ?? {};

    expect(opts.rootDir).toContain('src');
    expect(opts.outDir).toContain('dist/js');
  });

  test('Deve compilar src/ex_1.ts para dist/js/ex_1.js', () => {
    const outPath = path.join(rootDir, 'dist', 'js', 'ex_1.js');
    expect(existsSync(outPath)).toBe(true);
  });

  test('Deve exibir uma string no console', async () => {
    const outPath = path.join(rootDir, 'dist', 'js', 'ex_1.js');
    expect(existsSync(outPath)).toBe(true);

    const consoleSpy = vi.spyOn(console, 'log').mockImplementation(() => {});

    await import(outPath + '?' + Date.now());

    expect(consoleSpy).toHaveBeenCalled();

    const firstCallArg = consoleSpy.mock.calls[0]?.[0];
    expect(typeof firstCallArg).toBe('string');

    consoleSpy.mockRestore();
  });
});
