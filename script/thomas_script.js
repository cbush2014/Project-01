
//-- To get the DND API working
// jQuery.ajaxPrefilter(function (options) {
//     if (options.crossDomain && jQuery.support.cors) {
//         options.url = "http://uncc-cors-proxy.herokuapp.com/" + options.url;
//     }
// });

//-- Calling the DND API
// var Goblin = $.ajax({
//     url: "http://dnd5eapi.co/api/monsters/150/actions",
//     method: "GET"
// }).then(function (response) {
//     console.log(response);
// });


//-- Creating the Arrays of monsters

// crOne = {
//     gob =[$.ajax({
//         url: "http://dnd5eapi.co/api/monsters/150/actions",
//         method: "GET"
//     }).then(function (response) {
//         console.log(response);
//     })
//         ,]
// }

//-- RPS code
$("#fastAttack").on("click", rockPS())

$("#strongAttack").on("click", rockPS())

$("#counterAttack").on("click", rockPS())

rockPS = function (event) {
    event.preventPropagation();
    var monsterAttacks = ["f", "s", "c"];

    // Randomly chooses a choice from the options array. This is the Computer's guess.
    var computerGuess = monsterAttacks[Math.floor(Math.random() * monsterAttacks.length)]

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
