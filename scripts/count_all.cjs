const fs = require('fs');
const path = require('path');

const targetDir = 'C:\\Users\\LEGION\\Desktop\\มี2งาน\\รองศาสตราจารย์ ดร.วิชชา ฉิมพลี\\public\\รูป';

function getFiles(dir) {
  let results = [];
  try {
    const list = fs.readdirSync(dir);
    list.forEach(file => {
      const fullPath = path.join(dir, file);
      const stat = fs.statSync(fullPath);
      if (stat && stat.isDirectory()) {
        results = results.concat(getFiles(fullPath));
      } else {
        results.push(fullPath);
      }
    });
  } catch (err) {
    console.error('Error reading dir:', dir, err.message);
  }
  return results;
}

console.log('Target:', targetDir);
if (!fs.existsSync(targetDir)) {
  console.log('Directory does not exist!');
  process.exit(1);
}

const subdirs = fs.readdirSync(targetDir, { withFileTypes: true })
  .filter(d => d.isDirectory())
  .map(d => d.name);

console.log('--- Breakdown by Folder ---');
let total = 0;
subdirs.forEach(folder => {
  const folderPath = path.join(targetDir, folder);
  const files = getFiles(folderPath);
  console.log(`${folder.padEnd(20)} : ${files.length} รูป`);
  total += files.length;
});

const rootFiles = fs.readdirSync(targetDir, { withFileTypes: true })
  .filter(d => !d.isDirectory());
console.log(`Root files           : ${rootFiles.length} รูป`);
total += rootFiles.length;

console.log('=================================');
console.log(`TOTAL ALL IMAGES     : ${total} รูป`);
