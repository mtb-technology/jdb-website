const https = require('https');
const fs = require('fs');
const path = require('path');

const FONTS = [
  {
    url: 'https://raw.githubusercontent.com/rsms/inter/master/docs/font-files/Inter-Regular.woff2',
    name: 'Inter-Regular.ttf'
  },
  {
    url: 'https://raw.githubusercontent.com/rsms/inter/master/docs/font-files/Inter-Bold.woff2',
    name: 'Inter-Bold.ttf'
  }
];

const FONTS_DIR = path.join(process.cwd(), 'public', 'fonts');

// Create fonts directory if it doesn't exist
if (!fs.existsSync(FONTS_DIR)) {
  fs.mkdirSync(FONTS_DIR, { recursive: true });
}

// Download each font
FONTS.forEach(font => {
  const filePath = path.join(FONTS_DIR, font.name);
  
  // Skip if file already exists
  if (fs.existsSync(filePath)) {
    console.log(`${font.name} already exists, skipping...`);
    return;
  }

  console.log(`Downloading ${font.name}...`);
  
  https.get(font.url, (response) => {
    const file = fs.createWriteStream(filePath);
    response.pipe(file);
    
    file.on('finish', () => {
      file.close();
      console.log(`Downloaded ${font.name}`);
    });
  }).on('error', (err) => {
    fs.unlink(filePath);
    console.error(`Error downloading ${font.name}:`, err.message);
  });
}); 