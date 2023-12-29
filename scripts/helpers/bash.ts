import { spawn as spawn2, SpawnOptionsWithoutStdio, CommonSpawnOptions } from 'child_process';

export class ProcessError extends Error {
  constructor(
    public code: number,
    public message: string,
  ) {
    super(`Program exited with code ${code} -- ${message}`);
  }
}

export async function exec(
  cmd: string,
  args: string[],
  options: CommonSpawnOptions = {},
): Promise<string> {
  console.log(cmd, args.join(' '));
  return new Promise<string>((resolve, reject) => {
    const child = spawn2(cmd, args, options);

    let stdout = '';
    let stderr = '';

    if (child.stdout) {
      child.stdout.on('data', (data) => {
        stdout += data;
      });
    }

    if (child.stderr) {
      child.stderr.on('data', (data) => {
        stderr += data;
      });
    }

    child.on('close', (code) => {
      if (code !== 0 && code !== null) {
        reject(new ProcessError(code, stderr));
      } else {
        resolve(stdout.trim());
      }
    });
  });
}

export async function shell(
  cmd: string,
  args: string[],
  options?: SpawnOptionsWithoutStdio,
): Promise<string> {
  return exec(cmd, args, {
    shell: true,
    stdio: 'inherit',
    ...options,
  });
}

export function spawnProcess(
  command: string,
  args?: readonly string[],
  options?: SpawnOptionsWithoutStdio,
  prependString?: string,
): () => void {
  const child = spawn2(command, args || [], {
    ...options,
    stdio: 'pipe', // Use 'pipe' instead of 'inherit'
  });

  if (child.stdout) {
    child.stdout.on('data', (data) => {
      const lines = data.toString().split('\n');
      for (let line of lines) {
        if (line) {
          console.log(`${prependString || ''}${line}`);
        }
      }
    });
  }

  if (child.stderr) {
    child.stderr.on('data', (data) => {
      const lines = data.toString().split('\n');
      for (let line of lines) {
        if (line) {
          console.error(`${prependString || ''}${line}`);
        }
      }
    });
  }

  const killProcess = () => {
    child.kill();
    console.log(`Stopped ${command} process`.magenta);
  };

  return killProcess;
}
