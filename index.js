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
  var game = db.get('games')
              .find({id: request.params.id})
              .value();
  response.send(game);
});

server.post('/games', function (request, response){
  var game ={
    id: uuid.v4(),
    name: request.body.name,
    genre: request.body.genre,
    ageRating: request.body.ageRating,
    players: request.body.players,
    isCurrent: !!request.body.isCurrent,
    isCooperative: !!request.body.isCooperative
  };

  var result = db.get('games')
                .push(game)
                .last()
                .value();
  response.send(result);
});

server.put('/games/:id', function (request,response){
  var updatedGameInfo = {
    genre: request.body.name,
    ageRating: request.body.ageRating,
    players: request.body.players,
    system: request.body.system,
    isCurrent: request.body.isCurrent,
    isCooperative: request.body.isCooperative
  };

  var updatedGame = db.get('games')
                    .find({id: request.params.id})
                    .assign(updatedGameInfo)
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
