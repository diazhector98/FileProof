//
const inquirer = require('inquirer');
const moveFiles = require('./MoveFiles');
const deleteFiles = require('./DeleteFiles');
const fm = require('./FileManagement/FileManagement');
const fp = require('./FileProof/FileProof');


fp.executeFProof();

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
    }
}

/*
inquirer.prompt([menuListObject])
.then(answers => {
    handleMenuOption(answers.menuOption);
});
*/




