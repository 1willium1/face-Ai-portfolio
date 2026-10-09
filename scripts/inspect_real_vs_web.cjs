const fs = require('fs');
const path = require('path');

const file = fs.readFileSync(path.join(__dirname, '../src/features/gallery/data/activities.ts'), 'utf8');
const activitiesJson = eval(file.replace('export interface Activity', '/*').replace('export const activities: Activity[] =', '*/ const act =') + '; act;');

const realActs = activitiesJson.filter(a => !a.id.startsWith('ACT-WEB'));
const webActs = activitiesJson.filter(a => a.id.startsWith('ACT-WEB'));

console.log('Real Dusit Activities count:', realActs.length);
const realImgs = realActs.reduce((s, a) => s + a.images.length, 0);
console.log('Real Dusit Activities images:', realImgs);

console.log('\nWeb Dump Activities count:', webActs.length);
const webImgs = webActs.reduce((s, a) => s + a.images.length, 0);
console.log('Web Dump Activities images:', webImgs);

console.log('\nSample Real Activities:');
realActs.slice(0, 5).forEach(a => console.log(`- [${a.year}] ${a.title} (${a.images.length} รูป)`));
