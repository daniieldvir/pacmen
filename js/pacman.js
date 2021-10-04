'use strict'
const PACMAN = '<img class="pacman" src="img/pacmanRight.png"/>';
var gStrHtmlPacman = ''

var gDeadGhost = [];

var gPacman;
function createPacman(board) {
    gPacman = {
        location: {
            i: 3,
            j: 5
        },
        isSuper: false
    }
    board[gPacman.location.i][gPacman.location.j] = PACMAN
}

function movePacman(ev) {

    if (!gGame.isOn) return;
    // console.log('ev', ev);
    var nextLocation = getNextLocation(ev)

    if (!nextLocation) return;
    // console.log('nextLocation', nextLocation);

    var nextCell = gBoard[nextLocation.i][nextLocation.j]
    // console.log('NEXT CELL', nextCell);

    if (nextCell === WALL) return;

    if (nextCell === POWER_FOOD && gPacman.isSuper) return

    if (nextCell === FOOD || nextCell === POWER_FOOD) {
        updateScore(1);
        gFoodCount--
    }

    if (nextCell === POWER_FOOD) {
        gPacman.isSuper = true;

        setTimeout(function () {
            gPacman.isSuper = false;

            for (var i = 0; i < gDeadGhost.length; i++) {
                gGhosts.push(gDeadGhost[i])
            }
            gDeadGhost = [];
        }, 5000);
    }

    if (nextCell === CHERRY) {
        updateScore(10)
    }

    if (gFoodCount === 0) {
        getVictory()
    }

    else if (nextCell === GHOST) {
        if (gPacman.isSuper === false) {
            gameOver();
            renderCell(gPacman.location, EMPTY)
            return;
        }

        for (var i = 0; i < gGhosts.length; i++) {
            if (gGhosts[i].location.i === nextLocation.i && gGhosts[i].location.j === nextLocation.j) {
                gDeadGhost.push(gGhosts.splice(i, 1)[0])
            }
        }
    }
    // update the model
    gBoard[gPacman.location.i][gPacman.location.j] = EMPTY;

    // update the dom
    renderCell(gPacman.location, EMPTY);

    gPacman.location = nextLocation;

    // update the model
    gBoard[gPacman.location.i][gPacman.location.j] = PACMAN;
    // update the dom
    renderCell(gPacman.location, gStrHtmlPacman);
}


function getNextLocation(eventKeyboard) {
    var nextLocation = {
        i: gPacman.location.i,
        j: gPacman.location.j
    }
    switch (eventKeyboard.code) {
        case 'ArrowUp':
            gStrHtmlPacman = '<img class="pacman" src="img/pacmanUp.png"/>'
            nextLocation.i--;
            break;
        case 'ArrowDown':
            gStrHtmlPacman = '<img class="pacman" src="img/pacmanDown.png"/>'
            nextLocation.i++;
            break;
        case 'ArrowLeft':
            gStrHtmlPacman = '<img class="pacman" src="img/pacmanLeft.png"/>'
            nextLocation.j--;
            break;
        case 'ArrowRight':
            gStrHtmlPacman = '<img class="pacman" src="img/pacmanRight.png"/>'
            nextLocation.j++;
            break;
        default:
            return null;
    }
    return nextLocation;
}