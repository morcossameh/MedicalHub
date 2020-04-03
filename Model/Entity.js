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
  
  // 
  async createEntity(entity) {
    try{
        const { QueryTypes } = require('sequelize');
        await this.sequelize.query("Insert into Entity(user_id,content,created_at, modified_at) values("+entity.user_id+",'"+entity.content +"', CURDATE(), CURDATE())",{ type: QueryTypes.INSERT});
        var response = await this.sequelize.query("SELECT id FROM Entity where user_id = "+ entity.user_id +" ORDER BY id DESC LIMIT 1",{type: QueryTypes.SELECT});
        return response;
    }catch(error){
        console.log(error)
       console.log('Invalid Inputs');
        return null;
    }
 
  }
}

module.exports = Entity;