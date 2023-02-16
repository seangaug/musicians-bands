const { DataTypes } = require('sequelize');
const {Sequelize, sequelize} = require('./db');

// TODO - define the Band model
let Song = sequelize.define("Song", {
    title: DataTypes.STRING,
    year: DataTypes.NUMBER
});

module.exports = {
    Song
};