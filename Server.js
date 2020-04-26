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
   socket.on('sign in',async function (data) {
    console.log(data.Lastname);

    var user_id = null;

     var test = await cont.Sign_in(data).then((result) => {
        user_id = result;
        socket.emit('user id',result);
     });
     
     /*
     var response = await cont.get_user_categories(user_id);
     c = []
     for (let i = 0; i < response.length; i++) {
        c.push( response[i]['category_id']);
     }

      await cont.get_posts_by_Categories(c).then((result) => {
      socket.emit('get posts',result);
      
     });

    */
  });

  socket.on('get posts', function (data) {
    console.log(data.Lastname);

     c = [1,2]
     
     cont.get_posts_by_Categories(c).then((result) => {
      socket.emit('get posts',result);
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
     //socket.emit('comment id',result);
   });
   
     entity_id = post.post_id;
   post_atributes = {content : null ,comments :null , num_of_upVotes:null , num_of_downVotes: null, upVotes : null,downVotes : null }
  
   var test = await  cont.get_comments_for_post(entity_id).then((result) => {     
      post_atributes.comments = result

   });
   var test2 = await  cont.get_Entity_number_of_likes(entity_id,true).then((result1) => {
     post_atributes.upVotes = result1;
    });
    
    var test3 = await cont.get_Entity_number_of_likes(entity_id,false).then((result2) => {
     post_atributes.downVotes = result2;
    }); 

    var test4 = await cont.get_Entity_likes(entity_id,true).then((result3) => {
     post_atributes.upVotes = result3;
    });
    
    var test5 = await cont.get_Entity_likes(entity_id,false).then((result4) => {
     post_atributes.downVotes = result4;
    }); 

    var test6 = await cont.get_post_content_by_id(entity_id).then((result5) => {
     post_atributes.content = result5;
       
    }); 
    socket.emit('post attributes',post_atributes);
 


});
  socket.on('open post',async function (entity_id) {
    console.log(entity_id);

    post_atributes = {content : null ,comments :null , num_of_upVotes:null , num_of_downVotes: null, upVotes : null,downVotes : null }
  
    var test = await  cont.get_comments_for_post(entity_id).then((result) => {     
       post_atributes.comments = result

    });
    var test2 = await  cont.get_Entity_number_of_likes(entity_id,true).then((result1) => {
      post_atributes.upVotes = result1;
     });
     
     var test3 = await cont.get_Entity_number_of_likes(entity_id,false).then((result2) => {
      post_atributes.downVotes = result2;
     }); 

     var test4 = await cont.get_Entity_likes(entity_id,true).then((result3) => {
      post_atributes.upVotes = result3;
     });
     
     var test5 = await cont.get_Entity_likes(entity_id,false).then((result4) => {
      post_atributes.downVotes = result4;
     }); 

     var test6 = await cont.get_post_content_by_id(entity_id).then((result5) => {
      post_atributes.content = result5;
        
     }); 
     socket.emit('post attributes',post_atributes);
  
  });

  socket.on('sign up', function (data) {
    console.log(data.Lastname);


    var test = cont.Sign_up(data).then((result) => {
        console.log(result);
        socket.emit('validation',result);
    });



  });
  
});
