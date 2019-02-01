const inquirer = require('inquirer');
const fm = require('./FileManagement/FileManagement');

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


const handleMovingAttributes = (answer) => {
    let ext;
    let cont;
    let dir;
    if(answer.attributes.includes('ext')){
        getExtension((extension) => {
            ext = extension;
            if(answer.attributes.includes('cont')){
                getContaining((answer) => {
                    cont = answer;
                    getDirectory((directory) => {
                        dir = directory;
                        console.log(`Gonna move files with extension ${ext} and containing ${cont} to ${dir}`);
                        fm.moveFilesWithExtensionAndContainingToDirectory(ext, cont, dir);
                    });
                });
            } else {
                getDirectory((directory) => {
                    dir = directory;
                    console.log(`Gonna move files with extension ${ext} to ${dir}`);
                    fm.moveFilesWithExtensionToDirectory(ext,dir);
                });
            }
        });
    } else {
        getContaining((answer) => {
            cont = answer;
            getDirectory((directory) => {
                dir = directory;
                console.log(`Gonna move files containing ${cont} to ${dir}`);
                fm.moveFilesContainingToDirectory(cont, directory);
            });
        });
    }

}


module.exports.start = () => {
    inquirer.prompt(
        [
            {
                type: 'checkbox',
                name: 'attributes',
                choices: 
                [
                    {
                        name: 'Extension',
                        value: 'ext'
                    },
                    {
                        name: 'Containing',
                        value: 'cont'
                    }
                ]
            }
        ]
        ).then(answer => {
            handleMovingAttributes(answer);
        });
}

