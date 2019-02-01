const fs = require('fs');
const fsPromises = require('fs').promises;
const path = require('path');


const deleteFile = (file) => {
    fs.unlink(file, (err) => {
        if(err){
            throw err;
        }
    });
}

const getFilesWithExtension = (extension) => {
    let files = fs.readdirSync('.', {
        withFileTypes: false
    });

    files = files.filter(file => {
        return path.extname(file) === extension;
    })
    return files;
};

const getFilesContaining = (string) => {
    let files = fs.readdirSync('.', {
        withFileTypes: false
    });
    files = files.filter(file => {
        return file.includes(string);
    });
    return files;
}

const getFilesWithExtensionAndContaining = (extension, containing) => {
    let files = fs.readdirSync('.', {
        withFileTypes: false
    });
    files = files.filter(file => {
        return file.includes(containing) && path.extname(file) === `.${extension}`;
    });
    console.log(files.length);
    return files;
}

const moveFilesWithExtensionToDirectory = (extension, directory) => {
    if(fs.existsSync(directory)){
        console.log('folder already exists');
    } else {
        fs.mkdir(directory, null, (err) => {
            if(err){
                throw Error;
            }
            const files = getFilesWithExtension(`.${extension}`);
            moveFilesToDirectory(files, directory);
        });
    }
};

const moveFilesContainingToDirectory = (string, directory) => {
    const files = getFilesContaining(string);
    if(fs.existsSync(directory)){
        moveFilesToDirectory(files, directory);
    } else {
        fs.mkdir(directory, null, (err) => {
            if(err){
                throw Error;
            }
            moveFilesToDirectory(files, directory);
        });
    }
}

const moveFilesWithExtensionAndContainingToDirectory = (extension, containing, directory) => {
    const files = getFilesWithExtensionAndContaining(extension, containing);
    if(fs.existsSync(directory)){
        moveFilesToDirectory(files, directory);
    } else {
        fs.mkdir(directory, null, (err) => {
            if(err){
                throw Error;
            }
            moveFilesToDirectory(files, directory);
        });
    }
}

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

const getStatsOfFile = (path) => {
    fsPromises.stat(path).then((fileStat) => {
        console.log(fileStat);
    });
}

module.exports.deleteFile = deleteFile;
module.exports.moveFileToDirectory = moveFileToDirectory;
module.exports.createFolder = createFolder;
module.exports.moveFilesWithExtensionToDirectory = moveFilesWithExtensionToDirectory;
module.exports.moveFilesContainingToDirectory = moveFilesContainingToDirectory;
module.exports.moveFilesWithExtensionAndContainingToDirectory = moveFilesWithExtensionAndContainingToDirectory;
module.exports.getStatsOfFile = getStatsOfFile;