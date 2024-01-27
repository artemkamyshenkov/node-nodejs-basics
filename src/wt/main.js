import path from 'path';
import { fileURLToPath } from 'url';
import os from 'os';
import { Worker } from 'worker_threads';

const dirname = path.dirname(fileURLToPath(import.meta.url));
const workerFile = path.join(dirname, 'worker.js');

const performCalculations = async () => {
  const result = [];
  const workersCount = os.cpus()?.length || 1;

  const createWorkerPromise = (worker, idx) =>
    new Promise((resolve, reject) => {
      worker.on('message', (data) => {
        const { type, data: res } = data;
        if (type === 'result') {
          result[idx] = { status: 'resolved', data: res };
          resolve();
        }
      });

      worker.on('error', (e) => {
        result[idx] = { status: 'error', data: null };
        reject(e);
      });
    });

  for (let i = 0; i < workersCount; i++) {
    const worker = new Worker(workerFile);

    const dataSend = 10 + i;

    worker.postMessage({ type: 'calculate', data: dataSend });

    await createWorkerPromise(worker, i);
  }

  console.log(result);
  return result;
};

await performCalculations();
