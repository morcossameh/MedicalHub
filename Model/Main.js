const user = require ('./User.js');
const patient = require ('./Patient.js');
const o = new user();
const p = new patient();

//console.log('here');
const obj = {id :4, Lastname : "Ibrahim", Firstname : "Eshraq", email : "eshraq.ibrahim@gmail.com", password : "eshu123" 
, dateOfBirth : '1997/11/27', createdAt: '2020-04-02 10:35:00', modifiedAt : '2020-04-02 10:35:00', role : 1};
//o.createUser(obj);
var u = null;


o.validUser(obj.email,obj.password).then(results => {
    console.log(results);
});

/* p.addRequest(obj.id,'http://facebook/EshraqIbrahim/').then(results => {
    console.log(results);
});
*/


