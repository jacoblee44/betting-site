import { exec, shell } from '@/helpers/bash';
import { registerCommand } from '@/meta/register-command';
import { buildNuxt } from './nuxt';
import { Dictionary, flatten, keys } from 'lodash';
import { getPipelineId } from '@/helpers/ci';
import { sleep } from '@/helpers/sleep';

export function getDockerComposeProject(): string {
  const jobId = getPipelineId();
  if (jobId) {
    return `gitlab-ci-katon-${jobId}`;
  } else {
    return `katon-${process.env.USER}`;
  }
}

export async function dockerCompose(...args: string[]): Promise<string> {
  return dockerComposeEnv({}, true, ...args);
}

export async function dockerComposeEnv(
  env: Dictionary<string>,
  interactive: boolean,
  ...args: string[]
): Promise<string> {
  const dockerComposeProject = getDockerComposeProject();

  const subprojects = ['nuxt3-client', 'laravel-api'];

  let overrideFile: string[] = [];
  if (!process.env.CI_PIPELINE_ID) {
    overrideFile = ['-f', './docker-compose.override.yml'];
  }

  const extraFiles = ['-f', './docker-compose.yml'].concat(
    overrideFile,
    flatten(subprojects.map((subproject) => ['-f', `./${subproject}/docker-compose.yml`])),
  );

  let user: string | undefined;
  try {
    user = await exec('id', ['-u', process.env.USER!]);
  } catch {}

  const command = ['-p', dockerComposeProject, ...extraFiles, ...args];
  const options = {
    env: {
      DOCKER_PROJECT: dockerComposeProject,
      LOCAL_USER_ID: user,
      INITIAL_SETUP: '', // May be overwritten below
      ...env,
    },
  };

  if (interactive) {
    return shell('docker-compose', command, options);
  } else {
    return exec('docker-compose', command, options);
  }
}

export async function getServiceLocalIp(serviceName: string): Promise<string | null> {
  const dockerNetwork = `${getDockerComposeProject()}-network`;

  try {
    const networkInspectOutput = await exec('docker', ['network', 'inspect', dockerNetwork]);
    const networkInspectData = JSON.parse(networkInspectOutput);

    for (const network of networkInspectData) {
      for (const service in network.Containers) {
        if (network.Containers.hasOwnProperty(service)) {
          if (network.Containers[service].Name.includes(serviceName)) {
            return network.Containers[service].IPv4Address.split('/')[0];
          }
        }
      }
    }

    return null;
  } catch (error) {
    console.error('Error inspecting docker network:', error);
    return null;
  }
}

export async function isUrlOk(url: string): Promise<boolean> {
  try {
    const dockerComposeProject = getDockerComposeProject();
    await shell('docker', [
      'run',
      '--network=' + dockerComposeProject + '-network',
      'curlimages/curl:latest',
      '-s',
      '-f',
      url,
    ]);
    return true;
  } catch (error) {
    console.error(`Error reaching ${url}:`, error);
    return false;
  }
}

export async function checkLaravel(): Promise<void> {
  const laravelOk = await isUrlOk('http://horse24.test');
  if (!laravelOk) {
    throw new Error(`Laravel API returned an error`);
  }
}

export async function createApplication(): Promise<void> {
  await buildNuxt();
  await dockerComposeEnv({ INITIAL_SETUP: 'true' }, true, 'up', '-d', '--build', '--wait');
}

export async function startApplication(): Promise<void> {
  if (await isInitialSetup()) {
    await createApplication();
  } else {
    console.log('Found existing setup, reusing..'.yellow);
    await buildNuxt();
    await dockerCompose('up', '--build', '-d', '--wait');
  }
  await sleep(15000);
}

export async function stopApplication(): Promise<void> {
  await dockerCompose('stop');
}

export async function terminateApplication(): Promise<void> {
  await dockerCompose('down');
}

export async function isInitialSetup(): Promise<boolean> {
  return !(await isPostgresServiceCreated());
}

export async function isPostgresServiceCreated(): Promise<boolean> {
  const dockerServices = await dockerCompose('ps', '--services');
  return dockerServices.split('\n').includes('db');
}

export async function phpShell(): Promise<void> {
  await dockerCompose('exec', '-it', 'php', '/bin/bash');
}

export async function phpLogs(): Promise<void> {
  await dockerCompose('logs', 'php');
}

registerCommand('docker:start', {}, () => startApplication());
registerCommand('docker:stop', {}, () => stopApplication());
registerCommand('docker:down', {}, () => terminateApplication());
registerCommand('shell:php', {}, () => phpShell());
registerCommand('logs:php', {}, () => phpLogs());
registerCommand('docker:laravel:check', {}, () => checkLaravel());
