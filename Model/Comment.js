var Entity = require ('./Entity.js');
class Comment extends Entity{

    
    constructor(){
        super();
    }  

    async getCommentbyPost(post){
        try{
            const { QueryTypes } = require('sequelize');
            var response = await this.sequelize.query("Select * from Comment as c inner join Entity as e on e.id = c.id where c.post_id="+ post.id,{ type: QueryTypes.SELECT});

            return response;

        }catch(error){

            Console.log(error);
            return -1;

        }
    }

    async createComment(commment){
        try{
            const { QueryTypes } = require('sequelize');
            await this.sequelize.query("Insert into Entity(user_id,content,created_at, modified_at) values("+commment.user_id+",'"+commment.content +"', CURDATE(), CURDATE())",{ type: QueryTypes.INSERT});
            var response = await this.sequelize.query("SELECT id FROM Entity where user_id = "+ commment.user_id +" ORDER BY id DESC LIMIT 1",{type: QueryTypes.SELECT});
            var output   = await this.sequelize.query("Insert into Comment(id,post_id) values("+response[0].id +" , "+commment.post_id+")", { type: QueryTypes.INSERT });
            return response[0].id;
        }catch(error){
            console.log(error)
            console.log('Invalid Inputs');
            return -1;
        }
        
       }

       async deletecomment(entity) {
        try{
          await this.sequelize.query("Delete from Comment where id = "+ entity.id);
          const { QueryTypes } = require('sequelize');
          var response = await this.sequelize.query("Delete FROM Entity where id = "+ entity.id,{type: QueryTypes.Delete});
          return response;
    
        }catch(error){
           console.log(error)
           return "failed";
        }
    
    }   
  

}
module.exports = Comment;