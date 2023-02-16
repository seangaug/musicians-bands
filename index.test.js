const {sequelize} = require('./db');
const {Band, Musician} = require('./index')

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
})