import express from 'express';
import helmet from 'helmet';
import morgan from 'morgan';

import { config } from '../config/index.js';
import { DB } from './lib/index.js';
import { ErrorMiddleware } from './middleware/index.js';
import { isMain } from './util/index.js';
import { router } from './router/index.js';


class Application {
  /// Application
  static app = express()
    .use(express.json())
    .use(express.urlencoded({ extended: true }))
    .use(helmet())
    .use(morgan('dev'))
    .use('/api', router)
    .use(ErrorMiddleware.handleErr());


  /// Start
  static start = async (port) => {
    process.on('uncaughtException', (err) => console.error('Top-Level exception', err, err.stack));

    await DB.testConnection();
    return new Promise((resolve, reject) => {
      console.log(`API listening on port: ${port}`);
      this.app.listen(port, async (err) => {
        if (err) {
          console.error(err);
          reject(err);
        }
        console.log();
      });
      resolve();
    });
  };
}


(async () => {
  // If invoked directly from the command line...
  if (isMain(import.meta.url)) await Application.start(config.port);
})();

export const { app } = Application;

