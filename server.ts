import express from 'express';
import dotenv from 'dotenv';
import userRoutes from './routes/User.routes';
import salleRoutes from './routes/Salle.routes';
import equipmentRoutes from './routes/Equipment.routes';
import gymEquipmentRoutes from './routes/gymEquipment.routes';



dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use('/api/users', userRoutes);
app.use('/api/salles', salleRoutes);
app.use('/api/equipments', equipmentRoutes);
app.use('/api/gym-equipments', gymEquipmentRoutes);


app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

import authRoutes from './routes/auth.routes';
import userRoutes from './routes/User.routes';
import salleRoutes from './routes/Salle.routes';
import equipmentRoutes from './routes/Equipment.routes';
import gymEquipmentRoutes from './routes/gymEquipment.routes';


import exerciceTypeRoutes from './routes/exerciceType.routes';
import gymExerciceTypeRoutes from './routes/gymExerciceType.routes';
import defiRoutes from './routes/defi.routes';
import defiExerciceRoutes from './routes/defiExercice.routes';
import userDefiRoutes from './routes/userDefi.routes';
import workoutSessionRoutes from './routes/workoutSession.routes';
import workoutExerciceRoutes from './routes/workoutExercice.routes';

dotenv.config();

const PORT = process.env.PORT || 3000;

app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/salles', salleRoutes);
app.use('/api/equipments', equipmentRoutes);
app.use('/api/gym-equipments', gymEquipmentRoutes);

app.use('/api/exercice-types', exerciceTypeRoutes);
app.use('/api/gym-exercice-types', gymExerciceTypeRoutes);
app.use('/api/defis', defiRoutes);
app.use('/api/defi-exercices', defiExerciceRoutes);
app.use('/api/user-defis', userDefiRoutes);
app.use('/api/workout-sessions', workoutSessionRoutes);
app.use('/api/workout-exercices', workoutExerciceRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);

