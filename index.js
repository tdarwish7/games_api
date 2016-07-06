var express = require('express');
var server = express();
var bodyParser = require('body-parser');
var lowdb = require('lowdb');
var uuid = require('uuid');

var port = process.env.PORT || 8080;
var db = lowdb('db.json');

// Database Initialization
  db.defaults({games: []})
    .value(); //runs the previous set of commands

server.use(bodyParser.json());
server.use(bodyParser.urlencoded({extended: true}));

server.get('/games', function (request, response){
  var games = db.get('games')
                .value();
  response.send(games);
});

server.listen(port);
