// src/seeders/index.ts
import { readdirSync } from 'fs';
import path from 'path';

const seed = async () => {
  const seedersPath = path.join(__dirname);
  const files = readdirSync(seedersPath).filter(
    file => file !== 'index.ts' && file.endsWith('.ts')
  );

  for (const file of files) {
    const filePath = path.join(seedersPath, file);
    const seederModule = await import(filePath);
    if (typeof seederModule.default === 'function') {
      console.log(`🔹 Running: ${file}`);
      await seederModule.default();
    } else {
      console.warn(`⚠️ No default export in ${file}`);
    }
  }

  console.log('✅ All seeders executed.');
};

seed().catch(err => {
  console.error('❌ Seeding failed:', err);
  process.exit(1);
});
