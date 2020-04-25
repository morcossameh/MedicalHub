
var Entity = require ('./Entity.js');
class Post extends Entity{

    
    constructor(){
        super();
    }  

   async createPost(post){
    try{
        const { QueryTypes } = require('sequelize');
        await this.sequelize.query("Insert into Entity(user_id,content,created_at, modified_at) values("+post.user_id+",'"+post.content +"', CURDATE(), CURDATE())",{ type: QueryTypes.INSERT});
        var response = await this.sequelize.query("SELECT id FROM Entity where user_id = "+ post.user_id +" ORDER BY id DESC LIMIT 1",{type: QueryTypes.SELECT});
        await this.sequelize.query("Insert into Post(id,category_id) values("+response[0].id +" , "+post.category_id +")", { type: QueryTypes.INSERT });
        return response[0].id;
    }catch(error){
        console.log(error)
        console.log('Invalid Inputs');
        return -1;
    }
   }


async getPostByCategories(categories){
    var output = [];
    
 for (let i = 0; i < categories.length; i++) {
     // Runs 5 times, with values of step 0 through 4.
  
     try{
     
     const { QueryTypes } = require('sequelize');
         let post = null;
         post = await this.sequelize.query("Select * from Post as p inner join Entity as e on p.id = e.id where  p.category_id = " + categories[i],{type: QueryTypes.SELECT});
         //console.log(post)
          output.push(post)
    }catch(error){
        console.log(error);
        return -1;
    }
}
return output;
}

async deletePost(entity) {
    try{
      await this.sequelize.query("Delete from Post where id = "+ entity.id);
      const { QueryTypes } = require('sequelize');
      var response = await this.sequelize.query("Delete FROM Entity where id = "+ entity.id,{type: QueryTypes.Delete});
      return response;

    }catch(error){
       console.log(error)
       return "failed";
    }

}
/*
    async getPostsByCategory(category){
    var obj = [];

    try{
        const { QueryTypes } = require('sequelize');
        
        //var post = await this.sequelize.query("Select * from Post as p inner join Entity as e on p.id = e.id where  e.category_id = " + category_id,{type: QueryTypes.SELECT});
        //return user;

     //  categories.forEach(category => { 
       //    async() =>{
            var post = await this.sequelize.query("Select * from Post as p inner join Entity as e on p.id = e.id where  p.category_id = " + category,{type: QueryTypes.SELECT});
           // obj.append[post];
         //  }

         //   var response = await this.sequelize.query("SELECT id FROM Post,Entity where id = id and Category_id = "+ categories[0],{type: QueryTypes.SELECT});
            //var ent = [];
         //   response.forEach(element => { 
              //  var resp = await this.sequelize.query("SELECT * FROM Entity where id = "+  categories[0],{type: QueryTypes.SELECT});
               // ent.append(resp);
         //   }); 
            //obj.append(ent);
          //}); 
     return post;
    }catch(error){
       console.log(error)
       return null;
   }

}
*/
async getPostByUserId(user_id){
    try{
        
        const { QueryTypes } = require('sequelize');
            var user = null;
            user = await this.sequelize.query("Select * from Post as p inner join Entity as e on p.id = e.id where  e.user_id = " + user_id,{type: QueryTypes.SELECT});
            return user;


    }catch(error){
        console.log(error);
        return -1;
    }
}

}
module.exports = Post;
