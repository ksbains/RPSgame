function sendChatMessage(){
  var ref = firebase.database().ref("/chat");
  var messageField = $('#chat-message');
  var playerName = $("#player-name");
  ref.push().set({
    name: playerName.value();
    message: messageField.value();
  });

  ref.on("child-added", function(snapshot) {
    var message = snapshot.val();
    addChatMessage(message.name, message.message)
  });
}

function addChatMessage(name, message){
  $("#chatbox").append("<p>" + name + ": " + message +" </p>");
}

















// Initialize Firebase
    var config = {
      apiKey: "AIzaSyBSLUepk6oQpKVCkQj-p-Cwa4E057En3dI",
      authDomain: "rock-paper-scissors-a3748.firebaseapp.com",
      databaseURL: "https://rock-paper-scissors-a3748.firebaseio.com",
      projectId: "rock-paper-scissors-a3748",
      storageBucket: "rock-paper-scissors-a3748.appspot.com",
      messagingSenderId: "540223845963"
    };
    firebase.initializeApp(config);
    var db = firebase.database();
