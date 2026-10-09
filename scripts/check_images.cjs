const fs = require('fs');
const path = require('path');

const file = fs.readFileSync(path.join(__dirname, '../src/features/gallery/data/activities.ts'), 'utf8');
const matches = file.match(/"\/images\/[^"]+"/g) || [];
console.log('Total activities images:', matches.length);

const activitiesJson = eval(file.replace('export interface Activity', '/*').replace('export const activities: Activity[] =', '*/ const act =') + '; act;');
console.log('Total activities count:', activitiesJson.length);
const totalImgs = activitiesJson.reduce((sum, a) => sum + (a.images ? a.images.length : 0), 0);
console.log('Total images calculated:', totalImgs);
