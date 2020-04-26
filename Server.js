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

const Sequelize = require('sequelize');

this.sequelize = new Sequelize('MedicalHub', 'root', 'root', {
    host: 'localhost',
    dialect: 'mysql',
    logging: false,
}); 


this.sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(onfierr => {
    console.error('Unable to connect to the database:', err);
  });

var Controller = require ('./Controller.js');
const cont     = new Controller(this.sequelize);
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

     c = [1,2]

     cont.get_posts_by_Categories(c).then((result) => {
      socket.emit('posts',result);
     });


  });

  socket.on('get posts', function (data) {
    console.log(data.Lastname);

     c = [1,2]
     
     cont.get_posts_by_Categories(c).then((result) => {
      socket.emit('get posts',result);
     });


  });

  socket.on('get comment attributes', function (data) {
     
     cont.get_comment_attributes(data).then((result) => {
      socket.emit('comment attributes',result);
     });


  });

  socket.on('add post', function (post) {
    
    cont.create_post(post).then((result) => {
      socket.emit('post id',result);
    });

 });
 socket.on('delete post', function (post) {
    
    cont.delete_post(post).then((result) => {
      socket.emit('verify delete',result);
    });


 });

 socket.on('get categories', function (data) {

   var test = cont.get_Categories().then((result) => {
       console.log(result);
       socket.emit('categories',result);
   });



 });

 socket.on('add comment', async function (post) {
    
   var test0 = await cont.create_comment(post).then((result) => {

      socket.emit('comment id',result);
   });
  

});

  socket.on('open post',async function (object) {
    var entity_id = object.entity_id;
    var user_id   = object.user_id;
    console.log(entity_id)
    console.log(user_id)
    post_atributes = {content : null ,comments :null , num_of_upVotes:null , num_of_downVotes: null, upVote : null }
  
    var test = await  cont.get_comments_for_post(entity_id).then((result) => {  
         
       post_atributes.comments = result

    });
    var test2 = await cont.check_If_User_Liked_Entity(entity_id,user_id).then((result1) => {
      console.log(result1)
      post_atributes.upVote = result1;
     });
     
     var test4 = await cont.get_Entity_likes(entity_id,true).then((result3) => {
      post_atributes.num_of_upVotes = result3;
     });
     
     var test5 = await cont.get_Entity_likes(entity_id,false).then((result4) => {
      post_atributes.num_of_downVotes = result4;
     }); 

     var test6 = await cont.get_post_content_by_id(entity_id).then((result5) => {
      post_atributes.content = result5;
        
     }); 
     //console.log(post_atributes)
     socket.emit('post attributes',post_atributes);
  
  });

  socket.on('sign up', function (data) {
    console.log(data.Lastname);


    var test = cont.Sign_up(data).then((result) => {
        console.log(result);
        socket.emit('validation',result);
    });



  });


  socket.on('like or dislike', function (data) {
    console.log('data')
    console.log(data)
    var entity_id = data.entity_id
    var user_id   = data.user_id
    var upVote    = data.upVote
    var history   = data.history
    console.log(data)
    var test = cont.like_Entity(entity_id,user_id,upVote,history).then((result) => {
        console.log(result);
        socket.emit('validate like',result);
    });



  });

  socket.on('unlike', function (data) {
    entity_id = data.entity_id
    user_id   = data.user_id
    

    var test = cont.unlike_Entity(entity_id,user_id).then((result) => {
        console.log(result);
        console.log('test')
        socket.emit('validate like',result);
    });



  });


  
});
