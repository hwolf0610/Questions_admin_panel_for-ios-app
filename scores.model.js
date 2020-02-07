const mongoose = require('mongoose');
const Schema = mongoose.Schema;
let scores = new Schema({
    name: {
        type: String
    },
    category: {
        type: String
    },
    email: {
        type: String
    },
    scores: {
        type: String
    },
    cretedates: {
        type: String
    }
});
module.exports = mongoose.model('scores', scores);