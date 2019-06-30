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
            ogHp: 70,
            hp: 70,
            attack: 20,
            defense: 33,
            img: 'assets/img/charmander.png'
        },
        {
            name: 'Dugtrio',
            ogHp: 90,
            hp: 90,
            attack: 40,
            defense: 30,
            img: 'assets/img/dugtrio.png'
        },
        {
            name: 'Eevee',
            ogHp: 60,
            hp: 60,
            attack: 25,
            defense: 20,
            img: 'assets/img/eve.png'
        },
        {
            name: 'Persian',
            ogHp: 100,
            hp: 100,
            attack: 30,
            defense: 20,
            img: 'assets/img/persian.png'
        },
        {
            name: 'Pikachu',
            ogHp: 70,
            hp: 70,
            attack: 30,
            defense: 40,
            img: 'assets/img/pikachu.png'
        },
        {
            name: 'Wailmer',
            ogHp: 130,
            hp: 130,
            attack: 70,
            defense: 35,
            img: 'assets/img/wailmer.png'
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
    var enemyPokemon;
    var userHP;
    var userAttack;
    var enemyHP;
    var enemyDefense;
    var battling = false;



    function initiateGame() {

        for (var selectedPokemon of pokemonSet) {
            
            // creating a Div for every individual pokemon
            var pokemon = $("<div>");
            // giving all pokemon a common class
            pokemon.addClass("pokemon col-4");
            // giving each pokemon individual ID
            pokemon.attr('id', 'pokemon-' + selectedPokemon.name);
            pokemon.append('<img src=' + selectedPokemon.img + " class='pokemonImage'>"); // adding associated image
            
            var stats = $("<div class='statbar row'>");
            stats.append("<span class='pokeAttack stat col-4'> Atk:" + selectedPokemon.attack + "</spam>")
            stats.append("<span class='pokeName stat col-4'>" + selectedPokemon.name + "</spam>");
            stats.append("<span class='pokeHP stat col-4'> HP: " + selectedPokemon.hp + "</spam>")

            stats.appendTo(pokemon);

            pokemon.appendTo('.allPoke'); // adding to after instructions

        }
    }

    // 2. Select Opponent
    // 3. When clicking on "attack," attach will double and my HP will go down with their attach
    // 4. WIN - opponent will leave the screen 
    // 4A. Player selects new opponent
    // 5. LOSE - game is reset

});