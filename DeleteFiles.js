const inquirer = require('inquirer');
const fm = require('./FileManagement/FileManagement');


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