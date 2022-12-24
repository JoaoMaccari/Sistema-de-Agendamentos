const mongoose = require("mongoose");
const { finished } = require("stream");


//criação do schema que representara os campos da model
const appointment = new mongoose.Schema({
    name: String,
    email:String,
    description:String,
    CPF: String,
    date : Date,
    time: String,
    finished: Boolean
});

module.exports = appointment