import { promises as fsPromises, constants } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const dirname = path.dirname(fileURLToPath(import.meta.url));

const newFilePath = path.join(dirname, 'files', 'fresh.txt');
const fileContent = 'I am fresh and young';

const create = async () => {
  fsPromises
    .access(newFilePath, constants.F_OK)
    .then(() => {
      console.error('FS operation failed');
    })
    .catch((err) => {
      fsPromises.writeFile(newFilePath, fileContent);
    });
};

await create();
