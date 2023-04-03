import express from 'express';
import { fileURLToPath, pathToFileURL } from 'url';
import fs from 'fs';
import path from 'path';

const router = express.Router();

// Health check
router.get('/healthcheck', async (req, res) => res.status(200).send('<img src =https://http.cat/200/>'));

// Automatically load all routes files found under their respective component folders
const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);
const basePath = path.join(dirname, '../components');
fs.readdirSync(basePath, { withFileTypes: true })
  .filter((file) => file.isDirectory())
  .map((dir) => dir.name)
  .forEach((componentName) => {
    const componentPath = pathToFileURL(`${basePath}/${componentName}/routes.js`);
    if (fs.existsSync(componentPath)) import(componentPath);
  });

export { router };

