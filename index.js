//
const fs = require('fs');

const oldP = '../../move-file-test.txt';
const newP = 'test-folder/move-file-test.txt';


fs.readdir('../../',null, (err, files) => {

    files.forEach(file => {
        console.log(file);
    });
});

console.log('Hello');