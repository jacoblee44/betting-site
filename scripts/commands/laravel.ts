import { registerCommand } from '@/meta/register-command';
import { dockerCompose } from './docker';
import { seed } from '@/meta/seed-data';
import * as fs from 'fs';

export async function codeStyle(): Promise<string> {
  return dockerCompose('exec', 'php', '/var/www/html/vendor/bin/pint', '--test');
}

export async function laravelTest(): Promise<string> {
  return dockerCompose('exec', 'php', '/var/www/html/artisan', 'test', '--parallel');
}

export async function laravelSeedJson() {
  const jsonString = JSON.stringify(seed, null, 2);
  fs.writeFileSync('./laravel-api/seed-data.json', jsonString);
}

registerCommand('laravel:pint', {}, () => codeStyle());
registerCommand('laravel:test', {}, () => laravelTest());
registerCommand('laravel:seed:json', {}, () => laravelSeedJson());
