import postcss from 'postcss';
import { getChatCompletion } from '@/helpers/gpt/gpt';
import { parseCodeResponse } from '@/helpers/gpt/parse-response';
import { retry } from '@/helpers/retry';

export async function gptRewriteCss(
  originalHtml: string,
  lineNumber: number,
  rule: string,
): Promise<string> {
  let query = `Given the following HTML:\n`;
  query += '```\n';
  query += originalHtml;
  query += '\n```\n';

  query += `We are extracting the element starting at line ${lineNumber} as its own vue component with scoped css.\n`;
  query += originalHtml.split('\n')[lineNumber - 1];
  query += '\n\n';

  query += `Rewrite the following CSS from the original component so it still applies to the same elements in the extracted component:\n\n`;

  query += rule;

  query += `\n\nPlease output just the rewritten rule.`;

  const response = await retry(async () => {
    const response = await getChatCompletion(query);
    const parsedResponse = parseCodeResponse(response);
    console.log('parsed response', parsedResponse);
    if (!postcss.parse(parsedResponse)) throw new Error('Invalid CSS');
    return parsedResponse;
  });

  return response;
}
