import * as migration_20250803_092013 from './20250803_092013';

export const migrations = [
  {
    up: migration_20250803_092013.up,
    down: migration_20250803_092013.down,
    name: '20250803_092013'
  },
];
