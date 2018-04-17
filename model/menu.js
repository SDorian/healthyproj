'use strict';
//import dependency
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

//create new instance of the mongoose.schema. the schema takes an object that shows
//the shape of your database entries.
var MenuSchema = new Schema({
    jour: String,
    midi: {type: Schema.Types.ObjectId, ref: 'Plats'},
    soir: {type: Schema.Types.ObjectId, ref: 'Plats'}

});

//export our module to use in server.js
module.exports = mongoose.model('Menu', MenuSchema);