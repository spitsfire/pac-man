/* jshint esversion: 6 */

// create world
let world = [
    [2, 2, 2, 2, 2, 2, 2, 2, 2, 2],
    [2, 0, 1, 2, 1, 1, 1, 1, 1, 2],
    [2, 1, 1, 2, 1, 1, 3, 1, 1, 2],
    [2, 1, 1, 2, 1, 1, 1, 1, 1, 2],
    [2, 1, 1, 1, 1, 1, 2, 2, 2, 2],
    [2, 2, 2, 1, 1, 1, 1, 1, 1, 2],
    [2, 1, 1, 2, 1, 1, 2, 2, 1, 2],
    [2, 1, 1, 1, 1, 1, 1, 2, 1, 2],
    [2, 1, 1, 1, 1, 1, 1, 2, 1, 2],
    [2, 2, 2, 2, 2, 2, 2, 2, 2, 2]
];
// create pacman
let pacman = {
    x: 1,
    y: 1,
    score: 0
};
// display world func
function displayWorld() {
    let output = "";
    for (let i = 0; i < world.length; i++) {
        output += '<div class="row">\n';
        for (let j = 0; j < world[i].length; j++) {
            if (world[i][j] == 2) {
                output += '\t<div class="wall"></div>\n';
            } else if (world[i][j] == 1) {
                output += '\t<div class="coin"></div>\n';
            } else if (world[i][j] == 0) {
                output += '\t<div class="blank"></div>\n';
            } else {
                output += '\t<div class="ghost"></div>\n';
            }
        }
        output += '</div>\n';
    }
    document.getElementById('world').innerHTML = output;
}

// display pacman func
function displayPacman() {
    document.getElementById('pacman').style.top = pacman.y * 30 + 'px';
    document.getElementById('pacman').style.left = pacman.x * 30 + 'px';
}

// display score func
function displayScore() {
    document.getElementById('score').innerHTML = '<p>SCORE: ' + pacman.score + '</p>';
}

// move pacman
document.onkeydown = function (e) {
    if (document.getElementById('pacman') == null) {
        document.getElementById('score').innerHTML = '<p style="color: red">GAME OVER!!!</p> <button type="button" onClick="window.location.reload()">Retry</button>';
    } else if (e.keyCode == 38 && world[pacman.y - 1][pacman.x] != 2) { // up
        pacman.y--;
    } else if (e.keyCode == 40 && world[pacman.y + 1][pacman.x] != 2) { // down
        pacman.y++;
    } else if (e.keyCode == 37 && world[pacman.y][pacman.x - 1] != 2) { // left
        pacman.x--;
    } else if (e.keyCode == 39 && world[pacman.y][pacman.x + 1] != 2) { // right
        pacman.x++;
    }
    // collision
    if (world[pacman.y][pacman.x] == 1) {
        world[pacman.y][pacman.x] = 0;
        pacman.score += 10;
        displayWorld();
        displayScore();
    }
    if (world[pacman.y][pacman.x] == 3) {
        let pacman = document.getElementById('pacman');
        pacman.parentElement.removeChild(pacman);
        document.getElementById('score').innerHTML = '<p style="color: red">GAME OVER!!!</p> <button type="button" onClick="window.location.reload()">Retry</button>';
    }
    displayPacman();
};

displayWorld();
displayPacman();
displayScore();