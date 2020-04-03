class Database{

    constructor(){
       
        const Sequelize = require('sequelize');
        this.sequelize = new Sequelize('MedicalHub', 'root', 'root', {
            host: 'localhost',
            dialect: 'mysql'
        }); 

        this.sequelize
          .authenticate()
          .then(() => {
            console.log('Connection has been established successfully.');
          })
          .catch(onfierr => {
            console.error('Unable to connect to the database:', err);
          });
    }  

}

module.exports = Database;