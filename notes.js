const fs = require('fs')
const chalk = require('chalk')

const addNote = (title, body) => {
    const notes = loadNotes()

    const duplicateNotes = notes.find(note => note.title === title);
    if (!duplicateNotes){
        notes.push({
            title: title,
            body: body
        })

        saveNotes(notes)
        console.log(chalk.green.inverse('New note added!'))
    } else {
        console.log(chalk.red.inverse('Note title taken!'))
    }
}

const removeNote = title => {
    const notes = loadNotes()

    const notesToKeep = notes.filter(note => note.title !== title)

    if(notes.length !== notesToKeep.length){
        console.log(chalk.green.inverse('Note removed!'))
        saveNotes(notesToKeep)
    } else {
        console.log(chalk.red.inverse('No note found!'))
    }
}

const listNotes = () => {
    const notes = loadNotes()

    console.log(chalk.yellow.inverse('Your Notes'))

    notes.forEach(note => {
        console.log('Title: ' + note.title)
    })
}

const saveNotes = notes => fs.writeFileSync('notes.json', JSON.stringify(notes))

const loadNotes = () => {
    try {
        const dataJSON = fs.readFileSync('notes.json').toString()
        return JSON.parse(dataJSON)
    } catch (e) {
        return []
    }
}

const readNote = title => {
    const notes = loadNotes()

    const foundNote = notes.find(note => note.title === title)

    if(foundNote) {
        console.log(chalk.inverse(foundNote.title))
        console.log(foundNote.body)
    } else {
        console.log(chalk.red.inverse('No note found'))
    }
}

module.exports = {
    addNote: addNote,
    removeNote: removeNote,
    listNotes: listNotes,
    readNote: readNote
};