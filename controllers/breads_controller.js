// DEPENDENCIES
const express = require('express')
const breads = express.Router()
const Bread = require('../models/bread')
const Baker = require('../models/baker')

// INDEX
breads.get('/', async (req, res) => {
  const foundBakers = await Baker.find().lean()
  const foundBreads = await Bread.find().limit(8).lean()
  res.render('index', {
    breads: foundBreads,
    bakers: foundBakers,
    title: 'Index Page'
  })
})

// NEW
breads.get('/new', async (req, res) => {
  const foundBakers = await Baker.find()
  res.render('new', {
    bakers: foundBakers
  })
})

 // EDIT
breads.get('/:id/edit', async (req, res) => {
  try {
    const foundBakers = await Baker.find()
    const foundBread = await Bread.findById(req.params.id)
    res.render('edit', {
      bread: foundBread,
      bakers: foundBakers
    })
  } catch(err) {
      res.send('404', err)
    }
})

// SHOW
breads.get('/:id', async (req, res) => {
  const foundBread = await Bread.findById(req.params.id).populate('baker')
  res.render('show', {
    bread: foundBread
  })
})

// CREATE
breads.post('/', async (req, res) => {
  try {
    if (!req.body.image) {
      req.body.image = undefined
    }
    if(req.body.hasGluten === 'on') {
      req.body.hasGluten = true
    } else {
      req.body.hasGluten = false
    }
    const addBread = await Bread.create(req.body)
    res.redirect('/breads')
  }  catch(err) {
    res.send('404', err)
  }
})

  // DELETE
  breads.delete('/:id', async (req, res) => {
    const deletedBread = await Bread.findByIdAndDelete(req.params.id)
    res.status(303).redirect('/breads')
  })

// UPDATE
breads.put('/:id', async (req, res) => {
    if(req.body.hasGluten === 'on'){
      req.body.hasGluten = true
    } else {
      req.body.hasGluten = false
    }
    const updateBread = await Bread.findByIdAndUpdate(req.params.id, req.body, { new: true })
    res.redirect(`/breads/${req.params.id}`)
  })

// Export
module.exports = breads