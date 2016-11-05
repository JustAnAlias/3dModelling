// todo: add resists?

var baseHealth = 100;
var baseDamage = 20;
var baseRange = 10;
function Player(id, startPosition, role){
  this.id = id;
  if (role){
    this.role = role;
  }
  this.position = startPosition;
  this.damage = baseDamage;
  this.health = role.healthModifier * baseHealth;

  this.getHealth = function(){
    return this.health;
  }

  this.attack = function(){
    return this.damage;
  }

  this.damage = function(amount){
    this.health -= amount;
  }
}

module.exports = Player;
