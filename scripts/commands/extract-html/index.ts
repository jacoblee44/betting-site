import { extractCss } from './css-extractor';
import { registerCommand } from '@/meta/register-command';
import { extractComponent } from './extract-vue';
import { Options } from 'minimist-options';
import { ParsedArgs } from 'minimist';

export async function testParseCss(args: ParsedArgs): Promise<void> {
  await extractComponent(
    args['f'], // ./nuxt3-client/components/public/auction/AuctionListing.vue',
    args['c'], // ElementContent',
    args['l'], // 103,
  );
}

const options: Options = {
  f: {
    type: 'string',
    alias: 'filename',
  },
  l: {
    type: 'number',
    alias: 'line',
  },
  c: {
    type: 'string',
    alias: 'component',
  },
};

registerCommand('vue:extract', options, testParseCss);
