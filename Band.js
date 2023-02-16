const { DataTypes } = require('sequelize');
const {Sequelize, sequelize} = require('./db');

// TODO - define the Band model
let Band = sequelize.define("Band", {
    name: DataTypes.STRING,
    genre: DataTypes.STRING
});

let band1 = Band.create({name: "The Band", genre: "Folk"})

module.exports = {
    Band
};