const express = require('express')
const router = express.Router()
const track = require('../models/tracks.model')

// Handle incoming GET requests to /plays
router.get('/', async (req, res) => {
    await track.getAllTracks()
        .then(tracks => res.json(tracks))
        .catch(err => {
            if (err.status) res.status(err.status).json({ message: err.message })
            else res.status(500).json({ message: err.message })
        })
})

router.get('/:id', async (req, res) => {
    const id = req.params.id
    
    await track.getTrackByID(id)
        .then(track => res.json(track))
        .catch(err => {
            if (err.status) res.status(err.status).json({ message: err.message })
            else res.status(500).json({ message: err.message })
        })
})

module.exports = router