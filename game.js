var gamePattern = [];
var butonColours = ["red","blue","green","yellow"];
var userClickedPattern = [];
var count = false;
var level = 0;

$(document).keydown(function(){
  if (!count) {
    count = true;
    $("h1").text("Level " + level);
    nextSequence();
  }
});

$(".btn").click(function(){
  var userChosenColor = $(this).attr("id");
  console.log(userChosenColor);
  userClickedPattern.push(userChosenColor);
  console.log(userClickedPattern);
  playSound(userChosenColor);
  animatePress(userChosenColor);
  checkAnsware(userClickedPattern.length - 1);
});


function nextSequence(){
  var randomNumber = Math.floor(Math.random() *4);
  var randomChosenColour = butonColours[randomNumber];
  gamePattern.push(randomChosenColour);
  $("#" + randomChosenColour).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColour);
  console.log(randomChosenColour);

  level ++;
  $("h1").text("Level " + level);

  userClickedPattern = [];
}

function playSound(name){
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function animatePress(currentColor){
  $("#" + currentColor).addClass("pressed");
  setTimeout(function(){$("#" + currentColor).removeClass("pressed");},100);
}

function checkAnsware(currentLevel){
  if (gamePattern[currentLevel] == userClickedPattern[currentLevel]) {
    console.log("right");
    if (gamePattern.length == userClickedPattern.length) {
      setTimeout(nextSequence(),1000);
      userClickedPattern = [];
    }
  } else {
    console.log("wrong");
    playSound("wrong");
    $("body").addClass("game-over");
    $("h1").text("Game Over, Press Any Key To Restart");
    setTimeout(function(){
      $("body").removeClass("game-over");
    },200);
    startOver();
  }
}

function startOver(){
  level = 0;
  gamePattern = [];
  count = false;
}
