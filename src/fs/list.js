import { promises as fsPromises, constants } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const dirname = path.dirname(fileURLToPath(import.meta.url));
const folderPath = path.join(dirname, 'files');

const list = async () => {
  try {
    await fsPromises.access(folderPath, constants.F_OK);
    const files = await fsPromises.readdir(folderPath);
    files.forEach((file) => console.log(file));
  } catch (error) {
    console.log('FS operation failed');
  }
};

await list();
