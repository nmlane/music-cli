// Trim whitespace and coerce to lowercase
function formatInput(param) {
    return param.toLowerCase().replace(/\s+/g, '')
}

function addAlbum(collection, album, artist) {
    // Format input to minimize potential of duplicates
    const formattedAlbum = formatInput(album)
    const formattedArtist = formatInput(artist)

    if (!collection[formattedAlbum]) {
        collection[formattedAlbum] = {
            artist: formattedArtist,
            played: false,
        }
        console.log(`Added ${album} by ${artist} to collection!`)
    } else {
        console.log(`Album already added!`)
    }
}

function playAlbum(collection, album) {
    console.log(`You're listening to ${album} by ${collection[album].artist}.`)
    collection[album].played = true
}

function showCollection(collection) {
    if (Object.keys(collection).length === 0) {
        console.log('Your collection is empty.')
    } else {
        console.log(collection)
    }
}

function showUnplayed(collection) {
    const unplayed = {}
    Object.keys(collection).forEach((album) => {
        if (!collection[album].played) {
            unplayed[album] = collection[album]
        }
    })

    if (Object.keys(unplayed).length === 0) {
        console.log('You have listened to all of your albums.')
    } else {
        console.log(`Here is a list of the all of your unplayed albums: `)
        console.log(unplayed)
    }
}

function showCollectionByArtist(collection, artist) {
    const artistCollection = {}
    Object.keys(collection).forEach((album) => {
        if (collection[album].artist === artist) {
            artistCollection[album] = collection[album]
        }
    })

    if (Object.keys(artistCollection).length === 0) {
        console.log('You have no albums by this artist.')
    } else {
        console.log(`Here is a list of the all of your albums from ${artist}: `)
        console.log(artistCollection)
    }
}

function showUnplayedByArtist(collection, artist) {
    const unplayed = {}
    Object.keys(collection).forEach((album) => {
        if (collection[album].artist === artist && !collection[album].played) {
            unplayed[album] = collection[album]
        }
    })

    if (Object.keys(unplayed).length === 0) {
        console.log('You have listened to all of your albums by this artist.')
    } else {
        console.log(`Here is a list of the unplayed albums from ${artist}: `)
        console.log(unplayed)
    }
}

module.exports = {
    formatInput,
    addAlbum,
    playAlbum,
    showCollection,
    showCollectionByArtist,
    showUnplayed,
    showUnplayedByArtist,
}
