import { promises as fsPromises, constants } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const dirname = path.dirname(fileURLToPath(import.meta.url));
const filePath = path.join(dirname, 'files', 'fileToRead.txt');

const read = async () => {
  try {
    await fsPromises.access(filePath, constants.F_OK);
    const read = await fsPromises.readFile(filePath, 'utf-8');
    console.log(read);
  } catch (error) {
    console.log('FS operation failed');
  }
};

await read();
