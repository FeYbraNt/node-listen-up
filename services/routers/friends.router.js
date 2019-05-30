const express = require('express')
const router = express.Router()
const friend = require('../models/friends.model')

// Handle incoming GET requests to /friends
router.get('/', async (req, res) => {
    await friend.getAllFriends()
        .then(friends => res.json(friends))
        .catch(err => {
            if (err.status) res.status(err.status).json({ message: err.message })
            else res.status(500).json({ message: err.message })
        })
})

router.get('/:username', async (req, res) => {
    const username = req.params.username
    
    await friend.getFriendsByUser(username)
        .then(friend => res.json(friend))
        .catch(err => {
            if (err.status) res.status(err.status).json({ message: err.message })
            else res.status(500).json({ message: err.message })
        })
})

module.exports = router