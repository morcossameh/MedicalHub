var Category = require ('./Model/Category.js');
var Post = require ('./Model/Post.js');
var User = require ('./Model/User.js');
var Patient = require ('./Model/Patient.js');
var Entity = require ('./Model/Entity.js');
var Comment = require ('./Model/Comment.js');
var Doctor = require('./Model/Doctor.js');

var user = null;
var category = null;
var entity = null;
var post = null;
var comment = null;
var doctor = null;

class Controller{
     
    constructor(sequelize){
      this.sequelize = sequelize;
      user     = new User(sequelize);
      category = new Category(sequelize);
      entity   = new Entity(sequelize);
      post     = new Post(sequelize);
      comment = new Comment(sequelize);
      doctor = new Doctor(sequelize);
    }
 

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
      get_comment_attributes(comment_id){
      
       let comment = comment.getCommentInDetails(comment_id);
       return comment; 
      }   

      get_user_info(user_id){

        let info = user.getUserbyID(user_id);

        return info;
      }


      get_user_categories(user_id){

        let info = user.getUserbyCategories(user_id);

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

      async unlike_Entity(entity_id,user_id){
        let response = await entity.unLike(entity_id,user_id);
        console.log(response)
        return response
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
      delete_post(object){
        console.log(object)
        let v ;
        v = post.deletePost(object)    
        return  v ;
      }

      delete_comment(object){
        let v ;
        v=  comment.deletecomment(object)    
        return  v ;
      }

      get_post_content_by_id(post_id){
        let content = post.getPostContentById(post_id);
        return content;
      }

      async check_If_User_Liked_Entity(Entity_id,user_id){

        let response = await entity.checkIfUserLikedEntity(Entity_id,user_id).then(function(result){
        //console.log(user_id);
        //console.log(Entity_id);
        //console.log(result[0].up)
        //console.log(result)
        
        return result ;
      });
      }

      get_comments_for_post(post_id){
        let comments_list = comment.getCommentbyPost(post_id);
         
        return comments_list;

      }
      async get_Entity_number_of_likes(Entity_id,up){
        let likes = entity.getLikesNumber(Entity_id,up);
        return likes;
      }

      get_Entity_likes(Entity_id,up){
        let likes = entity.getLikes(Entity_id,up);
        return likes;

      }

      get_posts_by_id(user_id){
        let v ;
        v= post.getPostByUserId(user_id)     
        return  v ;
      }

      async get_Categories(){
        let Categories = category.get_Categories();
        return Categories;
      }

      get_user_comments(user_id){
        let v;
        v = comment.getUserComments(user_id)
        return v;
      }

      get_doctor_votes(doctor_id){
        let v;
        v = doctor.getVotesForDoctor(doctor_id);
        return v;
      }

      search_entity(search_sentence){
        let v;
        v = entity.searchByContent(search_sentence);
        return v;

      }

      search_user(search_sentence){
        let v;
        v = user.searchByUserName(search_sentence);
        return v;
      }

}
module.exports = Controller;
