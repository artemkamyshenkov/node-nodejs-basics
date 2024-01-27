import {
  createReadStream,
  createWriteStream,
  promises as fsPromises,
} from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import zlib from 'zlib';

const dirname = path.dirname(fileURLToPath(import.meta.url));
const inputFile = path.join(dirname, 'files', 'fileToCompress.txt');
const outputFile = path.join(dirname, 'files', 'archive.gz');

const compress = async () => {
  const readStream = createReadStream(inputFile);
  const writeStream = createWriteStream(outputFile);
  const gzip = zlib.createGzip();

  readStream.pipe(gzip).pipe(writeStream);

  readStream.on('error', () => {
    console.log('Error!');
  });

  writeStream.on('error', () => {
    console.log('Error!');
  });

  writeStream.on('finish', async () => {
    await fsPromises.unlink(inputFile);
  });
};

await compress();
