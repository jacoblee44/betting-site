import '../helpers/replace-promise';
import 'dotenv/config';
import 'colors';
import { callScript, registeredFunctions } from './register-command';
import '../commands/index';
import { commandErrorToString } from './error';

export function printCommandList(): void {
  console.log('Available commands:'.cyan);
  for (const command in registeredFunctions) {
    console.log('  ', command.blue);
  }
}

export async function main() {
  // We are in the scripts/ directory, but we want to execute scripts from
  // the root project directory.
  process.chdir('..');

  const command = process.argv[2];
  const args = process.argv.slice(3);
  if (!registeredFunctions[command]) {
    console.error(`Unknown command`.blue, `${command}`.red);
    return printCommandList();
  }
  console.log('Executing', command.cyan);
  try {
    const result = await callScript(registeredFunctions[command], args);
    if (!result) {
      console.log('Success!'.green);
    } else {
      console.log(result);
    }
    process.exit(0);
  } catch (err) {
    console.error(commandErrorToString(err));
    process.exit(1);
  }
}

void main();
