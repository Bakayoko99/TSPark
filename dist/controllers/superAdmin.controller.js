"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SuperAdminController = void 0;
const express_1 = require("express");
class SuperAdminController {
    router;
    constructor() {
        this.router = (0, express_1.Router)();
        this.initializeRoutes();
    }
    initializeRoutes() {
        this.router.get('/superadmins', this.getAllSuperAdmins);
        this.router.get('/superadmins/:id', this.getSuperAdminById);
        this.router.post('/superadmins', this.createSuperAdmin);
        this.router.put('/superadmins/:id', this.updateSuperAdmin);
        this.router.delete('/superadmins/:id', this.deleteSuperAdmin);
    }
    getAllSuperAdmins = async (req, res) => {
        // Logique pour récupérer tous les super admins
        res.send('Récupérer tous les super admins');
    };
    getSuperAdminById = async (req, res) => {
        const id = req.params.id;
        // Logique pour récupérer un super admin par ID
        res.send(`Récupérer le super admin avec l'ID: ${id}`);
    };
    createSuperAdmin = async (req, res) => {
        const superAdminData = req.body;
        // Logique pour créer un nouveau super admin
        res.send('Créer un nouveau super admin');
    };
    updateSuperAdmin = async (req, res) => {
        const id = req.params.id;
        const superAdminData = req.body;
        // Logique pour mettre à jour un super admin existant
        res.send(`Mettre à jour le super admin avec l'ID: ${id}`);
    };
    deleteSuperAdmin = async (req, res) => {
        const id = req.params.id;
        // Logique pour supprimer un super admin
        res.send(`Supprimer le super admin avec l'ID: ${id}`);
    };
}
exports.SuperAdminController = SuperAdminController;
//# sourceMappingURL=superAdmin.controller.js.map