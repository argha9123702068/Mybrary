const mongoose = require('mongoose')

const authoreSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        
    }
})

module.exports=mongoose.model('Author',authoreSchema)