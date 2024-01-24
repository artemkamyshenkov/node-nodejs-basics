import {
  promises as fsPromises,
  readdirSync,
  createReadStream,
  createWriteStream,
} from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const dirname = path.dirname(fileURLToPath(import.meta.url));
const targetFolderPath = path.join(dirname, 'files');
const copyFolderPath = path.join(dirname, 'files_copy');

const copy = async () => {
  fsPromises
    .access(copyFolderPath)
    .then(() => {
      console.log('FS operation failed');
    })
    .catch(() => {
      fsPromises
        .mkdir(copyFolderPath)
        .then(() => {
          const files = readdirSync(targetFolderPath);
          files.forEach((file) => {
            const targetFilePath = path.join(targetFolderPath, file);
            const copyFilePath = path.join(copyFolderPath, file);

            const readStream = createReadStream(targetFilePath);
            const writeStream = createWriteStream(copyFilePath);

            readStream.pipe(writeStream);
          });
        })
        .catch(() =>
          console.log('Error, failed to create a folder for copying files'),
        );
    });
};

await copy();
