const inquirer = require('inquirer');
const fm = require('./FileManagement/FileManagement');


const handleDeletingAttributes = (answer) => {
    let ext;
    let cont;
    let dir;
    if(answer.attributes.includes('ext')){
        fm.getExtension((extension) => {
            ext = extension;
            if(answer.attributes.includes('cont')){
                fm.getContaining((answer) => {
                    cont = answer;
                    fm.deleteFilesWithExtensionAndContaining(ext, cont);
                });
            } else {
                fm.deletFilesWithExtension(ext);
            }
        });
    } else {
        fm.getContaining((answer) => {
            cont = answer;
            fm.deleteFilesContaining(cont);
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
            handleDeletingAttributes(answer);
        });
}