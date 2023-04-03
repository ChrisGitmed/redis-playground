/* eslint-env mocha */
import { expect } from 'chai';

import '../../before.test.js';

import { asCallback } from '../../util/index.js';
import {
  DB,
  Shade,
} from '../index.js';

describe(`\n${Shade.yellow('lib/db.js')}`, () => {
  context('Tests the DB library', async () => {
    it('Connects', async () => {
      const [err, results] = await asCallback(DB.testConnection());
      expect(err).to.equal(null);
      expect(results).to.equal(true);
    });


    it('Initiates a transaction', async () => {
      const [errTrx, trxResult] = await DB.asTransaction(async (trx) => {
        const { rows: [results] } = await trx.raw('SELECT 1');
        return !!results;
      });
      expect(errTrx).to.equal(null);
      expect(trxResult).to.equal(true);
    });


    it('Drops all tables', async () => {
      // Preliminary insert
      await DB.io.raw('CREATE TABLE users (id INTEGER)');

      // Drop tables
      await DB.dropAllTables();

      // Are any left?
      const tablesLeft = await DB.io.select('*')
        .from('information_schema.tables')
        .where({ table_schema: 'public' });
      expect(tablesLeft.length).to.equal(0);
    });


    it('Migrates to the latest migration', async () => {
      const result = await DB.migrateLatest();
      expect(result).to.be.an('array').with.length(2);
      expect(result[0]).to.equal(1);
    });
  });
});
