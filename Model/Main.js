
const Controller = require ('../Controller.js');

const Test = require ('./Test.js');


const Sequelize = require('sequelize');

this.sequelize = new Sequelize('MedicalHub', 'root', 'root', {
    host: 'localhost',
    dialect: 'mysql',
    logging: false,
}); 


this.sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(onfierr => {
    console.error('Unable to connect to the database:', err);
  });

const controller = new Controller(this.sequelize);
const test = new Test(this.sequelize);
/*
test.TestWrongEmailOrPass();
test.TestGetCommentbyValidPost();
test.TestGetCommentbyInvalidPost();
test.TestCommentOnDeletedPost();
test.TestCommentOnPost();
test.TestDeleteDeletedcomment();
test.TestGetPostByValidCategories();
test.TestDeleteDeletedPost();
test.TestGetDeletedPost();
test.TestGetPostByID();
test.TestGetLikesForInvalidEntity();
test.TestGetLikesForValidEntity();
test.TestGetLikesNumberForValidEntity();
test.TestGetLikesNumberForInvalidEntity();
test.TestCreateUser();
test.TestGetCategoriesByID();
test.TestSearchWithEntityContent();
test.TestSearchWithUserName();
test.TestDOctorRating();
test.TestCreateUser();
*/
test. TestRightEmailOrPass();

const pos = {id :57,category_id : 2 , user_id : 4, content : "Hello World, Eshraq zh2anaa", createdAt: '2020-04-02 10:35:00', modifiedAt : '2020-04-02 10:35:00'};
