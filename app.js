const yargs = require('yargs')
const chalk = require('chalk')
const notes = require('./notes.js')

yargs.version('1.1.0')

yargs.command({
    command: 'add',
    describe: 'Add a new note',
    builder: {
        title: {
            describe: 'Note title',
            demandOption: true,
            type: 'string'
        },
        body: {
            describe: 'Note description',
            demandOption: true,
            type: 'string'
        }
    },
    handler: (argv) => notes.add(argv.title, argv.body)
})

yargs.command({
    command: 'remove',
    describe: 'Remove an existing note',
    builder: {
        title: {
            describe: 'Note title',
            demandOption: true,
            type: 'string'
        }
    },
    handler: (argv) => notes.remove(argv.title)
})

yargs.command({
    command: 'list',
    describe: 'List all notes',
    handler: () => notes.list()
})

yargs.command({
    command: 'read',
    describe: 'Read an existing note',
    builder: {
        title: {
            describe: 'Note title',
            demandOption: true,
            type: 'string'
        }
    },
    handler: (argv) => notes.find(argv.title)
})

yargs.parse()