const app = require('./app')
const friendsService = require('./services/friends')
const playsService = require('./services/plays')
const tracksService = require('./services/tracks')

const port = process.env.PORT || 8005

// Listen up main service
app.listen(port)

// Friends service
friendsService.listen(8000)

// Plays service
playsService.listen(8001)

// Tracks service
tracksService.listen(8002)