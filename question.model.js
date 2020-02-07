const mongoose = require('mongoose');
const Schema = mongoose.Schema;
let question = new Schema({
    categoryid: {
        type: String
    },
    desc: {
        type: String
    },
    answer1:{
        type:String
    },
    answer2:{
        type:String
    },
    answer3:{
        type:String
    },
    answer4:{
        type:String
    },
    grade:{
        type:String
    },
    correct:{
        type:String
    },
    createDate:{
        type:String
    }
});
module.exports = mongoose.model('question', question);