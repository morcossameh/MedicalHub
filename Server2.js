var app = require('http').createServer()
var io = require('socket.io')(app);
var fs = require('fs');
var User = require ('./Model/User.js');
var user = new User();
app.listen(3000);

var clients = 0;
io.on('connection', function (socket) {
  clients++;
   io.sockets.emit('broadcast',{ description: clients + ' clients connected!'});
   socket.on('disconnect', function () {
      clients--;
      io.sockets.emit('broadcast',{ description: clients + ' clients connected!'});
   });
   
   socket.on('sign in', function (data) {
    user.validUser(data.email,data.password).then((result) => {
        socket.emit('user id',result);
    });
  });
  
});