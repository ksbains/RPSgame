
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

function player (name, wins, losses, choice){ 
  this.name = name;
  this.wins = wins;
  this.losses = losses;
  this.choice = choice;
  this.fbKey = "";

  this.changeName = function(name){
    this.name = name;
  }
  this.win = function(){
    this.wins = this.wins++;
  }
  this.lose = function(){
    this.losses = this.losses++;
  }
  this.changeChoice = function(choice){
    this.choice = choice;
    console.log("the choice is "+choice);
  }
  this.getName = function(){
    return this.name;
  }
}

var game = {
  player1:"",
  player2:"",

  setplayer1: function(name){
     this.player1 = new player(name, 0, 0, ""); 
      var ref = firebase.database().ref("/players");   
     
      var p1Key = ref.push({
        name: this.player1.name,
        wins: this.player1.wins,
        losses:this.player1.losses,
        choice: this.player1.choice
      }).key;

      this.player1.fbKey = p1Key;
     return this.player1;
  },
  
  setplayer2: function(name){
     this.player2 = new player(name, 0, 0, ""); 
     var ref = firebase.database().ref("/players");
     
     var p2Key = ref.push({
        name: this.player2.name,
        wins: this.player2.wins,
        losses:this.player2.losses,
        choice: this.player2.choice
      }).key;

      this.player2.fbKey = p2Key;
     return this.player2;
  },
  sendChatMessage: function(player){
    // var newRef = myDataRef.push(...);
    // var newID = newRef.name();
      var ref = firebase.database().ref("/chat");
      var messageField = $('#chat-message').val().trim();
      var playerName = player.name;
      
      var chatKey = ref.push({
        name: playerName,
        message: messageField,
        dateAdded: firebase.database.ServerValue.TIMESTAMP
      }).key;
      
      //get the message just pushed to firebase and pass to addChatMessage
      ref.on("child-added", function(snapshot) {
        var message = snapshot.val();
        addChatMessage(message.name, message.message)
      });
  }  
}

function addChatMessage(name, message){
  $("#chatbox").append("<p>" + name + ": " + message +" </p>");
}


$(document).ready(function(){
  //THE ON CLICK FUNCTIONS GO HERE 
  $("#addPlayer").on("click", function(event){
    event.preventDefault();

    
    var name = $("#player-name").val().trim();
    var p1  = game.setplayer1(name);
    //lets push this guy to the db
    

    $("#p1").empty();
    $("#p1").prepend(p1.name);
    //add the rest of the tuff like the rock paper scisciors. 
    var rockDiv = $("<h2>" + "Rock" + "<h2>");
    var paperDiv = $("<h2>" + "Paper" + "<h2>");
    var scissorDiv = $("<h2>" + "Scissor" + "<h2>");
    // not sure how to set the on click to not run during in line code. 
    $("#p1").append(rockDiv).on("click", p1.changeChoice("rock"));
    $("#p1").append(paperDiv).on("click", p1.changeChoice("paper"));
    $("#p1").append(scissorDiv).on("click", p1.changeChoice("scissor"));
  });

  $("#addMessage").on("click", function(){
    game.sendChatMessage(game.player1);
  });
});



