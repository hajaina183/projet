
function requireHTTPS(req, res, next) {
    // The 'x-forwarded-proto' check is for Heroku
    if (!req.secure && req.get('x-forwarded-proto') !== 'https') {
        return res.redirect('https://' + req.get('host') + req.url);
    }
    next();
}
const express = require('express');
const app = express();
app.use(requireHTTPS);
app.use(express.static('./dist/snapface'));
app.get('/*', function(req, res) {
    res.sendFile('index.html', {root: 'dist/snapface/'}
  );
});
const NODE_PORT = process.env.PORT||5000;
app.listen(NODE_PORT , function() {
    console.log("node app is running at localhost : "+NODE_PORT);
});