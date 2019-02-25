//
const inquirer = require('inquirer');
const moveFiles = require('./MoveFiles');
const deleteFiles = require('./DeleteFiles');
const useFileProof = require('./FileProof/UseFileProof');
const fm = require('./FileManagement/FileManagement');
const fp = require('./FileProof/FileProof');


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
            name: 'Create fileproof file',
            value: 'initFproof'
        },
        {
            name: 'Use fileproof file',
            value: 'runFproof'
        }
    ]
}

const handleMenuOption = (option) => {
    if(option == 'moveToDir'){
        moveFiles.start();
    } else if(option == 'deleteFiles'){
        deleteFiles.start();
    } else if(option == 'runFproof'){
        useFileProof.start();
    }
}

inquirer.prompt([menuListObject])
.then(answers => {
    handleMenuOption(answers.menuOption);
});




