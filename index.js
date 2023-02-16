const {Band} = require('./Band')
const {Musician} = require('./Musician')
const {Song} = require('./Song')

// One to Many relationship between Musician and Band
Musician.belongsTo(Band);
Band.hasMany(Musician);

// Many to Many relationship between Band & Song
Song.belongsToMany(Band, {through: "song_band"});
Band.belongsToMany(Song, {through: "song_band"});

module.exports = {
    Band,
    Musician,
    Song,
};
