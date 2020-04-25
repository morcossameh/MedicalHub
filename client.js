
const io = require("socket.io-client");
//First Connect to the Server on the Specific URL (HOST:PORT)
let socket = io("http://102.185.138.175:3000");
//Now Listen for Events (welcome event).
socket.on("broadcast", (data) => {
   /*For the listener we specify the event name and we give the callback to which be called one the 
   event is emitted*/
   //Log the Welcome message 
   console.log("Message: ", data);
});
const obj = {id :4, Lastname : "Ibrahim", Firstname : "m", email : "ahmed@gmail", password : "e" 
, dateOfBirth : '1997/11/27', createdAt: '2020-04-02 10:35:00', modifiedAt : '2020-04-02 10:35:00', role : 2};
socket.emit('sign in', obj);
socket.on("user id", (data) => {
    /*For the listener we specify the event name and we give the callback to which be called one the 
    event is emitted*/
    //Log the Welcome message 
    console.log("Message: ", data);
 });
