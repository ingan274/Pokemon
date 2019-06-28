// Game controls:
// 1. Select Pokemon
// 2. Select Opponent
// 3. When clicking on "attack," attach will double and my HP will go down with their attach
// 4. WIN - opponent will leave the screen 
// 4A. Player selects new opponent
// 5. LOSE - game is reset

$(document).ready(function () {
// 1. Select Pokemon
// pokemon Array

var pokemon = [
    {
        name:'charmander';
        hp: 139;
        attack: 2;
        counterattack: 3;
        img: '../assets/img/charmander.png'
    },
    {
        name: 'dugtrio';
        hp: 135;
        attack: 10;
        counterattack: 6;
        img: '../assets/img/dugtrio.png'
    },
    {
        name: 'eevee';
        hp: 155;
        attack: 5;
        counterattack: 10;
        img: '../assets/img/eve.png'
    },
    {
        name: 'persian';
        hp: 165;
        attack: 10;
        counterattack: 10;
        img: '../assets/img/persian.png'
    },
    {
        name: 'pikachu';
        hp: 135;
        attack: 15;
        counterattack: 10;
        img: '../assets/img/pikachu.png'
    },
    {
        name: 'wailmer';
        hp: 230;
        attack: 12;
        counterattack: 5;
        img: '../assets/img/wailmer.png'
    },
]
// 2. Select Opponent
// 3. When clicking on "attack," attach will double and my HP will go down with their attach
// 4. WIN - opponent will leave the screen 
// 4A. Player selects new opponent
// 5. LOSE - game is reset

});