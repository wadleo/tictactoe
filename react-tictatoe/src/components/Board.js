import React from 'react'
import Box from './Box'

const Board = props => {

    const drawBox = function(index) {
        return(
            <Box key={index} value={props.plays[index]} onClick={() => props.onClick(index)} />
        );
    }

    const drawBoxRow = function(start, count=3) {
        const row = []
        for (let index = start; index < count+start; index++) {
            const box = drawBox(index)
            row.push(box);
        }
        return(
            <div className="board-row">
                { row }
            </div>
        );
    }

    return (
        <div className="board">
            { drawBoxRow(0) }

            { drawBoxRow(3) }

            { drawBoxRow(6) }
        </div>

    );
}

export default Board;