
//-- To get the DND API working
jQuery.ajaxPrefilter(function (options) {
    if (options.crossDomain && jQuery.support.cors) {
        options.url = "http://uncc-cors-proxy.herokuapp.com/" + options.url;
    }
});




















//-- RPS code
$("#fastAttack").on("click", rockPS("f"))

$("#strongAttack").on("click", rockPS("s"))

$("#counterAttack").on("click", rockPS("c"))

var victoryCounter = 0;//-- a way to keep track of the wins so we can progress to the next difficulty

rockPS = function (guess) {//-- the Battle System; rock, paper, scissors basically.
    var monsterAttacks = ["f", "s", "c"];

    // Randomly chooses a choice from the options array. This is the Computer's guess.
    var computerGuess = monsterAttacks[Math.floor(Math.random() * monsterAttacks.length)];
    var userGuess = guess;
    // Win/lose conditions:
    if ((userGuess === "f" && computerGuess === "s") ||
        (userGuess === "s" && computerGuess === "c") ||
        (userGuess === "c" && computerGuess === "f")) {

        monsterDmged();//-- deal damage to monster
        victory();

    } else if (userGuess === computerGuess) {

        monsterDmged();
        heroDmged();
        gameOver();
        victory();

    } else {

        heroDmged(); // deal damage to character
        gameOver();

    }
}

//-- Victory and Game Over functions
function gameOver() {
    if (curplayHealth <= 0) {
        window.document.replace("../index.html")
        //-- returns user to the start screen to try again
    }
}
function victory() {
    if (curMONHealth <= 0) {
        victoryCounter++;
        //-- call function the will bring up a new monster
    }
}

//-- Health Points Bar for Player
$ = jQuery;
var maxplayHealth = 500, //-- needs to change when player stats are put in
    curplayHealth = maxplayHealth;
$('.playHealth').html(maxplayHealth + "/" + maxplayHealth);
$(".playHealth-bar-text").html("100%");
$(".playHealth-bar").css({
    "width": "100%"
});

function heroDmged() {//-- the function for changing the health of the player when battle executes
    if (curplayHealth > 0) {
        var damage = Math.floor((Math.random() * 100) + 50);//--this needs to change to monster damage
        $(".playHealth-bar-red, .playHealth-bar").stop();
        curplayHealth = curplayHealth - damage;

        applyChangeHero(curplayHealth);
    }
};

function applyChangeHero(curplayHealth) {//-- the function for changing the player health element
    var a = curplayHealth * (100 / maxplayHealth);
    $(".playHealth-bar-text").html(Math.round(a) + "%");
    $(".playHealth-bar-red").animate({
        'width': a + "%"
    }, 700);
    $(".playHealth-bar").animate({
        'width': a + "%"
    }, 500);
    $(".playHealth-bar-blue").animate({
        'width': a + "%"
    }, 300);
    $('.playHealth').html(curplayHealth + "/" + maxplayHealth);
}

//--Health Points Bar for Monster
$ = jQuery;
var maxMonHealth = newMonster.hit_points,
    curMonHealth = maxMonHealth;
$('.monHealth').html(maxMonHealth + "/" + maxMonHealth);
$(".monHealth-bar-text").html("100%");
$(".monHealth-bar").css({
    "width": "100%"
});


function monsterDmged() { //-- the function for changing the health of the monster when battle executes
    if (curMonHealth > 0) {
        var damage = Math.floor((Math.random() * 100) + 50); //-- damage from the players stats
        $(".monHealth-bar-red, .monHealth-bar").stop();
        curMonHealth = curMonHealth - damage;
        
        applyChangeMon(curMONHealth);
    }
};


function applyChangeMon(curMonHealth) {//-- the function for changing the monster health element
    var a = curMonHealth * (100 / maxMonHealth);
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
    $('.monHealth').html(curMonHealth + "/" + maxMonHealth);
}

