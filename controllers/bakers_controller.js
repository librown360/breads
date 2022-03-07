// Dependencies
const express = require('express')
const baker = express.Router()
const Baker = require('../models/baker')
const bakerSeedData = require('../models/baker_seed')

// baker.get('/data/seed', (req, res) => {
//     Baker.insertMany(bakerSeedData)
//     .then(res.redirect('/breads'))
// })

baker.get('/:id', async (req, res) => {
    const foundBaker = await Baker.findById(req.params.id).populate({
        path: 'breads',
        options: { limit: 2 }
    })
    res.render('bakerShow', {
        baker: foundBaker
    })
})

// Delete
baker.delete('/:id', async (req, res) => {
    const deletedBaker = await Baker.findByIdAndDelete(req.params.id)
    res.status(303).redirect('/breads')
})

module.exports = baker