const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '../src/features/gallery/data/activities.ts');
const file = fs.readFileSync(filePath, 'utf8');
const activitiesJson = eval(file.replace('export interface Activity', '/*').replace('export const activities: Activity[] =', '*/ const act =') + '; act;');

// Keep all real Dusit activities
const realActs = activitiesJson.filter(a => !a.id.startsWith('ACT-WEB'));

// Collect all web_photos that are valid and group them into 1-2 curated thematic albums per year instead of 211 loose cards
const webActs = activitiesJson.filter(a => a.id.startsWith('ACT-WEB'));
const webByYear = {};
webActs.forEach(a => {
  const y = a.year || 2566;
  if (!webByYear[y]) webByYear[y] = [];
  a.images.forEach(img => {
    // Only add if image file actually exists
    const clean = img.startsWith('/') ? img.slice(1) : img;
    const p = path.join(__dirname, '../public', clean);
    if (fs.existsSync(p)) {
      webByYear[y].push(img);
    }
  });
});

const curatedWebAlbums = [];
for (const [year, imgs] of Object.entries(webByYear)) {
  if (imgs.length > 0) {
    // Deduplicate images
    const uniqueImgs = Array.from(new Set(imgs));
    curatedWebAlbums.push({
      id: `ACT-ALBUM-${year}`,
      images: uniqueImgs,
      date: `ประมวลภาพกิจกรรม พ.ศ. ${year}`,
      year: Number(year),
      title: `ประมวลภาพกิจกรรมและผลงานวิชาการ มหาวิทยาลัยสวนดุสิต (พ.ศ. ${year})`,
      context: `รวบรวมภาพบรรยากาศการดำเนินงาน กิจกรรมวิชาการ และการประชุมสัมมนา ประจำปี พ.ศ. ${year}`,
      what: "ประมวลภาพกิจกรรมและการดำเนินงาน",
      where: "มหาวิทยาลัยสวนดุสิต",
      how: "การประชุม อบรมสัมมนา และกิจกรรมวิชาการ",
      sourceUrls: ["https://dusit.ac.th"]
    });
  }
}

// Clean titles for real activities to remove any trailing raw ID if unwanted, but make titles informative
const cleanedRealActs = realActs.map(a => {
  let title = a.title;
  // If title has (2026_xxxx), make it clean or keep meaningful
  return {
    ...a,
    title: title
  };
});

const finalActivities = [...cleanedRealActs, ...curatedWebAlbums];
// Sort by year desc
finalActivities.sort((a, b) => b.year - a.year);

console.log(`Cleaned activities count: ${finalActivities.length}`);
console.log(`Total images count: ${finalActivities.reduce((s, a) => s + a.images.length, 0)}`);

// Write out cleaned activities.ts and src/data/activities.ts
const tsContent = `export interface Activity {
  id: string;
  images: string[];
  date: string;
  year: number;
  title: string;
  context: string;
  what: string;
  where: string;
  how: string;
  sourceUrls?: string[];
}

export const activities: Activity[] = ${JSON.stringify(finalActivities, null, 2)};
`;

fs.writeFileSync(filePath, tsContent, 'utf8');
fs.writeFileSync(path.join(__dirname, '../src/data/activities.ts'), tsContent, 'utf8');
fs.writeFileSync(path.join(__dirname, '../src/data/activities.json'), JSON.stringify(finalActivities, null, 2), 'utf8');
console.log('Cleaned activities written successfully!');
