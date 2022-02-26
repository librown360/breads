// Dependency
const mongoose = require('mongoose')
const Bread = require('./bread')

// Baker schema
const bakerSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        enum: ['Rachel','Monica','Joey','Chandler','Ross','Phoebe']
    },
    startDate: {
        type: Date,
        required: true
    },
    bio: String
}, { toJSON: { virtuals: true} } )

// Virtual
bakerSchema.virtual('breads', {
    ref: 'Bread',
    localField: '_id',
    foreignField: 'baker'
})

// Export Baker schema
module.exports = mongoose.model('Baker', bakerSchema)