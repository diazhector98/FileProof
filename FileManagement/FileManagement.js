const fs = require('fs');
const fsPromises = require('fs').promises;
const inquirer = require('inquirer');
const path = require('path');


const getExtension = (callback) => {
    inquirer.prompt(
        [
            {
                name: 'extension',
                message: 'Extension (e.g jpg, pdf, docx): '
            }
        ]
    ).then(answer => {
        callback(answer.extension);
    })
}

const getContaining = (callback) => {
    inquirer.prompt(
        [
            {
                name: 'containing',
                message: 'Containing (e.g \'HW\', all files containg \'HW\'): '
            }
        ]
    ).then(answer => {
        callback(answer.containing);
    })
}

const getDirectory = (callback) => {
    inquirer.prompt(
        [
            {
                name: 'directory',
                message: 'Directory/Folder destiny: '
            }
        ]
    ).then(answer => {
        callback(answer.directory);
    })
}

const getFilesWithExtension = (extension) => {
    let files = fs.readdirSync('.', {
        withFileTypes: false
    });
    files = files.filter(file => {
        return path.extname(file) === `.${extension}`;
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
    return files;
}

const moveFilesWithExtensionToDirectory = (extension, directory) => {
    if(fs.existsSync(directory)){
        const files = getFilesWithExtension(`${extension}`);
        moveFilesToDirectory(files, directory);
    } else {
        fs.mkdir(directory, null, (err) => {
            if(err){
                throw Error;
            }
            const files = getFilesWithExtension(`${extension}`);
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
    fs.renameSync(filename, `${directory}/${filename}`);
};

const deleteFilesWithExtensionAndContaining = (extension, containing) => {
    const files = getFilesWithExtensionAndContaining(extension, containing);
    deleteFiles(files);
};

const deletFilesWithExtension = (extension) => {
    const files = getFilesWithExtension(extension);
    deleteFiles(files);
};

const deleteFilesContaining = (containing) => {
    const files = getFilesContaining(containing);
    deleteFiles(files);
};

const deleteFiles = (files) => {
    files.forEach(file => {
        deleteFile(file);
    })
};

const deleteFile = (file) => {
    fs.unlink(file, (err) => {
        if(err){
            throw err;
        }
    });
};

const createFolder = (folderName) => {
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

module.exports = {
    getFilesWithExtension,
    getFilesContaining,
    deleteFile,
    moveFileToDirectory,
    createFolder,
    moveFilesWithExtensionToDirectory,
    moveFilesContainingToDirectory,
    moveFilesWithExtensionAndContainingToDirectory,
    getStatsOfFile,
    getContaining,
    getExtension,
    getDirectory,
    deleteFile,
    deleteFiles,
    deletFilesWithExtension,
    deleteFilesContaining,
    deleteFilesWithExtensionAndContaining
}