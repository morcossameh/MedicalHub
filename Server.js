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
    

  });

  socket.on('get posts', function (data) {

     c = [1,2,3,4,5,6,7,8,9,10]
     
     cont.get_posts_by_Categories(c).then((result) => {
      socket.emit('get posts',result);
     });

  });

  socket.on('posts',async function (data) {
   
    var response = await cont.get_user_categories(data);
    c = []
    for (let i = 0; i < response.length; i++) {
       c.push( response[i]['category_id']);
    }

     await cont.get_posts_by_Categories(c).then((result) => {
     socket.emit('posts',result);
     
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

 socket.on('add request', function (request) {
    
  cont.add_request(request).then((result) => {
    console.log(result);
    socket.emit('request result',result);
  });

});

socket.on('user request', function (user_id) {
    
  cont.get_user_request(user_id).then((result) => {
    console.log(result);
    if(result.length != 0){
      socket.emit('request',result[0].status);
    }else{
      socket.emit('request',null);
    }
    
  });

});

socket.on('get requests', function (post) {
    
  cont.get_requests().then((result) => {
    console.log(result)
    socket.emit('requests',result);
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

   
  socket.on('open profile',async function (user_id) {
    profile_atributes = {user: null,posts : null ,comments :null , num_of_upVotes:null , num_of_downVotes: null,}

    
     var test3 = await cont.get_user_info(user_id).then((result4) => {  
         
      profile_atributes.user = result4

     });
  
     var test = await  cont.get_posts_by_id(user_id).then((result) => {  
         
      profile_atributes.posts = result

     });

    var test2 = await cont.get_user_comments(user_id).then((result1) => {
      profile_atributes.comments = result1;
     });
     
     var test4 = await cont.get_doctor_votes(user_id).then((result3) => {
       console.log(result3);
       console.log("here");
       if(result3.length != 0){
         
        profile_atributes.num_of_upVotes = result3[0].upvotes;
        profile_atributes.num_of_downVotes = result3[0].downvotes;
       }
   
     });




     
     socket.emit('profile attributes',profile_atributes);
  
  });

  socket.on('search',async function (search) {
    search_results = null
    if(search.type == 1){

      var test = await  cont.search_entity(search.content).then((result) => {  
        search_results = result
       });

    }else{

      var test2 = await cont.search_user(search.content).then((result1) => {
        search_results = result1;
       });

    }
    search_results.sentence = search.content;

    socket.emit('search results',search_results);
  
  });

  socket.on('get request',async function (request_id) {
    console.log(request_id)
    results = null

      var test = await  cont.get_request_details(request_id).then((result) => {  
        results = result
       });
      
    console.log(results)
    console.log('test request ')
    socket.emit('request info',results);
  
  });
 
  socket.on('accept request',async function (request_id) {

    var results = null;
    var test = await  cont.change_status(request_id,2).then((result) => {  
      results = result
     console.log(results)
     console.log('results')
     socket.emit('request accepted',true);
});


  });

  socket.on('reject request',async function (request_id) {

    var results = null;
    var test = await  cont.change_status(request_id,3).then((result) => {  
      results = result
     console.log(results)
     console.log('results')
     socket.emit('request rejected',true);
});


  });
  
});
