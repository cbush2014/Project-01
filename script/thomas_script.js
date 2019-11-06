$("document").ready(generateMonInsult()); //calling insult function when the page is loaded

// images for the monsters
var monsterPortraits = ["./assets/images/mon1.jpg", "./assets/images/mon2.jpg", "./assets/images/mon3.jpg", "./assets/images/mon4.jpg", "./assets/images/mon5.jpg", "./assets/images/mon6.png", "./assets/images/mon7.jpg", "./assets/images/mon8.jpg"]

// players stats
Barbar = {
    hitpoints: 37,
    damage: Math.floor(Math.random() * 10 + 8),
}
BarHealth = Barbar.hitpoints;
barDmg = Barbar.damage;

//creating the intial monster to fight against
var Monster = getRandomBattleMonsterFromArray(easy);
var MonsterHealth = Monster.hit_points;
var monDmg = Math.floor(Math.random() * 10 + 5);
var monName = Monster.name;
$("#monName").text(monName);

// A function for win the player loses, it will return them to the start page
function defeat() {
    window.location.replace("./index.html")
}

// A function for calling a new Monster from the array and plugging in all the stats to the DOM and battle system
function battleTime() {
    var Monster = getRandomBattleMonsterFromArray(easy);
    var MonsterHealth = Monster.hit_points;
    var monDmg = Math.floor(Math.random() * 8 + 5);
    var monName = Monster.name;
    $("#monHealth").text(MonsterHealth);
    $("#monName").text(monName);
    $("#playHealth").text(BarHealth);
    $("#monPortrait").attr("src", monsterPortraits[Math.floor(Math.random() * monsterPortraits.length)]);
    $.ajax({
        url: "http://evilinsult.com/generate_insult.php?lang=en&type=JSON",
        method: "GET"
    }).then(function (response) {
        // console.log(response);
        $("#monTaunt").text(CleanInsult(response));
    });
    return MonsterHealth, monDmg;
}

// console.log(Monster);
// console.log(Monster.hit_points);
// console.log(Monster.damage_bonus);

$("#playHealth").text(BarHealth);
$("#monHealth").text(MonsterHealth);

rockPS = function (guess) {//-- the Battle System; rock, paper, scissors basically.
    var monsterAttacks = ["Fast Attack", "Strong Attack", "Counter"];

    // Randomly chooses a choice from the options array. This is the Computer's guess.
    var computerGuess = monsterAttacks[Math.floor(Math.random() * monsterAttacks.length)];
    var userGuess = guess;
    // Win conditions:
    if ((userGuess === "Fast Attack" && computerGuess === "Strong Attack") ||
        (userGuess === "Strong Attack" && computerGuess === "Counter") ||
        (userGuess === "Counter" && computerGuess === "Fast Attack")) {

        $('audio#damagesound')[0].play();
        var curMONHealth = $("#monHealth").text() - barDmg;
        $("#monHealth").text(curMONHealth);
        // checks for monster death
        if (curMONHealth = 0 || curMONHealth < 0) {
            $('audio#victory')[0].play();
            battleTime();
        }
        //displays outcome
        $("#choiceDisplay").empty();
        $("#choiceDisplay").text("Axe used " + userGuess + ". The Monster used " + computerGuess + ". Axe dealt " + barDmg + " damage to the Monster");
    // Tied    
    } else if (userGuess === computerGuess) {

        $('audio#damagesound')[0].play();
        $('audio#barbdamaged')[0].play();
        var curMONHealth = $("#monHealth").text() - Math.floor((barDmg / 2));
        $("#monHealth").text(curMONHealth);
        // checks for monster death
        if (curMONHealth = 0 || curMONHealth < 0) {
            $('audio#victory')[0].play();
            battleTime();
        }
        var curPlayHealth = $("#playHealth").text() - Math.floor((monDmg / 2));
        $("#playHealth").text(curPlayHealth);
        // checks for player death
        if (curPlayHealth = 0 || curPlayHealth < 0) {
            $('audio#gameover')[0].play();
            defeat();
        }
        //displays outcome
        $("#choiceDisplay").empty();
        $("#choiceDisplay").text("Axe used " + userGuess + ". The Monster used " + computerGuess + ". Axe takes " + Math.floor(monDmg / 2) + " damage. The Monster takes " + barDmg / 2 + " damage.");
    // Lose
    } else {
        
        $('audio#damagesound')[0].play();
        $('audio#barbdamaged')[0].play();
        var curPlayHealth = $("#playHealth").text() - monDmg;
        $("#playHealth").text(curPlayHealth);
        // checks for player death
        if (curPlayHealth = 0 || curPlayHealth < 0) {
            $('audio#gameover')[0].play();
            defeat();
        }
        //displays outcome
        $("#choiceDisplay").empty();
        $("#choiceDisplay").text("Axe used " + userGuess + ". The Monster used " + computerGuess + ". Axe takes " + Math.floor(monDmg) + " damage.");
    }
    // console.log(userGuess);
    // console.log(computerGuess);
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
        $('audio#barb')[0].play();
        $("#playTaunt").text(CleanInsult(response));
    })
};
// And a seperate function to call Insult for the monster
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

// setting the image for the monster
$("#monPortrait").attr("src", monsterPortraits[Math.floor(Math.random() * monsterPortraits.length)]);