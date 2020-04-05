
const io = require("socket.io-client");
//First Connect to the Server on the Specific URL (HOST:PORT)
let socket = io("http://localhost:3000");

const signupValues = {
    Firstname :'ahnmed', 
    Lastname : 'adasdas',
    email : 'adad@gmail.com',
    password :'adad',
    dateOfBirth : '1997-12-25',
    role : 1
  };
  console.log(signupValues)
  socket.emit('sign up', signupValues);
  socket.on('validation',(data)  =>{
    console.log(data);
  });


  const signupValues = {
    Firstname : 'ahmed', 
    Lastname : 'hesham',
    email : 'ahmed@gmail.com',
    password : 'ahmed12345',
    dateOfBirth : '1997-11-27',
    role : 1
  };
  password2 = 'hmed12345';



  function validatePassword(password1, password2)
{
    if(password2 != password1){
      alert("Passowrds do not match");
      return false;
    }
    else{
      return true;
    }
}
function hasNumber(myString) {
  return /\d/.test(myString);
}

function validateName(name) {
  if (hasNumber(name)) {
    alert("Name contains non letter characters");
    return false;
  } else {
    return true;
  }
}
function ValidateEmail(emailText){
  if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(emailText)){
      return true;
  }else{
      alert("Email format not correct");
      return false;
  }
}
 function sign_up(){
 

  if(!ValidateEmail(signupValues.email)){
    return false;
  }
  if(!validatePassword(signupValues.password, password2)){
    return false;
  }
  if(!validateName(signupValues.Firstname)){
    return false;
  }
  if(!validateName(signupValues.Lastname)){
    return false;
  }

   
  socket.emit('sign up',signupValues);

socket.on('validation', function (data) {
  console.log(data);

  var test = cont.Sign_in(data).then((result) => {

  });



});



}
