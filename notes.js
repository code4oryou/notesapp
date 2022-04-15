const fs     = require('fs')
const _      = require('lodash')
const chalk  = require('chalk')

const list = () => {
    console.log(chalk.bold.green(`Your notes...\n`))
    loadNotes().forEach(note => printNote(note));
}

const findNote = (title) => {
    const note = _.find(loadNotes(), (n) => n.title === title)
    if (note) {
        printNote(note)
    } else {
        console.log(chalk.bold.red("Note does not exist"))
    }
}

const addNote = (title, body) => {
    const notes = loadNotes()
    if (!_.find(notes, { title: title })) {
        notes.push({
            title: title,
            body: body
        })
        saveNotes(notes)
        console.log(chalk.green(`Note '${title}' added`))
    } else {
        console.log(chalk.red(`Note '${title}' already exists`))
    }
}

const removeNote = (title) => {
    const notes = loadNotes()
    const itemToRemove = _.remove(notes, (note) => {
        return note.title === title
    })
    
    if (itemToRemove.length > 0) {
        saveNotes(notes)
        console.log(chalk.green(`Note '${title}' deleted`))
    } else {
        console.log(chalk.red(`Note '${title}' does not exist`))
    }
}

// Private functions
const saveNotes = (notes) => fs.writeFileSync('notes.json', JSON.stringify(notes))

const loadNotes = () => {
    try {
        const dataBuffer = fs.readFileSync('notes.json')
        const dataJSON = dataBuffer.toString()
        return JSON.parse(dataJSON)
    } catch(e) {
        return []
    }
}

const printNote = (note) => console.log(`${note.title} - ${note.body}`)

module.exports = {
    list: list,
    add: addNote,
    remove: removeNote,
    find: findNote
}