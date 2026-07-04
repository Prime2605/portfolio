const Tesseract = require('tesseract.js');
const files = [
  'c:\\Projects\\Portfolio\\photos\\WhatsApp Image 2026-07-04 at 7.26.42 PM.jpeg',
  'c:\\Projects\\Portfolio\\photos\\WhatsApp Image 2026-07-04 at 7.29.04 PM.jpeg'
];

async function run() {
  for (const f of files) {
    console.log(`\n\n--- OCR for ${f} ---`);
    const { data: { text } } = await Tesseract.recognize(f, 'eng');
    console.log(text);
  }
}

run();
