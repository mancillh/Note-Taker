const router = require('express').Router();

// Import our file containing our routes
const notesRouter = require('./notes');

//uses router when url ends with /notes
router.use('/notes', notesRouter);

module.exports = router;