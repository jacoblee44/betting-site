import { shell } from '@/helpers/bash';
import { registerCommand } from '@/meta/register-command';
import { lighthouse } from './lighthouse';

export async function buildNuxt(): Promise<void> {
  await shell('yarn', ['install'], {
    cwd: './nuxt3-client',
  });
  await shell('yarn', ['build'], {
    cwd: './nuxt3-client',
  });
}

export async function lintNuxtDirectory(dir: string): Promise<void> {
  console.log(`Linting ${dir}..`.cyan);
  await shell('yarn', ['install'], {
    cwd: dir,
  });
  await shell('yarn', ['lint'], {
    cwd: dir,
  });
  await shell('yarn', ['run', 'build'], {
    cwd: dir,
  });
  await shell('yarn', ['run', 'story:build'], {
    cwd: dir,
  });
}

export async function lintNuxt(): Promise<void> {
  // Remove this step until we're working on the user facing part
  // await lintNuxtDirectory('./nuxt3-client');
  await lintNuxtDirectory('./admin-frontend');
}

export async function nuxtDev(): Promise<void> {
  await shell('yarn', ['install'], {
    cwd: './nuxt3-client',
  });
  await shell('yarn', ['dev', '-o'], {
    cwd: './nuxt3-client',
  });
}

registerCommand('nuxt:build', {}, () => buildNuxt());
registerCommand('nuxt:lint', {}, () => lintNuxt());
registerCommand('nuxt:dev', {}, () => nuxtDev());
registerCommand('nuxt:lighthouse', {}, () => lighthouse());
