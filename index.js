
var express = require('express');
var server = express();
var bodyParser = require('body-parser');
var lowdb = require('lowdb');
var uuid = require('uuid');

//import my model
var Game = require('./models/game.js');
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
  var game = db.get('games')
              .find({id: request.params.id})
              .value();
  response.send(game);
});

server.post('/games', function (request, response){
  var game = new Game(request.body.name, request.body.genre, request.body.ageRating, request.body.players, request.body.systems, request.body.isitGarbage);
  var result = db.get('games')
                .push(game)
                .last()
                .value();
  response.send(result);
});

server.put('/games/:id', function (request,response){
  var game = new Game(request.body.name, request.body.genre, request.body.ageRating, request.body.players, request.body.systems, request.body.isitGarbage, request.params.id);
  game.updateComplete(request.body.isCurrent, request.body.isCooperative);
  var updatedGame = db.get('games')
                    .find({id: request.params.id})
                    .assign(game)
                    .value();
  response.send(updatedGame);

});

server.delete('/games/:id', function (request, response){
  var game = db.get('games')
              .remove({id: request.params.id})
              .value();
    response.send(game);
});


server.listen(port);
