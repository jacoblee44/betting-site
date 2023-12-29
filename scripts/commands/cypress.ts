import { registerCommand } from '@/meta/register-command';
import { getDockerComposeProject } from './docker';
import { exec, shell } from '@/helpers/bash';
import { promises as fs } from 'fs';
import { withTemporaryVolume } from '@/helpers/docker.utils';

export async function cypress(): Promise<void> {
  const dockerComposeProject = getDockerComposeProject();
  const volumeName = `${dockerComposeProject}-cypress-data`;

  await withTemporaryVolume(volumeName, async (copyTo, copyFrom) => {
    // Copy data from host to the temporary volume
    await copyTo('./e2e/cypress/.');

    // Build the Docker image
    await exec('docker', ['build', '-t', 'my-cypress-image', '-f', './Dockerfile', '.'], {
      cwd: './e2e/cypress/',
    });

    // Run the Docker image
    await shell('docker', [
      'run',
      '--rm',
      '--env',
      'CYPRESS_baseUrl=http://nuxt:3000', // Accessing the nuxt service in the network
      '--network=' + dockerComposeProject + '-network',
      '-v',
      `${volumeName}:/app/`, // temporary volume mount
      'my-cypress-image',
      'run',
    ]);

    // Copy data from temporary volume to host
    await copyFrom('./.artifacts/tmp/');
    await fs.cp('./.artifacts/tmp/cypress/videos', './.artifacts/videos', { recursive: true });
    await fs.cp('./.artifacts/tmp/cypress/screenshots', './.artifacts/screenshots', {
      recursive: true,
    });
    await fs.rm('./.artifacts/tmp', { recursive: true, force: true });
  });
}

registerCommand('test:e2e', {}, cypress);
