import * as path from 'path';
import { endsWith, some } from 'lodash';
import { exec, ProcessError, shell } from '@/helpers/bash';
import { registerCommand } from '@/meta/register-command';
import { minimatch } from 'minimatch';

const excludePatterns = ['**/storybook-static/**'];

async function getPrettierFiles(): Promise<string[]> {
  const filesOutput = await exec('git', ['ls-files']);
  let files = filesOutput
    .split('\n')
    .map((file) => path.resolve('.', file.trim())) // make the paths absolute
    .filter(Boolean) // filter out empty lines
    .filter((file) =>
      some(['.json', '.ts', '.js', '.vue'], (extension) => endsWith(file, extension)),
    )
    .filter((file) => !excludePatterns.some((pattern) => minimatch(file, pattern)));

  return files;
}

async function prettierInfo(): Promise<void> {
  await shell('npx', ['prettier', '--version'], { cwd: './scripts' });
  await shell('npx', ['prettier', '--find-config-path', '..'], { cwd: './scripts' });
}

export async function prettierCheck(): Promise<void> {
  const files = await getPrettierFiles();

  try {
    await prettierInfo();
    await exec('npx', ['prettier', '--check', ...files], { cwd: './scripts' });
  } catch (err) {
    if (err instanceof ProcessError) {
      const unformattedFiles = err.message
        .split('\n')
        .filter((line) => line.startsWith('[warn]') && !line.includes('Code style issues found')) // Only consider lines starting with '[warn]' and exclude summary lines
        .map((line) => line.replace('[warn] ', '').trim()); // remove the '[warn]' prefix and trim the result

      if (unformattedFiles.length > 0) {
        throw new Error(
          'The following files are not formatted with prettier:\n'.red +
            unformattedFiles.join('\n'),
        );
      }
    }
  }
}

export async function prettierFix(): Promise<void> {
  const files = await getPrettierFiles();

  try {
    await prettierInfo();
    await exec('npx', ['prettier', '--write', ...files], { cwd: './scripts' });
  } catch (err) {
    console.error('Error occurred while fixing files with Prettier:', err);
  }
}
registerCommand('prettier:check', {}, () => prettierCheck());
registerCommand('prettier:fix', {}, () => prettierFix());
