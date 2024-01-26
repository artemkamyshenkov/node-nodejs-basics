import { createReadStream } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const dirname = path.dirname(fileURLToPath(import.meta.url));
const filePath = path.join(dirname, 'files', 'fileToRead.txt');

const read = async () => {
  const stream = createReadStream(filePath);

  stream.on('data', (chunk) => {
    process.stdout.write(chunk);
  });

  stream.on('error', () => {
    console.log('Error reading the file');
  });
};

await read();
