const fs = require('fs');
const path = require('path');

const getFilesWithExtension = (extension) => {
    console.log('hello');
    let files = fs.readdirSync('.', {
        withFileTypes: false
    });

    files = files.filter(file => {
        return path.extname(file) === extension;
    })
    return files;
};

const moveFilesWithExtensionToDirectory = (extension, directory) => {
    if(fs.existsSync(directory)){
        console.log('folder already exists');
    } else {
        fs.mkdir(directory, null, (err) => {
            if(err){
                throw Error;
            }
            const files = getFilesWithExtension('.jpg');
            moveFilesToDirectory(files, directory);
        });
    }
};

const moveFilesToDirectory = (files, directory) => {
    files.forEach(file => {
        moveFileToDirectory(file, directory);
    })
}

const moveFileToDirectory = (filename, directory) => {
    console.log(`Moving file ${filename} to directory ${directory}`);
    fs.renameSync(filename, `${directory}/${filename}`);
};

const createFolder = (folderName) => {
    console.log(`Creating folder ${folderName}`);
    fs.mkdir(folderName, null, (err) => {
        if(err){
            throw Error;
        }
    })
}

module.exports.moveFileToDirectory = moveFileToDirectory;
module.exports.createFolder = createFolder;
module.exports.moveFilesWithExtensionToDirectory = moveFilesWithExtensionToDirectory;
