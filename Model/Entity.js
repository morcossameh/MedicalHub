class Entity{

  constructor(sequelize){

    this.sequelize = sequelize;
      
  }  
  

async Likes(entity_id,user_id,upvote,history) {
     

  try{
    const { QueryTypes } = require('sequelize');
    var response = null;
    if (history){

      response = await this.sequelize.query("Delete from Likes where user_id ="+user_id+" and Entity_id ="+ entity_id,{ type: QueryTypes.DELETE});
    
    }
      response = await this.sequelize.query("Insert into Likes(user_id,Entity_id,up) values("+ user_id+","+entity_id+","+upvote+ ")",{ type: QueryTypes.INSERT});
      

    return true;
    }catch(error){
      //console.log(error)
      console.log('Likes Failed');
      return null;
    }
   
}
async unLike(entity_id,user_id) {
     
  try{
    const { QueryTypes } = require('sequelize');
    var response = null;

      response = await this.sequelize.query("Delete from Likes where user_id = "+user_id+" and Entity_id = "+ entity_id,{ type: QueryTypes.DELETE});
    
    return true;
    }catch(error){
      
      console.log('Likes Failed');
      return null;
    }
   


}
async checkIfUserLikedEntity(Entity_id,user_id){

  try{

    const { QueryTypes } = require('sequelize');
    var response = await this.sequelize.query("select * from Likes where Entity_id ="+ Entity_id+" and user_id ="+user_id,{type: QueryTypes.SELECT});
    //console.log(response)
    //console.log('test')
   
  return response;
 
   }catch(error){
     //console.log(error)
     Console.log('check if user like failed');
    return null;
   }
   

}
async getLikesNumber(Entity_id,up){
  try{
   const { QueryTypes } = require('sequelize');
   var response = await 
   this.sequelize.query("select count(*) from Likes where Entity_id ="+ Entity_id+" And up =" +up,{type: QueryTypes.SELECT});
   
   return response[0]['count(*)'];

  }catch(error){
       Console.log('Get Likes Number Failed');
       return null;
  }
}


async getLikes(Entity_id,up){
    try{
        const { QueryTypes } = require('sequelize');
        var response = await 
        this.sequelize.query("select * from Likes where Entity_id ="+ Entity_id+" And up =" +up,{type: QueryTypes.SELECT});
    return response;

    }catch(error){
        Console.log('Get Likes Failes');
        return null;
    }
}


async searchByContent(search_sentence) {
     

  try{
    const { QueryTypes } = require('sequelize');
    let response = null;
    let output = {posts : null , comments : null};
     response = await this.sequelize.query("select * from Entity where content like '%"+search_sentence+"%'",{ type: QueryTypes.SELECT});
     let posts = []
     let post = null;
     let comments = []
     for (let i=0;i< response.length;i++){
       post = await this.sequelize.query("select * from Post where id =" + response[i].id+"",{ type: QueryTypes.SELECT});
       
       if(post.length ==0){ 
        let comment = await this.sequelize.query("select * from Comment where id =" + response[i].id+"",{ type: QueryTypes.SELECT});
        response[i].post_id = comment[0].post_id ;
        comments.push(response[i]);

       }else{
        response[i].category_id = post[0].category_id ;
        posts.push(response[i])

       }

     } 
     /* console.log('posts')
     console.log(posts);
     console.log('comments')
     console.log(comments); */
     output.posts = posts;
     output.comments = comments; 
    return output;
    }catch(error){
      console.log(error)
      console.log('error in search sentence in entity');
      return null;
    }
   
}

 
}

module.exports = Entity;