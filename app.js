var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

var Player = require(__dirname + '/server/player.js');
var Roles = require(__dirname + '/server/roles.js');
var game = require(__dirname + '/server/game.js');

var players = {};

app.get('/', function(req, res){
  //console.log(req);
  res.sendFile(__dirname + '/public/index.html');
});

app.get('/css', function(req, res){
  res.sendFile(__dirname + '/public/css/main.css');
});

app.get('/engine', function(req, res){
  //console.log(req);
  res.sendFile(__dirname + '/public/js/lib/babylon.2.4.max.js');
});

app.get('/client', function(req, res){
  //console.log(req);
  res.sendFile(__dirname + '/public/js/clientSide.js');
});

app.get('/map', function(req, res){
  console.log(req);
  res.sendFile(__dirname + '/public/textures/map1.png');
});

/*
app.get('/socket', function(req, res){
  //console.log(req);
  res.sendFile(__dirname + '/node_modules/socket.io/node_modules/socket.io-client/socket.io.js');



});
*/


io.on('connection', function(socket){
    console.log('a user connected');

    var id = socket.id;
    //world.addPlayer(id);

    var player = new Player(id, {x:5,y:1,z:0}, Roles.archer);
    //socket.emit('createPlayer', player);
    game.addPlayer(player);
    socket.emit('existingPlayers', game.getOtherPlayers());

    socket.broadcast.emit('addOtherPlayer', player);

    socket.on('requestOldPlayers', function(){
        for (var i = 0; i < game.players.length; i++){
            if (game.players[i].playerId != id)
                socket.emit('addOtherPlayer', world.players[i]);
        }
    });
    socket.on('updatePosition', function(data){
        var newData = game.updatePlayerData(socket.id, data);
        console.log('a player moved \n' + JSON.stringify(newData));
        socket.broadcast.emit('updatePosition', newData);
    });
    socket.on('disconnect', function(){
        console.log('user disconnected');
        io.emit('removeOtherPlayer', player);
        game.removePlayer( player.id );
    });

});

var port = 1338;
var ip_address = '127.0.0.1';

http.listen(port, ip_address, function(){
    console.log( "Listening on " + ip_address + ", server_port " + port );
});

function createWorld(){

}
