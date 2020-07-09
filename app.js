const getNotes = require('./notes')
const chalk = require('chalk')

const notes = getNotes();

console.log(notes)

console.log(chalk.green.bold.inverse('Success!'))