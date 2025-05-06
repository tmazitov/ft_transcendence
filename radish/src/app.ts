import Fastify from 'fastify'
import { registerRestRoutes } from './api/rest/rest'
import loggerMiddleware from './pkg/middlewares/loggerMiddleware'
import Config from './config'
import fs, { stat } from 'fs';
import KeyValueStorage from './storage/KeyValueStorage';
import RecordValue from './pkg/Record';

const app = Fastify()
const config = new Config()
const DATA_FILE = './data.json';

// Загрузка из бэкапа
if (fs.existsSync(DATA_FILE)) {
  const raw = fs.readFileSync(DATA_FILE, 'utf-8');
  const obj = JSON.parse(raw)

  const state = new Map<string, any>();
  Object.keys(obj).forEach((key) => {
    const backupRecord = obj[key];


    if (!backupRecord.key || !backupRecord._value) {
      console.error(`Invalid record in backup file: ${key}`);
      return;
    }
    state.set(key, new RecordValue(backupRecord.key, backupRecord._value, backupRecord.expireAt));
  })

  KeyValueStorage.importState(state);
}

async function main() {
  await registerRestRoutes(app)

  app.addHook('onRequest', loggerMiddleware)

  app.listen({ port: config.port }, (err, address) => {
    if (err) {
      app.log.error(err)
      process.exit(1)
    }
    console.log("Server listening at " + address)
  })
}

// Бэкап перед завершением
process.on('SIGINT', () => {
  const state = KeyValueStorage.exportState();

  fs.writeFileSync(DATA_FILE, JSON.stringify(Object.fromEntries(state), null, 2));
  console.log('\nState saved to file. Exiting.');
  process.exit(0);
});

main()
