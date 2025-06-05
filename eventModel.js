import db from './db.js';

export default {
  list: (cb) => {
    try {
      const stmt = db.prepare('SELECT * FROM events');
      const rows = stmt.all();
      cb(null, rows);
    } catch (err) {
      cb(err, null);
    }
  },

  // Créer un nouvel événement
create: (data, cb) => {
  try {
    const insert = db.prepare(`
      INSERT INTO events (title, description, date, time, location, category, organizer, audience, guests, image, creator_id)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `);

    const transaction = db.transaction((eventData) => {
      return insert.run(
        eventData.title,
        eventData.description,
        eventData.date,
        eventData.time,
        eventData.location,
        eventData.category,
        eventData.organizer,
        eventData.audience,
        eventData.guests?.join(', '),
        eventData.image,
        eventData.creator_id
      ).lastInsertRowid;
    });

    const lastId = transaction(data);
    cb(null, lastId);
  } catch (err) {
    console.error("❌ Erreur DB :", err.message);
    cb(err, null);
  }
}
,

  update: (id, data, cb) => {
    const stmt = db.prepare(`
      UPDATE events
      SET title = ?, description = ?, date = ?, time = ?, location = ?, category = ?, organizer = ?, audience = ?, guests = ?, image = ?
      WHERE id = ?
    `);
    try {
      stmt.run(
        data.title,
        data.description,
        data.date,
        data.time,
        data.location,
        data.category,
        data.organizer,
        data.audience,
        data.guests?.join(', '),
       
        id
      );
      cb(null);
    } catch (err) {
      cb(err);
    }
  },

  remove: (id, cb) => {
    const stmt = db.prepare('DELETE FROM events WHERE id = ?');
    try {
      stmt.run(id);
      cb(null);
    } catch (err) {
      cb(err);
    }
  },
};
