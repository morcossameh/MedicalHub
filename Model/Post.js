
var Entity = require ('./Entity.js');
class Post extends Entity{

    
    constructor(){
        super();
        const database = require ('./Database.js');
        const database_obj = new database();
        this.sequelize = database_obj.sequelize;
    }  

   async (){
    const { QueryTypes } = require('sequelize');
    const users = await this.sequelize.query("SELECT * FROM `Category`", { type: QueryTypes.SELECT });
    console.log(users[0].name)
   }

}
module.exports = Post;
