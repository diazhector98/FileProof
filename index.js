//
const inquirer = require('inquirer');
const moveFiles = require('./MoveFiles');
const fm = require('./FileManagement/FileManagement');


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

const handleMenuOption = (option) => {
    if(option == 'moveToDir'){
        moveFiles.start();
    }
}



inquirer.prompt([menuListObject])
.then(answers => {
    handleMenuOption(answers.menuOption);
});





