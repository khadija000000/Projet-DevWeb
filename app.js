import express from 'express';
import cors from 'cors';
import authRoutes from './routes/auth.js';
import eventRoutes from './routes/events.js';

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api', authRoutes);
app.use('/api/events', eventRoutes);

app.listen(5001, () => {
  console.log('✅ Serveur démarré sur http://localhost:5001');
});
