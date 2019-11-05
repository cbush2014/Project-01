$("document").ready(generateMonInsult());
// var victoryCounter = 0;//-- a way to keep track of the wins so we can progress to the next difficulty

Barbar = {
    hitpoints: 37,
    damage: 11,
}

var Monster = getRandomBattleMonsterFromArray(easy);
var MonsterHealth = Monster.hit_points;
var monDmg = Math.floor(Math.random() + 7);
var monName = Monster.name;
$("#monName").text(monName);

function defeat (){
    window.location.replace("./index.html")
}

function battleTime() {
    var Monster = getRandomBattleMonsterFromArray(easy);
    var MonsterHealth = Monster.hit_points;
    var monDmg = Math.floor(Math.random() + 7);
    var monName = Monster.name;
    $("#monHealth").text(MonsterHealth);
    $("#monName").text(monName);
    $("#playHealth").text(BarHealth);
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
    var monsterAttacks = ["f", "s", "c"];

    // Randomly chooses a choice from the options array. This is the Computer's guess.
    var computerGuess = monsterAttacks[Math.floor(Math.random() * monsterAttacks.length)];
    var userGuess = guess;
    // Win/lose conditions:
    if ((userGuess === "f" && computerGuess === "s") ||
        (userGuess === "s" && computerGuess === "c") ||
        (userGuess === "c" && computerGuess === "f")) {

        var curMONHealth = $("#monHealth").text() - barDmg;
        $("#monHealth").text(curMONHealth);
        if (curMONHealth = 0 || curMONHealth < 0) {
            battleTime();
        }

    } else if (userGuess === computerGuess) {

        var curMONHealth = $("#monHealth").text() - Math.floor((barDmg / 2));
        $("#monHealth").text(curMONHealth);
        if (curMONHealth = 0 || curMONHealth < 0) {
            battleTime();
        }
        var curPlayHealth = $("#playHealth").text() - Math.floor((monDmg / 2));
        $("#playHealth").text(curPlayHealth);
        if (curPlayHealth = 0 || curPlayHealth < 0){
            defeat();
        }

    } else {

        var curPlayHealth = $("#playHealth").text() - monDmg;
        $("#playHealth").text(curPlayHealth);
        if (curPlayHealth = 0 || curPlayHealth < 0){
            defeat();
        }
    }
}
// Taunt Button
//Calling the Insult API, putting it into a function
function generatePlayInsult() {
    $.ajax({
        url: "http://evilinsult.com/generate_insult.php?lang=en&type=JSON",
        method: "GET"
    }).then(function (response) {
        console.log(response);
        $("#playTaunt").text(response);
    })
};

function generateMonInsult() {
    $.ajax({
        url: "http://evilinsult.com/generate_insult.php?lang=en&type=JSON",
        method: "GET"
    }).then(function (response) {
        console.log(response);
        $("#monTaunt").text(response);
    })
};


