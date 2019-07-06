// Game controls:
// 1. Select Pokemon
// 2. Select Opponent
// 3. When clicking on "attack," attach will increase and my HP will go down with their defense
// 4. WIN - opponent will leave the screen 
// 4A. Player selects new opponent
// 4B. LOSE - show reset
// 5. Reset

$(document).ready(function () {
    // 1. Select Pokemon
    // pokemon Array

    var pokemonSet = [
        {
            name: 'Charmander',
            idnum: 0,
            ogHp: 70,
            hp: 70,
            attack: 7,
            defense: 15,
            img: './assets/img/charmander.png'
        },
        {
            name: 'Dugtrio',
            idnum: 1,
            ogHp: 90,
            hp: 90,
            attack: 6,
            defense: 13,
            img: './assets/img/dugtrio.png'
        },
        {
            name: 'Eevee',
            idnum: 2,
            ogHp: 60,
            hp: 60,
            attack: 5,
            defense: 10,
            img: './assets/img/eve.png'
        },
        {
            name: 'Persian',
            idnum: 3,
            ogHp: 100,
            hp: 100,
            attack: 5,
            defense: 10,
            img: './assets/img/persian.png'
        },
        {
            name: 'Pikachu',
            idnum: 4,
            ogHp: 70,
            hp: 70,
            attack: 10,
            defense: 20,
            img: './assets/img/pikachu.png'
        },
        {
            name: 'Wailmer',
            idnum: 5,
            ogHp: 130,
            hp: 130,
            attack: 7,
            defense: 17,
            img: './assets/img/wailmer.png'
        },
    ]

    // Play button

    $(".startbutton").on("click", function () {
        $(".game").show();
        $(".gameboard").hide();
        $(".startbutton").hide();
        $(".head").css("position", "fixed");
        $(".head").css("left", "0");
        $(".head").css("bottom", "0");
        $(".head").css("font-size", "11px");
        $(".head").css("width", "280px");
        $(".head").css("margin", "5px 5px 5px 5px");
        $(".head").css("padding", "5px 5px 5px 5px");
        initiateGame();
    })
    // Initiation of the Game

    var userPokemon;
    var userPokemonName;
    var userHP;
    var userAttack;

    var enemyPokemon;
    var enemyPokemonName;
    var enemyHP;
    var enemyDefense;
    var enemiesLeft = 5;

    var attackButton;
    var resetButton;
    var PlayAgainButton;

    var remainingPokemon;

    var battling = false;

    function initiateGame() {

        for (var selectedPokemon of pokemonSet) {

            // creating a Div for every individual pokemon
            var pokemon = $("<div>");
            // giving all pokemon a common class
            pokemon.addClass("individualpokemon");
            // giving each individual Div ID
            pokemon.attr("idNum", selectedPokemon.idnum);
            // giving each pokemon individual ID and class
            pokemon.append('<img src=' + selectedPokemon.img + " class='pokemonImage selectedPokemon' idNum=" + selectedPokemon.idnum + ">"); // adding associated image

            var stats = $("<div class='statbar row'>");
            stats.append("<span class='pokeAttack stat col-3'> Atk:" + selectedPokemon.attack + "</spam>")
            stats.append("<span class='pokeName stat col-6'>" + selectedPokemon.name + "</spam>");
            stats.append("<span class='pokeHP stat col-3'> HP:" + selectedPokemon.hp + "</spam>")

            stats.appendTo(pokemon);

            pokemon.appendTo('.allPoke'); // adding to after instructions 
        };
    };

    // Choosing User Pokemon Click Function
    $(".allPoke").on("click touchstart", ".individualpokemon", function () {
        // assigning correct HP and Attack
        userPokemon = parseInt($(this).attr("idNum"));
        userPokemonName = pokemonSet[userPokemon].name;
        userHP = pokemonSet[userPokemon].hp;
        userAttack = pokemonSet[userPokemon].attack;

        // moving selected pokemon to correct board
        $('.instructions').hide();
        $('.gameboard').show();

        var userDiv = $("div[idNum=" + userPokemon + "]");
        userDiv.attr("class", "currentPoke userDiv");
        $(userDiv).detach().appendTo("#playercard"); // moving it to the player area

        // changing attack to defend for enemy
        for (var pokemonNotSelected of pokemonSet) {
            defensePokemon = pokemonNotSelected.idnum;
            if (defensePokemon != userPokemon) {
                var enemyDiv = $("div[idNum=" + defensePokemon + "]");
                // moving remaining Pokemon to the Enemy setting
                $(enemyDiv).detach().appendTo("#remainingcards");
                // adding classes to enemy div
                $(enemyDiv).attr("class", "enemyDiv enemyPoke col-6");
                $("div[idNum=" + defensePokemon + "] .statbar .pokeAttack").text("Def:" + pokemonSet[defensePokemon].defense);
                // show instructgions to choose opponent next
                $(".action").show();
            }
        }
    });

    // 2. Select Current Opponent
    $("#remainingcards").on("click touchstart", ".enemyDiv", function () {
        if (!battling) {
            // set up Hp and and Defense
            enemyPokemon = parseInt($(this).attr("idNum"));
            enemyPokemonName = pokemonSet[enemyPokemon].name;
            enemyHP = pokemonSet[enemyPokemon].hp;
            enemyDefense = pokemonSet[enemyPokemon].defense;

            var enemyDiv = $("div[idNum=" + enemyPokemon + "]");
            enemyDiv.attr("class", "enemyDiv enemyPoke current-enemy"); //adds current-enemy class
            //move Enemy to Battle area
            $(enemyDiv).detach().appendTo("#enemycard");
            battling = true;

            $(".action").hide();

            attackButton = $("<button>Attack</button>");
            attackButton.addClass("attackbutton actionbutton")
            attackButton.appendTo(".current-enemy")

            resetButton = $("<button>Play Again</button>");
            resetButton.addClass("resetbutton actionbutton")
            resetButton.appendTo(".current-enemy")
            $(".resetbutton").hide();


        }
    });

    // 3. When clicking on "attack," attach will double and my HP will go down with their attach
    $("#enemycard").on("click touchstart", ".attackbutton", function () {
        if (battling) {
            userHP -= enemyDefense;
            enemyHP -= userAttack;
            userAttack = userAttack + pokemonSet[userPokemon].attack;
            updateStats();
            progressReport();
        };
    });

    function updateStats() {
        // changing stats
        $("#playercard .currentPoke .statbar .pokeAttack").text("Atk:" + userAttack);
        $("#playercard .currentPoke .statbar .pokeHP").text("HP:" + userHP);
        $("#enemycard .enemyPoke .statbar .pokeHP").text("HP:" + enemyHP);

        // adding info
        $("#battleinfo").html(userPokemonName + " took " + enemyDefense + " damage, while " + enemyPokemonName + " took " + userAttack + " damage. <br/> Your current HP: " + userHP + "<br/> Opponents current HP: " + enemyHP);

    }

    // 4. WIN/LOSE BATTLE - opponent will leave the screen 
    function progressReport() {
        if (userHP <= 0) { // if player HP is 0 or below
            $(".attackbutton").hide(); // hide attack button
            $("#battleinfo").text("Oh No! Looks like " + userPokemonName + " has fainted."); 
            $(".resetbutton").show(); //unhide reset button
        }
        else if (enemyHP <= 0) { // if enemy HP is 0 or below
            $(".current-enemy").remove(); 
            battling = false;
            enemiesLeft--; //reduce counter of enemies remaining (internal counter)

            if (enemiesLeft === 0) { //if no enemies remain
                $("#battleinfo").text("You have won all your battles! Congradulations!"); 
                PlayAgainButton = $("<button>Play Again</button>");
                PlayAgainButton.addClass("resetbutton actionbutton")
                PlayAgainButton.appendTo("#enemycard")
                
            }
            else { //if there are still enemies left
                //display won battle message
                $("#battleinfo").text("You have defeated " + enemyPokemonName + "! Please select a new opponent.");
            }
        }
    }

    // 5. Reset
    $("#enemycard").on("click touchstart", ".resetbutton", function () {
       //reset all variables
		playerHp = pokemonSet[userPokemon].ogHp;
		playerAttack = null;
		enemyHp = pokemonSet[enemyPokemon].ogHp;
		enemyAttack = null;
		playerId = null;
		enemyId = null;
		enemiesLeft = pokemonSet.length-1;
        battling = false;

        $(".game").show();
        $(".instructions").show();
        $(".gameboard").hide();

		$("#playercard .currentPoke").remove(); //remove player div
        $("#enemycard .enemyPoke").remove();//remove current enemy div
        $("#remainingcards .enemyPoke").remove();//remove current enemy div
		$("#battleinfo").text(""); //reset battle text

        
        initiateGame();
    });


});