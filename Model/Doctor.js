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

    async getVotesForDoctor(doctor_id){
        try{
            
            const { QueryTypes } = require('sequelize');
                let response = await this.sequelize.query("Select * From Doctor where doctor_id ="+doctor_id,{ type: QueryTypes.SELECT});
    
            return response;
        }catch(error){
            console.log(error);
            return null;
        }
    }

}
module.exports = Doctor;
