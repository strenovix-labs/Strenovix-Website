import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

const DIRS_TO_OPTIMIZE = ['public', 'src/assets', 'team'];

async function getFiles(dir) {
  let results = [];
  if (!fs.existsSync(dir)) return results;
  const list = fs.readdirSync(dir);
  for (const file of list) {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    if (stat && stat.isDirectory()) {
      results = results.concat(await getFiles(fullPath));
    } else {
      const ext = path.extname(file).toLowerCase();
      if (['.png', '.jpg', '.jpeg'].includes(ext)) {
        results.push(fullPath);
      }
    }
  }
  return results;
}

async function optimizeImage(filePath) {
  const statBefore = fs.statSync(filePath);
  const sizeBefore = statBefore.size;
  const ext = path.extname(filePath).toLowerCase();

  // If already under 15KB, skip
  if (sizeBefore < 15 * 1024) {
    return { path: filePath, sizeBefore, sizeAfter: sizeBefore, saved: 0 };
  }

  try {
    const buffer = fs.readFileSync(filePath);
    let pipeline = sharp(buffer);
    const metadata = await pipeline.metadata();

    // Resize if unreasonably huge (e.g. width > 1920)
    if (metadata.width && metadata.width > 1920) {
      pipeline = pipeline.resize({ width: 1920, withoutEnlargement: true });
    }

    let optimizedBuffer;
    if (ext === '.png') {
      optimizedBuffer = await pipeline
        .png({
          quality: 80,
          compressionLevel: 9,
          palette: true,
          effort: 7,
        })
        .toBuffer();
    } else if (ext === '.jpg' || ext === '.jpeg') {
      optimizedBuffer = await pipeline
        .jpeg({
          quality: 80,
          mozjpeg: true,
          progressive: true,
        })
        .toBuffer();
    }

    if (optimizedBuffer && optimizedBuffer.length < sizeBefore) {
      fs.writeFileSync(filePath, optimizedBuffer);
      const sizeAfter = optimizedBuffer.length;
      return {
        path: filePath,
        sizeBefore,
        sizeAfter,
        saved: sizeBefore - sizeAfter,
      };
    } else {
      return { path: filePath, sizeBefore, sizeAfter: sizeBefore, saved: 0 };
    }
  } catch (err) {
    console.error(`Error optimizing ${filePath}:`, err.message);
    return { path: filePath, sizeBefore, sizeAfter: sizeBefore, saved: 0 };
  }
}

async function run() {
  console.log('--- Starting Image Compression ---');
  let totalBefore = 0;
  let totalAfter = 0;
  let totalFiles = 0;

  for (const dir of DIRS_TO_OPTIMIZE) {
    const files = await getFiles(dir);
    for (const file of files) {
      const res = await optimizeImage(file);
      totalBefore += res.sizeBefore;
      totalAfter += res.sizeAfter;
      totalFiles++;
      const pct = res.sizeBefore > 0 ? (((res.sizeBefore - res.sizeAfter) / res.sizeBefore) * 100).toFixed(1) : 0;
      if (res.saved > 0) {
        console.log(`[OPTIMIZED] ${file} | ${(res.sizeBefore / 1024).toFixed(1)}KB -> ${(res.sizeAfter / 1024).toFixed(1)}KB (-${pct}%)`);
      }
    }
  }

  const totalSaved = totalBefore - totalAfter;
  const totalPct = totalBefore > 0 ? ((totalSaved / totalBefore) * 100).toFixed(1) : 0;
  console.log('\n=========================================');
  console.log(`Total images scanned: ${totalFiles}`);
  console.log(`Initial total size:   ${(totalBefore / (1024 * 1024)).toFixed(2)} MB`);
  console.log(`Optimized total size: ${(totalAfter / (1024 * 1024)).toFixed(2)} MB`);
  console.log(`Total storage saved:  ${(totalSaved / (1024 * 1024)).toFixed(2)} MB (${totalPct}% reduction)`);
  console.log('=========================================');
}

run();
