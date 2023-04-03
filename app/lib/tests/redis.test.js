/* eslint-env mocha */
import { expect } from 'chai';

import '../../before.test.js';

import {
  Redis,
  Shade,
} from '../index.js';

describe(`\n${Shade.yellow('lib/redis.js')}`, () => {
  beforeEach(async () => {
    await Redis.flushAll();
  });

  context('Tests the Redis library', async () => {
    const testField = 'testField';
    const testKey = 'testKey';
    const testVal = 'testVal';


    it('Creates one item', async () => {
      const createdCount = await Redis.set(testField, testKey, testVal);
      expect(createdCount).to.equal(1);

      const createdValue = await Redis.get(testField, testKey);
      expect(createdValue).to.equal(testVal);
    });


    it('Updates one item', async () => {
      const createdCountOne = await Redis.set(testField, testKey, testVal);
      expect(createdCountOne).to.equal(1);

      const createdValue = await Redis.get(testField, testKey);
      expect(createdValue).to.equal(testVal);

      const newVal = 'newVal';
      const createdCountTwo = await Redis.set(testField, testKey, newVal);
      expect(createdCountTwo).to.equal(0);

      const updatedVal = await Redis.get(testField, testKey);
      expect(updatedVal).to.equal(newVal);
    });

    it('Deletes one item', async () => {
      const createdCountOne = await Redis.set(testField, testKey, testVal);
      expect(createdCountOne).to.equal(1);

      const createdValue = await Redis.get(testField, testKey);
      expect(createdValue).to.equal(testVal);

      const delCount = await Redis.delete(testField, testKey);
      expect(delCount).to.equal(1);

      const nullVal = await Redis.get(testField, testKey);
      expect(nullVal).to.equal(null);
    });
  });
});
