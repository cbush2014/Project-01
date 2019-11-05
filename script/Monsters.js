
    
    jQuery.ajaxPrefilter(function (options) {
        if (options.crossDomain && jQuery.support.cors) {
            options.url = "http://uncc-cors-proxy.herokuapp.com/" + options.url;
        }
    });
    
    var searchQuery = "";
    // QUERY 3----MONSTERS TABLE-------------------------------------------      
    //  from the Monsters table we can get: name, hit_points, hit_dice, challenge_rating
    // searchQuery = "monsters/?name=Adult+Bronze+Dragon";
    // var monsterArray = [
    //     [],[],[],[]
    // ];


    var easy = 0;
    var med = 1;
    var hard = 2;
    var insane = 3;
    // set threshold vars for limits to determine what difficulty or api challenge_rating of monsters
    var easyThreshold = 1;
    var medThreshold = 4;
    var hardThreshold = 9;
    var insaneThreshold = 99;

    // set variable for the total number of monster records retrieved from api monsters table
    var numTotalMonsters = 0;


    var monsterArray = JSON.parse(localStorage.getItem('DnD') || "[ [],[],[],[] ]");

    // retrieve 1 monster from the DnD api directly using the specific monster's index
    // these currently range from 1 to 325
    function getMonsterIDX(Idx) {
        searchQuery = "monsters/" + Idx.toString();

        $.ajax({
            url: "http://dnd5eapi.co/api/" + searchQuery,
            method: "GET"
        }).then(function (response) {

            setMonster(response);
        });
    }

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
        newMonster.damage_bonus = Math.floor((monster.strength / 3) + 1);
        newMonster.hit_points = monster.hit_points;
        newMonster.challenge_rating = monster.challenge_rating;
        newMonster.imageUrl = 'https://fakeimg.pl/200x200/ff0000,128/333333,255/?text=' + monster.name + '&font=lobster'
        newMonster.damage_dice = "";
        newMonster.damage_bonus = "";
        if (monster.actions !== undefined) {

            for (i = 0; i < monster.actions.length; i++) {
                // loop thru records to find one with damage dice set and set bonus too
                if (monster.actions[i].damage_dice !== null) {
                    newMonster.damage_dice = monster.actions[i].damage_dice;
                    newMonster.damage_bonus = monster.actions[i].damage_bonus;
                    i = monster.actions.length;
                } else {
                    newMonster.damage_dice = "";
                    newMonster.damage_bonus = "";
                }
            }
        }

        newMonster.hit_dice = monster.hit_dice;
        newMonster.index = monster.index;
        if (monster.challenge_rating < easyThreshold) {
            // Easy
            monsterArray[0].push(newMonster);
        } else if (monster.challenge_rating < medThreshold) {
            // Medium
            monsterArray[1].push(newMonster);
        } else if (monster.challenge_rating < hardThreshold) {
            // Hard
            monsterArray[2].push(newMonster);
        } else {
            // INSANE
            monsterArray[3].push(newMonster);
        }

        localStorage.setItem('DnD', JSON.stringify(monsterArray));
    }


    // this function should return 1 random monster object from the already loaded monsterArray
    // the difficulty argument is passed in to determine what level of monster we return
    // difficulty levels are easy, med, hard, and insane
    // 
    function getRandomBattleMonsterFromArray(difficulty) {
     
        var rdm = Math.floor(Math.random() * (monsterArray[difficulty].length));
        return monsterArray[difficulty][rdm];
    }


    function loadMonsterArrays() {
        for (var i = 1; i < 325; i++) {
            // getMonsterIDX(i);
            getMonsterIDX(i);
        }

        }
    
    function monsterImg() {
        $("#monsterIMG").attr("src", "https://www.google.com/search?q=bear&rlz=1C1CHBF_enUS862US862&sxsrf=ACYBGNSBan4k1p_d33NN_QsW_NYNWsf8BQ:1572891437079&source=lnms&tbm=isch&sa=X&ved=0ahUKEwjz_YGbldHlAhUHZd8KHaZDDXEQ_AUIEigB&biw=1536&bih=722")
    }

    $(document).ready(loadMonsterArrays);
    $(document).ready(getRandomBattleMonsterFromArray(easy);
    console.log(getRandomBattleMonsterFromArray(easy));

    
    // var keyword = monster.name;
    // $(document).ready(function () {
    //     $.getJSON("http://api.flickr.com/services/feeds/photos_public.gne?jsoncallback=?",
    //         {
    //             tags: keyword,
    //             tagmode: "any",
    //             format: "json"
    //         },
    //         function (data) {
    //             var rnd = Math.floor(Math.random() * data.items.length);
    //             var image_src = data.items[rnd]['media']['m'].replace("_m", "_b");
    //             $('body').css('background-image', "url('" + image_src + "')");
    //         });
    // });
