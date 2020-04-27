const User = require ('./User.js');
const Comment = require ('./Comment.js');
const Post = require ('./Post.js');
const Entity = require ('./Entity.js');

var user = null;
var comment = null;
var post = null;
var entity = null;

class Test{

    constructor(sequelize){
        user = new User(sequelize);
        comment = new Comment(sequelize);
        entity = new Entity(sequelize);
        post = new Post(sequelize);
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

    async TestCreateUser(){
        const user_obj = {id :4, Lastname : "Ibrahim", Firstname : "ahmed", email : "ahmedH@gmail.com", password : "eshu12" 
        , dateOfBirth : '1997/11/27', createdAt: '2020-04-02 10:35:00', modifiedAt : '2020-04-02 10:35:00', role : 1};
        var response = await user.createUser(user_obj);
        console.log(response)
        if(response != null){
            console.log("\x1b[32m%s\x1b[0m","TestCreateUser Passed");
        }else{
            console.log("\x1b[31m%s\x1b[0m","TestCreateUser Failed");
        }
 
     }

    /* Enter right username and password when logging in. */
    async TestRightEmailOrPass(){
        const user_obj = {id :4, Lastname : "Ibrahim", Firstname : "Eshraq", email : "ahmedH@gmail.com", password : "eshu12" 
        , dateOfBirth : '1997/11/27', createdAt: '2020-04-02 10:35:00', modifiedAt : '2020-04-02 10:35:00', role : 1};
        const response = await user.validUser(user_obj.email,user_obj.password).then(async function(result){
        setTimeout(() => {  console.log("World!"); 

        if(result != null){
          console.log(result)

            console.log("\x1b[32m%s\x1b[0m","TestRightEmailOrPass Passed");
        }else{
            console.log("\x1b[31m%s\x1b[0m","TestRightEmailOrPass Failed");
        }
      }, 2000);
        });
     }
    /* Test Comment Class */
    async TestGetCommentbyValidPost(){
        var post_id = 20;
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
        var invalid_post = {user_id : 21 , post_id : 2 ,content :'eshraq m7dsh m2dr mghodha'};
        var v = await comment.createComment(invalid_post); 
        if(v == null){
          console.log("\x1b[32m%s\x1b[0m","TestCommentOnDeletedPost Passed");
        }else {
          console.log("\x1b[31m%s\x1b[0m","TestCommentOnDeletedPost Failed")
        }
    }

    async TestCommentOnPost(){
        var invalid_post = {user_id : 21 , post_id : 21 ,content :'eshraq m7dsh m2dr mghodha'};
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
        var post_id = 62;
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

}
module.exports = Test;