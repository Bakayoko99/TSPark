import { Mongoose, Model } from "mongoose";
import { SuperAdmin, SuperAdminPermissions, CreateSuperAdminDto, UpdateSuperAdminDto } from "../models/superAdmin.interface";
import { SuperAdminModel } from "./schema/superAdmin.schema";

export interface SuperAdminService {
    createSuperAdmin(data: CreateSuperAdminDto): Promise<SuperAdmin>;
    getSuperAdminById(id: string): Promise<SuperAdmin | null>;
    updateSuperAdmin(id: string, data: UpdateSuperAdminDto): Promise<SuperAdmin | null>;
    deleteSuperAdmin(id: string): Promise<boolean>;
    listSuperAdmins(): Promise<SuperAdmin[]>;
}

export class SuperAdminServiceImpl implements SuperAdminService {
    readonly superAdminModel: Model<SuperAdmin>;

    constructor() {
        this.superAdminModel = SuperAdminModel;
    }

    async createSuperAdmin(data: CreateSuperAdminDto): Promise<SuperAdmin> {
        const newSuperAdmin = new this.superAdminModel(data);
        return newSuperAdmin.save();
    }

    async getSuperAdminById(id: string): Promise<SuperAdmin | null> {
        return this.superAdminModel.findById(id).exec();
    }

    async updateSuperAdmin(id: string, data: UpdateSuperAdminDto): Promise<SuperAdmin | null> {
        return this.superAdminModel.findByIdAndUpdate(id, data, { new: true }).exec();
    }

    async deleteSuperAdmin(id: string): Promise<boolean> {
        const result = await this.superAdminModel.findByIdAndDelete(id).exec();
        return result !== null;
    }

    async listSuperAdmins(): Promise<SuperAdmin[]> {
        return this.superAdminModel.find().exec();
    }

   
}   

