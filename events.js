import { Router } from 'express';
import events from '../models/eventModel.js';
import { verify, onlyOrganizer } from '../middleware/auth.js';
import db from '../models/db.js';


const router = Router();

// Récupérer tous les événements
router.get('/', (req, res) => {
  events.list((err, rows) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Erreur serveur' });
    }
    res.json(rows);
  });
});
// Récupérer un événement par son ID
router.get('/:id', (req, res) => {
  const stmt = db.prepare('SELECT * FROM events WHERE id = ?');
  const event = stmt.get(req.params.id);

  if (!event) {
    return res.status(404).json({ error: 'Événement introuvable' });
  }

  res.json(event);
});


// Créer un nouvel événement
router.post('/', verify, onlyOrganizer, (req, res) => {
  const data = { ...req.body, creator_id: req.user.id };
  console.log("📝 Données reçues :", data); // ← AJOUTE ÇA

  events.create(data, (err, id) => {
    if (err) {
      console.error("❌ Erreur DB :", err.message); // ← AJOUTE ÇA aussi
      return res.status(400).json({ error: err.message });
    }
    res.status(201).json({ id });
  });
});


// Mettre à jour un événement
router.put('/:id', verify, onlyOrganizer, (req, res) => {
  // Vérifier que l'utilisateur est le créateur de l'événement
  const stmt = db.prepare('SELECT creator_id FROM events WHERE id = ?');
  const event = stmt.get(req.params.id);
  if (!event || event.creator_id !== req.user.id) {
    return res.status(403).json({ error: 'Non autorisé' });
  }

  events.update(req.params.id, req.body, (err) => {
    if (err) {
      console.error(err);
      return res.status(400).json({ error: 'Erreur lors de la mise à jour' });
    }
    res.json({ message: 'updated' });
  });
});

// Supprimer un événement
router.delete('/:id', verify, onlyOrganizer, (req, res) => {
  // Vérifier que l'utilisateur est le créateur de l'événement
  const stmt = db.prepare('SELECT creator_id FROM events WHERE id = ?');
  const event = stmt.get(req.params.id);
  if (!event || event.creator_id !== req.user.id) {
    return res.status(403).json({ error: 'Non autorisé' });
  }

  events.remove(req.params.id, (err) => {
    if (err) {
      console.error(err);
      return res.status(400).json({ error: 'Erreur lors de la suppression' });
    }
    res.json({ message: 'deleted' });
  });
});

export default router;