const fs = require('fs');

const options = {
    flags: 'w',
    encoding: 'utf8',
    mode: 0o666,
    autoClose: true
}

const existJsonFile = path => {
    return fs.existsSync(path);
}

const readJsonFile = path => {
    return JSON.parse(fs.readFileSync(path));
}

const saveJsonFile = (path, jsonObject, description) => {
    try {
        fs.writeFileSync(path, JSON.stringify(jsonObject), options);
        console.log(`The ${description} has been saved!`);
        return true;
    } catch (error) {
        console.log(`The ${description} has not been saved!`, error);
        return false;
    }
}

exports.existJsonFile = existJsonFile;
exports.readJsonFile = readJsonFile;
exports.saveJsonFile = saveJsonFile;