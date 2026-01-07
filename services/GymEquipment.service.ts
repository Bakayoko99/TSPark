import { PrismaClient } from '@prisma/client';
import { CreateGymEquipmentInput, UpdateGymEquipmentInput } from '../models/GymEquipment.interface';

const prisma = new PrismaClient();

export class GymEquipmentService {
  async addEquipmentToGym(data: CreateGymEquipmentInput) {
    return await prisma.gymEquipment.create({
      data,
      include: {
        equipment: true,
        gym: {
          select: {
            id: true,
            name: true,
            city: true,
          },
        },
      },
    });
  }

  async getEquipmentsByGymId(gym_id: number) {
    return await prisma.gymEquipment.findMany({
      where: { gym_id },
      include: {
        equipment: true,
      },
      orderBy: {
        equipment: {
          name: 'asc',
        },
      },
    });
  }

  async getGymsByEquipmentId(equipment_id: number) {
    return await prisma.gymEquipment.findMany({
      where: { equipment_id },
      include: {
        gym: {
          select: {
            id: true,
            name: true,
            address: true,
            city: true,
            postal_code: true,
            contact_phone: true,
            contact_email: true,
            status: true,
          },
        },
      },
      orderBy: {
        gym: {
          name: 'asc',
        },
      },
    });
  }

  async getGymEquipmentById(id: number) {
    return await prisma.gymEquipment.findUnique({
      where: { id },
      include: {
        equipment: true,
        gym: {
          select: {
            id: true,
            name: true,
            city: true,
          },
        },
      },
    });
  }

  async getGymEquipmentByIds(gym_id: number, equipment_id: number) {
    return await prisma.gymEquipment.findUnique({
      where: {
        gym_id_equipment_id: {
          gym_id,
          equipment_id,
        },
      },
      include: {
        equipment: true,
        gym: {
          select: {
            id: true,
            name: true,
            city: true,
          },
        },
      },
    });
  }

  async updateGymEquipment(id: number, data: UpdateGymEquipmentInput) {
    return await prisma.gymEquipment.update({
      where: { id },
      data,
      include: {
        equipment: true,
        gym: {
          select: {
            id: true,
            name: true,
            city: true,
          },
        },
      },
    });
  }

  async deleteGymEquipment(id: number) {
    return await prisma.gymEquipment.delete({
      where: { id },
    });
  }

  async deleteAllGymEquipments(gym_id: number) {
    return await prisma.gymEquipment.deleteMany({
      where: { gym_id },
    });
  }

  async countEquipmentsByGymId(gym_id: number) {
    return await prisma.gymEquipment.count({
      where: { gym_id },
    });
  }

  async getTotalQuantityByGymId(gym_id: number) {
    const result = await prisma.gymEquipment.aggregate({
      where: { gym_id },
      _sum: {
        quantity: true,
      },
    });
    return result._sum.quantity || 0;
  }
}

export default new GymEquipmentService();