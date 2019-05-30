const playsData = require('./../data/plays.json')

function getAllPlays() {
    let result = {
        "users": [],
        "uri": "/plays",
    }
    for (user in playsData) {
        result["users"].push({
            "username": user,
            "uri": "/plays/" + user
        })
        result["uri"] = "/plays"
    }

    return new Promise((resolve, reject) => {
        if (result["users"].length == 0) {
            reject({ message: 'No plays available', status: 202 })
        }
        resolve(result)
    })
}

function getPlaysByUser(username) {
    const result = {
        "plays": [],
        "uri": "/plays"
    }
    if (playsData[username]) {
        result["plays"] = playsData[username],
        result["uri"] = "/plays/" + username
    }
    return new Promise((resolve, reject) => {
        if (result["plays"].length == 0) {
            reject({ message: "No plays found by that user", status: 202 })
        }
        resolve(result)
    })
}

module.exports = { getAllPlays, getPlaysByUser }