import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting database seeding...');

  // Nettoyer la base de données
  await prisma.$executeRaw`TRUNCATE TABLE "users", "salles", "equipments", "gym_equipments", "exercice_types", "gym_exercice_types", "defis", "defi_exercices", "user_defis", "workout_sessions", "workout_exercices", "badges", "user_badges", "badge_rules" RESTART IDENTITY CASCADE;`;

  // ========================================
  // 1. USERS
  // ========================================
  console.log('👤 Creating users...');
  
  const hashedPassword = await bcrypt.hash('Password123!', 10);

  const admin = await prisma.user.create({
    data: {
      email: 'admin@tspark.com',
      password_hash: hashedPassword,
      first_name: 'Admin',
      last_name: 'TSPark',
      role: 'ADMIN',
      player_score: 1000,
    },
  });

  const gymOwner1 = await prisma.user.create({
    data: {
      email: 'owner1@gym.com',
      password_hash: hashedPassword,
      first_name: 'Jean',
      last_name: 'Dupont',
      role: 'GYM_OWNER',
      player_score: 500,
    },
  });

  const gymOwner2 = await prisma.user.create({
    data: {
      email: 'owner2@gym.com',
      password_hash: hashedPassword,
      first_name: 'Marie',
      last_name: 'Martin',
      role: 'GYM_OWNER',
      player_score: 450,
    },
  });

  const clients = await Promise.all([
    prisma.user.create({
      data: {
        email: 'client1@example.com',
        password_hash: hashedPassword,
        first_name: 'Pierre',
        last_name: 'Durand',
        role: 'CLIENT',
        player_score: 350,
      },
    }),
    prisma.user.create({
      data: {
        email: 'client2@example.com',
        password_hash: hashedPassword,
        first_name: 'Sophie',
        last_name: 'Bernard',
        role: 'CLIENT',
        player_score: 420,
      },
    }),
    prisma.user.create({
      data: {
        email: 'client3@example.com',
        password_hash: hashedPassword,
        first_name: 'Lucas',
        last_name: 'Petit',
        role: 'CLIENT',
        player_score: 280,
      },
    }),
    prisma.user.create({
      data: {
        email: 'client4@example.com',
        password_hash: hashedPassword,
        first_name: 'Emma',
        last_name: 'Robert',
        role: 'CLIENT',
        player_score: 520,
      },
    }),
  ]);

  console.log(`✅ Created ${clients.length + 3} users`);

  // ========================================
  // 2. SALLES (GYMS)
  // ========================================
  console.log('🏋️ Creating gyms...');

  const salles = await Promise.all([
    prisma.salle.create({
      data: {
        owner_id: gymOwner1.id,
        name: 'FitZone Paris Centre',
        address: '123 Rue de Rivoli',
        city: 'Paris',
        postal_code: '75001',
        contact_phone: '+33 1 42 60 30 30',
        contact_email: 'contact@fitzone-paris.com',
        description: 'Salle de sport moderne au cœur de Paris avec équipements de dernière génération.',
        capacity: 150,
        status: 'ACTIVE',
        approved_by: admin.id,
        approved_at: new Date(),
      },
    }),
    prisma.salle.create({
      data: {
        owner_id: gymOwner1.id,
        name: 'PowerGym Lyon',
        address: '45 Avenue Jean Jaurès',
        city: 'Lyon',
        postal_code: '69007',
        contact_phone: '+33 4 78 69 50 50',
        contact_email: 'info@powergym-lyon.com',
        description: 'Salle spécialisée en musculation et CrossFit.',
        capacity: 100,
        status: 'ACTIVE',
        approved_by: admin.id,
        approved_at: new Date(),
      },
    }),
    prisma.salle.create({
      data: {
        owner_id: gymOwner2.id,
        name: 'Wellness Marseille',
        address: '78 Boulevard Michelet',
        city: 'Marseille',
        postal_code: '13008',
        contact_phone: '+33 4 91 76 30 30',
        contact_email: 'contact@wellness-marseille.com',
        description: 'Centre de remise en forme avec piscine et spa.',
        capacity: 200,
        status: 'ACTIVE',
        approved_by: admin.id,
        approved_at: new Date(),
      },
    }),
    prisma.salle.create({
      data: {
        owner_id: gymOwner2.id,
        name: 'Urban Fitness Toulouse',
        address: '12 Rue Alsace Lorraine',
        city: 'Toulouse',
        postal_code: '31000',
        contact_phone: '+33 5 61 23 45 67',
        contact_email: 'hello@urbanfitness-toulouse.com',
        description: 'Salle de sport urbaine avec cours collectifs variés.',
        capacity: 120,
        status: 'PENDING',
      },
    }),
  ]);

  console.log(`✅ Created ${salles.length} gyms`);

  // ========================================
  // 3. EQUIPMENTS
  // ========================================
  console.log('🏋️‍♀️ Creating equipment...');

  const equipments = await Promise.all([
    prisma.equipment.create({
      data: {
        name: 'Tapis de course',
        description: 'Tapis de course électrique avec programmes intégrés',
        image_url: 'https://example.com/treadmill.jpg',
      },
    }),
    prisma.equipment.create({
      data: {
        name: 'Vélo elliptique',
        description: 'Vélo elliptique pour cardio complet',
        image_url: 'https://example.com/elliptical.jpg',
      },
    }),
    prisma.equipment.create({
      data: {
        name: 'Banc de musculation',
        description: 'Banc réglable pour exercices de musculation',
        image_url: 'https://example.com/bench.jpg',
      },
    }),
    prisma.equipment.create({
      data: {
        name: 'Haltères',
        description: 'Set d\'haltères de 2kg à 50kg',
        image_url: 'https://example.com/dumbbells.jpg',
      },
    }),
    prisma.equipment.create({
      data: {
        name: 'Machine à câbles',
        description: 'Station de musculation multifonction',
        image_url: 'https://example.com/cable-machine.jpg',
      },
    }),
    prisma.equipment.create({
      data: {
        name: 'Rameur',
        description: 'Rameur à résistance magnétique',
        image_url: 'https://example.com/rowing.jpg',
      },
    }),
    prisma.equipment.create({
      data: {
        name: 'Kettlebells',
        description: 'Ensemble de kettlebells de différents poids',
        image_url: 'https://example.com/kettlebells.jpg',
      },
    }),
    prisma.equipment.create({
      data: {
        name: 'Barre olympique',
        description: 'Barre olympique 20kg avec disques',
        image_url: 'https://example.com/barbell.jpg',
      },
    }),
  ]);

  console.log(`✅ Created ${equipments.length} equipment types`);

  // ========================================
  // 4. GYM EQUIPMENTS
  // ========================================
  console.log('🔗 Linking equipment to gyms...');

  await Promise.all([
    // FitZone Paris Centre
    prisma.gymEquipment.create({ data: { gym_id: salles[0].id, equipment_id: equipments[0].id, quantity: 8 } }),
    prisma.gymEquipment.create({ data: { gym_id: salles[0].id, equipment_id: equipments[1].id, quantity: 6 } }),
    prisma.gymEquipment.create({ data: { gym_id: salles[0].id, equipment_id: equipments[2].id, quantity: 10 } }),
    prisma.gymEquipment.create({ data: { gym_id: salles[0].id, equipment_id: equipments[3].id, quantity: 15 } }),
    prisma.gymEquipment.create({ data: { gym_id: salles[0].id, equipment_id: equipments[4].id, quantity: 4 } }),

    // PowerGym Lyon
    prisma.gymEquipment.create({ data: { gym_id: salles[1].id, equipment_id: equipments[2].id, quantity: 12 } }),
    prisma.gymEquipment.create({ data: { gym_id: salles[1].id, equipment_id: equipments[3].id, quantity: 20 } }),
    prisma.gymEquipment.create({ data: { gym_id: salles[1].id, equipment_id: equipments[6].id, quantity: 10 } }),
    prisma.gymEquipment.create({ data: { gym_id: salles[1].id, equipment_id: equipments[7].id, quantity: 5 } }),

    // Wellness Marseille
    prisma.gymEquipment.create({ data: { gym_id: salles[2].id, equipment_id: equipments[0].id, quantity: 10 } }),
    prisma.gymEquipment.create({ data: { gym_id: salles[2].id, equipment_id: equipments[1].id, quantity: 8 } }),
    prisma.gymEquipment.create({ data: { gym_id: salles[2].id, equipment_id: equipments[5].id, quantity: 6 } }),
  ]);

  console.log('✅ Linked equipment to gyms');

  // ========================================
  // 5. EXERCISE TYPES
  // ========================================
  console.log('💪 Creating exercise types...');

  const exerciceTypes = await Promise.all([
    // BEGINNER
    prisma.exerciceType.create({
      data: {
        name: 'Marche rapide',
        description: 'Marche à allure soutenue pour améliorer l\'endurance cardiovasculaire',
        difficulty_level: 'BEGINNER',
        targeted_muscles: 'Jambes, Cardio',
        calories_per_hour: 300,
      },
    }),
    prisma.exerciceType.create({
      data: {
        name: 'Squats au poids du corps',
        description: 'Flexion des jambes sans charge additionnelle',
        difficulty_level: 'BEGINNER',
        targeted_muscles: 'Quadriceps, Fessiers, Ischio-jambiers',
        calories_per_hour: 250,
      },
    }),
    prisma.exerciceType.create({
      data: {
        name: 'Pompes sur les genoux',
        description: 'Pompes facilitées pour débutants',
        difficulty_level: 'BEGINNER',
        targeted_muscles: 'Pectoraux, Triceps, Épaules',
        calories_per_hour: 200,
      },
    }),
    prisma.exerciceType.create({
      data: {
        name: 'Planche abdominale',
        description: 'Gainage statique pour renforcer la ceinture abdominale',
        difficulty_level: 'BEGINNER',
        targeted_muscles: 'Abdominaux, Dos, Épaules',
        calories_per_hour: 180,
      },
    }),

    // INTERMEDIATE
    prisma.exerciceType.create({
      data: {
        name: 'Course à pied',
        description: 'Course à intensité modérée',
        difficulty_level: 'INTERMEDIATE',
        targeted_muscles: 'Jambes, Cardio',
        calories_per_hour: 500,
      },
    }),
    prisma.exerciceType.create({
      data: {
        name: 'Squats avec haltères',
        description: 'Squats avec charge additionnelle',
        difficulty_level: 'INTERMEDIATE',
        targeted_muscles: 'Quadriceps, Fessiers, Ischio-jambiers',
        calories_per_hour: 400,
      },
    }),
    prisma.exerciceType.create({
      data: {
        name: 'Développé couché',
        description: 'Exercice de musculation pour les pectoraux avec barre',
        difficulty_level: 'INTERMEDIATE',
        targeted_muscles: 'Pectoraux, Triceps, Épaules',
        calories_per_hour: 350,
      },
    }),
    prisma.exerciceType.create({
      data: {
        name: 'Tractions',
        description: 'Exercice de traction à la barre fixe',
        difficulty_level: 'INTERMEDIATE',
        targeted_muscles: 'Dos, Biceps, Avant-bras',
        calories_per_hour: 380,
      },
    }),
    prisma.exerciceType.create({
      data: {
        name: 'Burpees',
        description: 'Exercice complet combinant pompes et sauts',
        difficulty_level: 'INTERMEDIATE',
        targeted_muscles: 'Corps entier, Cardio',
        calories_per_hour: 600,
      },
    }),

    // ADVANCED
    prisma.exerciceType.create({
      data: {
        name: 'Soulevé de terre',
        description: 'Exercice poly-articulaire avec barre olympique',
        difficulty_level: 'ADVANCED',
        targeted_muscles: 'Dos, Jambes, Fessiers, Trapèzes',
        calories_per_hour: 450,
      },
    }),
    prisma.exerciceType.create({
      data: {
        name: 'Muscle-up',
        description: 'Combinaison de traction et de dips aux anneaux',
        difficulty_level: 'ADVANCED',
        targeted_muscles: 'Dos, Pectoraux, Triceps, Épaules',
        calories_per_hour: 550,
      },
    }),
    prisma.exerciceType.create({
      data: {
        name: 'Snatch (Arraché)',
        description: 'Mouvement d\'haltérophilie explosif',
        difficulty_level: 'ADVANCED',
        targeted_muscles: 'Corps entier, Explosivité',
        calories_per_hour: 650,
      },
    }),
    prisma.exerciceType.create({
      data: {
        name: 'Pistol Squats',
        description: 'Squats sur une jambe sans support',
        difficulty_level: 'ADVANCED',
        targeted_muscles: 'Quadriceps, Fessiers, Équilibre',
        calories_per_hour: 400,
      },
    }),
  ]);

  console.log(`✅ Created ${exerciceTypes.length} exercise types`);

  // ========================================
  // 6. GYM EXERCISE TYPES
  // ========================================
  console.log('🔗 Linking exercise types to gyms...');

  await Promise.all([
    // FitZone Paris Centre - tous les niveaux
    ...exerciceTypes.map(et => 
      prisma.gymExerciceType.create({ data: { gym_id: salles[0].id, exercice_type_id: et.id } })
    ),

    // PowerGym Lyon - focus advanced
    ...exerciceTypes.filter(et => et.difficulty_level === 'ADVANCED' || et.difficulty_level === 'INTERMEDIATE').map(et =>
      prisma.gymExerciceType.create({ data: { gym_id: salles[1].id, exercice_type_id: et.id } })
    ),

    // Wellness Marseille - focus beginner/intermediate
    ...exerciceTypes.filter(et => et.difficulty_level === 'BEGINNER' || et.difficulty_level === 'INTERMEDIATE').map(et =>
      prisma.gymExerciceType.create({ data: { gym_id: salles[2].id, exercice_type_id: et.id } })
    ),
  ]);

  console.log('✅ Linked exercise types to gyms');

  // ========================================
  // 7. DEFIS (CHALLENGES)
  // ========================================
  console.log('🎯 Creating challenges...');

  const now = new Date();
  const tomorrow = new Date(now.getTime() + 24 * 60 * 60 * 1000);
  const nextWeek = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000);
  const nextMonth = new Date(now.getTime() + 30 * 24 * 60 * 60 * 1000);

  const defis = await Promise.all([
    prisma.defi.create({
      data: {
        creator_id: gymOwner1.id,
        gym_id: salles[0].id,
        title: 'Défi 30 jours - Débutant',
        description: 'Challenge parfait pour les débutants qui souhaitent créer une routine fitness régulière.',
        difficulty_level: 'BEGINNER',
        duration_days: 30,
        start_date: tomorrow,
        end_date: nextMonth,
        is_collaborative: false,
        target_calories: 15000,
        status: 'ACTIVE',
      },
    }),
    prisma.defi.create({
      data: {
        creator_id: gymOwner1.id,
        gym_id: salles[0].id,
        title: 'Challenge Cardio Intensif',
        description: 'Améliorez votre endurance avec ce challenge cardio de 14 jours.',
        difficulty_level: 'INTERMEDIATE',
        duration_days: 14,
        start_date: tomorrow,
        end_date: new Date(now.getTime() + 14 * 24 * 60 * 60 * 1000),
        is_collaborative: false,
        target_calories: 10000,
        status: 'ACTIVE',
      },
    }),
    prisma.defi.create({
      data: {
        creator_id: admin.id,
        gym_id: salles[1].id,
        title: 'Iron Challenge - CrossFit',
        description: 'Challenge d\'élite pour les athlètes confirmés. Êtes-vous prêt ?',
        difficulty_level: 'ADVANCED',
        duration_days: 21,
        start_date: tomorrow,
        end_date: new Date(now.getTime() + 21 * 24 * 60 * 60 * 1000),
        is_collaborative: false,
        target_calories: 25000,
        status: 'ACTIVE',
      },
    }),
    prisma.defi.create({
      data: {
        creator_id: gymOwner2.id,
        gym_id: salles[2].id,
        title: 'Challenge d\'Équipe - Wellness',
        description: 'Défi collaboratif pour atteindre ensemble 100,000 calories brûlées !',
        difficulty_level: 'INTERMEDIATE',
        duration_days: 30,
        start_date: tomorrow,
        end_date: nextMonth,
        is_collaborative: true,
        target_calories: 100000,
        status: 'ACTIVE',
      },
    }),
    prisma.defi.create({
      data: {
        creator_id: admin.id,
        title: 'Summer Body Challenge',
        description: 'Préparez-vous pour l\'été avec ce challenge de transformation de 60 jours.',
        difficulty_level: 'INTERMEDIATE',
        duration_days: 60,
        start_date: nextWeek,
        end_date: new Date(now.getTime() + 60 * 24 * 60 * 60 * 1000),
        is_collaborative: false,
        target_calories: 40000,
        status: 'DRAFT',
      },
    }),
  ]);

  console.log(`✅ Created ${defis.length} challenges`);

  // ========================================
  // 8. DEFI EXERCISES
  // ========================================
  console.log('🏃 Adding exercises to challenges...');

  await Promise.all([
    // Défi 30 jours - Débutant
    prisma.defiExercice.create({
      data: {
        challenge_id: defis[0].id,
        exercise_type_id: exerciceTypes[0].id, // Marche rapide
        target_duration_minutes: 30,
        order_index: 1,
      },
    }),
    prisma.defiExercice.create({
      data: {
        challenge_id: defis[0].id,
        exercise_type_id: exerciceTypes[1].id, // Squats
        target_repetitions: 20,
        order_index: 2,
      },
    }),
    prisma.defiExercice.create({
      data: {
        challenge_id: defis[0].id,
        exercise_type_id: exerciceTypes[3].id, // Planche
        target_duration_minutes: 2,
        order_index: 3,
      },
    }),

    // Challenge Cardio Intensif
    prisma.defiExercice.create({
      data: {
        challenge_id: defis[1].id,
        exercise_type_id: exerciceTypes[4].id, // Course
        target_duration_minutes: 45,
        order_index: 1,
      },
    }),
    prisma.defiExercice.create({
      data: {
        challenge_id: defis[1].id,
        exercise_type_id: exerciceTypes[8].id, // Burpees
        target_repetitions: 50,
        order_index: 2,
      },
    }),

    // Iron Challenge - CrossFit
    prisma.defiExercice.create({
      data: {
        challenge_id: defis[2].id,
        exercise_type_id: exerciceTypes[9].id, // Soulevé de terre
        target_repetitions: 100,
        order_index: 1,
      },
    }),
    prisma.defiExercice.create({
      data: {
        challenge_id: defis[2].id,
        exercise_type_id: exerciceTypes[10].id, // Muscle-up
        target_repetitions: 30,
        order_index: 2,
      },
    }),
    prisma.defiExercice.create({
      data: {
        challenge_id: defis[2].id,
        exercise_type_id: exerciceTypes[11].id, // Snatch
        target_repetitions: 50,
        order_index: 3,
      },
    }),

    // Challenge d'Équipe
    prisma.defiExercice.create({
      data: {
        challenge_id: defis[3].id,
        exercise_type_id: exerciceTypes[4].id, // Course
        target_duration_minutes: 60,
        order_index: 1,
      },
    }),
    prisma.defiExercice.create({
      data: {
        challenge_id: defis[3].id,
        exercise_type_id: exerciceTypes[5].id, // Squats avec haltères
        target_repetitions: 100,
        order_index: 2,
      },
    }),
  ]);

  console.log('✅ Added exercises to challenges');

  // ========================================
  // 9. USER DEFIS (PARTICIPATIONS)
  // ========================================
  console.log('👥 Creating challenge participations...');

  await Promise.all([
    // Client 1 participe au défi débutant
    prisma.userDefi.create({
      data: {
        user_id: clients[0].id,
        challenge_id: defis[0].id,
        status: 'IN_PROGRESS',
        progress_percentage: 45.50,
      },
    }),

    // Client 2 participe au cardio intensif
    prisma.userDefi.create({
      data: {
        user_id: clients[1].id,
        challenge_id: defis[1].id,
        status: 'IN_PROGRESS',
        progress_percentage: 67.20,
      },
    }),

    // Client 3 participe à l'Iron Challenge
    prisma.userDefi.create({
      data: {
        user_id: clients[2].id,
        challenge_id: defis[2].id,
        status: 'IN_PROGRESS',
        progress_percentage: 28.75,
      },
    }),

    // Client 4 a complété le défi débutant
    prisma.userDefi.create({
      data: {
        user_id: clients[3].id,
        challenge_id: defis[0].id,
        status: 'COMPLETED',
        progress_percentage: 100,
        completed_at: new Date(),
      },
    }),

    // Plusieurs clients dans le challenge d'équipe
    prisma.userDefi.create({
      data: {
        user_id: clients[0].id,
        challenge_id: defis[3].id,
        status: 'IN_PROGRESS',
        progress_percentage: 55.00,
      },
    }),
    prisma.userDefi.create({
      data: {
        user_id: clients[1].id,
        challenge_id: defis[3].id,
        status: 'IN_PROGRESS',
        progress_percentage: 48.30,
      },
    }),
    prisma.userDefi.create({
      data: {
        user_id: clients[2].id,
        challenge_id: defis[3].id,
        status: 'IN_PROGRESS',
        progress_percentage: 62.10,
      },
    }),
  ]);

  console.log('✅ Created challenge participations');

  // ========================================
  // 10. WORKOUT SESSIONS
  // ========================================
  console.log('📅 Creating workout sessions...');

  const yesterday = new Date(now.getTime() - 24 * 60 * 60 * 1000);
  const twoDaysAgo = new Date(now.getTime() - 2 * 24 * 60 * 60 * 1000);

  const workoutSessions = await Promise.all([
    // Client 1
    prisma.workoutSession.create({
      data: {
        user_id: clients[0].id,
        challenge_id: defis[0].id,
        gym_id: salles[0].id,
        session_date: yesterday,
        duration_minutes: 45,
        calories_burned: 350,
        notes: 'Bonne séance, je commence à voir des progrès !',
      },
    }),
    prisma.workoutSession.create({
      data: {
        user_id: clients[0].id,
        challenge_id: defis[0].id,
        gym_id: salles[0].id,
        session_date: twoDaysAgo,
        duration_minutes: 40,
        calories_burned: 320,
        notes: 'Un peu fatigué mais j\'ai tenu bon',
      },
    }),

    // Client 2
    prisma.workoutSession.create({
      data: {
        user_id: clients[1].id,
        challenge_id: defis[1].id,
        gym_id: salles[0].id,
        session_date: yesterday,
        duration_minutes: 60,
        calories_burned: 500,
        notes: 'Séance cardio intense ! 🔥',
      },
    }),

    // Client 3
    prisma.workoutSession.create({
      data: {
        user_id: clients[2].id,
        challenge_id: defis[2].id,
        gym_id: salles[1].id,
        session_date: yesterday,
        duration_minutes: 90,
        calories_burned: 750,
        notes: 'CrossFit hardcore, muscles en feu !',
      },
    }),

    // Client 4
    prisma.workoutSession.create({
      data: {
        user_id: clients[3].id,
        gym_id: salles[2].id,
        session_date: yesterday,
        duration_minutes: 50,
        calories_burned: 400,
        notes: 'Séance libre sans challenge',
      },
    }),
  ]);

  console.log(`✅ Created ${workoutSessions.length} workout sessions`);

  // ========================================
  // 11. WORKOUT EXERCISES
  // ========================================
  console.log('💪 Adding exercises to workout sessions...');

  await Promise.all([
    // Session 1 du Client 1
    prisma.workoutExercice.create({
      data: {
        workout_session_id: workoutSessions[0].id,
        exercise_type_id: exerciceTypes[0].id, // Marche rapide
        duration_minutes: 30,
      },
    }),
    prisma.workoutExercice.create({
      data: {
        workout_session_id: workoutSessions[0].id,
        exercise_type_id: exerciceTypes[1].id, // Squats
        repetitions: 25,
      },
    }),

    // Session 2 du Client 1
    prisma.workoutExercice.create({
      data: {
        workout_session_id: workoutSessions[1].id,
        exercise_type_id: exerciceTypes[0].id,
        duration_minutes: 25,
      },
    }),
    prisma.workoutExercice.create({
      data: {
        workout_session_id: workoutSessions[1].id,
        exercise_type_id: exerciceTypes[3].id, // Planche
        duration_minutes: 3,
      },
    }),

    // Session du Client 2
    prisma.workoutExercice.create({
      data: {
        workout_session_id: workoutSessions[2].id,
        exercise_type_id: exerciceTypes[4].id, // Course
        duration_minutes: 45,
      },
    }),
    prisma.workoutExercice.create({
      data: {
        workout_session_id: workoutSessions[2].id,
        exercise_type_id: exerciceTypes[8].id, // Burpees
        repetitions: 50,
      },
    }),

    // Session du Client 3
    prisma.workoutExercice.create({
      data: {
        workout_session_id: workoutSessions[3].id,
        exercise_type_id: exerciceTypes[9].id, // Soulevé de terre
        repetitions: 20,
        weight_kg: 80,
      },
    }),
    prisma.workoutExercice.create({
      data: {
        workout_session_id: workoutSessions[3].id,
        exercise_type_id: exerciceTypes[10].id, // Muscle-up
        repetitions: 10,
      },
    }),

    // Session du Client 4
    prisma.workoutExercice.create({
      data: {
        workout_session_id: workoutSessions[4].id,
        exercise_type_id: exerciceTypes[5].id, // Squats avec haltères
        repetitions: 15,
        weight_kg: 30,
      },
    }),
    prisma.workoutExercice.create({
      data: {
        workout_session_id: workoutSessions[4].id,
        exercise_type_id: exerciceTypes[6].id, // Développé couché
        repetitions: 12,
        weight_kg: 40,
      },
    }),
  ]);

  console.log('✅ Added exercises to workout sessions');

  // ========================================
  // 12. BADGES
  // ========================================
  console.log('🏅 Creating badges...');

  const badges = await Promise.all([
    prisma.badge.create({
      data: {
        name: 'Premier Pas',
        description: 'Complétez votre premier challenge',
        image_url: 'https://example.com/badges/first-step.png',
        badge_type: 'CHALLENGE_COMPLETION',
        created_by: admin.id,
      },
    }),
    prisma.badge.create({
      data: {
        name: 'Marathonien',
        description: 'Complétez 10 challenges',
        image_url: 'https://example.com/badges/marathoner.png',
        badge_type: 'CHALLENGE_COMPLETION',
        created_by: admin.id,
      },
    }),
    prisma.badge.create({
      data: {
        name: 'Dévoué',
        description: '7 jours consécutifs d\'entraînement',
        image_url: 'https://example.com/badges/dedicated.png',
        badge_type: 'STREAK',
        created_by: admin.id,
      },
    }),
    prisma.badge.create({
      data: {
        name: 'Passionné',
        description: '30 jours consécutifs d\'entraînement',
        image_url: 'https://example.com/badges/passionate.png',
        badge_type: 'STREAK',
        created_by: admin.id,
      },
    }),
    prisma.badge.create({
      data: {
        name: 'Centurion',
        description: 'Complétez 100 séances d\'entraînement',
        image_url: 'https://example.com/badges/centurion.png',
        badge_type: 'MILESTONE',
        created_by: admin.id,
      },
    }),
    prisma.badge.create({
      data: {
        name: 'Brûleur de Calories',
        description: 'Brûlez 50,000 calories au total',
        image_url: 'https://example.com/badges/calorie-burner.png',
        badge_type: 'MILESTONE',
        created_by: admin.id,
      },
    }),
    prisma.badge.create({
      data: {
        name: 'Champion Fondateur',
        description: 'Badge spécial pour les premiers utilisateurs de TSPark',
        image_url: 'https://example.com/badges/founder.png',
        badge_type: 'SPECIAL',
        created_by: admin.id,
      },
    }),
  ]);

  console.log(`✅ Created ${badges.length} badges`);

  // ========================================
  // 13. BADGE RULES
  // ========================================
  console.log('📋 Creating badge rules...');

  await Promise.all([
    // Premier Pas
    prisma.badgeRule.create({
      data: {
        badge_id: badges[0].id,
        rule_type: 'CHALLENGE_COMPLETED',
        rule_config: {
          required_count: 1,
        },
      },
    }),

    // Marathonien
    prisma.badgeRule.create({
      data: {
        badge_id: badges[1].id,
        rule_type: 'CHALLENGES_COUNT',
        rule_config: {
          required_count: 10,
        },
      },
    }),

    // Dévoué
    prisma.badgeRule.create({
      data: {
        badge_id: badges[2].id,
        rule_type: 'CONSECUTIVE_DAYS',
        rule_config: {
          required_days: 7,
        },
      },
    }),

    // Passionné
    prisma.badgeRule.create({
      data: {
        badge_id: badges[3].id,
        rule_type: 'CONSECUTIVE_DAYS',
        rule_config: {
          required_days: 30,
        },
      },
    }),

    // Centurion
    prisma.badgeRule.create({
      data: {
        badge_id: badges[4].id,
        rule_type: 'TOTAL_SESSIONS',
        rule_config: {
          required_count: 100,
        },
      },
    }),

    // Brûleur de Calories
    prisma.badgeRule.create({
      data: {
        badge_id: badges[5].id,
        rule_type: 'TOTAL_CALORIES',
        rule_config: {
          required_calories: 50000,
        },
      },
    }),

    // Champion Fondateur
    prisma.badgeRule.create({
      data: {
        badge_id: badges[6].id,
        rule_type: 'PLAYER_SCORE',
        rule_config: {
          required_score: 500,
        },
      },
    }),
  ]);

  console.log('✅ Created badge rules');

  // ========================================
  // 14. USER BADGES
  // ========================================
  console.log('🏆 Awarding badges to users...');

  await Promise.all([
    // Client 4 qui a complété un challenge reçoit "Premier Pas"
    prisma.userBadge.create({
      data: {
        user_id: clients[3].id,
        badge_id: badges[0].id,
        awarded_by: admin.id,
      },
    }),

    // Admin reçoit le badge Champion Fondateur
    prisma.userBadge.create({
      data: {
        user_id: admin.id,
        badge_id: badges[6].id,
      },
    }),

    // Client 1 reçoit Dévoué
    prisma.userBadge.create({
      data: {
        user_id: clients[0].id,
        badge_id: badges[2].id,
      },
    }),

    // Client 2 reçoit Dévoué et Champion Fondateur
    prisma.userBadge.create({
      data: {
        user_id: clients[1].id,
        badge_id: badges[2].id,
      },
    }),
    prisma.userBadge.create({
      data: {
        user_id: clients[1].id,
        badge_id: badges[6].id,
      },
    }),
  ]);

  console.log('✅ Awarded badges to users');

  // ========================================
  // SUMMARY
  // ========================================
  console.log('\n✨ Database seeding completed successfully! ✨\n');
  console.log('📊 Summary:');
  console.log(`   👤 Users: ${clients.length + 3} (1 admin, 2 gym owners, ${clients.length} clients)`);
  console.log(`   🏋️  Gyms: ${salles.length}`);
  console.log(`   🔧 Equipment: ${equipments.length}`);
  console.log(`   💪 Exercise Types: ${exerciceTypes.length}`);
  console.log(`   🎯 Challenges: ${defis.length}`);
  console.log(`   📅 Workout Sessions: ${workoutSessions.length}`);
  console.log(`   🏅 Badges: ${badges.length}`);
  console.log('\n📝 Test Credentials:');
  console.log('   Admin: admin@tspark.com / Password123!');
  console.log('   Gym Owner 1: owner1@gym.com / Password123!');
  console.log('   Gym Owner 2: owner2@gym.com / Password123!');
  console.log('   Client 1: client1@example.com / Password123!');
  console.log('   Client 2: client2@example.com / Password123!');
  console.log('   Client 3: client3@example.com / Password123!');
  console.log('   Client 4: client4@example.com / Password123!');
}

main()
  .catch((e) => {
    console.error('❌ Error during seeding:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });