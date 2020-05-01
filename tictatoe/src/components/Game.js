import React, { useState, useEffect } from 'react'
import Board from './Board'

function Game() {
    const [turn, setTurn] = useState('X')
    const [winner, setWinner] = useState('')
    const [counter, setCounter] = useState(0)
    const [plays, updatePlays] = useState(Array(9).fill(null))
    const [history, updateHistory] = useState([])

    const playRound = function(index) {
        // end game when the value is above 8 or the game has a winner
        if(counter >= 9 || winner !== '')
            return
        
        // indicate that the index has been played
        if(plays[index] == null) {
            plays[index] = turn
            updatePlays(plays)
        } else {
            return
        }

        // update the counter
        setCounter(counter+1)

        // update the history to indicate the last played position for reverting move
        updateHistory(history.concat(index))
        
        // check for a game winner from the 3rd play and end at the 8th play
        let foundWinner = ''
        if(counter > 2 || counter <= 8) {
            // console.log('the game should end with a game winner')
            foundWinner = checkGameStatus()
        }

        // console.log('foundWinner: ', foundWinner)
        if(foundWinner) {
            setWinner(foundWinner)
            setTurn('')
            return
        }

        // switch the player and return
        return turn === 'X'?setTurn('O'): setTurn('X')
    }
  
    const revertPlay = function() {
        // check if there moves
        if(counter < 1)
            return

        // if the game has a winner unset it
        if(winner !== '') 
            setWinner('')

        // console.log('reverting the last move')

        // get the index to be removed
        let lastIndexPlayed = history[history.length -1]

        //revert the history
        let newHistory = history.slice()
        newHistory.pop(lastIndexPlayed)
        updateHistory(newHistory)
        // console.log(history)

        // unset the latest move
        let newPlays = plays.slice()
        newPlays[lastIndexPlayed] = null
        updatePlays(newPlays)
        // console.log(plays)

        // reduce the counter
        setCounter(counter-1)
        // console.log(counter)

        // switch the player and return
        return turn === 'X'?setTurn('O'): setTurn('X')
    }

    const checkGameStatus = function() {

        let winner = ''

        const winningLines = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 4, 8],
            [6, 4, 2],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8]
        ]

        winningLines.forEach(line => {
            const [a, b, c] = line

            if(plays[a] && plays[a] === plays[b] && plays[b] === plays[c]) {
                winner = plays[a]
            }
        })

        return winner
    }

    // useEffect(() => {
    //     console.log('history', history)
    //     console.log('plays', plays)
    //     console.log('counter:', counter)
    //     console.log('winner: ', winner)
    // }, [history, plays, counter, winner])

    return (
      <div className="App">
        <div id="root">
  
          </div>
  
          <div className="winner">
            Game winner: {winner} <br />
            Next player: {turn}
          </div>

          <Board plays={plays} onClick={(i) => playRound(i)} />

          <button className="play" onClick={() => revertPlay()}>Back</button>
      </div>
    
    )
  }

export default Game
