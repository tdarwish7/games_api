var uuid = require('uuid');
//Constructor function
//How do I build this object?

function Game(name, genre, ageRating, players, systems, isitGarbage, id){
  this.id = id || uuid.v4();
  this.name = name;
  this.genre = genre;
  this.ageRating = ageRating;
  this.players = +players;
  this.systems = systems;
  this.isitGarbage = isitGarbage;
  this.isCurrent = false;
  this.isCooperative = false;
};

Game.prototype.updateComplete = function(value){
  if(value.toLowerCase() === 'true'){
    this.isCurrent = true;
    this.isCooperative = true;
  } else {
    this.isCurrent = false;
    this.isCooperative = false;
  }
};


module.exports = Game;
