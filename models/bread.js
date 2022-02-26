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
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Baker'
  },
})

breadSchema.methods.getBakedBy = function() {
  return `${this.name} was baked with love by ${this.baker.name}, who has been with us since ${this.baker.startDate.getFullYear()}`
}


// Export model
module.exports = mongoose.model('Bread', breadSchema)