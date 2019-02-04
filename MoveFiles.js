const inquirer = require('inquirer');
const fm = require('./FileManagement/FileManagement');

const handleMovingAttributes = (answer) => {
    let ext;
    let cont;
    let dir;
    if(answer.attributes.includes('ext')){
        fm.getExtension((extension) => {
            ext = extension;
            if(answer.attributes.includes('cont')){
                fm.getContaining((answer) => {
                    cont = answer;
                    fm.getDirectory((directory) => {
                        dir = directory;
                        console.log(`Gonna move files with extension ${ext} and containing ${cont} to ${dir}`);
                        fm.moveFilesWithExtensionAndContainingToDirectory(ext, cont, dir);
                    });
                });
            } else {
                fm.getDirectory((directory) => {
                    dir = directory;
                    console.log(`Gonna move files with extension ${ext} to ${dir}`);
                    fm.moveFilesWithExtensionToDirectory(ext,dir);
                });
            }
        });
    } else {
        fm.getContaining((answer) => {
            cont = answer;
            fm.getDirectory((directory) => {
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

