import { PrismaClient } from '@prisma/client';
import { CreateUserInput, UpdateUserInput } from '../models/User.interface';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

export class UserService {
  // Créer un utilisateur
  async createUser(data: CreateUserInput) {
    const hashedPassword = await bcrypt.hash(data.password_hash, 10);
    
    return await prisma.user.create({
      data: {
        ...data,
        password_hash: hashedPassword,
      },
    });
  }

  // Récupérer tous les utilisateurs
  async getAllUsers() {
    return await prisma.user.findMany({
      select: {
        id: true,
        email: true,
        first_name: true,
        last_name: true,
        role: true,
        profile_picture_url: true,
        created_at: true,
        updated_at: true,
        is_active: true,
        player_score: true,
      },
    });
  }

  // Récupérer un utilisateur par ID
  async getUserById(id: number) {
    return await prisma.user.findUnique({
      where: { id },
      select: {
        id: true,
        email: true,
        first_name: true,
        last_name: true,
        role: true,
        profile_picture_url: true,
        created_at: true,
        updated_at: true,
        is_active: true,
        player_score: true,
      },
    });
  }

  // Récupérer un utilisateur par email
  async getUserByEmail(email: string) {
    return await prisma.user.findUnique({
      where: { email },
    });
  }

  // Mettre à jour un utilisateur
  async updateUser(id: number, data: UpdateUserInput) {
    if (data.password_hash) {
      data.password_hash = await bcrypt.hash(data.password_hash, 10);
    }

    return await prisma.user.update({
      where: { id },
      data,
      select: {
        id: true,
        email: true,
        first_name: true,
        last_name: true,
        role: true,
        profile_picture_url: true,
        created_at: true,
        updated_at: true,
        is_active: true,
        player_score: true,
      },
    });
  }

  // Supprimer un utilisateur
  async deleteUser(id: number) {
    return await prisma.user.delete({
      where: { id },
    });
  }

  // Désactiver un utilisateur
  async deactivateUser(id: number) {
    return await prisma.user.update({
      where: { id },
      data: { is_active: false },
    });
  }

  // Activer un utilisateur
  async activateUser(id: number) {
    return await prisma.user.update({
      where: { id },
      data: { is_active: true },
    });
  }

  // Mettre à jour le score d'un joueur
  async updatePlayerScore(id: number, score: number) {
    return await prisma.user.update({
      where: { id },
      data: { player_score: score },
    });
  }
}

export default new UserService();