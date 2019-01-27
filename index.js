//
const ora = require('ora');
const fm = require('./FileManagement/FileManagement');
const inquirer = require('inquirer');

const argv = require('yargs').argv;


if(argv.trueo){
    inquirer.prompt([
        {
            name: 'extension',
            message: 'Extension of files you want to move: ',
        },
        {
            name: 'directory',
            message: 'Directory where you want it to move'
        }
    ]).then(answers => {
        console.log(answers.extension);
    });
}





