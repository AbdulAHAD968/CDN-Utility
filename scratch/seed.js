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

// Official Cloudinary Demo Sample Assets
const samples = [
  {
    name: 'samples/cld-sample',
    url: 'https://res.cloudinary.com/demo/image/upload/v1/cld-sample.jpg',
    description: 'Official Cloudinary Sample - The Dog Portrait'
  },
  {
    name: 'samples/cld-sample-2',
    url: 'https://res.cloudinary.com/demo/image/upload/v1/cld-sample-2.jpg',
    description: 'Official Cloudinary Sample - Mountain and Lake Landscape'
  },
  {
    name: 'samples/cld-sample-3',
    url: 'https://res.cloudinary.com/demo/image/upload/v1/cld-sample-3.jpg',
    description: 'Official Cloudinary Sample - Desert Scene / Couple portrait'
  },
  {
    name: 'samples/cld-sample-4',
    url: 'https://res.cloudinary.com/demo/image/upload/v1/cld-sample-4.jpg',
    description: 'Official Cloudinary Sample - Food / Kitchen Setup'
  },
  {
    name: 'samples/cld-sample-5',
    url: 'https://res.cloudinary.com/demo/image/upload/v1/cld-sample-5.jpg',
    description: 'Official Cloudinary Sample - Sneaker Product Showcase'
  },
  {
    name: 'samples/sample',
    url: 'https://res.cloudinary.com/demo/image/upload/v1/sample.jpg',
    description: 'Official Cloudinary Sample - Yellow Flowers with Bee'
  }
];

async function seed() {
  console.log(`Starting to upload ${samples.length} official Cloudinary demo samples to your account...`);
  
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
  
  console.log('\nAll official Cloudinary sample assets successfully seeded! Check your gallery.');
}

seed();
