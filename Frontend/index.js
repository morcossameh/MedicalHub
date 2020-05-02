// var tempSignedIn = true;

// if(tempSignedIn) {
  
// }

// var socket = io('http://41.43.13.96:3000');

// socket.on('broadcast',function(data) {
//   console.log(data);
// });

// socket.emit('my other event', { my: 'data' });

var user = getCookie("user")

if(user) {
  const userJson = JSON.parse(user)
  if(userJson.role === 1) {
    $(document).ready(function(){
      $("#navWithoutUser").hide();
      $("#navPatient").show();
      $("#questionForm").show();
      $("#promotePatient").show();
      $(".fullname").text(userJson.firstName);
      $("#questionForm").show()
    });
  } else if (userJson.role === 2) {
    $(document).ready(function(){
      $("#navWithoutUser").hide();
      $("#navDoctor").show();
      $("#promotePatient").hide();
      $(".fullname").text(userJson.firstName);
      $("#questionForm").show()
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

let url = "http://102.185.33.28:3000"

function getPosts() {
  let socket = io(url);
  let socketName = user ? 'posts' : 'get posts'
  let user_id = user ? JSON.parse(user).id : -1;
  socket.emit(socketName, user_id);
  socket.on(socketName,function(data) {
    if(data) {
      console.log(data);
      $(document).ready(function(){
        for(let i = 0; i < data.length; i++) {
          for(let j = 0; j < data[i].length; j++) {
            let clonedVersion = $("#questionHome").clone(true)
            clonedVersion.html("<div onclick='goToPost(" + data[i][j].id + ")'>" + data[i][j].content + "</div>" + "</br>" + "Asked By: "
            + data[i][j].firstName + " "
            + data[i][j].lastName + "!");
      
            $("#container").append(clonedVersion)
            clonedVersion.show();
          }
        }
      });
    }
  });
}

function goToPost(id) {
  document.cookie = "post=" + id;
  window.location.href = "/question.html";
}

function getPost() {
  let postId = getCookie("post")
  let socket = io(url);
  socket.emit('open post', {
    entity_id: postId,
    user_id: user ? JSON.parse(user).id : -1
  });
  socket.on('post attributes', function(data) {
    if(data) {
      console.log(data)
      $(document).ready(function(){
        let questionContent = $("#questionContent")
        let questionComment = $("#questionComment")
        let addComment = $("#addComment").remove()
        $("#container").empty()
        let upVote = checkLike(data.num_of_upVotes, data.num_of_downVotes);
        postContent = data.content[0].content + "</br></br>"
        postContent += upVote === 1 ? "<a>" : ""
        postContent +=  "<span onclick='vote(" + postId  + ", " + upVote + ", " + 1 + ")' class='glyphicon glyphicon-thumbs-up'></span> "
        + data.num_of_upVotes.length
        postContent += upVote === 1 ? "</a>" : ""
        postContent += "&emsp;"
        postContent += upVote === 0 ? "<a>" : ""
        postContent += "<span onclick='vote(" + postId  + ", "  + upVote + ", " + 0 + ")' class='glyphicon glyphicon-thumbs-down'></span> "
        + data.num_of_downVotes.length
        postContent += upVote === 0 ? "</a>" : ""
        postContent += "&nbsp;&nbsp;•&nbsp;&nbsp;Asked by "
        + data.content[0].firstName + " "
        + data.content[0].lastName + "!"
        postContent += user && data.content[0].user_id === JSON.parse(user).id ? '&nbsp;&nbsp;•&nbsp;&nbsp;<a><span onclick="deletePost()" class="glyphicon glyphicon-trash"></span></a>' : "";
        questionContent.html(postContent)
        $("#container").append(questionContent)
        for(let i = 0; i < data.comments.length; i++) {
          const commentVotes = commentLikes(data.comments[i].comment_likes)
          let clonedVersion = questionComment.clone(true)
          commentContent = data.comments[i].content + "</br></br>"
          commentContent += commentVotes.liked === 1 ? "<a>" : ""
          commentContent += "<span onclick='vote(" + data.comments[i].id  + ", " + commentVotes.liked + ", " + 1 + ")' class='glyphicon glyphicon-thumbs-up'></span> "
          + commentVotes.likes
          commentContent += commentVotes.liked === 1 ? "</a>" : ""
          commentContent += "&emsp;"
          commentContent += commentVotes.liked === 0 ? "<a>" : ""
          commentContent += "<span onclick='vote(" + data.comments[i].id  + ", " + commentVotes.liked + ", " + 0 + ")' class='glyphicon glyphicon-thumbs-down'></span> "
          + commentVotes.dislikes
          commentContent += commentVotes.liked === 0 ? "</a>" : ""
          commentContent += "&nbsp;&nbsp;•&nbsp;&nbsp;Answered by "
          + data.comments[i].firstName + " "
          + data.comments[i].lastName + "!"
          commentContent += user && data.comments[i].userid === JSON.parse(user).id ? '&nbsp;&nbsp;•&nbsp;&nbsp;<a><span onclick="deleteComment(' + data.comments[i].id + ')" class="glyphicon glyphicon-trash"></span></a>' : "";
          clonedVersion.html(commentContent)
          $("#container").append(clonedVersion)
          clonedVersion.show()
        }
        if(user) $("#container").append(addComment)
        $("#container").show()

      });
    }
  });
}

function checkLike(likes, dislikes) {
  if(!user) return -1;
  for (i = 0; i < likes.length; i++) {
    if(likes[i].user_id === JSON.parse(user).id) return 1;
  }
  for (i = 0; i < dislikes.length; i++) {
    if(dislikes[i].user_id === JSON.parse(user).id) return 0;
  }
  return -1;
}

function commentLikes(likes) {
  var result = {
    likes: 0,
    dislikes: 0,
    liked: -1
  }
  for (i = 0; i < likes.length; i++) {
    if(likes[i].up) result.likes += 1
    else result.dislikes += 1
    if(user && likes[i].user_id === JSON.parse(user).id) result.liked = likes[i].up
  }
  return result;
}

function vote(postId, history, vote) {
  let socket = io(url);
  if(history === vote) {
    socket.emit('unlike', {
      entity_id: postId,
      user_id: user ? JSON.parse(user).id : -1
    });
  } else {
    socket.emit('like or dislike', {
      entity_id: postId,
      user_id: user ? JSON.parse(user).id : -1,
      upVote: vote,
      history: history === -1 ? false : true
    });
  }
  socket.on('validate like',function(data) {
    if(data) {
      getPost()
    }
  })
}

function deletePost() {
  if(confirm("This post will be deleted immediately. You can’t undo this action.")) {
    let socket = io(url);
    socket.emit('delete post', parseInt(getCookie("post")));
    socket.on('verify delete',function(data) {
      if(data) {
        window.location.href = "/home.html";
      }
    })
  }
}

function deleteComment(id) {
  let socket = io(url);
  socket.emit('delete post', id);
  socket.on('verify delete',function(data) {
    if(data) {
      getPost()
    }
  })
}

function getCategories() {
  let socket = io(url);
  socket.emit('get categories', "Hi!");
  socket.on('categories',function(data) {
    if(data) {
      for(let i = 0; i < data.length; i++) {
        $('#categories').append("<option value='" + data[i].id + "'>" + data[i].name + "</option>")
      }
    }
  })
}

function addPost() {
  const postData = {
    user_id: JSON.parse(user).id,
    content: $("#addQuestionText").val().replace('\'', "\\'"),
    category_id: $("#categories").val()
  }
  let socket = io(url);
  socket.emit('add post', postData);
  socket.on('post id',function(data) {
    if(data) {
      document.cookie = "post=" + data;
      window.location.href = "/question.html";
    }
  })
}

function addComment() {
  const commentData = {
    user_id: JSON.parse(user).id,
    content: $("#addCommentText").val().replace('\'', "\\'"),
    post_id: getCookie("post")
  }
  let socket = io(url);
  socket.emit('add comment', commentData);
  socket.on('comment id',function(data) {
    if(data) {
      getPost()
    }
  })
}

function signUp() {
  let socket = io(url);
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
  let socket = io(url);
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

