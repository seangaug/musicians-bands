const {sequelize} = require('./db');
const {Band, Musician, Song} = require('./index')

describe('Band and Musician Models', () => {
    /**
     * Runs the code prior to all tests
     */
    beforeAll(async () => {
        // the 'sync' method will create tables based on the model class
        // by setting 'force:true' the tables are recreated each time the 
        // test suite is run
        await sequelize.sync({ force: true });
    })

    test('can create a Band', async () => {
        // TODO - test creating a band
        const testBand = await Band.create({ name: 'The Beatles', genre: 'RocknRoll'});
        expect(testBand.name).toBe('The Beatles');
        expect(testBand.genre).toBe('RocknRoll');
    })

    test('can create a Musician', async () => {
        // TODO - test creating a musician
        const testMusician = await Musician.create({ name: 'Paul McCartney', instrument: 'piano'});
        expect(testMusician.name).toBe('Paul McCartney');
        expect(testMusician.instrument).toBe('piano');
    })
})

//Part 2 - Add a test to account for the association

describe('association tests', () => {
    beforeAll(async () => {
        await sequelize.sync({ force: true});
    })

    test('add multiple musicians to a band', async () => {
        
        // create a band:
        const newBand = await Band.create({ name: 'The Band' });
        
        // create musicians:
        const musician1 = await Musician.create({ name: "Levon Helm"})
        const musician2 = await Musician.create({ name: "Robbie Robertson"})

        // adds both musicians to newBand
        await newBand.addMusicians([musician1, musician2]);

        // fetch musicians associated with newBand: 
        const musicians = await newBand.getMusicians();

        // Test expected result:
        expect(musicians.length).toBe(2);
        expect(musicians[0].name).toBe("Levon Helm");
        expect(musicians[1].name).toBe("Robbie Robertson");
    })

    // Part 3 - Add another test to account for the association between Band and Song

    test('should create a band and add multiple songs to it, and multiple bands can have the same song', async () => {
        
        // create bands and songs
        const band1 = await Band.create({ name: 'The Beatles', genre: 'Rock' });
        const band2 = await Band.create({ name: 'Led Zeppelin', genre: 'Rock' });
        const song1 = await Song.create({ title: 'Let It Be', year: 1970 });
        const song2 = await Song.create({ title: 'Stairway to Heaven', year: 1971 });
        const song3 = await Song.create({ title: 'Bohemian Rhapsody', year: 1975 });
    
        await band1.addSongs([song1, song3]);
        await band2.addSongs([song2, song3]);
    
        const songs1 = await band1.getSongs();
        expect(songs1).toHaveLength(2);
        expect(songs1.map(s => s.title)).toContain('Let It Be');
        expect(songs1.map(s => s.title)).toContain('Bohemian Rhapsody');
    
        const songs2 = await band2.getSongs();
        expect(songs2).toHaveLength(2);
        expect(songs2.map(s => s.title)).toContain('Stairway to Heaven');
        expect(songs2.map(s => s.title)).toContain('Bohemian Rhapsody');
    
        const bands3 = await song3.getBands();
        expect(bands3).toHaveLength(2);
        expect(bands3.map(b => b.name)).toContain('The Beatles');
        expect(bands3.map(b => b.name)).toContain('Led Zeppelin');
      });
})