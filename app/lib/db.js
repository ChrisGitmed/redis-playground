import Knex from 'knex';

import { asCallback } from '../util/index.js';
import { config } from '../../config/index.js';


class DB {
  /// CONNECTION
  static io = Knex.knex(config.db);


  /// AS TRANSACTION
  static asTransaction = async (promise) => asCallback(this.io.transaction(promise));


  /// TEST CONNECTION
  static testConnection = async () => {
    console.log(`\nDB connected on port: ${config.db.connection.port}`);
    const { rows: [results] } = await this.io.raw('SELECT 1');
    return !!results;
  };


  /// DROP ALL TABLES
  static dropAllTables = async () => {
    // Ensure we are in a safe environment
    if (config.NODE_ENV !== 'localdev' || config.db.connection.host !== 'localhost') {
      console.error('Cannot drop tables outside a local environment. Exiting...');
      process.exit(1);
    }

    // Drop all tables, including knex_migrations/knex_migrations_lock
    const allTables = await this.io
      .select('*')
      .from('information_schema.tables')
      .where({ table_schema: 'public' });
    await Promise.all(allTables.map(async (table) => {
      await this.io.schema.dropTableIfExists(table.table_name);
    }));
  };


  /// MIGRATE LATEST
  static migrateLatest = async () => this.io.migrate.latest({ directory: './migrations/' });
}


export { DB };
