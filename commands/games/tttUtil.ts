const fs = require('fs')

module.exports = {
    botMove: botMove,
    checkWin: checkWin,
    footerDetermineText,
    gameOverResponse,
    lastMoveDetermineName,
    lastMoveDetermineValue,
    sendTicTacToeBoard,
    visualBoardGen
}


function botMove(gameBoard: any) {
    var availableMoves = []
    for (let i = 0; i < gameBoard.length; i++) {
        if (gameBoard[i] == '-') {
            availableMoves.push(i)
        }
    }

    console.log('Available moves for AI: ' + availableMoves)

    var testBoard = []

    for (let a = 0; a < availableMoves.length; a++) {
        testBoard = gameBoard.slice(0)
        testBoard[availableMoves[a]] = 'o'
        console.log('Possible board configuration: ' + testBoard)
        if (checkWin(availableMoves[a], testBoard)) {
            console.log('Winning move found: ' + availableMoves[a])
            return availableMoves[a]
        }
    }

    // No easy win :(

    for (let a = 0; a < availableMoves.length; a++) {
        testBoard = gameBoard.slice(0)
        testBoard[availableMoves[a]] = 'x'
        console.log('Possible board configuration: ' + testBoard)
        if (checkWin(availableMoves[a], testBoard)) {
            console.log('Winning move found for player: ' + availableMoves[a])
            console.log('Inhibiting move...')
            return availableMoves[a]
        }
    }

    // Random AI fallback
    return availableMoves[randInt(0, availableMoves.length - 1)]
}


function checkWin(lastMove: any, gameBoard: any) {
    /*
   *  [ gameboard[0], gameboard[1], gameboard[2] ]
   *  [ gameboard[3], gameboard[4], gameboard[5] ]
   *  [ gameboard[6], gameboard[7], gameboard[8] ]
   */
    var solution = ''

    for (let i = 0; i < 3; i++) {
        solution += gameBoard[lastMove]
    }

    console.log('Solution for comparison: ' + solution)

    // Start cracking

    switch (lastMove) {
        case 0:
            if (gameBoard[0] + gameBoard[1] + gameBoard[2] == solution) return true
            if (gameBoard[0] + gameBoard[3] + gameBoard[6] == solution) return true
            if (gameBoard[0] + gameBoard[4] + gameBoard[8] == solution) return true
            break

        case 1:
            if (gameBoard[1] + gameBoard[0] + gameBoard[2] == solution) return true
            if (gameBoard[1] + gameBoard[4] + gameBoard[7] == solution) return true
            break

        case 2:
            if (gameBoard[2] + gameBoard[0] + gameBoard[1] == solution) return true
            if (gameBoard[2] + gameBoard[4] + gameBoard[6] == solution) return true
            if (gameBoard[2] + gameBoard[5] + gameBoard[8] == solution) return true
            break

        case 3:
            if (gameBoard[3] + gameBoard[0] + gameBoard[6] == solution) return true
            if (gameBoard[3] + gameBoard[4] + gameBoard[5] == solution) return true
            break

        case 4:
            if (gameBoard[4] + gameBoard[0] + gameBoard[8] == solution) return true
            if (gameBoard[4] + gameBoard[1] + gameBoard[7] == solution) return true
            if (gameBoard[4] + gameBoard[2] + gameBoard[6] == solution) return true
            if (gameBoard[4] + gameBoard[3] + gameBoard[5] == solution) return true
            break

        case 5:
            if (gameBoard[5] + gameBoard[2] + gameBoard[8] == solution) return true
            if (gameBoard[5] + gameBoard[3] + gameBoard[4] == solution) return true
            break

        case 6:
            if (gameBoard[6] + gameBoard[0] + gameBoard[3] == solution) return true
            if (gameBoard[6] + gameBoard[2] + gameBoard[4] == solution) return true
            if (gameBoard[6] + gameBoard[7] + gameBoard[8] == solution) return true
            break

        case 7:
            if (gameBoard[7] + gameBoard[1] + gameBoard[4] == solution) return true
            if (gameBoard[7] + gameBoard[6] + gameBoard[8] == solution) return true
            break

        case 8:
            if (gameBoard[8] + gameBoard[0] + gameBoard[4] == solution) return true
            if (gameBoard[8] + gameBoard[2] + gameBoard[5] == solution) return true
            if (gameBoard[8] + gameBoard[6] + gameBoard[7] == solution) return true
            break
    }
    return false
}


function footerDetermineText(playerTurn: any, Player1: any, Player2: any) {
    switch (playerTurn) {
        case 1:
            return Player1 + '\'s turn'
        case 2:
            return Player2 + '\'s turn'
    }
}


function gameOverResponse(gameID: any, channel: any, gameState: any, masterState: any, winner: any) {
    switch (winner) {
        case 'x':
            channel.send('Game over. ' + gameState.Player1.name + ' won.')
            break

        case 'o':
            channel.send('Game over. ' + gameState.Player2.name + ' won.')
            break

        case '-':
            channel.send('It\'s a draw!')
            break
    }

    delete masterState[gameState.Player1.id]

    if (gameState.Player2.id != null) {
        delete masterState[gameState.Player2.id]
    }

    masterStateStore(masterState)

    fs.unlink('GS' + gameID + '.json', (err: any) => {
        if (err) throw err
    })
}


function lastMoveDetermineName(lastMove: any, sign: any) {
    if (lastMove === null) {
        return 'No prior moves'  // Set at game start
    } else {
        return 'Tile ' + (lastMove + 1) + ' captured by ' + sign.toUpperCase() + '.'  // Once lastMove is declared
    }
}


function lastMoveDetermineValue(lastMove: any, sign: any) {
    let lastBoard = []
    for (let i = 0; i < 9; i++) lastBoard.push('-')
    if (lastMove != null) lastBoard[lastMove] = sign
    return visualBoardGen(lastBoard)
}



function sendTicTacToeBoard(gameID: any, channel: any, gameState: any, masterState: any, botuser: any) {

    channel.send({
        'embed': {
            'title': 'Tic-Tac-Toe',
            'color': 0xffff00,
            'footer': {
                'text': footerDetermineText(gameState.playerTurn, gameState.Player1.name, gameState.Player2.name)
            },
            'author': {
                'name': botuser.username,
                'icon_url': botuser.avatarURL
            },
            'fields': [
                {
                    'name': lastMoveDetermineName(gameState.lastMove, gameState.gameBoard[gameState.lastMove]),
                    'value': lastMoveDetermineValue(gameState.lastMove, gameState.gameBoard[gameState.lastMove]),
                    'inline': true
                },
                {
                    'name': 'Turn ' + gameState.turn,
                    'value': visualBoardGen(gameState.gameBoard),
                    'inline': true
                }
            ]
        }
    }).then((msg: any) => {
        if (!checkWin(gameState.lastMove, gameState.gameBoard)) {
            markForPurge(gameID, msg)
        }
    })

    if (checkWin(gameState.lastMove, gameState.gameBoard)) {
        gameOverResponse(gameID, channel, gameState, masterState, gameState.gameBoard[gameState.lastMove])
    } else if (gameState.gameBoard.indexOf('-') == -1) {
        gameOverResponse(gameID, channel, gameState, masterState, '-')
    }
}


function visualBoardGen(boardMachine: any) {
    var boardVisual = '```      2'  // Declare the board with a prefix
    for (let i = 0; i < 3; i++) {
        boardVisual += '\n' + (3 * i + 1) + ' ' + boardMachine[3 * i] + ' | ' + boardMachine[3 * i + 1] + ' | ' + boardMachine[3 * i + 2] + ' ' + (3 * i + 3) + '\n'  // Generate a row
        if (i < 2) boardVisual += '  --|---|--'  // Add 2 dividers
    }

    return boardVisual + '      8```'  // Return the board, with the suffix
}

// COMMAND FUNCTIONS

function markForPurge(file: any, msg: any) {
    console.log('Marking message with id: ' + msg.id)
    gameStateAppend(file, 'toBeDeleted', { 'id': msg.id, 'channel': msg.channel.id, 'guild': msg.guild.id })
}

function gameStateParse(file: any) {
    console.log(file)
    let gameState = JSON.parse(fs.readFileSync('GS' + file + '.json', 'utf8'))
    console.log('Gamestate parsed.')
    console.log('Gamestate: ' + JSON.stringify(gameState))
    return gameState
}


function gameStateStore(file: any, gameState: any) {
    fs.writeFileSync('GS' + file + '.json', JSON.stringify(gameState), 'utf8')  // Write it back
    console.log('Game state stored.')
}


function gameStateAppend(file: any, name: any, value: any) {
    let gameState = gameStateParse(file)  // Read it out

    gameState[name] = value  // Append the value

    gameStateStore(file, gameState)  // Write it back

    console.log('Value ' + value + ' for item ' + name + ' stored to game state ' + file + '.')
}


function masterStateStore(masterState: any) {
    fs.writeFileSync('Master State.json', JSON.stringify(masterState), 'utf8')  // Write it back
    console.log('Master state stored.')
}


// GENERAL FUNCTIONS

function randInt(min: any, max: any) {
    min = Math.ceil(min)
    max = Math.floor(max)
    return Math.floor(Math.random() * (max - min + 1)) + min
}