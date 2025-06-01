// src/seeders/admin.seed.ts
import { AppDataSource } from '../config/data-source';
import { User, UserRole } from '../modules/user/user.entity';
import bcrypt from 'bcrypt';

export default async function seedAdmin() {
  await AppDataSource.initialize();

  const userRepository = AppDataSource.getRepository(User);
  const existingAdmin = await userRepository.findOneBy({ email: 'admin@example.com' });

  if (!existingAdmin) {
    const admin = userRepository.create({
      email: 'admin@example.com',
      password: await bcrypt.hash('admin123', 10),
      role: UserRole.ADMIN,
    });

    await userRepository.save(admin);
    console.log('✅ Admin user seeded.');
  } else {
    console.log('ℹ️ Admin user already exists.');
  }
 
  const existingUser = await userRepository.findOneBy({ email: 'user@example.com' });

  if (!existingUser) {
    const admin = userRepository.create({
      email: 'user@example.com',
      password: await bcrypt.hash('admin123', 10),
      role: UserRole.USER,
    });

    await userRepository.save(admin);
    console.log('✅ User user seeded.');
  } else {
    console.log('ℹ️ User user already exists.');
  }

  await AppDataSource.destroy();
}
