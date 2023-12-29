import { shell } from '@/helpers/bash';
import { registerCommand } from '@/meta/register-command';
import { basename } from 'path';

export async function deployHistoire(
  containerType: 'main' | 'manual',
  projectDir: string,
  hostPort: string,
): Promise<void> {
  const tagSuffix = containerType === 'main' ? '' : '-manual';
  const projectName = basename(projectDir); // Extracts the last part of the path
  const containerName = `histoire-${projectName}${tagSuffix}`;
  const CI_JOB_ID = process.env.CI_JOB_ID;

  // Build the Docker image
  await shell(
    'docker',
    ['build', '-f', `Dockerfile.histoire`, '-t', `${containerName}-${CI_JOB_ID}`, '.'],
    {
      cwd: projectDir,
    },
  );

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
    `${hostPort}:6006`,
    `${containerName}-${CI_JOB_ID}`,
  ]);

  console.info(`Successfully ${containerType} histoire to port ${hostPort.yellow}`.green);
}

async function deployHistoireForProjects(containerType: 'main' | 'manual') {
  await deployHistoire(containerType, './nuxt3-client', containerType === 'main' ? '5101' : '5102');
  await deployHistoire(
    containerType,
    './admin-frontend',
    containerType === 'main' ? '5103' : '5104',
  );
}

registerCommand('histoire:deploy', {}, () => deployHistoireForProjects('main'));
registerCommand('histoire:deploy:manual', {}, () => deployHistoireForProjects('manual'));
