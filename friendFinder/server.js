const express = require('express');
const app = express();
const port = 4000;
const bodyParser = require('body-parser');
const validator = require('validator');
const uuidv4 = require('uuid/v4');


app.use(express.static(__dirname + '/files'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.set('view engine', 'pug');
app.set('views', './public');



let database = require("./data/friends");
require("./routing/apiRoutes")(app,database,validator);
require("./routing/htmlRoutes")(app,database,validator);

app.listen(port, function() {
    console.log('Example app listening on port ' + port);
});