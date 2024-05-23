const mongoose = require('mongoose')
const userschema = new mongoose.Schema({
    FirstName:String,
    LastName : String,
    Email : String,
    Password : String
})
module.exports = userschema;