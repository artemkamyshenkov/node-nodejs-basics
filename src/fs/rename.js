import { promises as fsPromises, constants } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const dirname = path.dirname(fileURLToPath(import.meta.url));
const originFilePath = path.join(dirname, 'files', 'wrongFilename.txt');
const renameFilePath = path.join(dirname, 'files', 'properFilename.md');

const rename = async () => {
  try {
    await fsPromises.access(originFilePath, constants.F_OK);
    try {
      await fsPromises.access(renameFilePath, constants.F_OK);
      throw new Error();
    } catch (error) {
      if (error.code === 'ENOENT') {
        await fsPromises.rename(originFilePath, renameFilePath);
      } else {
        throw error;
      }
    }
  } catch (error) {
    console.log('FS operation failed');
  }
};

await rename();
