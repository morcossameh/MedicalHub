// var tempSignedIn = true;

// if(tempSignedIn) {
  
// }

// var socket = io('http://41.43.13.96:3000');

// socket.on('broadcast',function(data) {
//   console.log(data);
// });

// socket.emit('my other event', { my: 'data' });

var user = getCookie("user")
console.log(user)

if(user) {
  const userJson = JSON.parse(user)
  if(userJson.role === 1) {
    $(document).ready(function(){
      $("#navWithoutUser").hide();
      $("#navPatient").show();
      $("#promotePatient").show();
      $(".fullname").text(userJson.firstName);
    });
  } else if (userJson === 2) {

  }
} else {
  $(document).ready(function(){
    $("#promotePatient").hide();
  });
}

function signUp() {
  let socket = io("http://102.185.138.175:3000");
  const signupValues = {
    Firstname : $("#signup-firstname").val(), 
    Lastname : $("#signup-lastname").val(),
    email : $("#signup-email").val(),
    password : $("#signup-password").val(),
    dateOfBirth : $("#signup-date").val(),
    role : 1
  };

  console.log(signupValues)
  socket.emit('sign up', signupValues);
  socket.on('validation',function(data) {
    if(data) {
      console.log(data);
      window.location.href = "/login.html";
    }
  });
  return false; 
}

function login() {
  let socket = io("http://102.185.138.175:3000");
  const signinValues = {
    email : $("#login-email").val(),
    password : $("#login-password").val(),
  };
  
  console.log(signinValues)
  socket.emit('sign in', signinValues);
  socket.on('user id',function(data) {
    if(data) {
      document.cookie = "user=" + JSON.stringify(data);
      window.location.href = "/home.html";
    }
  });
  return false; 
}

function getCookie(cname) {
  var name = cname + "=";
  var decodedCookie = decodeURIComponent(document.cookie);
  var ca = decodedCookie.split(';');
  for(var i = 0; i <ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}

function logout() {
  document.cookie = "user=" + ";expires=Thu, 01 Jan 1970 00:00:01 GMT"
  window.location.href = "/home.html";
}

// const io = require("socket.io-client");
// //First Connect to the Server on the Specific URL (HOST:PORT)
// let socket = io("http://localhost:3000");
// //Now Listen for Events (welcome event).
// socket.on("broadcast", (data) => {
//    /*For the listener we specify the event name and we give the callback to which be called one the 
//    event is emitted*/
//    //Log the Welcome message 
//    console.log("Message: ", data);
// });
// const obj = {id :4, Lastname : "Ibrahim", Firstname : "Eshraq", email : "ahmed.hesham@gmail", password : "eshu123" 
// , dateOfBirth : '1997/11/27', createdAt: '2020-04-02 10:35:00', modifiedAt : '2020-04-02 10:35:00', role : 1};
// socket.emit('sign in', obj);
// socket.on("user id", (data) => {
//     /*For the listener we specify the event name and we give the callback to which be called one the 
//     event is emitted*/
//     //Log the Welcome message 
//     console.log("Message: ", data);
//  });
