$("document").ready(generateMonInsult());
// var victoryCounter = 0;//-- a way to keep track of the wins so we can progress to the next difficulty
var monsterPortraits = ["./assets/images/mon1.jpg", "./assets/images/mon2.jpg", "./assets/images/mon3.jpg", "./assets/images/mon4.jpg", "./assets/images/mon5.jpg", "./assets/images/mon6.png", "./assets/images/mon7.jpg", "./assets/images/mon8.jpg"]
Barbar = {
    hitpoints: 37,
    damage: Math.floor(Math.random() * 10 + 8),
}

var Monster = getRandomBattleMonsterFromArray(easy);
var MonsterHealth = Monster.hit_points;
var monDmg = Math.floor(Math.random() * 10 + 5);
var monName = Monster.name;
$("#monName").text(monName);

function defeat() {
    window.location.replace("./index.html")
}

function battleTime() {
    var Monster = getRandomBattleMonsterFromArray(easy);
    var MonsterHealth = Monster.hit_points;
    var monDmg = Math.floor(Math.random() * 8 + 5);
    var monName = Monster.name;
    $("#monHealth").text(MonsterHealth);
    $("#monName").text(monName);
    $("#playHealth").text(BarHealth);
    $("#monPortrait").attr("src", monsterPortraits[Math.floor(Math.random() * monsterPortraits.length)]);
    return MonsterHealth, monDmg;
}

console.log(Monster);
console.log(Monster.hit_points);
console.log(Monster.damage_bonus);

BarHealth = Barbar.hitpoints;
barDmg = Barbar.damage;

$("#playHealth").text(BarHealth);
$("#monHealth").text(MonsterHealth);

rockPS = function (guess) {//-- the Battle System; rock, paper, scissors basically.
    var monsterAttacks = ["Fast Attack", "Strong Attack", "Counter"];

    // Randomly chooses a choice from the options array. This is the Computer's guess.
    var computerGuess = monsterAttacks[Math.floor(Math.random() * monsterAttacks.length)];
    var userGuess = guess;
    // Win/lose conditions:
    if ((userGuess === "Fast Attack" && computerGuess === "Strong Attack") ||
        (userGuess === "Strong Attack" && computerGuess === "Counter") ||
        (userGuess === "Counter" && computerGuess === "Fast Attack")) {
        $('audio#barb')[0].play();
        var curMONHealth = $("#monHealth").text() - barDmg;
        $("#monHealth").text(curMONHealth);
        if (curMONHealth = 0 || curMONHealth < 0) {
            battleTime();
        }
        $("#choiceDisplay").empty();
        $("#choiceDisplay").text("Axe used " + userGuess + ". The Monster used " + computerGuess + ". Axe dealt " + barDmg + " damage to the Monster");

    } else if (userGuess === computerGuess) {
        $('audio#barbdamaged')[0].play();
        var curMONHealth = $("#monHealth").text() - Math.floor((barDmg / 2));
        $("#monHealth").text(curMONHealth);
        if (curMONHealth = 0 || curMONHealth < 0) {
            battleTime();
        }
        var curPlayHealth = $("#playHealth").text() - Math.floor((monDmg / 2));
        $("#playHealth").text(curPlayHealth);
        if (curPlayHealth = 0 || curPlayHealth < 0) {
            defeat();
        }
        $("#choiceDisplay").empty();
        $("#choiceDisplay").text("Axe used " + userGuess + ". The Monster used " + computerGuess + ". Axe takes " + Math.floor(monDmg / 2) + " damage. The Monster takes " + barDmg / 2 + " damage.");

    } else {
        $('audio#barbdamaged')[0].play();
        var curPlayHealth = $("#playHealth").text() - monDmg;
        $("#playHealth").text(curPlayHealth);
        if (curPlayHealth = 0 || curPlayHealth < 0) {
            defeat();
        }
        $("#choiceDisplay").empty();
        $("#choiceDisplay").text("Axe used " + userGuess + ". The Monster used " + computerGuess + ". Axe takes " + Math.floor(monDmg) + " damage.");
    }
    console.log(userGuess);
    console.log(computerGuess);
    // $("#choiceDisplay").text("Axe used "+userGuess+". "+monName+" used "+computerGuess+".");
}

// Taunt Button
//Calling the Insult API, putting it into a function
function generatePlayInsult() {
    $.ajax({
        url: "http://evilinsult.com/generate_insult.php?lang=en&type=JSON",
        method: "GET"
    }).then(function (response) {
        // console.log(response);
        $("#playTaunt").text(CleanInsult(response));
    })
};

function generateMonInsult() {
    $.ajax({
        url: "http://evilinsult.com/generate_insult.php?lang=en&type=JSON",
        method: "GET"
    }).then(function (response) {
        // console.log(response);
        $("#monTaunt").text(CleanInsult(response));
    })
};

// Create function to clean up some of the really bad word returned from the insult generator
function CleanInsult(reallybadphrase) {

    var str = reallybadphrase
    str = str.replace(/whore's soiled tampon/i, "call girl's soiled Napkin.")
    str = str.replace(/motherfucker/gi, "goofball")
    str = str.replace("asshole", "backend");
    str = str.replace(/testicles/gi, "privates")
    str = str.replace(/fuck/gi, "jerk")
    str = str.replace(/&quot;/gi, "'")
    str = str.replace(/&gt;/gi, ">")
    str = str.replace(/ass/gi, "dork")
    str = str.replace(/&amp;/gi, "&")
    str = str.replace(/dick/gi, "willy")
    str = str.replace(/crap/gi, "poop")
    return str;
}


$("#monPortrait").attr("src", monsterPortraits[Math.floor(Math.random() * monsterPortraits.length)]);