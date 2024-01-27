import path from 'path';
import { fileURLToPath } from 'url';
import { spawn, fork } from 'child_process';

const dirname = path.dirname(fileURLToPath(import.meta.url));
const workerFile = path.join(dirname, 'files', 'script.js');

const spawnChildProcess = async (args) => {
  const childProcess = fork(workerFile, args, {
    stdio: 'pipe',
  });

  childProcess.stdout.on('data', (data) => {
    const output = data.toString();
    process.stdout.write(`Child process: ${output}`);
  });

  process.stdin.on('data', (data) => {
    childProcess.stdin.write(data);
  });

  childProcess.on('close', (code) => {
    console.log(code);
    process.exit();
  });
};

// Put your arguments in function call to test this functionality
spawnChildProcess(['1', '2', '3']);
