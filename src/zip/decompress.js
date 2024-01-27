import { createReadStream, createWriteStream } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import zlib from 'zlib';

const dirname = path.dirname(fileURLToPath(import.meta.url));
const outputFile = path.join(dirname, 'files', 'fileToCompress.txt');
const inputFile = path.join(dirname, 'files', 'archive.gz');

const decompress = async () => {
  const readStream = createReadStream(inputFile);
  const writeStream = createWriteStream(outputFile);
  const gunzip = zlib.createGunzip();

  readStream.pipe(gunzip).pipe(writeStream);

  readStream.on('error', () => {
    console.log('Error!');
  });

  writeStream.on('error', () => {
    console.log('Error!');
  });
};

await decompress();
