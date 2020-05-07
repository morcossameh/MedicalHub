const User = require ('./User.js');
const Comment = require ('./Comment.js');
const Post = require ('./Post.js');
const Entity = require ('./Entity.js');
const Request = require ('./Request.js');
const Doctor   = require('./Doctor.js')


var user = null;
var comment = null;
var post = null;
var entity = null;
var request = null;
var doctor = null ;


class Test{

    constructor(sequelize){
        user = new User(sequelize);
        comment = new Comment(sequelize);
        entity = new Entity(sequelize);
        post = new Post(sequelize);
        request = new Request(sequelize);
        doctor = new Doctor(sequelize)
        this.sequelize = sequelize;
    }


    /* Test User Class */

    /*  Enter wrong username or password when logging in. */
   async TestWrongEmailOrPass(){
       const user_obj = {id :4, Lastname : "Ibrahim", Firstname : "Eshraq", email : "eshraq.ibrahim@gmail.com", password : "eshu123" 
      , dateOfBirth : '1997/11/27', createdAt: '2020-04-02 10:35:00', modifiedAt : '2020-04-02 10:35:00', role : 1};
  
       var response = await user.validUser(user_obj.email,user_obj.password);
       if(response == null){
           console.log("\x1b[32m%s\x1b[0m","TestWrongEmailOrPass Passed");
       }else{
           console.log("\x1b[31m%s\x1b[0m","TestWrongEmailOrPass Failed");
       }

    }

    async TestGetCategoriesByID(){
      const user_obj = {id :4, Lastname : "Ibrahim", Firstname : "Eshraq", email : "eshraq.ibrahim@gmail.com", password : "eshu123" 
     , dateOfBirth : '1997/11/27', createdAt: '2020-04-02 10:35:00', modifiedAt : '2020-04-02 10:35:00', role : 1};
 
      var response = await user.getUserbyCategories(user_obj.id);
      //console.log(response[0]['category_id']);
      if(response != null){
          console.log("\x1b[32m%s\x1b[0m","TestWrongEmailOrPass Passed");
      }else{
          console.log("\x1b[31m%s\x1b[0m","TestWrongEmailOrPass Failed");
      }

   }
      
    /* test passowrd incryption*/ 
  
    /* 1 => test create user */
    async TestCreateUser(){
        const user_obj = {id :4, Lastname : "Ibrahim", Firstname : "ahmed", email : "ahmedH@gmail.com", password : "eshu12" 
        , dateOfBirth : '1997/11/27', createdAt: '2020-04-02 10:35:00', modifiedAt : '2020-04-02 10:35:00', role : 1};
        var response = await user.createUserWithIncryptedPassword(user_obj);
        console.log(response)
        if(response != null){
            console.log("\x1b[32m%s\x1b[0m","TestCreateUser Passed");
        }else{
            console.log("\x1b[31m%s\x1b[0m","TestCreateUser Failed");
        }
 
     }

    /* 2 => Enter right username and password when logging in. */
    async TestRightEmailOrPass(){
        const user_obj = {id :4, Lastname : "Ibrahim", Firstname : "Eshraq", email : "ahmedH@gmail.com", password : "eshu13" 
        , dateOfBirth : '1997/11/27', createdAt: '2020-04-02 10:35:00', modifiedAt : '2020-04-02 10:35:00', role : 1};
        const response = await user.validUserWithIncryptedPassword(user_obj.email,user_obj.password).then(async function(result){
        if(result != null){
          console.log(result)

            console.log("\x1b[32m%s\x1b[0m","TestRightEmailOrPass Passed");
        }else{
            console.log("\x1b[31m%s\x1b[0m","TestRightEmailOrPass Failed");
        }
     
        });
     }
    /* Test Comment Class */
    async TestGetCommentbyValidPost(){
        var post_id = 4;
        var response = await comment.getCommentbyPost(post_id);
        if(response.length == 1){
            console.log("\x1b[32m%s\x1b[0m","TestGetCommentbyValidPost Passed");
        }else{
            console.log("\x1b[31m%s\x1b[0m","TestGetCommentbyValidPost Failed");
        }
    }

    async TestGetCommentbyInvalidPost(){
        var post_id = 70;
        var response = await comment.getCommentbyPost(post_id);
        if(response.length == 0){
            console.log("\x1b[32m%s\x1b[0m","TestGetCommentbyInvalidPost Passed");
        }else{
            console.log("\x1b[31m%s\x1b[0m","TestGetCommentbyInvalidPost Failed");
        }
    }
    /*  */
    async TestCommentOnDeletedPost(){
        var invalid_post = {user_id : 21 , post_id : 21 ,content :'Test 2'};
        var v = await comment.createComment(invalid_post); 
        if(v == null){
          console.log("\x1b[32m%s\x1b[0m","TestCommentOnDeletedPost Passed");
        }else {
          console.log("\x1b[31m%s\x1b[0m","TestCommentOnDeletedPost Failed")
        }
    }

    async TestCommentOnPost(){
        var invalid_post = {user_id : 21 , post_id : 2 ,content :'Test Comment'};
        var v = await comment.createComment(invalid_post); 
        if(v != null){
          console.log("\x1b[32m%s\x1b[0m","TestCommentOnPost Passed");
        }else {
          console.log("\x1b[31m%s\x1b[0m","TestCommentOnPost Failed")
        }
    }

    async TestDeleteDeletedcomment(){
       var v = await comment.deletecomment(50); 
       if(v == null){
         console.log("\x1b[32m%s\x1b[0m","TestDeleteDeletedcomment Passed");
       }else {
         console.log("\x1b[31m%s\x1b[0m","TestDeleteDeletedcomment Failed")
       }
    }

    /* Test Class Post */

     async TestGetPostByValidCategories(){
        var categories = [1,2]
        var v = await post.getPostByCategories(categories); 
        if(v != null){
          console.log("\x1b[32m%s\x1b[0m","TestGetPostByValidCategories Passed");
        }else {
          console.log("\x1b[31m%s\x1b[0m","TestGetPostByValidCategories Failed")
        }
     }

     async TestDeleteDeletedPost(){
        var post_id = 370;
        var v = await post.deletePost(post_id); 
        if(v != null){
          console.log("\x1b[32m%s\x1b[0m","TestDeleteDeletedPost Passed");
        }else {
          console.log("\x1b[31m%s\x1b[0m","TestDeleteDeletedPost Failed")
        }
     }

     async TestGetDeletedPost(){
        var post_id = 370;
        var v = await post.getPostContentById(post_id);
        if(v.length == 0 || v == null){
          console.log("\x1b[32m%s\x1b[0m","TestGetDeletedPost Passed");
        }else {
          console.log("\x1b[31m%s\x1b[0m","TestGetDeletedPost Failed")
        }
     }

     async TestGetPostByID(){
        var post_id = 2;
        var v = await post.getPostContentById(post_id);
        if(v.length != 0 && v != null){
          console.log("\x1b[32m%s\x1b[0m","TestGetPostByID Passed");
        }else {
          console.log("\x1b[31m%s\x1b[0m","TestGetPostByID Failed")
        }
     }

     async TestGetLikesForInvalidEntity(){
        var entity_id = 370;
        var v = await entity.getLikes(entity_id,true);
        if(v.length == 0 || v == null){
          console.log("\x1b[32m%s\x1b[0m","TestGetLikesForInvalidEntity Passed");
        }else {
          console.log("\x1b[31m%s\x1b[0m","TestGetLikesForInvalidEntity Failed")
        }
     }
     async TestGetLikesForValidEntity(){
        var entity_id = 370;
        var v = await entity.getLikes(entity_id,true);
        if(v != null){
          console.log("\x1b[32m%s\x1b[0m","TestGetLikesForValidEntity Passed");
        }else {
          console.log("\x1b[31m%s\x1b[0m","TestGetLikesForValidEntity Failed")
        }
     }

     async TestGetLikesNumberForInvalidEntity(){
        var entity_id = 370;
        var v = await entity.getLikes(entity_id,true);
        if(v.length == 0 || v == null){
          console.log("\x1b[32m%s\x1b[0m","TestGetLikesNumberForInvalidEntity Passed");
        }else {
          console.log("\x1b[31m%s\x1b[0m","TestGetLikesNumberForInvalidEntity Failed")
        }
     }
     async TestGetLikesNumberForValidEntity(){
        var entity_id = 62;
        var v = await entity.getLikes(entity_id,true);
        if(v != null){
          console.log("\x1b[32m%s\x1b[0m","TestGetLikesNumberForValidEntity Passed");
        }else {
          console.log("\x1b[31m%s\x1b[0m","TestGetLikesNumberForValidEntity Failed")
        }
     }

     async addRequest(){
      const q = {user_id : 8,link:'http://link.com' , status : 1};
      var v = await request.addRequest(q);
      if(v != null){
        console.log("\x1b[32m%s\x1b[0m","addRequest Passed");
      }else {
        console.log("\x1b[31m%s\x1b[0m","addRequest Failed");
      }
   }
   async addDuplicateRequest(){
    const q = {user_id : 6,link:'http://link.com' , status : 1};
    var v = await request.addRequest(q);
    if(v == null){
       console.log("\x1b[32m%s\x1b[0m","addDuplicateRequest Passed");
    }else {
       console.log("\x1b[31m%s\x1b[0m","addDuplicateRequest Failed");
    }
 }
   async deleteRequest(){
    const q = {user_id : 8,link:'http://link.com' , status : 1};
    var v = await request.deleteRequest(q.user_id);
    if(v == null){
       console.log("\x1b[32m%s\x1b[0m","deleteRequest Passed");
    }else {
       console.log("\x1b[31m%s\x1b[0m","deleteRequest Failed");
    }
   }

   async deleteDeletedRequest(){
    const q = {user_id : 8,link:'http://link.com' , status : 1};
    var v = await request.deleteRequest(q.user_id);
    if(v == null){
       console.log("\x1b[32m%s\x1b[0m","deleteDeletedRequest Passed");
    }else {
       console.log("\x1b[31m%s\x1b[0m","deleteDeletedRequest Failed");
    }
   }

   async testChangeStatus(){
    var v = await request.changeStatus(10,2);
    if(v != null){
       console.log("\x1b[32m%s\x1b[0m","testChangeStatus Passed");
    }else {
       console.log("\x1b[31m%s\x1b[0m","testChangeStatus Failed");
    }
   }

   async testgetRequestDetails(){
    var v = await request.getRequestDetails(10);
    console.log(v);
    if(v != null){
       console.log("\x1b[32m%s\x1b[0m","testgetRequestDetails Passed");
    }else {
       console.log("\x1b[31m%s\x1b[0m","testgetRequestDetails Failed");
    }
   }
   async testgetRequestDetailsByUser(){
    var v = await request.getRequestUser(7);
    console.log(v);
    if(v != null){
       console.log("\x1b[32m%s\x1b[0m","testgetRequestDetails Passed");
    }else {
       console.log("\x1b[31m%s\x1b[0m","testgetRequestDetails Failed");
    }

   }
   async testGetRequests(){
    var v = await request.getRequests();
    console.log(v);
    if(v != null){
       console.log("\x1b[32m%s\x1b[0m","testgetRequestDetails Passed");
    }else {
       console.log("\x1b[31m%s\x1b[0m","testgetRequestDetails Failed");
    }
   }
   async testGetUserComments(){
    var v = await comment.getUserComments(22);
    console.log(v);
    if(v != null){
       console.log("\x1b[32m%s\x1b[0m","testGetUserComments Passed");
    }else {
       console.log("\x1b[31m%s\x1b[0m","testGetUserComments Failed");
    }
   }

     /* Test search */

     async TestSearchWithEntityContent(){ 
      var response = await entity.searchByContent("ahmed");
      //console.log(response)
      if(response != null){
          console.log("\x1b[32m%s\x1b[0m","TestSearchWithEntityContent Passed");
      }else{
          console.log("\x1b[31m%s\x1b[0m","TestSearchWithEntityContent Failed");
      }

     }

   async TestSearchWithUserName(){
    var response = await user.searchByUserName("morcos");
    //console.log(response)
    if(response != null){
        console.log("\x1b[32m%s\x1b[0m","TestSearchWithUserName Passed");
    }else{
        console.log("\x1b[31m%s\x1b[0m","TestSearchWithUserName Failed");
    }

 }
  /* test doctor rating */
  async TestDOctorRating(){
    var response = await doctor.updateRating(1,false);
    //console.log(response)
    if(response != null){
        console.log("\x1b[32m%s\x1b[0m","TestDOctorRating Passed");
    }else{
        console.log("\x1b[31m%s\x1b[0m","TestDOctorRating Failed");
    }

 }

  /* test like a doctor post */
  async TestLikeDoctorPost(){
    var response = await entity.Likes(6,28,true,true);
    //console.log(response)
    if(response != null){
        console.log("\x1b[32m%s\x1b[0m","TestDOctorRating Passed");
    }else{
        console.log("\x1b[31m%s\x1b[0m","TestDOctorRating Failed");
    }

 }
 /* test undo like to a doctor post  */ 
 async TestUnLikeDoctorPost(){
  var response = await entity.unLike(1,28);
  //console.log(response)
  if(response != null){
      console.log("\x1b[32m%s\x1b[0m","TestDOctorRating Passed");
  }else{
      console.log("\x1b[31m%s\x1b[0m","TestDOctorRating Failed");
  }

}
}
module.exports = Test;