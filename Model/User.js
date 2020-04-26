class User{

    constructor(sequelize){
        this.sequelize = sequelize;
    }

    // for sign up returns true for success and false for failure
   /* async createUser(user){
        try{
       
          /* incryption of password 
          const bcrypt = require('bcrypt');
          const saltRounds = 10;
          const myPlaintextPassword = user.password;
          var incrypted_password = null;
            await bcrypt.hash(myPlaintextPassword, saltRounds).then(function(hash){
                incrypted_password = hash
                console.log(hash)
            });
            const { QueryTypes } = require('sequelize');
            console.log(incrypted_password)
            await this.sequelize.query("Insert into User(lastName, firstName, email, dateOfBirth, created_at, modified_at, password,role) values('"+ 
            user.Lastname+"','"+ user.Firstname +"','"+ user.email +"','"+ user.dateOfBirth +"', CURDATE(), CURDATE(),'"
            + incrypted_password +"',"+ user.role +")", { type: QueryTypes.INSERT});
            return true;
       
        }catch(error){
            console.log('Invalid Inputs');
            console.log(error)
            return null;
        }
    }
    */

    // for 
    async getUserbyID(id){
        try{
            const { QueryTypes } = require('sequelize');
            var user = null;
            user = await this.sequelize.query("Select * from User where id = " + id,{type: QueryTypes.SELECT});
            return user[0];
        }catch(error){
            console.log(error);
            console.log('User Not Found');
            return null;
        }
    }

    async createUser(user){
        try{
            console.log(user);
            console.log(user.id);
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
            console.log(error);
            console.log('Email or Password is wrong');
            return null;
        }
    }  
// for sign in returns user json object for success and null for failure
    /*async validUser(email,pass){
        try{
            const bcrypt = require('bcrypt');
            const { QueryTypes } = require('sequelize');
            var user = null;
            user = await this.sequelize.query("Select * from User where email = '" + email +"'",{type: QueryTypes.SELECT});
            if(user.length == 0){
                console.log('Email or Password is wrong');
                return null;
            }else{
                await bcrypt.compare(pass, user[0].password).then(function(result) {
                    console.log(result);
                    if(result == true){
                        console.log(user[0].id)
                        return true;
                    }else{
                        return null ; 
                    }
                });
            }
           
        }catch(error){
            console.log(error);
            console.log('Email or Password is wrong');
            return null;
        }
    }  
*/
}

module.exports = User;