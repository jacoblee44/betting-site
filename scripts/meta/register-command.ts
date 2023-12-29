import { Dictionary } from 'lodash';
import minimist, { ParsedArgs } from 'minimist';
import buildOptions, { Options } from 'minimist-options';

interface CommandDefinition {
  options: Options;
  command: ScriptFunction;
}

export type ScriptFunction = (args: ParsedArgs) => Promise<void | number | string>;

export const registeredFunctions: Dictionary<CommandDefinition> = {};

export function registerCommand(name: string, options: Options, command: ScriptFunction): void {
  registeredFunctions[name] = { options, command };
}

export function callScript(
  definition: CommandDefinition,
  args: string[],
): Promise<void | string | number> {
  const parsedArgs = minimist(args, buildOptions(definition.options));
  return definition.command(parsedArgs);
}
