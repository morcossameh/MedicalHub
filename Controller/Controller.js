var Category = require ('/home/ahmed/Desktop/MedicalHub/Model/Category.js');
var Post = require ('/home/ahmed/Desktop/MedicalHub/Model/Post.js');
var User = require ('/home/ahmed/Desktop/MedicalHub/Model/User.js');
var Patient = require ('/home/ahmed/Desktop/MedicalHub/Model/Patient.js');
var Entity = require ('/home/ahmed/Desktop/MedicalHub/Model/Entity.js');
//var Request = require ('/home/ahmed/Desktop/MedicalHub/Model/Request.js');

const user     = new User();
//const category = new Category();
//const patient  = new Patient();
//const entity   = new Entity();
//const request  = new Request();
//const post     = new Post();

class Controller{
     
    constructor(){}
 

      // connection with class user 
      async Sign_up(object){
          let v ;
          v= await user.createUser(object)
         
      //  return user.createUser(object).then(token => { return token } )
      
       return  v ; 
      }    

      Sign_in(object){
         
        let user_id = user.validUser(object.email,object.password);

      return user_id;
       
      }    

      get_user_info(user_id){

        let info = user.getUserbyID(user_id);

        return info
      }

}
module.exports = Controller;