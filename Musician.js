const { DataTypes } = require('sequelize');
const {Sequelize, sequelize} = require('./db');

// TODO - define the Musician model
let Musician = sequelize.define("Musician", {
    name: DataTypes.STRING,
    instrument: DataTypes.STRING
});
let musician1 = Musician.create({name: "Steve", instrument: "Harmonica"})

module.exports = {
    Musician
};