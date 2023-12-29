export function parseJSONResponse(response: string): any {
  response = parseTextResponse(response);
  return JSON.parse(response.trim());
}

export function parseTextResponse(response: string): string {
  // If the first line of the response ends with a :, we can usually assume ChatGPT is prefacing
  // the reply with a title and ignore this part.
  if (response.split('\n')[0].endsWith(':')) {
    response = response.split('\n').slice(1).join('\n').trim();
  }

  return response;
}

export function parseCodeResponse(response: string): string {
  // Check if the response contains a code block, denoted by triple backticks (```)
  const codeBlockRegex = /```(?:[a-zA-Z0-9-]*)?([\s\S]*?)```/g;
  const matches = response.match(codeBlockRegex);

  if (matches && matches.length) {
    // Extract the code from the first code block and return immediately
    return matches[0]
      .replace(/```[a-zA-Z0-9-]*?/g, '')
      .replace(/```/g, '')
      .trim();
  }

  // If no code block is found, use the existing function to handle the textual part
  return parseTextResponse(response);
}
