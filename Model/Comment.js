var Entity = require ('./Entity.js');
class Comment extends Entity{

    
    constructor(sequelize){
        super(sequelize);
    }  

    async getCommentbyPost(post_id){
        try{
            const { QueryTypes } = require('sequelize');
            var response = await this.sequelize.query("Select c.id  ,content,firstName,lastName,role ,u.id as userid from Comment  c inner join Post  p on p.id = c.post_id inner join Entity  e on e.id = c.id  inner join User u on u.id = e.user_id where p.id="+ post_id,{ type: QueryTypes.SELECT});
            var comments = []
            console.log('llop');
            console.log(response.length);

            for (let i=0;i<response.length;i++){
                console.log(response[i]);
            var response2 = await this.sequelize.query("Select L.user_id , c.id , L.up from Comment as c  inner join Likes as L on L.Entity_id = c.id where c.id = "+ response[i].id,{ type: QueryTypes.SELECT});
            //comments.push(response2);
           
             response[i].comment_likes = response2;
        }
        
            return response;

        }catch(error){

            console.log('Get Comment By id Failed');
            console.log(error)
            return null;

        }
    }

    async getCommentInDetails(comment_id){
        try{
            const { QueryTypes } = require('sequelize');
            var response = await this.sequelize.query("Select c.id ,content,firstName,lastName,role ,u.id from Comment as c inner join Entity as e on e.id = c.id  inner join User as u on u.id = e.user_id where c.id="+ comment_id,{ type: QueryTypes.SELECT});
            comments = []
            console.log('llop');
            console.log(response.length);

            for (let i=0;i<response.length;i++){
                console.log(response[i]);
            var response2 = await this.sequelize.query("Select L.user_id , c.id from Comment as c  inner join Likes as L on L.id = c.id where c.id = "+ response[i].id,{ type: QueryTypes.SELECT});
            comments.append(response2);
        
        }
        console.log(comments);
            return response;

        }catch(error){

            Console.log('Get Comment By id Failed');
            return null;

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
            //console.log(error)
            console.log('Create Comment Failed');
            return null;
        }
        
       }

       async deletecomment(entity_id) {
        try{
          await this.sequelize.query("Delete from Comment where id = "+ entity_id);
          const { QueryTypes } = require('sequelize');
          var response = await this.sequelize.query("Delete FROM Entity where id = "+ entity_id,{type: QueryTypes.DELETE});
          return response;
    
        }catch(error){
           console.log('Delete Comment Failed')
           return null;
        }
    
    }   
  
}

module.exports = Comment;