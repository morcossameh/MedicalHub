/*const express = require("express");
const app = express();
const port = 300;
const http = require("http").createServer();
const io = require("socket.io")(http);
//Listen for a client connection 
io.on("connection", (socket) => {
    //Socket is a Link to the Client 
    socket.emit("welcome","hello")
    console.log("New Client is Connected!");
    //Here the client is connected and we can exchanged 
});

//Listen the HTTP Server 
http.listen(port, () => {
    console.log("Server Is Running Port: " + port);
});  */

var controller = require ('./Controller.js');
const cont     = new controller();
var app = require('http').createServer()
var io = require('socket.io')(app);
var fs = require('fs');

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
    console.log(data.Lastname);



    var test = cont.Sign_in(data).then((result) => {

        socket.emit('user id',result);
    });



  });



  socket.on('sign up', function (data) {
    console.log(data.Lastname);


    var test = cont.Sign_up(data).then((result) => {
        console.log(result);
        socket.emit('validation',result);
    });



  });
  
});
