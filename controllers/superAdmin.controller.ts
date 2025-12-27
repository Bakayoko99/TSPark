import { Router, Request, Response } from 'express';
import { SuperAdmin, CreateSuperAdminDto, UpdateSuperAdminDto } from '../models/superAdmin.interface';
import { SuperAdminService, SuperAdminServiceImpl } from '../services/superAdmin.service';

export class SuperAdminController {
    public router: Router;
    private superAdminService: SuperAdminService;

    constructor() {
        this.router = Router();
        this.superAdminService = new SuperAdminServiceImpl();
        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.get('/', this.getAllSuperAdmins);
        this.router.get('/:id', this.getSuperAdminById);
        this.router.post('/add', this.createSuperAdmin);
        this.router.put('/:id', this.updateSuperAdmin);
        this.router.delete('/:id', this.deleteSuperAdmin);
    }

    private getAllSuperAdmins = async (req: Request, res: Response) => {
        try {
            const superAdmins = await this.superAdminService.listSuperAdmins();
            res.status(200).json({
                success: true,
                data: superAdmins,
                count: superAdmins.length
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: 'Erreur lors de la récupération des super admins',
                error: error instanceof Error ? error.message : 'Erreur inconnue'
            });
        }
    };

    private getSuperAdminById = async (req: Request, res: Response) => {
        try {
            const { id } = req.params;
            if (!id) {
                return res.status(400).json({
                    success: false,
                    message: 'ID manquant'
                });
            }
            const superAdmin = await this.superAdminService.getSuperAdminById(id);
            
            if (!superAdmin) {
                return res.status(404).json({
                    success: false,
                    message: 'Super admin non trouvé'
                });
            }
            
            res.status(200).json({
                success: true,
                data: superAdmin
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: 'Erreur lors de la récupération du super admin',
                error: error instanceof Error ? error.message : 'Erreur inconnue'
            });
        }
    };

    private createSuperAdmin = async (req: Request, res: Response) => {
        try {
            const createData: CreateSuperAdminDto = req.body;
            const newSuperAdmin = await this.superAdminService.createSuperAdmin(createData);
            
            res.status(201).json({
                success: true,
                data: newSuperAdmin,
                message: 'Super admin créé avec succès'
            });
        } catch (error) {
            res.status(400).json({
                success: false,
                message: 'Erreur lors de la création du super admin',
                error: error instanceof Error ? error.message : 'Erreur inconnue'
            });
        }
    };

    private updateSuperAdmin = async (req: Request, res: Response) => {
        try {
            const { id } = req.params;
            if (!id) {
                return res.status(400).json({
                    success: false,
                    message: 'ID manquant'
                });
            }
            const updateData: UpdateSuperAdminDto = req.body;
            const updatedSuperAdmin = await this.superAdminService.updateSuperAdmin(id, updateData);
            
            if (!updatedSuperAdmin) {
                return res.status(404).json({
                    success: false,
                    message: 'Super admin non trouvé'
                });
            }
            
            res.status(200).json({
                success: true,
                data: updatedSuperAdmin,
                message: 'Super admin mis à jour avec succès'
            });
        } catch (error) {
            res.status(400).json({
                success: false,
                message: 'Erreur lors de la mise à jour du super admin',
                error: error instanceof Error ? error.message : 'Erreur inconnue'
            });
        }
    };

    private deleteSuperAdmin = async (req: Request, res: Response) => {
        try {
            const { id } = req.params;
            if (!id) {
                return res.status(400).json({
                    success: false,
                    message: 'ID manquant'
                });
            }
            const deleted = await this.superAdminService.deleteSuperAdmin(id);
            
            if (!deleted) {
                return res.status(404).json({
                    success: false,
                    message: 'Super admin non trouvé'
                });
            }
            
            res.status(200).json({
                success: true,
                message: 'Super admin supprimé avec succès'
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: 'Erreur lors de la suppression du super admin',
                error: error instanceof Error ? error.message : 'Erreur inconnue'
            });
        }
    };
}   