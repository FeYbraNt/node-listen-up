const axios = require('axios')

// Helper function
async function getUser(username) {
    let user = {}
    await axios.all(
        [
            axios.get('http://localhost:8000/friends/' + username),
            axios.get('http://localhost:8001/plays/' + username)
        ]).then(axios.spread((res1, res2) => {
            user["username"] = username
            user["friends"] = res1.data["friends"].length
            user["plays"] = res2.data["plays"].length
            user["uri"] = "/users/" + username
        })).catch(error => { console.log(error) })
    return user
}

async function getAllUsers() {
    let users = []
    try{
        const { data } = await axios.get('http://localhost:8000/friends')
        const friends = data["friends"].map(user => getUser(user.username))
        users = await Promise.all(friends)
    } catch(error) { console.log(error) }
    return users
}

function getUserByName(name) {
    let result = {
        "username": name,
        "plays": 0,
        "friends": 0,
        "tracks": 0,
        "uri": "/users/" + name
    }
    return new Promise((resolve, reject) => {
        axios.all(
            [
                axios.get('http://localhost:8000/friends/' + name),
                axios.get('http://localhost:8001/plays/' + name)
            ])
            .then(axios.spread((res1, res2) => {
                result["friends"] = res1.data["friends"].length
                const plays = res2.data["plays"]
                result["plays"] = plays.length
                const tracks = [...new Set(plays)] // Distinct plays (= tracks)
                result["tracks"] = tracks.length
                resolve(result)
            })).catch(error => { 
                reject({ message: 'User not found', status: 202 })
                console.log(error) 
            })
    })
}

module.exports = {
    getAllUsers,
    getUserByName
}