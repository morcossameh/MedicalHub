class Request{

    constructor(sequelize){
  
      this.sequelize = sequelize;
        
    }  

    async addRequest(request){
        try{
            const { QueryTypes } = require('sequelize');
            //console.log(request);
            await this.sequelize.query("insert into Request(user_id,status,image_url,created_at) values("+request.user_id+",1,'"+request.link+"',CURDATE())"
            ,{type: QueryTypes.INSERT});
        return true;
    
        }catch(error){
            //console.log(error);
            console.log('addRequest Failed');
            return null;
        }
    }

    async deleteRequest(id){
        try{
            const { QueryTypes } = require('sequelize');
            var response = await 
            this.sequelize.query("delete from Request where user_id ="+ id ,{type: QueryTypes.DELETE});
        return response;
    
        }catch(error){
            console.log('deleteRequest Failed');
            return null;
        }

    }

    async changeStatus(user_id,id,status){
        try{
            const { QueryTypes } = require('sequelize');
            var response = await 
            this.sequelize.query("update Request SET status = "+ status + " where id = " + id,{type: QueryTypes.UPDATE});
            if(status == 2){
                var temp = await this.sequelize.query("update User SET role = 2 where id ="+ user_id,{type: QueryTypes.UPDATE});
            }
        return response;
    
        }catch(error){
            console.log('changeStatus Failed');
            return null;
        }

    }

    async getRequestDetails(id){
        try{
            const { QueryTypes } = require('sequelize');
            var response = await 
            this.sequelize.query("select * from Request as q INNER JOIN User as u on q.user_id = u.id where q.id = " + id,{type: QueryTypes.SELECT});
            
            return response;
    
        }catch(error){
            console.log('getRequestDetails Failed');
            return null;
        }
    }

    async getRequestUser(id){
        try{
            const { QueryTypes } = require('sequelize');
            var response = await 
            this.sequelize.query("select * from Request as q INNER JOIN User as u on q.user_id = u.id where q.user_id = " + id,{type: QueryTypes.SELECT});
           
        return response;
    
        }catch(error){
            console.log('getRequestDetails Failed');
            return null;
        }
    }

    async getRequests(){
        try{
            const { QueryTypes } = require('sequelize');
            var response = await 
            this.sequelize.query("select * from Request as q INNER JOIN User as u on q.user_id = u.id where status = 1" ,{type: QueryTypes.SELECT});
            
        return response;
        }catch(error){
            console.log('getRequest Failed');
            return null;
        }
    }
   
  }
  
  module.exports = Request;