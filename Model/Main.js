const user = require ('./User.js');
const patient = require ('./Patient.js');
const entity = require ('./Entity.js');
const post = require ('./Post.js');
const comment = require ('./Comment.js');
const controller = require ('/home/geek/MedicalHub/Controller.js');

const o = new user();
const p = new patient();
const e = new entity();
const po = new post();
const com = new comment();
const co = new controller();

//console.log('here');
const obj = {id :4, Lastname : "Ibrahim", Firstname : "Eshraq", email : "eshraq.ibrahim@gmail.com", password : "eshu12" 
, dateOfBirth : '1997/11/27', createdAt: '2020-04-02 10:35:00', modifiedAt : '2020-04-02 10:35:00', role : 1};
//o.createUser(obj);
var u = null;

/*
o.validUser(obj.email,obj.password).then(results => {
    console.log(results);
});

po.getLikes(pos,true).then(results => { 
    console.log(results);
});

*/

const pos = {id :57,category_id : 2 , user_id : 4, content : "Hello World, Eshraq zh2anaa", createdAt: '2020-04-02 10:35:00', modifiedAt : '2020-04-02 10:35:00'};

co.get_Entity_number_of_likes(pos,true).then(results => { 
    console.log(results);
});

co.get_Entity_likes(pos,true).then(results => { 
    console.log(results);
});
co.get_comments_for_post(pos).then(results => { 
    console.log(results);
});
co.get_posts_by_id(4).then(results => { 
    console.log(results);
});
/*

    po.createPost(pos).then(results => { 
          console.log(results);
});

const c = [1,2]

po.getPostByCategories(c).then(results => { 
    console.log(results);
});



po.deletePost(pos).then(results => { 
    console.log(results);
});


po.getLikesNumber(pos).then(results => { 
    console.log(results);
});


po.getDisLikesNumber(pos).then(results => { 
    console.log(results);
});


com.getCommentbyPost(pos).then(results => { 
    console.log(results);
});



/*
cat = [1,2]
cat.forEach(category => { 
    var r = po.getPostsByCategory(category).then(results => {
        console.log(results);
    });
});

*/
//console.log(r)

/* p.addRequest(obj.id,'http://facebook/EshraqIbrahim/').then(results => {
});
*/




