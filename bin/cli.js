#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

console.log("=========================================");
console.log("  Welcome to UBSI LaTeX Generator CLI!");
console.log("=========================================\n");

rl.question("Nama folder project Anda? (misal: skripsi-saya): ", (projectName) => {
  if (!projectName) projectName = "skripsi-ubsi";
  const targetDir = path.join(process.cwd(), projectName);

  if (fs.existsSync(targetDir)) {
    console.log(`\nError: Folder ${projectName} sudah ada. Silakan pilih nama lain.`);
    process.exit(1);
  }

  console.log("\nPilih tipe Laporan:");
  console.log("1. PKL / Magang (Proyek Inovasi / Analisis Sistem)");
  console.log("2. Skripsi - Perancangan Program Science");
  console.log("3. Skripsi - Penelitian Ilmiah");
  console.log("4. Skripsi - Jaringan Komputer");
  console.log("5. Skripsi - Aplikasi StartUp");
  
  rl.question("\nMasukkan angka pilihan Anda (1-5): ", (choice) => {
    console.log(`\nMenginisiasi project di folder ${projectName}...`);
    
    // Copy the whole template folder
    const templateDir = path.join(__dirname, '..', 'template');
    copyFolderSync(templateDir, targetDir);

    // Setup the selected outline
    setupOutline(targetDir, choice);

    console.log("\nSukses! Repository Anda sudah siap dan 100% clean.");
    console.log(`\nCara menjalankan:\n  cd ${projectName}\n  ./compile.sh (Mac/Linux) atau klik 2x compile.bat (Windows)`);
    process.exit(0);
  });
});

function copyFolderSync(from, to) {
  fs.mkdirSync(to, { recursive: true });
  fs.readdirSync(from).forEach(element => {
    if (fs.lstatSync(path.join(from, element)).isFile()) {
      fs.copyFileSync(path.join(from, element), path.join(to, element));
    } else {
      copyFolderSync(path.join(from, element), path.join(to, element));
    }
  });
}

function setupOutline(targetDir, choice) {
  const mainMagang = path.join(targetDir, 'main-magang.tex');
  const mainSkripsi = path.join(targetDir, 'main-skripsi.tex');
  const mainFile = path.join(targetDir, 'main.tex');
  const outlinesDir = path.join(targetDir, 'outlines');
  
  let targetOutlineDir = "";
  
  if (choice === '1') {
    // Magang
    fs.renameSync(mainMagang, mainFile);
    fs.unlinkSync(mainSkripsi);
    
    // Un-comment outline magang in main.tex (Assume Analisis Sistem is default, or they can change it later)
    let content = fs.readFileSync(mainFile, 'utf8');
    fs.writeFileSync(mainFile, content); // Kept as is, they can uncomment in tex
    
    // Cleanup outlines
    keepOnly(outlinesDir, ['ti-analisis-sistem', 'ti-jaringan', 'ti-mobile', 'ti-proyek-inovasi']);
  } else {
    // Skripsi
    fs.renameSync(mainSkripsi, mainFile);
    fs.unlinkSync(mainMagang);
    
    let content = fs.readFileSync(mainFile, 'utf8');
    
    // Switch case to uncomment the correct section
    let activeOutline = "";
    if (choice === '2') activeOutline = "skripsi-ti-program-science";
    else if (choice === '3') activeOutline = "skripsi-ti-penelitian-ilmiah";
    else if (choice === '4') activeOutline = "skripsi-ti-jaringan";
    else if (choice === '5') activeOutline = "skripsi-ti-startup";
    else activeOutline = "skripsi-ti-jaringan"; // default
    
    // We replace the comment block for the selected outline
    const regex = new RegExp(`% \\\\include{outlines/${activeOutline}`, 'g');
    content = content.replace(regex, `\\include{outlines/${activeOutline}`);
    
    // Also comment out the previous default (jaringan) if it's not the choice
    if (choice !== '4') {
       content = content.replace(/\\include{outlines\/skripsi-ti-jaringan/g, `% \\include{outlines/skripsi-ti-jaringan`);
    }
    
    fs.writeFileSync(mainFile, content);
    keepOnly(outlinesDir, [activeOutline]);
  }
}

function keepOnly(dir, foldersToKeep) {
  const items = fs.readdirSync(dir);
  for (const item of items) {
    if (!foldersToKeep.includes(item)) {
      fs.rmSync(path.join(dir, item), { recursive: true, force: true });
    }
  }
}
