const router = require('express').Router()
const db = require('../db/db.json')
const fs = require('fs')
router.get('/notes', (req, res) => {
// const readFromFile = util.promisify(fs.readFile)
// readFromFile(db).then((data)=> {
//     res.json(data)
// })
res.json(db)
})

//Route for posting to notes page
router.post('/notes', (req, res) => {
    

    



});



module.exports = router