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
        console.log(jsonString);
        return JSON.parse(jsonString);
    } catch(e) {
        return {};
    }
}

const moveFilesWithJSON = (object) => {
    const dir = object.directory;
    if(object.extensions && object.containing){
        object.extensions.forEach(ext => {
            fm.moveFilesWithExtensionAndContainingToDirectory(ext, object.containing, dir);
        })
    } else if(object.extensions){
        object.extensions.forEach( ext => {
            fm.moveFilesWithExtensionToDirectory(ext, dir);
        })
    } else if(object.containing){
        fm.moveFilesContainingToDirectory(object.containing, dir);
    }
}

const deleteFilesWithJSON = (object) => {
    if(object.extensions && object.containing){
        object.extensions.forEach( ext => {
            fm.deleteFilesWithExtensionAndContaining(ext, object.containing);
        });
    } else if(object.extensions){
        object.extensions.forEach(ext => {
            fm.deleteFilesWithExtension(ext);
        })
    } else if(object.containing){
        fm.deleteFilesContaining(object.containing);
    }
}

const executeFProof = () => {
    const files = getFproofFilepaths();
    console.log(files);
    files.forEach(file => {
        const obj = getJSONfromFile(file);
        console.log(obj);
        if(obj.move){
            const moveObjects = obj.move;
            moveObjects.forEach(movObj => {
                moveFilesWithJSON(movObj);
            });
        }
        if(obj.delete){
            const deleteObjects = obj.delete;
            deleteObjects.forEach(delObj => {
                deleteFilesWithJSON(delObj);
            })
        }
    });
}

module.exports = {
    writeJSONtoFile,
    getJSONfromFile,
    executeFProof
};