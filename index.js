const readline = require('readline')
const {
    formatInput,
    addAlbum,
    playAlbum,
    showCollection,
    showCollectionByArtist,
    showUnplayed,
    showUnplayedByArtist,
} = require('./utils')

// Temp storage for music library
const collection = {}

/** I want to set the initial prompt to welcome the user
 * before resetting it to have a standard command line feel
 */
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    prompt: 'Welcome to your music collection! Press enter to start adding, playing, and viewing albums. Use the command "help" to view a list of commands...',
})
rl.prompt()
rl.setPrompt('> ')

/** This is a reusable way to handle the user input and resolve the promises.
 */
const ask = (msg) =>
    new Promise((resolve) =>
        rl.question(msg, (response) => resolve(formatInput(response)))
    )

/** This object is used to map the formatted commands and run the correlated functions.
 *  The keys are the command names after all whitespace has been stripped and coerced
 *  to lowercase using the formatInput() function
 */
const commands = {
    showall: function () {
        showCollection(collection)
        rl.prompt()
    },
    showunplayed: function () {
        showUnplayed(collection)
        rl.prompt()
    },
    add: async function () {
        const album = await ask('What album are you adding? ')
        const artist = await ask('Who is the artist? ')

        addAlbum(collection, album, artist)
        rl.prompt()
    },
    play: async function () {
        const album = await ask('What album do you want to play? ')

        playAlbum(collection, album)
        rl.prompt()
    },

    showartist: async function () {
        const artist = await ask('Enter artist: ')

        showCollectionByArtist(collection, artist)
        rl.prompt()
    },
    showartistunplayed: async function () {
        const artist = await ask('Enter artist: ')

        showUnplayedByArtist(collection, artist)
        rl.prompt()
    },
    help: function () {
        console.log(
            '=================================================================='
        )
        console.log(
            '           MUSIC LIBRARY COMMANDS - GUIDED INTERFACES             '
        )
        console.log(
            '=================================================================='
        )
        console.log('add                   --->  add an album')
        console.log('play                  --->  play an album')
        console.log('show all              --->  view full library')
        console.log('show unplayed         --->  view unplayed albums')
        console.log('show artist           --->  view albums of single artist')
        console.log(
            'show artist unplayed  --->  view unplayed albums of single artist'
        )
        console.log('help                  --->  view list of commands')
        console.log('quit                  --->  exit music library')

        rl.prompt()
    },
    quit: function () {
        rl.close()
    },
}

/** read the user's input, format it and choose the correlating command */
rl.on('line', (input) => {
    input = formatInput(input)

    if (input in commands) {
        commands[input]()
    } else if (input === '') {
        /** ^^ This block checks for an empty 'enter' input, since it
         *  currently does not work well with the formatInput() function.
         * */
        rl.prompt()
    } else {
        console.log(
            'Command not recognized. Use the "help" command to view a list of all available commands.'
        )
        rl.prompt()
    }
})
