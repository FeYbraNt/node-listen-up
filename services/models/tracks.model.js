const tracksData = require('./../data/tracks.json')

function getAllTracks() {
    let result = { "tracks": Object.values(tracksData), "uri": "/tracks" }

    return new Promise((resolve, reject) => {
        if (result["tracks"].length == 0) {
            reject({ message: 'No tracks available', status: 202 })
        }
        resolve(result)
    })
}

function getTrackByID(id) {
    const result = tracksData[id]
    return new Promise((resolve, reject) => {
        if (result) { resolve(result) } 
        reject({ message: "No tracks found with that ID", status: 202 })
    })
}

module.exports = { getAllTracks, getTrackByID }