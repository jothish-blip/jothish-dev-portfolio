import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

async function getFiles(dir) {
  if (!fs.existsSync(dir)) return [];
  const dirents = await fs.promises.readdir(dir, { withFileTypes: true });
  const files = await Promise.all(
    dirents.map((dirent) => {
      const res = path.resolve(dir, dirent.name);
      return dirent.isDirectory() ? getFiles(res) : res;
    })
  );
  return files.flat();
}

async function optimizeDirectory(dir, maxWidth = 1400) {
  const allFiles = await getFiles(dir);
  const imageFiles = allFiles.filter(f => /\.(png|jpg|jpeg)$/i.test(f));

  console.log(`Optimizing ${imageFiles.length} files in ${path.relative(process.cwd(), dir)}...`);

  for (const file of imageFiles) {
    const statsBefore = fs.statSync(file);
    const meta = await sharp(file).metadata();
    
    let pipeline = sharp(file).resize({ width: maxWidth, withoutEnlargement: true });

    if (/\.png$/i.test(file)) {
      pipeline = pipeline.png({ quality: 80, compressionLevel: 9, effort: 7 });
    } else {
      pipeline = pipeline.jpeg({ quality: 80, mozjpeg: true });
    }

    const buffer = await pipeline.toBuffer();
    fs.writeFileSync(file, buffer);
    const statsAfter = fs.statSync(file);
    console.log(`  ${path.basename(file)}: ${(statsBefore.size / 1024).toFixed(1)} KB -> ${(statsAfter.size / 1024).toFixed(1)} KB (${Math.round((1 - statsAfter.size / statsBefore.size) * 100)}% saved)`);
  }
}

async function run() {
  await optimizeDirectory(path.join(process.cwd(), 'public', 'projects'), 1200);
  await optimizeDirectory(path.join(process.cwd(), 'public', 'assets'), 1200);
  await optimizeDirectory(path.join(process.cwd(), 'public', 'images'), 800);
  await optimizeDirectory(path.join(process.cwd(), 'public', 'logos'), 256);
  console.log('All public assets successfully optimized!');
}

run().catch(console.error);
