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
const routesTemplate = `
const express = require('express');
const router = express.Router();
const ${moduleName}Controller = require('../controllers/${moduleName}-controller');

// Create operation
router.post('/', ${moduleName}Controller.create);

// Read operation
router.get('/:id', ${moduleName}Controller.getById);

// Update operation
router.put('/:id', ${moduleName}Controller.update);

// Delete operation
router.delete('/:id', ${moduleName}Controller.delete);

module.exports = router;
`;

const controllerTemplate = `
// ${moduleName}-controller.js
const ${moduleName} = require('../models/${moduleName}-model');

// Create operation
exports.create = async (req, res) => {
  try {
    const ${moduleName.toLowerCase()} = await ${moduleName}.create(req.body);
    res.status(201).json(${moduleName.toLowerCase()});
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Read operation
exports.getById = async (req, res) => {
  try {
    const ${moduleName.toLowerCase()} = await ${moduleName}.findById(req.params.id);
    if (!${moduleName.toLowerCase()}) {
      return res.status(404).json({ message: '${moduleName} not found' });
    }
    res.json(${moduleName.toLowerCase()});
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update operation
exports.update = async (req, res) => {
  try {
    const ${moduleName.toLowerCase()} = await ${moduleName}.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(${moduleName.toLowerCase()});
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete operation
exports.delete = async (req, res) => {
  try {
    await ${moduleName}.findByIdAndDelete(req.params.id);
    res.json({ message: '${moduleName} deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
`;

const modelTemplate = `
// ${moduleName}-model.js
const mongoose = require('mongoose');

const ${moduleName}Schema = new mongoose.Schema({
  // Define your schema fields here
  title: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  },
  author: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('${moduleName}', ${moduleName}Schema);
`;

// Create routes file
const routesFile = path.join(moduleFolder, `${moduleName}-routes.js`);
try {
  fs.writeFileSync(routesFile, routesTemplate);
  console.log(`Routes file created: ${routesFile}`);
} catch (err) {
  console.error(`Error creating routes file: ${err.message}`);
  cleanup();
}

// Create controller file
const controllerFile = path.join(moduleFolder, `${moduleName}-controller.js`);
try {
  fs.writeFileSync(controllerFile, controllerTemplate);
  console.log(`Controller file created: ${controllerFile}`);
} catch (err) {
  console.error(`Error creating controller file: ${err.message}`);
  cleanup();
}

// Create model file
const modelFile = path.join(moduleFolder, `${moduleName}-model.js`);
try {
  fs.writeFileSync(modelFile, modelTemplate);
  console.log(`Model file created: ${modelFile}`);
} catch (err) {
  console.error(`Error creating model file: ${err.message}`);
  cleanup();
}

// Run npm install in module folder to install dependencies (if any)
exec(`cd ${moduleFolder} && npm init -y && npm install express mongoose`, (error, stdout, stderr) => {
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
