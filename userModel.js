// src/models/userModel.js
import db from './db.js';
import bcrypt from 'bcryptjs';

export default {
  create: (user, cb) => {
    //const hashedPassword = bcrypt.hashSync(user.password, 10);

    const stmt = db.prepare(`
      INSERT INTO users (username, email, password, role)
      VALUES (?, ?, ?, ?)
    `);

    try {
      stmt.run(user.username, user.email, user.password, user.role);

      cb(null);
    } catch (err) {
      cb(err); // Erreur si email déjà utilisé (unique)
    }
  },

  findByEmail: (email, cb) => {
    const stmt = db.prepare(`SELECT * FROM users WHERE email = ?`);
    const user = stmt.get(email);
    cb(null, user);
  }
};
