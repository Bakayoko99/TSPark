import express, { Express } from "express";
import { config } from "dotenv";
import { openMongooseConnection } from "./services/DB-connect";
import { HealthCheckController } from "./controllers/health-check.controller";
import { SuperAdminController } from "./controllers/superAdmin.controller";


config();

const Main = async () => {
    const app: Express = express();

    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));

    try {
        console.log('🔄 Connexion à MongoDB...');
        const mongooseConnection = await openMongooseConnection();
        console.log('✅ Connexion MongoDB établie avec succès');

        mongooseConnection.connection.on('error', (error) => {
            console.error('❌ Erreur MongoDB:', error);
        });

        mongooseConnection.connection.on('disconnected', () => {
            console.log('⚠️  MongoDB déconnecté');
        });

        const healthCheckController = new HealthCheckController();
        const superAdminController = new SuperAdminController();

        app.use('/health', healthCheckController.router);
        app.use('/superadmins', superAdminController.router);

        app.listen(process.env.PORT, () => {
            console.log(`🚀 Serveur démarré sur le port ${process.env.PORT}`);
        });

    } catch (error) {
        console.error('💥 Erreur lors du démarrage:', error);
        process.exit(1);
    }
};

Main().catch(console.error);