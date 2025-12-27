
import { Router, Request, Response } from 'express';

export class HealthCheckController {
    public router: Router;

    constructor() {
        this.router = Router();
        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.get('/', this.healthCheck);
    }

    private healthCheck = async (req: Request, res: Response) => {
        res.status(200).send({ status: 'OK', message: 'Service is healthy' });
    };
}