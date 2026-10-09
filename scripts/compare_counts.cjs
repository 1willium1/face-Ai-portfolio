const fs = require('fs');
const path = require('path');

const dir1 = 'C:\\Users\\LEGION\\Desktop\\มี2งาน\\Dr.Witcha\\public\\รูป\\รูป';
const dir2 = 'C:\\Users\\LEGION\\Desktop\\มี2งาน\\รองศาสตราจารย์ ดร.วิชชา ฉิมพลี\\public\\รูป';
const dirImages = 'C:\\Users\\LEGION\\Desktop\\มี2งาน\\Dr.Witcha\\public\\images';

function countFiles(dir) {
  if (!fs.existsSync(dir)) return { total: 0, breakdown: {} };
  let breakdown = {};
  let total = 0;
  
  function scan(current, rel) {
    const items = fs.readdirSync(current, { withFileTypes: true });
    for (const item of items) {
      const full = path.join(current, item.name);
      if (item.isDirectory()) {
        scan(full, rel ? `${rel}/${item.name}` : item.name);
      } else {
        total++;
        const topFolder = rel ? rel.split('/')[0] : 'root';
        breakdown[topFolder] = (breakdown[topFolder] || 0) + 1;
      }
    }
  }
  scan(dir, '');
  return { total, breakdown };
}

console.log('=== COUNT 1: Dr.Witcha/public/รูป/รูป ===');
const c1 = countFiles(dir1);
console.log('Total:', c1.total, 'Breakdown:', c1.breakdown);

console.log('\n=== COUNT 2: รองศาสตราจารย์ ดร.วิชชา ฉิมพลี/public/รูป ===');
const c2 = countFiles(dir2);
console.log('Total:', c2.total, 'Breakdown:', c2.breakdown);

console.log('\n=== COUNT 3: Dr.Witcha/public/images ===');
const c3 = countFiles(dirImages);
console.log('Total:', c3.total, 'Breakdown:', c3.breakdown);
