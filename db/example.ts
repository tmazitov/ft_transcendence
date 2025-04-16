
import Database from 'better-sqlite3';

// Recommend to setup the database instance at the beginning of the app work
function getDb() {
  return new Database('/app/data/database.sqlite3', { verbose: console.log });
}

function testDb() {
  try {
    const db = getDb();
    const result = db.prepare('SELECT * FROM user').all();
    console.log(result);
    db.prepare('INSERT INTO user (email, login, password) VALUES (?, ?, ?)').run("tma@gm.com", "user_login", "12345678");
    db.close();
  } catch (error) {
    console.error('Error handling database:', error);
  }
}