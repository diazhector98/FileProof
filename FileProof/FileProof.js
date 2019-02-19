const fs = require('fs');
const fm = require('../FileManagement/FileManagement');
const moveFiles = require('../MoveFiles');


const getFproofFilepaths = () => {
    return fm.getFilesWithExtension('fproof');
}

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

const moveFilesWithJSON = (object) => {
    dir = object.directory;
    if(object.move){
        const move = object.move;
        if(move.extensions){
            move.extensions.forEach(ext => {
                fm.moveFilesWithExtensionToDirectory(ext, dir);
            });
        }
        if(move.containing){
        }
    }
}

const executeFProof = () => {
    const files = getFproofFilepaths();
    files.forEach(file => {
        const obj = getJSONfromFile(file);
        moveFilesWithJSON(obj);
    });
}

module.exports = {
    writeJSONtoFile,
    getJSONfromFile,
    executeFProof
};