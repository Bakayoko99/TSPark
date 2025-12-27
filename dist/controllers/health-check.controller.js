"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HealthCheckController = void 0;
const express_1 = require("express");
class HealthCheckController {
    router;
    constructor() {
        this.router = (0, express_1.Router)();
        this.initializeRoutes();
    }
    initializeRoutes() {
        this.router.get('/health', this.healthCheck);
    }
    healthCheck = async (req, res) => {
        res.status(200).send({ status: 'OK', message: 'Service is healthy' });
    };
}
exports.HealthCheckController = HealthCheckController;
//# sourceMappingURL=health-check.controller.js.map