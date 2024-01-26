import { Transform } from 'stream';

const createTransform = () =>
  new Transform({
    transform(chunk, encoding, callback) {
      const reverse = chunk.toString().split('').reverse().join('');
      this.push(reverse);
      callback();
    },
  });

const transform = async () => {
  process.stdin.setEncoding('utf-8');
  const reverseTransform = createTransform();
  const readStream = process.stdin;
  const writeStream = process.stdout;

  readStream.pipe(reverseTransform).pipe(writeStream);

  writeStream.write('print here: ');

  readStream.on('error', (e) => {
    console.log('Error!');
  });

  readStream.once('data', () => {
    readStream.destroy();
    writeStream.destroy();
  });
};

await transform();
