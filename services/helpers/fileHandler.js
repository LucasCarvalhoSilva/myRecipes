const fsPromises = require('fs').promises;
const path = require('path');
const dirName = 'storage';

async function read(fileName) {
  try {
    const filePath = path.join(dirName, fileName);
    const fileData = await fsPromises.readFile(filePath, 'utf8');
    return JSON.parse(fileData);
  } catch (error) {
    if (error.code === 'ENOENT') {
      throw new Error('File not found.');
    }
    throw error;
  }
}

async function write(fileName, data) {
  try {
    const filePath = path.join(dirName, fileName);
    await createDirectoryIfNotExists(dirName);
    await fsPromises.writeFile(filePath, JSON.stringify(data));
  } catch (error) {
    throw error;
  }
}

async function createDirectoryIfNotExists(directory) {
  try {
    await fsPromises.access(directory);
  } catch (error) {
    if (error.code === 'ENOENT') {
      await fsPromises.mkdir(directory, { recursive: true });
    } else {
      throw error;
    }
  }
}

module.exports = { read, write };
