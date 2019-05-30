const friendsData = require('./../data/friends.json')

function getAllFriends() {
    let result = {
        "friends": [],
        "uri": "/friends",
    }
    for (friend in friendsData) {
        result["friends"].push({
            "username": friend,
            "uri": "/friends/" + friend
        })
        result["uri"] = "/friends"
    }

    return new Promise((resolve, reject) => {
        if (result["friends"].length == 0) {
            reject({ message: 'No friends available', status: 202 })
        }
        resolve(result)
    })
}

function getFriendsByUser(username) {
    const result = {
        "friends": [],
        "uri": "/friends"
    }
    if (friendsData[username]) {
        result["friends"] = friendsData[username],
        result["uri"] = "/friends/" + username
    }
    return new Promise((resolve, reject) => {
        if (result["friends"].length == 0) {
            reject({ message: "No friends found by that user", status: 202 })
        }
        resolve(result)
    })
}

module.exports = { getAllFriends, getFriendsByUser }