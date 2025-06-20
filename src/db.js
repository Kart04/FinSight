import Dexie from 'dexie';

const db = new Dexie('MyDatabase');
db.version(1).stores({
  users: '++id, firstName, lastName, email, password'
});

export default db;
