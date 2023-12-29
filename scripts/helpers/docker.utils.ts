import { exec, shell } from './bash';

/**
 * Helper function to create a Docker volume
 */
export async function createDockerVolume(volumeName: string): Promise<void> {
  await exec('docker', ['volume', 'create', volumeName]);
}

/**
 * Helper function to create a Docker container
 */
export async function createBusyboxContainer(volumeName: string): Promise<string> {
  const containerId = await exec('docker', [
    'run',
    '-d', // Run container in background
    '-v',
    `${volumeName}:/data`, // Mount the volume
    'busybox', // Lightweight container for the copying task
    'tail',
    '-f',
    '/dev/null', // Keep container running
  ]);

  return containerId.trim();
}

/**
 * Helper function to copy data between host and Docker volume.
 *
 * You can use `${containerId}:/path` to specify a docker container as source or destination.
 */
export async function copyData(source: string, destination: string): Promise<void> {
  await exec('docker', ['cp', source, destination]);
}

/**
 * Helper function to remove a Docker volume
 */
export async function removeDockerVolume(volumeName: string): Promise<void> {
  await exec('docker', ['volume', 'rm', volumeName]);
}

// Helper function to remove a Docker container
async function removeDockerContainer(containerId: string): Promise<void> {
  await exec('docker', ['rm', '-f', containerId]);
}

/** Create a temporary volume and a busybox container, run a callback function, and then tear everything down */
export async function withTemporaryVolume(
  volumeName: string,
  callback: (
    copyTo: (src: string) => Promise<void>,
    copyFrom: (dest: string) => Promise<void>,
  ) => Promise<void>,
): Promise<void> {
  // Create temporary volume
  await createDockerVolume(volumeName);

  // Create idle container with the temporary volume
  const containerId = await createBusyboxContainer(volumeName);

  const copyTo = async (src: string) => {
    await copyData(src, `${containerId}:/data`);
  };

  const copyFrom = async (dest: string) => {
    await copyData(`${containerId}:/data`, dest);
  };

  try {
    await callback(copyTo, copyFrom);
  } finally {
    // Remove the temporary container
    await removeDockerContainer(containerId);

    // Remove the temporary volume
    await removeDockerVolume(volumeName);
  }
}
