import { PrismaClient, SalleStatus as PrismaSalleStatus } from '@prisma/client';
import { CreateSalleInput, UpdateSalleInput, ApproveSalleInput } from '../models/salle.interface';

const prisma = new PrismaClient();

export class SalleService {
  async createSalle(data: CreateSalleInput) {
    return await prisma.salle.create({
      data: {
        ...data,
        status: data.status ? data.status.toUpperCase() as PrismaSalleStatus : PrismaSalleStatus.PENDING,
      },
      include: {
        owner: {
          select: {
            id: true,
            email: true,
            first_name: true,
            last_name: true,
          },
        },
      },
    });
  }

  async getAllSalles() {
    return await prisma.salle.findMany({
      include: {
        owner: {
          select: {
            id: true,
            email: true,
            first_name: true,
            last_name: true,
          },
        },
        approver: {
          select: {
            id: true,
            email: true,
            first_name: true,
            last_name: true,
          },
        },
      },
      orderBy: {
        created_at: 'desc',
      },
    });
  }

  async getSalleById(id: number) {
    return await prisma.salle.findUnique({
      where: { id },
      include: {
        owner: {
          select: {
            id: true,
            email: true,
            first_name: true,
            last_name: true,
            role: true,
          },
        },
        approver: {
          select: {
            id: true,
            email: true,
            first_name: true,
            last_name: true,
          },
        },
      },
    });
  }

  async getSallesByOwnerId(owner_id: number) {
    return await prisma.salle.findMany({
      where: { owner_id },
      include: {
        approver: {
          select: {
            id: true,
            email: true,
            first_name: true,
            last_name: true,
          },
        },
      },
      orderBy: {
        created_at: 'desc',
      },
    });
  }

  async getSallesByStatus(status: PrismaSalleStatus) {
    return await prisma.salle.findMany({
      where: { status },
      include: {
        owner: {
          select: {
            id: true,
            email: true,
            first_name: true,
            last_name: true,
          },
        },
        approver: {
          select: {
            id: true,
            email: true,
            first_name: true,
            last_name: true,
          },
        },
      },
      orderBy: {
        created_at: 'desc',
      },
    });
  }

  async updateSalle(id: number, data: UpdateSalleInput) {
    const updateData: any = { ...data };
    
    if (data.status) {
      updateData.status = data.status.toUpperCase() as PrismaSalleStatus;
    }

    return await prisma.salle.update({
      where: { id },
      data: updateData,
      include: {
        owner: {
          select: {
            id: true,
            email: true,
            first_name: true,
            last_name: true,
          },
        },
        approver: {
          select: {
            id: true,
            email: true,
            first_name: true,
            last_name: true,
          },
        },
      },
    });
  }

  async approveSalle(id: number, data: ApproveSalleInput) {
    return await prisma.salle.update({
      where: { id },
      data: {
        status: data.status.toUpperCase() as PrismaSalleStatus,
        approved_by: data.approved_by,
        approved_at: new Date(),
      },
      include: {
        owner: {
          select: {
            id: true,
            email: true,
            first_name: true,
            last_name: true,
          },
        },
        approver: {
          select: {
            id: true,
            email: true,
            first_name: true,
            last_name: true,
          },
        },
      },
    });
  }

  async activateSalle(id: number) {
    return await prisma.salle.update({
      where: { id },
      data: { status: PrismaSalleStatus.ACTIVE },
      include: {
        owner: {
          select: {
            id: true,
            email: true,
            first_name: true,
            last_name: true,
          },
        },
      },
    });
  }

  async deactivateSalle(id: number) {
    return await prisma.salle.update({
      where: { id },
      data: { status: PrismaSalleStatus.INACTIVE },
      include: {
        owner: {
          select: {
            id: true,
            email: true,
            first_name: true,
            last_name: true,
          },
        },
      },
    });
  }

  async deleteSalle(id: number) {
    return await prisma.salle.delete({
      where: { id },
    });
  }
}

export default new SalleService();