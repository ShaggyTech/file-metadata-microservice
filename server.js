'require strict'

const express = require('express'),
    cors = require('cors'),
    path = require('path'),
    multer = require('multer'),
    storage = multer.memoryStorage(),
    upload = multer({ storage: storage }),
    Helpers = require('./modules/helpers'),
    app = express()

// Static Home page
app.use('/', express.static(path.join(__dirname, 'public')))

app.post('/filesize', upload.single('file'), Helpers.asyncErrorCatcher(async (req, res, next) => {
    req.file ? res.json({"size": req.file.size}) : res.redirect('/')
}))

app.get('/*', Helpers.asyncErrorCatcher(async (req, res, next) => {
    res.redirect('/')    
}))

// Do something with the caught errors from Helpers.asyncErrorCatcher()
app.use((err, req, res, next) => {
    console.error(`Application Error: ${err.stack}`)
    res.json({ Error: 'An Application Error has occured, please see the server logs for details' })
})

const server = app.listen(process.env.PORT || 3000, () => {
    console.log('Your app is listening on port ' + server.address().port);
})