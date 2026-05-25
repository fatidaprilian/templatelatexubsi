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
  console.log("1. PKL - Proyek Inovasi Perangkat Lunak");
  console.log("2. PKL - Analisa Program Berbasis Mobile");
  console.log("3. PKL - Jaringan Komputer");
  console.log("4. PKL - Analisis Sistem");
  console.log("5. Skripsi - Perancangan Program Science");
  console.log("6. Skripsi - Penelitian Ilmiah");
  console.log("7. Skripsi - Jaringan Komputer");
  console.log("8. Skripsi - Aplikasi StartUp");
  
  rl.question("\nMasukkan angka pilihan Anda (1-8): ", (choice) => {
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
  
  const isMagang = parseInt(choice) <= 4;
  let activeOutline = "";

  if (isMagang) {
    fs.renameSync(mainMagang, mainFile);
    fs.unlinkSync(mainSkripsi);
    if (choice === '1') activeOutline = "ti-proyek-inovasi";
    else if (choice === '2') activeOutline = "ti-mobile";
    else if (choice === '3') activeOutline = "ti-jaringan";
    else if (choice === '4') activeOutline = "ti-analisis-sistem";
    else activeOutline = "ti-analisis-sistem";
  } else {
    fs.renameSync(mainSkripsi, mainFile);
    fs.unlinkSync(mainMagang);
    if (choice === '5') activeOutline = "skripsi-ti-program-science";
    else if (choice === '6') activeOutline = "skripsi-ti-penelitian-ilmiah";
    else if (choice === '7') activeOutline = "skripsi-ti-jaringan";
    else if (choice === '8') activeOutline = "skripsi-ti-startup";
    else activeOutline = "skripsi-ti-jaringan";
  }

  let content = fs.readFileSync(mainFile, 'utf8');
  
  // Activate the selected outline
  const regex = new RegExp(`% \\\\include{outlines/${activeOutline}`, 'g');
  content = content.replace(regex, `\\include{outlines/${activeOutline}`);
  
  // Deactivate defaults if they are not the selected one
  if (isMagang && choice !== '4') {
     content = content.replace(/\\include{outlines\/ti-analisis-sistem/g, `% \\include{outlines/ti-analisis-sistem`);
  }
  if (!isMagang && choice !== '7') {
     content = content.replace(/\\include{outlines\/skripsi-ti-jaringan/g, `% \\include{outlines/skripsi-ti-jaringan`);
  }
  
  fs.writeFileSync(mainFile, content);
  keepOnly(outlinesDir, [activeOutline]);
}

function keepOnly(dir, foldersToKeep) {
  const items = fs.readdirSync(dir);
  for (const item of items) {
    if (!foldersToKeep.includes(item)) {
      fs.rmSync(path.join(dir, item), { recursive: true, force: true });
    }
  }
}
