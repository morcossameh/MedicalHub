class User{

    constructor(sequelize){
        this.sequelize = sequelize;
    }

    // for sign up returns true for success and false for failure
    async createUser(user){
        try{
            //console.log(user);
            //console.log(user.id);
            const { QueryTypes } = require('sequelize');
            await this.sequelize.query("Insert into User(lastName, firstName, email, dateOfBirth, created_at, modified_at, password,role) values('"+ 
            user.Lastname+"','"+ user.Firstname +"','"+ user.email +"','"+ user.dateOfBirth +"', CURDATE(), CURDATE(),'"
            + user.password +"',"+ user.role +")", { type: QueryTypes.INSERT});
            return true;
        }catch(error){
            console.log('Invalid Inputs');
            return false;
        }
    }


    // for 
    async getUserbyID(id){
        try{
            const { QueryTypes } = require('sequelize');
            var user = null;
            user = await this.sequelize.query("Select * from User where id = " + id,{type: QueryTypes.SELECT});
            return user[0];
        }catch(error){
            //console.log(error);
            console.log('User Not Found');
            return null;
        }
    }

    async getUserbyCategories(id){
        try{
            const { QueryTypes } = require('sequelize');
            var user = null;
            user = await this.sequelize.query("Select category_id from user_interests where user_id = " + id,{type: QueryTypes.SELECT});
            return user;
        }catch(error){
           // console.log(error);
            console.log('User Not Found');
            return null;
        }
    }

// for sign in returns user json object for success and null for failure
    async validUser(email,pass){
        try{
            const { QueryTypes } = require('sequelize');
            var user = null;
            user = await this.sequelize.query("Select * from User where email = '" + email +"' and password = '"+ pass +"'",{type: QueryTypes.SELECT});
            if(user.length == 0){
                console.log('Email or Password is wrong');
                return null;
            }else{
                return user[0];
            }
           
        }catch(error){
            //console.log(error);
            console.log('Email or Password is wrong');
            return null;
        }
    }  

}

module.exports = User;