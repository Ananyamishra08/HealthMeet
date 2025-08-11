// seed/insertdoctors.js
import 'dotenv/config';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { v2 as cloudinary } from 'cloudinary';

import connectDB from '../config/mongodb.js';
import connectCloudinary from '../config/cloudinary.js';
import Doctor from '../models/doctorModel.js';

// ✅ Use the backend-safe doctors list (filenames only)
import doctors from './doctors.seed.js'; // or './doctors.seed.js'

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function main() {
  try {
    // Connect DB + Cloudinary
    await connectDB();
    await connectCloudinary();

    // Ensure creds (harmless duplicate, but keeps config local to this process)
    cloudinary.config({
      cloud_name: process.env.CLOUDINARY_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_SECRET_KEY,
    });

    if (!Array.isArray(doctors) || doctors.length === 0) {
      console.log('⚠️  No doctors found in doctors.c.js');
      process.exit(0);
    }

    for (const d of doctors) {
      // Stable, seed-only email so reruns don’t duplicate
      const slug = (d.name || 'seed')
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '.')
        .replace(/\.+/g, '.')
        .replace(/^\.+|\.+$/g, '') || 'seed';
      const specialitySlug = (d.speciality || 'general').toLowerCase().replace(/\s+/g, '') || 'general';
      const email = `${slug}.${specialitySlug}@seed.healthmeet.local`;

      const exists = await Doctor.findOne({ email });
      if (exists) {
        console.log(`↺ Skipping (already exists): ${exists.name}`);
        continue;
      }

      const filePath = path.join(__dirname, '..', 'assets', d.image || '');
      if (!d.image || !fs.existsSync(filePath)) {
        console.log(`⚠️  Image missing for ${d.name} (${d.image}). Skipping.`);
        continue;
      }

      const uploaded = await cloudinary.uploader.upload(filePath, {
        folder: 'HealthMeet/Doctors',
      });

      const doc = new Doctor({
        name: d.name || 'Doctor',
        email,                         // required, unique
        password: 'SEED-NO-LOGIN',     // required; display-only
        image: uploaded.secure_url,    // required
        speciality: d.speciality || 'General',
        degree: d.degree || 'MBBS',
        experience: d.experience || '5 Years',
        about: d.about || 'Experienced doctor.',
        available: true,
        fees: typeof d.fees === 'number' ? d.fees : 0,
        slots_booked: {},
        address: d.address || { line1: '', line2: '' }, // required object
        date: Date.now(),              // required number
      });

      await doc.save();
      console.log(`✅ Inserted: ${doc.name}`);
    }

    console.log('🎉 Seeding complete!');
    process.exit(0);
  } catch (err) {
    console.error('❌ Seed error:', err);
    process.exit(1);
  }
}

main();
