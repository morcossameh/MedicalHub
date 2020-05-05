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

    async searchByUserName(user_name) {
     

        try{
          const { QueryTypes } = require('sequelize');
          user_name = user_name + " "
          let splitter =  user_name.split(" ");
          let firstName = splitter[0];
          let lastName = " ";
          if(splitter.length > 1){

          lastName = splitter[1];

          }
          let response = null;
          let output = {Doctors : null , users : null};
           response = await this.sequelize.query("select * from User where LOWER(firstName) like LOWER('%"+firstName+"%') and LOWER(lastName) like ('%"+lastName+"%')",{ type: QueryTypes.SELECT});
           let Doctors = []
           let Doctor = null;
           let users = []
           for (let i=0;i< response.length;i++){
               if (response[i].role == 2){
               Doctor = await this.sequelize.query("select * from Doctor where doctor_id =" + response[i].id+"",{ type: QueryTypes.SELECT});
               response[i].rating= Doctor[0].rating;
               response.doctor_id = Doctor[0].doctor_id;
               Doctors.push(response[i])
               } else if (response[i].role = 1) {
                users.push(response[i]);
               }
            }
                  /* console.log('posts')
           console.log(posts);
           console.log('comments')
           console.log(comments); */
           output.Doctors = Doctors;
           output.users = users; 
          return output;
          }catch(error){
            console.log(error)
            console.log('error in search sentence in users');
            return null;
          }
         
      }
      

      /* password encryption  trial */


      async createUserWithIncryptedPassword(user){
        try{
            console.log(user);
            console.log(user.id);
       
          /* incryption of password */
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
    async validUserWithIncryptedPassword(email,pass){
        try{
            const bcrypt = require('bcrypt');
            const { QueryTypes } = require('sequelize');
            var user = null;
            user = await this.sequelize.query("Select * from User where email = '" + email +"'",{type: QueryTypes.SELECT});
            if(user.length == 0){
                console.log('Email or Password is wrong');
                return null;
            }else{
                return await bcrypt.compare(pass, user[0].password).then(function(result) {
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

}

module.exports = User;