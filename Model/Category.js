class Category{

    constructor(sequelize){
        this.sequelize = sequelize;
      }  

    async get_Categories(){
        try{
            const { QueryTypes } = require('sequelize');
            var response = await this.sequelize.query("SELECT * FROM Category ",{type: QueryTypes.SELECT});
            return response;
        }catch(error){
            console.log(error)
            return -1;
        }
    }

}

module.exports = Category;