
var User = require ('./User.js');

class Patient extends User{

    constructor(sequelize){
        super(sequelize);
    }  
    
    // request to be a doctor
    async addRequest(id,image_url){
        try{
            const { QueryTypes } = require('sequelize');
            var request = null;
            request = await this.sequelize.query("Insert into Request(user_id,status,image_url,created_at) values("+id+", 0 ,'"+image_url+ "',CURDATE())",{type: QueryTypes.INSERT});
            return true;
        }catch(error){
            console.log(error)
            console.log('Request already exists')
            return false;
        }
    }

}

module.exports = Patient;