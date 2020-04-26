class Entity{

  constructor(sequelize){

    this.sequelize = sequelize;
      
  }  
  

async Likes(entity_id,user_id,upvote,history) {
     

  try{
    const { QueryTypes } = require('sequelize');
    var response = null;
    if (history){

      response = await this.sequelize.query("Delete from Likes where user_id ="+user_id,{ type: QueryTypes.DELETE});
    
    }
      response = await this.sequelize.query("Insert into Likes(user_id,Entity_id,up) values("+ user_id+","+entity_id+","+upvote+ ")",{ type: QueryTypes.INSERT});
    
    return response;
    }catch(error){
      
      console.log('Likes Failed');
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
 
}

module.exports = Entity;