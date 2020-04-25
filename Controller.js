var Category = require ('./Model/Category.js');
var Post = require ('./Model/Post.js');
var User = require ('./Model/User.js');
var Patient = require ('./Model/Patient.js');
var Entity = require ('./Model/Entity.js');
var Comment = require ('./Model/Comment.js');

//var Request = require ('./Model/Request.js');

const user     = new User();
const category = new Category();
//const patient  = new Patient();
const entity   = new Entity();
//const request  = new Request();
const post     = new Post();
const comment = new Comment();

class Controller{
     
    constructor(){}
 

      // connection with class user 
      async Sign_up(object){
          let v ;
          v= await user.createUser(object)
         
      //  return user.createUser(object).then(token => { return token } )
      
       return  v ; 
      }    

      Sign_in(object){
         
        let user_id = user.validUser(object.email,object.password);

      return user_id;
       
      }    

      get_user_info(user_id){

        let info = user.getUserbyID(user_id);

        return info;
      }
       
      get_posts_by_Categories(Categories){
        let categories_list = post.getPostByCategories(Categories);
         
        return categories_list;
      }

      get_comments_for_post(post){
        let comments_list = comment.getCommentbyPost(post);
         
        return comments_list;

      }

      like_Entity(entity_id,user_id,upvote,history){
        let response = entity.Likes(entity_id,user_id,upvote,history);

        return response
      }


      async get_Entity_number_of_likes(Entity,up){
        let likes = entity.getLikesNumber(Entity,up);
        return likes;
      }

      get_Entity_likes(Entity,up){
        let likes = entity.getLikes(Entity,up);
        return likes;

      }

      get_posts_by_id(user_id){
        let v ;
        v= post.getPostByUserId(user_id)     
        return  v ;
      }
      create_comment(object){
        let v ;
        v= comment.createComment(object) 
        return  v ; 
      }

      create_post(object){
        let v ;
        v=  post.createPost(object)     
        return  v ; 
        
      }
      delete_post(){
        let v ;
        v = post.deletePost(object)    
        return  v ;
      }

      delete_comment(){
        let v ;
        v=  comment.deletecomment(object)    
        return  v ;
      }


}
module.exports = Controller;
