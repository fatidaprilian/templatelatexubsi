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
  console.log("5. Skripsi - Perancangan Program Science     [Kode: 156]");
  console.log("6. Skripsi - Penelitian Ilmiah               [Kode: 138]");
  console.log("7. Skripsi - Jaringan Komputer               [Kode: 137]");
  console.log("8. Skripsi - Aplikasi StartUp                [Kode: 158]");
  
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

const outlinesConfig = {
  '1': {
    type: 'magang',
    title: 'Proyek Inovasi Perangkat Lunak',
    folder: 'ti-proyek-inovasi',
    babs: 6,
    backmatter: [
      '\\include{bagian-akhir-pkl/daftar-riwayat-hidup-pkl}',
      '\\include{bagian-akhir-pkl/surat-keterangan-pkl}',
      '\\include{bagian-akhir-pkl/lembar-nilai-pkl}',
      '\\include{bagian-akhir-pkl/lembar-kuesioner}',
      '\\include{bagian-akhir-pkl/lampiran-pkl}'
    ]
  },
  '2': {
    type: 'magang',
    title: 'Analisa Program Berbasis Mobile',
    folder: 'ti-mobile',
    babs: 4,
    backmatter: [
      '\\include{bagian-akhir-pkl/daftar-riwayat-hidup-pkl}',
      '\\include{bagian-akhir-pkl/surat-keterangan-pkl}',
      '\\include{bagian-akhir-pkl/lembar-nilai-pkl}',
      '% \\include{bagian-akhir-pkl/lembar-kuesioner} % Tidak wajib untuk outline ini',
      '\\include{bagian-akhir-pkl/lampiran-pkl}'
    ]
  },
  '3': {
    type: 'magang',
    title: 'Jaringan Komputer',
    folder: 'ti-jaringan',
    babs: 4,
    backmatter: [
      '\\include{bagian-akhir-pkl/daftar-riwayat-hidup-pkl}',
      '\\include{bagian-akhir-pkl/surat-keterangan-pkl}',
      '\\include{bagian-akhir-pkl/lembar-nilai-pkl}',
      '\\include{bagian-akhir-pkl/lembar-kuesioner}',
      '\\include{bagian-akhir-pkl/lampiran-pkl}'
    ]
  },
  '4': {
    type: 'magang',
    title: 'Analisis Sistem',
    folder: 'ti-analisis-sistem',
    babs: 4,
    backmatter: [
      '\\include{bagian-akhir-pkl/daftar-riwayat-hidup-pkl}',
      '\\include{bagian-akhir-pkl/surat-keterangan-pkl}',
      '\\include{bagian-akhir-pkl/lembar-nilai-pkl}',
      '\\include{bagian-akhir-pkl/lembar-kuesioner}',
      '\\include{bagian-akhir-pkl/lampiran-pkl}'
    ]
  },
  '5': {
    type: 'skripsi',
    title: 'Perancangan Program Science (Kode 156)',
    metode: 'Individu',
    folder: 'skripsi-ti-program-science',
    babs: 5,
    backmatter: [
      '\\include{bagian-akhir/daftar-riwayat-hidup}',
      '% \\include{bagian-akhir/lembar-bimbingan} % Tidak diperlukan untuk outline 156',
      '\\include{bagian-akhir/surat-keterangan-riset}',
      '\\include{bagian-akhir/bukti-plagiarisme}',
      '\\include{bagian-akhir/lampiran}'
    ]
  },
  '6': {
    type: 'skripsi',
    title: 'Penelitian Ilmiah (Kode 138)',
    metode: 'Individu',
    folder: 'skripsi-ti-penelitian-ilmiah',
    babs: 5,
    backmatter: [
      '\\include{bagian-akhir/daftar-riwayat-hidup}',
      '\\include{bagian-akhir/lembar-bimbingan}',
      '\\include{bagian-akhir/surat-keterangan-riset} % Wajib',
      '\\include{bagian-akhir/bukti-plagiarisme}',
      '\\include{bagian-akhir/lampiran}'
    ]
  },
  '7': {
    type: 'skripsi',
    title: 'Jaringan Komputer (Kode 137)',
    metode: 'Individu',
    folder: 'skripsi-ti-jaringan',
    babs: 5,
    backmatter: [
      '\\include{bagian-akhir/daftar-riwayat-hidup}',
      '\\include{bagian-akhir/lembar-bimbingan}',
      '\\include{bagian-akhir/surat-keterangan-riset} % WAJIB ASLI',
      '\\include{bagian-akhir/bukti-plagiarisme}',
      '\\include{bagian-akhir/lampiran}'
    ]
  },
  '8': {
    type: 'skripsi',
    title: 'Aplikasi StartUp (Kode 158)',
    metode: 'Kelompok (maks. 2 orang)',
    folder: 'skripsi-ti-startup',
    babs: 4,
    backmatter: [
      '\\include{bagian-akhir/daftar-riwayat-hidup}',
      '\\include{bagian-akhir/lembar-bimbingan}',
      '\\include{bagian-akhir/surat-keterangan-riset}',
      '\\include{bagian-akhir/bukti-plagiarisme}',
      '\\include{bagian-akhir/lampiran}'
    ]
  }
};

function setupOutline(targetDir, choice) {
  const mainMagang = path.join(targetDir, 'main-magang.tex');
  const mainSkripsi = path.join(targetDir, 'main-skripsi.tex');
  const mainFile = path.join(targetDir, 'main.tex');
  const outlinesDir = path.join(targetDir, 'outlines');
  
  const isMagang = parseInt(choice) <= 4;
  
  let config = outlinesConfig[choice];
  if (!config) {
    config = isMagang ? outlinesConfig['4'] : outlinesConfig['7'];
  }

  if (isMagang) {
    fs.renameSync(mainMagang, mainFile);
    fs.unlinkSync(mainSkripsi);
    
    // Cleanup Skripsi files
    fs.rmSync(path.join(targetDir, 'bagian-akhir'), { recursive: true, force: true });
    
    const skripsiFiles = [
      'cover-skripsi.tex', 'abstrak.tex', 'pengesahan.tex', 
      'pernyataan-keaslian.tex', 'persetujuan-publikasi.tex', 
      'pedoman-hak-cipta.tex', 'lembar-konsultasi.tex', 'persembahan.tex'
    ];
    skripsiFiles.forEach(f => {
      const p = path.join(targetDir, 'bagian-awal', f);
      if (fs.existsSync(p)) fs.unlinkSync(p);
    });

  } else {
    fs.renameSync(mainSkripsi, mainFile);
    fs.unlinkSync(mainMagang);
    
    // Cleanup PKL files
    fs.rmSync(path.join(targetDir, 'bagian-akhir-pkl'), { recursive: true, force: true });
    
    const pklFiles = ['cover-magang.tex', 'pengesahan-pkl.tex'];
    pklFiles.forEach(f => {
      const p = path.join(targetDir, 'bagian-awal', f);
      if (fs.existsSync(p)) fs.unlinkSync(p);
    });
  }

  let content = fs.readFileSync(mainFile, 'utf8');
  
  // Construct dynamic outline string
  let outlineStr = `% =======================================================\n`;
  if (config.type === 'skripsi') {
    outlineStr += `% OUTLINE SKRIPSI: ${config.title}\n`;
    outlineStr += `% Metode: ${config.metode}\n`;
  } else {
    outlineStr += `% OUTLINE PKL: ${config.title}\n`;
  }
  outlineStr += `% =======================================================\n`;
  for (let i = 1; i <= config.babs; i++) {
    outlineStr += `\\include{outlines/${config.folder}/bab${i}}\n`;
  }
  outlineStr += `% =======================================================`;

  // Construct dynamic backmatter string
  let backmatterStr = `%% =====================================================\n`;
  backmatterStr += `%% BACKMATTER${config.type === 'magang' ? ' PKL' : ''}\n`;
  backmatterStr += `%% =====================================================\n`;
  backmatterStr += config.backmatter.join('\n');
  
  // Inject into main.tex
  content = content.replace('% <<<OUTLINE_MARKER>>>', outlineStr);
  content = content.replace('% <<<BACKMATTER_MARKER>>>', backmatterStr);
  
  fs.writeFileSync(mainFile, content);
  keepOnly(outlinesDir, [config.folder]);
}

function keepOnly(dir, foldersToKeep) {
  const items = fs.readdirSync(dir);
  for (const item of items) {
    if (!foldersToKeep.includes(item)) {
      fs.rmSync(path.join(dir, item), { recursive: true, force: true });
    }
  }
}
