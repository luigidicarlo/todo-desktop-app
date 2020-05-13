const fs = require('fs');
const path = require('path');

const fsOptions = { encoding: 'utf8' };

const readFromFile = (filename) => {
    const resolvedPath = path.resolve('file://', __dirname, '../app/data', filename);
    if (!fs.existsSync(resolvedPath)) {
        return [];
    } else {
        const data = fs.readFileSync(resolvedPath, fsOptions);
        return JSON.parse(data);
    }
};

const writeToFile = (filename, data) => {
    const resolvedPath = path.resolve('file://', __dirname, '../app/data', filename);
    if (!fs.existsSync(resolvedPath)) {
        console.log(fs.existsSync(resolvedPath));
        createFile(filename, data);
    } else {
        fs.writeFileSync(resolvedPath, data, fsOptions);
    }
};

const createFile = (filename, data = null) => {
    const resolvedPath = path.resolve('file://', __dirname, '../app/data', filename);
    fs.createWriteStream(resolvedPath, fsOptions);
    if (data) {
        fs.writeFileSync(resolvedPath, data, fsOptions);
    }
};