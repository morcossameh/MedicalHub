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
  } else if (userJson.role === 2) {
    $(document).ready(function(){
      $("#navWithoutUser").hide();
      $("#navDoctor").show();
      $("#promotePatient").hide();
      $(".fullname").text(userJson.firstName);
    });
  }
} else {
  $(document).ready(function(){
    $("#navWithoutUser").show();
    $("#navDoctor").hide();
    $("#navPatient").hide();
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
  password2 = $("#signup-password2").val();
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

function login() {
  let socket = io("http://102.185.138.175:3000");
  const signinValues = {
    email : $("#login-email").val(),
    password : $("#login-password").val(),
  };
  
  console.log(signinValues)
  socket.emit('sign in', signinValues);
  socket.on('user id', function(data) {
    if(data) {
      document.cookie = "user=" + JSON.stringify(data);
      window.location.href = "/home.html";
    } else {
      alert("Email or Password is not correct.");
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

function auto_grow(element) {
  element.style.height = "5px";
  element.style.height = (element.scrollHeight)+"px";
}
