#!/usr/bin/env node
const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');
const { Command } = require('commander');

const program = new Command();

program
  .option('-m, --module <moduleName>', 'Module name')
  .parse(process.argv);

const options = program.opts();

const moduleName = options.module;

if (!moduleName) {
  console.error('Error: Module name is required');
  process.exit(1);
}

console.log(`Module name: ${moduleName}`);

const modulesFolderPath = path.join(__dirname, 'modules');
const moduleFolder = path.join(modulesFolderPath, moduleName);

// Check if modules folder exists, if not create it
if (!fs.existsSync(modulesFolderPath)) {
  try {
    fs.mkdirSync(modulesFolderPath);
    console.log(`Modules folder created: ${modulesFolderPath}`);
  } catch (err) {
    console.error(`Error creating modules folder: ${err.message}`);
    process.exit(1);
  }
}

// Check if module already exists
if (fs.existsSync(moduleFolder)) {
  console.error(`Error: Module '${moduleName}' already exists`);
  process.exit(1);
}

// Create module folder
try {
  fs.mkdirSync(moduleFolder);
  console.log(`Module folder created: ${moduleFolder}`);
} catch (err) {
  console.error(`Error creating module folder: ${err.message}`);
  process.exit(1);
}

// Generate CRUD files
const template = `
const express = require('express');
const router = express.Router();

// Create operation
router.post('/', (req, res) => {
    // Logic to create ${moduleName}
});

// Read operation
router.get('/:id', (req, res) => {
    // Logic to read ${moduleName} by ID
});

// Update operation
router.put('/:id', (req, res) => {
    // Logic to update ${moduleName} by ID
});

// Delete operation
router.delete('/:id', (req, res) => {
    // Logic to delete ${moduleName} by ID
});

module.exports = router;
`;

// Create routes file
const routesFile = path.join(moduleFolder, `${moduleName}-routes.js`);
try {
  fs.writeFileSync(routesFile, template);
  console.log(`Routes file created: ${routesFile}`);
} catch (err) {
  console.error(`Error creating routes file: ${err.message}`);
  cleanup();
}

// Create controller file
const controllerFile = path.join(moduleFolder, `${moduleName}-controller.js`);
try {
  fs.writeFileSync(controllerFile, `// Controller logic for ${moduleName}`);
  console.log(`Controller file created: ${controllerFile}`);
} catch (err) {
  console.error(`Error creating controller file: ${err.message}`);
  cleanup();
}

// Create model file
const modelFile = path.join(moduleFolder, `${moduleName}-model.js`);
try {
  fs.writeFileSync(modelFile, `// Model schema for ${moduleName}`);
  console.log(`Model file created: ${modelFile}`);
} catch (err) {
  console.error(`Error creating model file: ${err.message}`);
  cleanup();
}

// Run npm install in module folder to install dependencies (if any)
exec(`cd ${moduleFolder} && npm install`, (error, stdout, stderr) => {
  if (error) {
    console.error(`Error: ${error.message}`);
    cleanup();
  }
  if (stderr) {
    console.error(`stderr: ${stderr}`);
    cleanup();
  }
  console.log(`Dependencies installed: ${stdout}`);
});

function cleanup() {
  console.log('Cleaning up...');
  try {
    fs.rmdirSync(moduleFolder, { recursive: true });
    console.log(`Removed module folder: ${moduleFolder}`);
  } catch (err) {
    console.error(`Error cleaning up: ${err.message}`);
  }
  process.exit(1);
}
