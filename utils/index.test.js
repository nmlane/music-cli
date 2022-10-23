/** Since most of these tests are just logging output and not directly
 * affecting data structures, the tests feel a little light but they pass.
 * The main tests of formatting input, adding, and playing albums all pass
 * back correct information. In a limited capacity for time, these tests should
 * provide good enough coverage.
 */

const {
    formatInput,
    addAlbum,
    playAlbum,
    showCollection,
    showCollectionByArtist,
    showUnplayed,
    showUnplayedByArtist,
} = require('./')

const emptyCollection = {}

test('formats "   ThIs is   uNFORMatted INPUT    " to "thisisunformattedinput"', () => {
    expect(formatInput('   ThIs is   uNFORMatted INPUT    ')).toBe(
        'thisisunformattedinput'
    )
})

test('adds an album to the collection', () => {
    const collection = {}
    addAlbum(collection, 'Twelvefour', 'The Paper Kites')
    expect(collection).toStrictEqual({
        twelvefour: {
            artist: 'thepaperkites',
            played: false,
        },
    })
})

/**
 * Tests assume that input has come from the CLI
 * which will be auto-formatted. For the sake of
 * time I will use the formatInput function to
 * simulate that piece of the app
 **/

test('plays an album', () => {
    const collection = {
        twelvefour: {
            artist: 'thepaperkites',
            played: false,
        },
    }
    const album = formatInput('Twelvefour')

    playAlbum(collection, album)
    expect(collection).toStrictEqual({
        twelvefour: {
            artist: 'thepaperkites',
            played: true,
        },
    })
})

describe('displays collection correctly', () => {
    const emptyCollection = {}
    const allPlayed = {
        rumours: {
            artist: 'fleetwoodmac',
            played: true,
        },
        roomforsquares: {
            artist: 'johnmayer',
            played: true,
        },
    }
    const collection = {
        twelvefour: {
            artist: 'thepaperkites',
            played: false,
        },
        rumours: {
            artist: 'fleetwoodmac',
            played: true,
        },
        roomforsquares: {
            artist: 'johnmayer',
            played: true,
        },
        continuum: {
            artist: 'johnmayer',
            played: false,
        },
        motorbike: {
            artist: 'leonbridges',
            played: false,
        },
    }

    // Full library
    test('tells user library is empty', () => {
        expect(showCollection(emptyCollection)).toBe(
            console.log('Your collection is empty.')
        )
    })
    test('shows full library', () => {
        expect(showCollection(collection)).toBe(console.log(collection))
    })

    // Full library UNPLAYED
    test('tells user library is all played', () => {
        expect(showUnplayed(allPlayed)).toBe(
            console.log('You have listened to all of your albums.')
        )
    })
    test('shows unplayed library', () => {
        expect(showUnplayed(collection)).toStrictEqual(
            console.log({
                twelvefour: {
                    artist: 'thepaperkites',
                    played: false,
                },
                continuum: {
                    artist: 'johnmayer',
                    played: false,
                },
                motorbike: {
                    artist: 'leonbridges',
                    played: false,
                },
            })
        )
    })

    // Full Artistlibrary
    test('tells user artist library is empty', () => {
        expect(showCollectionByArtist(collection, 'Hanson')).toBe(
            console.log('You have no albums by this artist.')
        )
    })
    test('shows full artist library', () => {
        expect(showCollectionByArtist(collection, 'John Mayer')).toStrictEqual(
            console.log({
                roomforsquares: {
                    artist: 'johnmayer',
                    played: true,
                },
                continuum: {
                    artist: 'johnmayer',
                    played: false,
                },
            })
        )
    })

    // Artist library UNPLAYED
    test('tells user artist is all played', () => {
        expect(showUnplayedByArtist(collection, 'The Paper Kites')).toBe(
            console.log(
                'You have listened to all of your albums by this artist.'
            )
        )
    })
    test('shows unplayed library', () => {
        expect(showUnplayedByArtist(collection, 'John Mayer')).toStrictEqual(
            console.log({
                continuum: {
                    artist: 'johnmayer',
                    played: false,
                },
            })
        )
    })
})
