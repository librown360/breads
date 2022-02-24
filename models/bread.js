// Dependency
const mongoose = require('mongoose')

// Bread schema
const breadSchema = new mongoose.Schema({
  name: String,
  hasGluten: { 
    type: Boolean, 
    required: true 
  },
  image: { 
    type: String, 
    default: 'http://placehold.it/500x500.png' 
  },
  baker: {
    type: String,
    enum: ['Rachel','Monica','Joey','Chandler','Ross','Phoebe']
  }
})

breadSchema.methods.getBakedBy = function() {
  return `${this.name} was baked with love by ${this.baker}`
}


// Export model
module.exports = mongoose.model('Bread', breadSchema)