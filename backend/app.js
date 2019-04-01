const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();
const port = process.env.PORT || 8000;

app.use('/', express.static(path.join(__dirname, '../../')));;
app.use(bodyParser.json({limit: '5mb'}));
app.use(bodyParser.urlencoded({limit: '5mb', extended: true}));

const server = app.listen(port, function(){
    console.log('\'Aasya Foundation\' dev web-server listening at http://%s:%s', server.address().address, server.address().port);
});
