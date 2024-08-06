const router = require('express').Router();

// Import our files containing our routes
const notesRouter = require('./notes');

router.use('/api', notesRouter);

module.exports = router;