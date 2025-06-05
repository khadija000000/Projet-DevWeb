// src/models/db.js
import Database from 'better-sqlite3';

//  Ajout du timeout à 5000 ms = attend jusqu'à 5 secondes si la base est verrouillée
const db = new Database('db.sqlite', { timeout: 5000 });

db.exec(`
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT,
    email TEXT UNIQUE,
    password TEXT,
    role TEXT
  );

  CREATE TABLE IF NOT EXISTS events (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT,
    description TEXT,
    date TEXT,
    time TEXT,
    location TEXT,
    category TEXT,
    organizer TEXT,
    audience TEXT,
    guests TEXT,
    image TEXT,
   
    creator_id INTEGER
  );
`);

export default db;
