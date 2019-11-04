
//-- To get the DND API working
jQuery.ajaxPrefilter(function (options) {
    if (options.crossDomain && jQuery.support.cors) {
        options.url = "http://uncc-cors-proxy.herokuapp.com/" + options.url;
    }
});

//-- Calling the DND API
var Goblin = $.ajax({
    url: "http://dnd5eapi.co/api/monsters/150/actions",
    method: "GET"
}).then(function (response) {
    $()
    console.log(response);
});


//-- Creating the Arrays of monsters

crOne = {
    gob =[$.ajax({
        url: "http://dnd5eapi.co/api/monsters/150/actions",
        method: "GET"
    }).then(function (response) {
        console.log(response);
    })
        ,]
}





















//-- RPS code
$("#fastAttack").on("click", rockPS("f"))

$("#strongAttack").on("click", rockPS("s"))

$("#counterAttack").on("click", rockPS("c"))

rockPS = function (guess) {
    var monsterAttacks = ["f", "s", "c"];

    // Randomly chooses a choice from the options array. This is the Computer's guess.
    var computerGuess = monsterAttacks[Math.floor(Math.random() * monsterAttacks.length)]
    userGuess = guess
    // Win/lose conditions:
    if ((userGuess === "f" && computerGuess === "s") ||
        (userGuess === "s" && computerGuess === "c") ||
        (userGuess === "c" && computerGuess === "f")) {
        monsterHP - heroDmg;
        if (monsterHP <= 0){
            
        }
    } else if (userGuess === computerGuess) {
        monsterHP - heroDmg;
        
    } else {
        // deal damage to character
        alert("You've lost " + losses + " time(s).");
    }
}

$ = jQuery;
var maxHealth = 500,
  curHealth = maxHealth;
$('.total').html(maxHealth + "/" + maxHealth);
$(".health-bar-text").html("100%");
$(".health-bar").css({
  "width": "100%"
});

function heroDmged() {
  if (curHealth == 0) {
    $('.message-box').html("Is this the end??");
  } else {
    var damage = Math.floor((Math.random() * 100) + 50);
    $(".health-bar-red, .health-bar").stop();
    curHealth = curHealth - damage;
    if (curHealth < 0) {
      curHealth = 0;
      restart();
    } else {
      $('.message-box').html("You took " + damage + " points of damage!");
    }
    applyChange(curHealth);
  }
};

function applyChangeHero(curHealth) {
    var a = curHealth * (100 / maxHealth);
    $(".health-bar-text").html(Math.round(a) + "%");
    $(".health-bar-red").animate({
        'width': a + "%"
    }, 700);
    $(".health-bar").animate({
        'width': a + "%"
    }, 500);
    $(".health-bar-blue").animate({
        'width': a + "%"
    }, 300);
    $('.playHealth').html(curHealth + "/" + maxHealth);
}

$ = jQuery;
var maxHealth = 500,
  curHealth = maxHealth;
$('.monHealth').html(maxHealth + "/" + maxHealth);
$(".monHealth-bar-text").html("100%");
$(".monHealth-bar").css({
  "width": "100%"
});

function monsterDmged() {
    if (curHealth == 0) {
      $('.message-box').html("Is this the end??");
    } else {
      var damage = Math.floor((Math.random() * 100) + 50);
      $(".monHealth-bar-red, .monHealth-bar").stop();
      curHealth = curHealth - damage;
      if (curHealth < 0) {
        curHealth = 0;
        restart();
      } else {
        $('.message-box').html("You took " + damage + " points of damage!");
      }
      applyChange(curHealth);
    }
};


function applyChangeMon(curHealth) {
    var a = curHealth * (100 / maxHealth);
    $(".monHealth-bar-text").html(Math.round(a) + "%");
    $(".monHealth-bar-red").animate({
        'width': a + "%"
    }, 700);
    $(".monHealth-bar").animate({
        'width': a + "%"
    }, 500);
    $(".monHealth-bar-blue").animate({
        'width': a + "%"
    }, 300);
    $('.monHealth').html(curHealth + "/" + maxHealth);
}


// $(".add-heal").click(function() {
//   if (curHealth == maxHealth) {
//     $('.message-box').html("You are already at full health");
//   } else {
//     var heal = Math.floor((Math.random() * 100) + 5);
//     $(".health-bar-red, .health-bar-blue, .health-bar").stop();
//     curHealth = curHealth + heal;
//     if (curHealth > maxHealth) {
//       curHealth = maxHealth;
//       $('.message-box').html("You're at full health");
//     } else if (curHealth == 0) {
//       $('.message-box').html("Miraculously! You regained your health by " + heal + " points and get back on to your feet!");
//     } else {
//       $('.message-box').html("You regained your health by " + heal + " points!");
//     }
//     applyChange(curHealth);
//   }
// });

// function restart() {
//   //Was going to have a game over/restart function here. 
//   $('.health-bar-red, .health-bar');
//   $('.message-box').html("You've been knocked down! Thing's are looking bad.");
// }