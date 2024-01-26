import { createWriteStream } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const dirname = path.dirname(fileURLToPath(import.meta.url));
const filePath = path.join(dirname, 'files', 'fileToWrite.txt');

const write = async () => {
  const writeStream = createWriteStream(filePath);
  process.stdin.setEncoding('utf-8');

  process.stdout.write('print here: ');
  process.stdin.on('readable', () => {
    const chunk = process.stdin.read();
    if (chunk) {
      writeStream.write(chunk);
    }
  });

  process.stdin.on('end', () => {
    writeStream.end();
  });

  process.stdin.on('error', (e) => {
    console.log('Error!');
  });

  writeStream.on('error', (e) => {
    console.log('Error!');
  });
};

await write();
