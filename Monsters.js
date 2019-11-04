
// THIS IS THE LOOP I USED TO GENERATE the data for local storage testingd
// for (var i = 0; i < 50; i++) {
//     getMonster();
// }

var searchQuery = "";

// QUERY 3----MONSTERS TABLE-------------------------------------------      
//  from the Monsters table we can get: name, hit_points, hit_dice, challenge_rating
// searchQuery = "monsters/?name=Adult+Bronze+Dragon";

// var monsterArray = [
//     [],[],[],[]
// ];

var monsterArray = JSON.parse(localStorage.getItem('DnD') || "[ [],[],[],[] ]");


function getMonster() {
    var rdm = Math.floor(Math.random() * 325);
    searchQuery = "monsters/" + rdm.toString();

    $.ajax({
        url: "http://dnd5eapi.co/api/" + searchQuery,
        method: "GET"
    }).then(function (response) {

        setMonster(response);
    });

}

function setMonster(monster) {

    var newMonster = {};
    newMonster.name = monster.name;
    newMonster.hit_dice = monster.hit_dice;
    newMonster.hit_points = monster.hit_points;
    newMonster.challenge_rating = monster.challenge_rating;
    newMonster.imageUrl = 'https://fakeimg.pl/200x200/ff0000,128/333333,255/?text=' + monster.name + '&font=lobster'
    console.log("--------------------------");
    console.log(monster.name);
    console.log(monster.hit_dice);
    console.log(monster.hit_points);
    console.log(monster.challenge_rating);
    console.log("--------------------------");

    if (monster.challenge_rating < 1) {
        // Easy
        monsterArray[0].push(newMonster);

    } else if (monster.challenge_rating < 4) {
        // Medium
        monsterArray[1].push(newMonster);
    } else if (monster.challenge_rating < 9) {
        // Hard
        monsterArray[2].push(newMonster);
    } else {
        // INSANE
        monsterArray[3].push(newMonster);
    }           
    
    localStorage.setItem('DnD', JSON.stringify(monsterArray));

}
