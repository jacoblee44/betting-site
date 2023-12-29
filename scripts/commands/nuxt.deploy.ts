import { shell } from '@/helpers/bash';
import { registerCommand } from '@/meta/register-command';
import { basename } from 'path';

export async function deployNuxt(
  containerType: 'main' | 'manual',
  projectDir: string,
  hostPort: string,
): Promise<void> {
  const tagSuffix = containerType === 'main' ? '' : '-manual';
  const projectName = basename(projectDir); // Extracts the last part of the path
  const containerName = `nuxt-${projectName}${tagSuffix}`;
  const CI_JOB_ID = process.env.CI_JOB_ID;

  // Build the Docker image
  await shell('docker', ['build', '-f', 'Dockerfile', '-t', `${containerName}-${CI_JOB_ID}`, '.'], {
    cwd: projectDir,
  });

  // Stop and remove any existing container
  await shell('docker', ['stop', `${containerName}`]).catch(() => 0);
  await shell('docker', ['rm', `${containerName}`]).catch(() => 0);

  // Run the new container
  await shell('docker', [
    'run',
    '-d',
    '--name',
    `${containerName}`,
    '-p',
    `${hostPort}:3000`,
    `${containerName}-${CI_JOB_ID}`,
  ]);

  console.info(`Successfully ${containerType} Nuxt to port ${hostPort.yellow}`.green);
}

async function deployNuxtForProjects(containerType: 'main' | 'manual') {
  // For now the nuxt3-client is not done, so we skip this deploy
  // await deployNuxt(containerType, './nuxt3-client', containerType === 'main' ? '5105' : '5106');

  await deployNuxt(containerType, './admin-frontend', containerType === 'main' ? '5107' : '5108');
}

registerCommand('nuxt:deploy', {}, () => deployNuxtForProjects('main'));
registerCommand('nuxt:deploy:manual', {}, () => deployNuxtForProjects('manual'));
