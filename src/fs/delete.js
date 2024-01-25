import { promises as fsPromises, constants } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const dirname = path.dirname(fileURLToPath(import.meta.url));
const filePath = path.join(dirname, 'files', 'fileToRemove.txt');

const remove = async () => {
  try {
    await fsPromises.access(filePath, constants.F_OK);
    await fsPromises.unlink(filePath);
  } catch (error) {
    console.log('FS operation failed');
  }
};

await remove();
