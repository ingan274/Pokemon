// Game controls:
// 1. Select Pokemon
// 2. Select Opponent
// 3. When clicking on "attack," attach will increase and my HP will go down with their defense
// 4. WIN - opponent will leave the screen 
// 4A. Player selects new opponent
// 5. LOSE - game is reset

$(document).ready(function () {
    // 1. Select Pokemon
    // pokemon Array

    var pokemonSet = [
        {
            name: 'Charmander',
            idnum: 0,
            ogHp: 70,
            hp: 70,
            attack: 20,
            defense: 33,
            img: './assets/img/charmander.png'
        },
        {
            name: 'Dugtrio',
            idnum: 1,
            ogHp: 90,
            hp: 90,
            attack: 40,
            defense: 30,
            img: './assets/img/dugtrio.png'
        },
        {
            name: 'Eevee',
            idnum: 2,
            ogHp: 60,
            hp: 60,
            attack: 25,
            defense: 20,
            img: './assets/img/eve.png'
        },
        {
            name: 'Persian',
            idnum: 3,
            ogHp: 100,
            hp: 100,
            attack: 30,
            defense: 20,
            img: './assets/img/persian.png'
        },
        {
            name: 'Pikachu',
            idnum: 4,
            ogHp: 70,
            hp: 70,
            attack: 30,
            defense: 40,
            img: './assets/img/pikachu.png'
        },
        {
            name: 'Wailmer',
            idnum: 5,
            ogHp: 130,
            hp: 130,
            attack: 70,
            defense: 35,
            img: './assets/img/wailmer.png'
        },
    ]

    // Play button

    $(".startbutton").on("click", function () {
        $(".game").show();
        $(".gameboard").hide();
        $(".startbutton").hide();
        initiateGame();
    })
    // Initiation of the Game

    var userPokemon;
    var userHP;
    var userAttack;

    var enemyPokemon;
    var enemyHP;
    var enemyDefense;

    var remainingPokemon;

    var battling = false;

    function initiateGame() {

        for (var selectedPokemon of pokemonSet) {

            // creating a Div for every individual pokemon
            var pokemon = $("<div>");
            // giving all pokemon a common class
            pokemon.addClass("individualpokemon");
            // giving each individual Div ID
            pokemon.attr("idNum", selectedPokemon.idnum)
            // giving each pokemon individual ID and class
            pokemon.append('<img src=' + selectedPokemon.img + " class='pokemonImage selectedPokemon' idNum=" + selectedPokemon.idnum + ">"); // adding associated image

            var stats = $("<div class='statbar row'>");
            stats.append("<span class='pokeAttack stat col-4'> Atk:" + selectedPokemon.attack + "</spam>")
            stats.append("<span class='pokeName stat col-4'>" + selectedPokemon.name + "</spam>");
            stats.append("<span class='pokeHP stat col-4'> HP:" + selectedPokemon.hp + "</spam>")

            stats.appendTo(pokemon);

            pokemon.appendTo('.allPoke'); // adding to after instructions 
        };

        $(".individualpokemon").on('click', function () {
            // assigning correct HP and Attack
            userPokemon = ($(this).attr("idNum"));
            userHP = pokemonSet[userPokemon].hp;
            userAttack = pokemonSet[userPokemon].attack;

            // moving selected pokemon to correct board
            $('.instructions').hide()
            $('.gameboard').show()

            var userDiv = $("div[idNum=" + userPokemon + "]");
            userDiv.attr("class", "currentPoke userDiv");
            $(userDiv).detach().appendTo("#playercard"); // moving it to the player area

            // moving remaining Pokemon to the Enemy setting
            $(".individualpokemon").not(pokemonSet[userPokemon]).detach().appendTo("#remainingcards");

            // adding classes to enemy div
            $(".individualpokemon").not(pokemonSet[userPokemon]).attr("class", "enemyDiv enemyPoke col-6");
            // changing attack to defend for enemy
            for (var pokemonNotSelected of pokemonSet) {
                defensePokemon = pokemonNotSelected.idnum;

                $(".enemyDiv .statbar .pokeAttack").text("Def:" + pokemonSet[defensePokemon].defense);

                console.log(pokemonSet[defensePokemon].defense)
            }
        });


        // 2. Select Opponent


        // 3. When clicking on "attack," attach will double and my HP will go down with their attach
        // 4. WIN - opponent will leave the screen 
        // 4A. Player selects new opponent
        // 5. LOSE - game is reset
    }

});