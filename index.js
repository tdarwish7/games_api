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

server.get('/games/:id', function (request, response){
  var games = db.get('games')
              .find({id: request.params.id})
              .value();
  response.send(game);
});

server.post('/games', function (request, response){

});

server.put('/games/:id', function (request,response){

});

server.delete('/games/:id', function (request, response){
  var game = db.get('games')
              .remove({id: request.params.id})
              .value();
    response.send(game);
});


server.listen(port);
