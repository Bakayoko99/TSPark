"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = require("dotenv");
const health_check_controller_1 = require("./controllers/health-check.controller");
(0, dotenv_1.config)();
const Main = async () => {
    const app = (0, express_1.default)();
    const healthCheckController = new health_check_controller_1.HealthCheckController();
    app.use('/', healthCheckController.router);
    app.listen(process.env.PORT, () => {
        console.log(`Server is running on port ${process.env.PORT}`);
    });
};
Main().catch(console.error);
//# sourceMappingURL=server.js.map