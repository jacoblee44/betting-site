import axios from 'axios';
import { OPENAI_API_KEY } from '@/config';
import colors from 'colors';
import { parseTextResponse } from './parse-response';

const headers = {
  Authorization: `Bearer ${OPENAI_API_KEY}`,
  'Content-Type': 'application/json',
};

export async function getChatCompletion(
  question: string,
  verbose: boolean = true,
): Promise<string> {
  const data = {
    model: 'gpt-4',
    messages: [{ role: 'user', content: question }],
  };

  try {
    if (verbose) {
      console.log(colors.cyan('Requesting'), colors.green(question));
    }
    let response;
    let numberOfTries = 0;
    while (!response) {
      try {
        response = await axios.post('https://api.openai.com/v1/chat/completions', data, {
          headers,
        });
      } catch (error) {
        // Failed, retrying
        if (numberOfTries++ > 5) {
          throw error;
        }
      }
    }
    const responseContent = response.data.choices[0].message.content;
    if (verbose) {
      console.log(colors.yellow('Response:'), colors.green(responseContent));
    }

    return parseTextResponse(responseContent)!;
  } catch (error) {
    console.error(colors.red('Error:'), error);
    return '';
  }
}
