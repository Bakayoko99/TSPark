import { PrismaClient } from '@prisma/client';
import { CreateEquipmentInput, UpdateEquipmentInput } from '../models/Equipment.interface';

const prisma = new PrismaClient();

export class EquipmentService {
  async createEquipment(data: CreateEquipmentInput) {
    return await prisma.equipment.create({
      data,
    });
  }

  async getAllEquipments() {
    return await prisma.equipment.findMany({
      orderBy: {
        name: 'asc',
      },
    });
  }

  async getEquipmentById(id: number) {
    return await prisma.equipment.findUnique({
      where: { id },
    });
  }

  async searchEquipmentsByName(searchTerm: string) {
    return await prisma.equipment.findMany({
      where: {
        name: {
          contains: searchTerm,
          mode: 'insensitive',
        },
      },
      orderBy: {
        name: 'asc',
      },
    });
  }

  async updateEquipment(id: number, data: UpdateEquipmentInput) {
    return await prisma.equipment.update({
      where: { id },
      data,
    });
  }

  async deleteEquipment(id: number) {
    return await prisma.equipment.delete({
      where: { id },
    });
  }
}

export default new EquipmentService();