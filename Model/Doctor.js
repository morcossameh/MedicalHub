class Doctor{

    constructor(sequelize){
        this.sequelize = sequelize;
    }

    async updateRating(doctor_id,upVote){
        try{
            
            const { QueryTypes } = require('sequelize');
            if(upVote){
                let response = await this.sequelize.query("update Doctor set upvotes = upvotes+1 where id ="+doctor_id+"",{ type: QueryTypes.UPDATE});
       
            } else{
                let response = await this.sequelize.query("update Doctor set Downvotes = Downvotes+1 where id ="+doctor_id+"",{ type: QueryTypes.UPDATE});

            }
    
            return true;
        }catch(error){
            console.log('Invalid Inputs');
            return false;
        }
    }

}
module.exports = Doctor;
