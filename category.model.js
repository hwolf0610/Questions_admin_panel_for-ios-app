const mongoose = require('mongoose');
const Schema = mongoose.Schema;
let category = new Schema({
    name: {
        type: String
    },
    flag: {
        type: String
    }
});
module.exports = mongoose.model('category', category);