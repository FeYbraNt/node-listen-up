# Listen up!

Listen up builds a new node web service that combines information from existing separate web APIs into a single resource:

- Friends API (runs on port 8000)
- Plays API (runs on port 8001)
- Tracks API (runs on port 8002)

The web service is based on a theoretical internet radio project called “ListenUp”.

## Requirements
- node >= 11.12.0
- npm >= 6.9.0

## How to install

`npm install`

## How to run

`npm run start`

## Code structure

```
api
  router.js     // Router for Listen up service
  user.js       // User Model
..
services        // Folder with Friends, Plays & Tracks services
..
app.js          // Listen up app service
index.js
```