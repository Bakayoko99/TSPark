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