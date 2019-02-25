const fp = require('./FileProof');
const inquirer = require('inquirer');


const handleFileProofs = (answer) => {
    const files = answer.attributes;
    fp.executeFProof(files);
}

const getChoicesObjectArray = () => {
    const fproofs = fp.getFproofFilepaths();
    let arr = [];
    fproofs.forEach(file => {
        const choice = {
            name: file,
            value: file
        }
        arr.push(choice);
    })
    return arr;
}

module.exports.start = () => {

    const fproofs = fp.getFproofFilepaths();
    console.log(fproofs);

    inquirer.prompt([
        {
            type: 'checkbox',
            name: 'attributes',
            choices: getChoicesObjectArray()
        }
    ]).then(answer => {
        handleFileProofs(answer);
    });
}