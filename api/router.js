const express = require('express')
const router = express.Router()
const user = require('./user')

// Handle incoming GET requests to /friends
router.get('/', async (req, res) => {

    await user.getAllUsers()
        .then(users => res.json({ users: users, uri: "/users" }))
        .catch(err => {
            if (err.status) res.status(err.status).json({ message: err.message })
            else res.status(500).json({ message: err.message })
        })
})

router.get('/:username', async (req, res) => {
    const username = req.params.username
    
    await user.getUserByName(username)
        .then(user => res.json(user))
        .catch(err => {
            if (err.status) res.status(err.status).json({ message: err.message })
            else res.status(500).json({ message: err.message })
        })
})

module.exports = router