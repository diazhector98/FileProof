//
const ora = require('ora');
const fm = require('./FileManagement/FileManagement');
const inquirer = require('inquirer');

const argv = require('yargs').argv;

const menuListObject =
{
    type: 'list',
    name: 'menuOption',
    choices: [
        {
            name: 'Move files to directory',
            value: 'moveToDir'
        },
        {
            name: 'Delete files',
            value: 'deleteFiles'
        },
        {
            name: 'Create fileproof rule file',
            value: 'initFproof'
        },
        {
            name: 'Use fileproof rule file',
            value: 'runFproof'
        }
    ]
}

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

const startMovingToDirectory = () => {
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

const handleMenuOption = (option) => {
    if(option == 'moveToDir'){
        startMovingToDirectory();
    }
}


inquirer.prompt([menuListObject])
.then(answers => {
    handleMenuOption(answers.menuOption);
});






