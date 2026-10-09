const fs = require('fs');
const path = require('path');

const file = fs.readFileSync(path.join(__dirname, '../src/features/gallery/data/activities.ts'), 'utf8');
const activitiesJson = eval(file.replace('export interface Activity', '/*').replace('export const activities: Activity[] =', '*/ const act =') + '; act;');

// Check how many images exist on disk vs broken
let validImgs = 0;
let brokenImgs = 0;

activitiesJson.forEach(act => {
  let hasValid = 0;
  act.images.forEach(img => {
    // Check in public directory
    const cleanImg = img.startsWith('/') ? img.slice(1) : img;
    const p1 = path.join(__dirname, '../public', cleanImg);
    const p2 = path.join(__dirname, '../public/รูป/รูป', cleanImg.replace(/^images\//, ''));
    if (fs.existsSync(p1) || fs.existsSync(p2)) {
      validImgs++;
      hasValid++;
    } else {
      brokenImgs++;
    }
  });
  if (hasValid === 0) {
    console.log(`[BROKEN ACT] ${act.id} "${act.title}": all images missing! (${act.images[0]})`);
  }
});

console.log(`Valid images: ${validImgs}, Broken images: ${brokenImgs}`);

// Inspect prefixes of activities
const idPrefixes = {};
activitiesJson.forEach(a => {
  const p = a.id.split('-').slice(0, 2).join('-');
  idPrefixes[p] = (idPrefixes[p] || 0) + 1;
});
console.log('ID Prefixes:', idPrefixes);
