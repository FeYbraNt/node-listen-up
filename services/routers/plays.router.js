const express = require('express')
const router = express.Router()
const play = require('../models/plays.model')

// Handle incoming GET requests to /plays
router.get('/', async (req, res) => {
    await play.getAllPlays()
        .then(plays => res.json(plays))
        .catch(err => {
            if (err.status) res.status(err.status).json({ message: err.message })
            else res.status(500).json({ message: err.message })
        })
})

router.get('/:username', async (req, res) => {
    const username = req.params.username
    
    await play.getPlaysByUser(username)
        .then(play => res.json(play))
        .catch(err => {
            if (err.status) res.status(err.status).json({ message: err.message })
            else res.status(500).json({ message: err.message })
        })
})

module.exports = router