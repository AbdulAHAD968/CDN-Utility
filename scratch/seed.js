const fs = require('fs');
const path = require('path');
const { v2: cloudinary } = require('cloudinary');

// Manual parsing of the .env file to extract credentials
try {
  const envPath = path.join(__dirname, '..', '.env');
  if (!fs.existsSync(envPath)) {
    console.error('Error: .env file not found at:', envPath);
    process.exit(1);
  }

  const envContent = fs.readFileSync(envPath, 'utf8');
  const envVars = {};
  
  envContent.split(/\r?\n/).forEach(line => {
    const trimmed = line.trim();
    if (trimmed && !trimmed.startsWith('#')) {
      const index = trimmed.indexOf('=');
      if (index !== -1) {
        const key = trimmed.substring(0, index).trim();
        const val = trimmed.substring(index + 1).trim();
        envVars[key] = val;
      }
    }
  });

  // Check variables
  const cloudName = envVars.CLOUDINARY_CLOUD_NAME;
  const apiKey = envVars.CLOUDINARY_API_KEY;
  const apiSecret = envVars.CLOUDINARY_API_SECRET;

  if (!cloudName || !apiKey || !apiSecret) {
    console.error('Error: Missing Cloudinary credentials in .env file.');
    process.exit(1);
  }

  cloudinary.config({
    cloud_name: cloudName,
    api_key: apiKey,
    api_secret: apiSecret,
    secure: true,
  });

  console.log('Cloudinary SDK successfully initialized for cloud:', cloudName);

} catch (error) {
  console.error('Failed to initialize environment:', error);
  process.exit(1);
}

// Gorgeous High-End Sample Datasets from Unsplash
const samples = [
  {
    name: 'samples/minimalist_villa',
    url: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1600',
    description: 'Minimalist Architecture - Luxury Modern Villa'
  },
  {
    name: 'samples/sunset_horizon',
    url: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1600',
    description: 'Dreamy Sunset Horizon on a Serene Tropical Beach'
  },
  {
    name: 'samples/editorial_portrait',
    url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1600',
    description: 'High-End Editorial Portrait Photography'
  },
  {
    name: 'samples/neon_cyberpunk',
    url: 'https://images.unsplash.com/photo-1515621061946-eff1c2a352bd?q=80&w=1600',
    description: 'Cyberpunk Aesthetic - Tokyo Neon Streets'
  },
  {
    name: 'samples/cozy_workspace',
    url: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=1600',
    description: 'Minimalist Cozy Creative Desk Setup'
  },
  {
    name: 'samples/premium_chronometer',
    url: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=1600',
    description: 'Minimalist Luxury Product Chronometer'
  },
  {
    name: 'samples/liquid_abstract',
    url: 'https://images.unsplash.com/photo-1541701494587-cb58502866ab?q=80&w=1600',
    description: 'Abstract Contemporary Fluid Liquid Painting'
  },
  {
    name: 'samples/enchanted_forest',
    url: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?q=80&w=1600',
    description: 'Sunbeams Breaking Through Deep Enchanted Woods'
  }
];

async function seed() {
  console.log(`Starting to upload ${samples.length} beautiful assets to Cloudinary...`);
  
  for (let i = 0; i < samples.length; i++) {
    const sample = samples[i];
    console.log(`\n[${i + 1}/${samples.length}] Uploading: ${sample.description}...`);
    
    try {
      const result = await cloudinary.uploader.upload(sample.url, {
        public_id: sample.name,
        overwrite: true,
        resource_type: 'image',
      });
      console.log(`  Successfully uploaded!`);
      console.log(`  Public ID: ${result.public_id}`);
      console.log(`  Format: ${result.format} | Size: ${(result.bytes / 1024).toFixed(1)} KB`);
      console.log(`  URL: ${result.secure_url}`);
    } catch (err) {
      console.error(`  Failed to upload ${sample.name}:`, err.message);
    }
  }
  
  console.log('\nAll sample assets successfully seeded! Check your gallery.');
}

seed();
