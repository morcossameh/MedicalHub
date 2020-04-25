class Entity{

  constructor(){
    const Sequelize = require('sequelize');
    this.sequelize = new Sequelize('MedicalHub', 'root', 'root', {
        host: 'localhost',
        dialect: 'mysql'
    }); 

    this.sequelize
      .authenticate()
      .then(() => {
        console.log('Connection has been established successfully.');
      })
      .catch(onfierr => {
        console.error('Unable to connect to the database:', err);
      });
  }  
  
  async getLikesNumber(Entity){
       try{
        const { QueryTypes } = require('sequelize');
        var response = await 
        this.sequelize.query("select count(*) from Likes where Entity_id ="+ Entity.id +" And up = true");
        return response[0][0]['count(*)'];

       }catch(error){
            Console.log(error);
            return -1;
       }
  }
  // 

  async getDisLikesNumber(Entity){
    try{
     const { QueryTypes } = require('sequelize');
     var response = await 
     this.sequelize.query("select count(*) from Likes where Entity_id ="+ Entity.id +" And up = false");
     return response[0][0]['count(*)'];

    }catch(error){
         Console.log(error);
         return -1;
    }
}

async Likes(entity_id,user_id,upvote,history) {
     

  try{

    if (history){

    const { QueryTypes } = require('sequelize');
    var response = await this.sequelize.query("Delete from Likes where user_id ="+user_id,{ type: QueryTypes.DELETE});
    
    }
    const { QueryTypes } = require('sequelize');
    var response = await this.sequelize.query("Insert into Likes(user_id,Entity_id,up) values("+ user_id+","+entity_id+","+upvote+ ")",{ type: QueryTypes.INSERT});
    
    return response;
    }catch(error){
      console.log(error)
      console.log('Invalid Inputs');
      return -1;
    }
   


}
 
}

module.exports = Entity;