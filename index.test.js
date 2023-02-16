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