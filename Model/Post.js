
var Entity = require ('./Entity.js');
class Post extends Entity{

    
    constructor(sequelize){
        super(sequelize);
    }  

   async createPost(post){
    try{
        const { QueryTypes } = require('sequelize');
        await this.sequelize.query("Insert into Entity(user_id,content,created_at, modified_at) values("+post.user_id+",'"+post.content +"', CURDATE(), CURDATE())",{ type: QueryTypes.INSERT});
        var response = await this.sequelize.query("SELECT id FROM Entity where user_id = "+ post.user_id +" ORDER BY id DESC LIMIT 1",{type: QueryTypes.SELECT});
        await this.sequelize.query("Insert into Post(id,category_id) values("+response[0].id +" , "+post.category_id +")", { type: QueryTypes.INSERT });
        return response[0].id;
    }catch(error){
        console.log('Create Post Failed')
        return null;
    }
   }


async getPostByCategories(categories){
    var output = [];
    
    for (let i = 0; i < categories.length; i++) {
    
        try{
            const { QueryTypes } = require('sequelize');
            let post = null;
            post = await this.sequelize.query("Select e.id,e.content,e.user_id,u.lastName,u.firstName,u.role,e.created_at,e.modified_at from (Post as p inner join Entity as e on p.id = e.id ) inner join User as u on e.user_id = u.id  where  p.category_id = " + categories[i],{type: QueryTypes.SELECT});
            output.push(post)
        }catch(error){
            console.log('Get Post By Category Failed');
            return null;
        }
    }
    return output;
}

async deletePost(entity_id) {
    try{
      await this.sequelize.query("Delete from Post where id = "+ entity_id);
      const { QueryTypes } = require('sequelize');
      var response = await this.sequelize.query("Delete FROM Entity where id = "+ entity_id,{type: QueryTypes.DELETE});
      return true;

    }catch(error){
       console.log('Delete Post Failed')
       return false;
    }

}

async getPostByUserId(user_id){
    try{
        
        const { QueryTypes } = require('sequelize');
            var user = null;
            user = await this.sequelize.query("Select * from Post as p inner join Entity as e on p.id = e.id where  e.user_id = " + user_id,{type: QueryTypes.SELECT});
            return user;


    }catch(error){
        console.log(error);
        return null;
    }
}

async getPostContentById(post_id){
    try{
        
        const { QueryTypes } = require('sequelize');
            var content = null;
            content = await this.sequelize.query("Select e.content,e.user_id,u.lastName,u.firstName,u.role,e.created_at,e.modified_at from Entity as e inner join User as u on e.user_id = u.id where e.id = " + post_id,{type: QueryTypes.SELECT});
            return content;


    }catch(error){
        console.log(error);
        return null;
    }
}

}
module.exports = Post;
