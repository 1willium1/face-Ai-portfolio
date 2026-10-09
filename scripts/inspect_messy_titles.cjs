const fs = require('fs');
const path = require('path');

const file = fs.readFileSync(path.join(__dirname, '../src/features/gallery/data/activities.ts'), 'utf8');
const activitiesJson = eval(file.replace('export interface Activity', '/*').replace('export const activities: Activity[] =', '*/ const act =') + '; act;');

console.log('Total activities:', activitiesJson.length);

const rawFileNames = activitiesJson.filter(a => /^(NIK_|B9A|IMG_|DSC|Big-Cleaning|_|w_|[0-9]{4}_[0-9]+$)/i.test(a.title) || a.title.endsWith('.jpg') || a.title.endsWith('.png'));
console.log('Activities with raw file name titles:', rawFileNames.length);

const groupedActivities = activitiesJson.filter(a => a.images && a.images.length > 1);
console.log('Activities with > 1 images:', groupedActivities.length);

const singleImageActivities = activitiesJson.filter(a => !a.images || a.images.length <= 1);
console.log('Activities with <= 1 images:', singleImageActivities.length);

console.log('\nSample raw filename titles:');
rawFileNames.slice(0, 10).forEach(a => console.log(`[${a.year}] ${a.id}: "${a.title}" (Images: ${a.images.length})`));
