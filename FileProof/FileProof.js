const fs = require('fs');

const writeJSONtoFile = (object, filepath) => {
    fs.writeFileSync(filepath, JSON.stringify(object));
}

const getJSONfromFile = (filepath) => {
    try{
        const jsonString = fs.readFileSync(filepath);
        return JSON.parse(jsonString);
    } catch(e) {
        return {};
    }
}

module.exports = {
    writeJSONtoFile,
    getJSONfromFile
};