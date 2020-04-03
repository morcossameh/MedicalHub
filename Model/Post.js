
var Entity = require ('./Entity.js');
class Post extends Entity{

    
    constructor(){
        super();
    }  

   async createPost(post){
    try{
        var id = null;
        id =  this.createEntity(post).then(result => {
            console.log('here '+result[0].id);
             //this.helper(post,result)
             id = result;
           
             
        });
        console.log('here2 '+ id[0].id);
        return id[0].id;
        //console.log('here2 '+ id[0].id);
    }catch(error){
        console.log(error);
        return -1;
    }
    
   }

   async helper(post,id){
    try{
        const { QueryTypes } = require('sequelize');
        await this.sequelize.query("Insert into Post(id,category_id) values("+id +" , "+post.category_id +")", { type: QueryTypes.INSERT });
        return true;
    }catch(error){
        console.log(error);
        
        return false;

    }
   
   }

}
module.exports = Post;
