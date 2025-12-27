import { Mongoose, connect } from "mongoose";


export async function openMongooseConnection(): Promise<Mongoose> {
    // Vérification des variables d'environnement
    const requiredEnvVars = [
        'MONGODB_URI',
        'MONGODB_USER', 
        'MONGODB_PASSWORD',
        'MONGODB_DATABASE'
    ];

    for (const envVar of requiredEnvVars) {
        if (!process.env[envVar]) {
            throw new Error(`Variable d'environnement manquante: ${envVar}`);
        }
    }

    const connectionOptions = {
        auth: {
            username: process.env.MONGODB_USER!,
            password: process.env.MONGODB_PASSWORD!
        },
        authSource: 'admin',
        dbName: process.env.MONGODB_DATABASE!,
        // Options de connexion recommandées
        maxPoolSize: 10, // Maximum de connexions dans le pool
        serverSelectionTimeoutMS: 5000, // Timeout pour sélectionner un serveur
        socketTimeoutMS: 45000 // Timeout pour les opérations socket
    };

    try {
        const mongoose = await connect(process.env.MONGODB_URI!, connectionOptions);
        
        // Log de confirmation avec détails
        console.log(`📊 Base de données: ${process.env.MONGODB_DATABASE}`);
        console.log(`🏠 Host: ${mongoose.connection.host}`);
        console.log(`🔢 Port: ${mongoose.connection.port}`);
        
        return mongoose;
    } catch (error) {
        console.error('❌ Erreur de connexion MongoDB:', error);
        throw error;
    }
};