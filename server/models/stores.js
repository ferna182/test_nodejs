const mongoose = require('mongoose')

const storeSchema = mongoose.Schema({
    name:{
        type:String,
        require:true,
        trim:true
    },
    adress:{
        type:String,
        require:true,
        trim:true
    },
    phone:Number
})

const Store = mongoose.model('Store', storeSchema)

module.exports = {
    Store
}