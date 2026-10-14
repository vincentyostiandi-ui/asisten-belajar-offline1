const fs = require('fs');
const path = require('path');
const pdf = require('pdf-parse');

const dir = path.join(__dirname, 'Koleksi_Modul_P13');
const files = fs.readdirSync(dir);

async function run() {
  const summary = [];
  for (const file of files) {
    if (file.endsWith('.pdf')) {
      const filePath = path.join(dir, file);
      const dataBuffer = fs.readFileSync(filePath);
      try {
        const data = await pdf(dataBuffer);
        summary.push({
          file,
          pages: data.numpages,
          textLength: data.text.length,
          sample: data.text.slice(0, 300).replace(/\s+/g, ' ')
        });
      } catch (err) {
        summary.push({ file, error: err.message });
      }
    }
  }
  console.log(JSON.stringify(summary, null, 2));
}

run();
