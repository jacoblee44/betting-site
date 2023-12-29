import { promises } from 'fs';

export async function fileExists(filePath: string) {
  try {
    await promises.access(filePath);
    return true; // file exists
  } catch (error) {
    if ((error as { code: string }).code === 'ENOENT') {
      return false; // file does not exist
    }
    throw error; // other error
  }
}
