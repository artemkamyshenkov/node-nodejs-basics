import { promises as fsPromises } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

const dirname = path.dirname(fileURLToPath(import.meta.url));

const newFilePath = path.join(dirname, 'files', 'fresh.txt');
const fileContent = 'I am fresh and young';

const create = async () => {
  fsPromises
    .access(newFilePath, fs.constants.F_OK)
    .then(() => {
      console.error('FS operation failed');
    })
    .catch((err) => {
      fsPromises.writeFile(newFilePath, fileContent);
    });
};

await create();
