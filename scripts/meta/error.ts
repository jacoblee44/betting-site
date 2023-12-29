export function commandErrorToString(error: unknown): string {
  if (error instanceof Error) {
    return error.stack || error.message;
  } else {
    return `${error}`;
  }
}
