const fs = require('fs');
const path = require('path');

const dir1_2026 = 'C:\\Users\\LEGION\\Desktop\\มี2งาน\\Dr.Witcha\\public\\รูป\\รูป\\2026';
const dir2_2026 = 'C:\\Users\\LEGION\\Desktop\\มี2งาน\\รองศาสตราจารย์ ดร.วิชชา ฉิมพลี\\public\\รูป\\2026';

console.log('--- Subdirs in Dr.Witcha/public/รูป/รูป/2026 ---');
if (fs.existsSync(dir1_2026)) {
  fs.readdirSync(dir1_2026, { withFileTypes: true }).forEach(d => {
    if (d.isDirectory()) {
      const count = fs.readdirSync(path.join(dir1_2026, d.name)).length;
      console.log(`Folder: ${d.name} -> ${count} files`);
    } else {
      console.log(`File: ${d.name}`);
    }
  });
}

console.log('\n--- Subdirs in รองศาสตราจารย์ ดร.วิชชา ฉิมพลี/public/รูป/2026 ---');
if (fs.existsSync(dir2_2026)) {
  fs.readdirSync(dir2_2026, { withFileTypes: true }).forEach(d => {
    if (d.isDirectory()) {
      const count = fs.readdirSync(path.join(dir2_2026, d.name)).length;
      console.log(`Folder: ${d.name} -> ${count} files`);
    } else {
      console.log(`File: ${d.name}`);
    }
  });
}
