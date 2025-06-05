import { Router } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import users from '../models/userModel.js';

const router = Router();
const SECRET = 'inpt_secret_key';

//  ROUTE D'INSCRIPTION
router.post('/signup', (req, res) => {
  const { username, email, password, role } = req.body;

  if (!username || !email || !password || !role) {
    return res.status(400).json({ error: 'Tous les champs sont requis' });
  }

  // Traduction du rôle si besoin
  const englishRole = role === 'organisateur' ? 'organizer'
                     : role === 'étudiant' ? 'student'
                     : role;

  const hashedPassword = bcrypt.hashSync(password, 10);

  users.create({ username, email, password: hashedPassword, role: englishRole }, (err) => {
    if (err) {
      console.error("Erreur lors de l'inscription :", err);
      return res.status(409).json({ error: 'email_used' });
    }
    return res.status(201).json({ message: 'created' });
  });
});


// ROUTE DE CONNEXION
router.post('/login', (req, res) => {
  const { email, password } = req.body;

  users.findByEmail(email, (err, user) => {
    if (err) {
      console.error("Erreur lors de la recherche de l'utilisateur :", err);
      return res.status(500).json({ error: 'Erreur serveur' });
    }

    if (!user) {
      return res.status(401).json({ error: 'Utilisateur non trouvé' });
    }

    if (!bcrypt.compareSync(password, user.password)) {
      return res.status(401).json({ error: 'Mot de passe incorrect' });
    }

    const token = jwt.sign(
      { id: user.id, username: user.username, role: user.role },
      SECRET,
      { expiresIn: '2h' }
    );

    res.json({ token, id: user.id, username: user.username, role: user.role });
  });
});

export default router;
