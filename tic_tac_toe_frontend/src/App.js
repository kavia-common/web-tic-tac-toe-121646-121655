import React, { useMemo, useState } from 'react';
import './App.css';

/**
 * Calculate the winner of a Tic Tac Toe board.
 * @param {Array<('X'|'O'|null)>} squares - Flat 3x3 board represented as an array of 9 cells.
 * @returns {{ winner: ('X'|'O'|null), line: number[]|null }} The winner (if any) and the winning line indices.
 */
function calculateWinner(squares) {
  const lines = [
    [0, 1, 2], // rows
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6], // cols
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8], // diags
    [2, 4, 6]
  ];

  for (const [a, b, c] of lines) {
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return { winner: squares[a], line: [a, b, c] };
    }
  }
  return { winner: null, line: null };
}

/**
 * Create a fresh empty board of 9 cells.
 * @returns {Array<null>} The initialized board.
 */
function createEmptyBoard() {
  return Array(9).fill(null);
}

// PUBLIC_INTERFACE
/**
 * The main app component rendering a minimalistic Tic Tac Toe game.
 * - Light theme
 * - Centered 3x3 board
 * - Status bar at the top showing turn or result
 * - Real-time updates on moves
 * - Win/draw detection
 * - Reset button below the board
 * - Clear player turn indication
 */
function App() {
  const [board, setBoard] = useState(createEmptyBoard());
  const [xIsNext, setXIsNext] = useState(true);

  const { winner, line } = useMemo(() => calculateWinner(board), [board]);
  const isDraw = useMemo(() => !winner && board.every(Boolean), [board]);
  const statusText = winner
    ? `Winner: ${winner}`
    : isDraw
      ? 'Draw!'
      : `Next: ${xIsNext ? 'X' : 'O'}`;

  const handleClick = (index) => {
    if (board[index] || winner) return; // ignore clicks on filled squares or after game end
    const nextBoard = board.slice();
    nextBoard[index] = xIsNext ? 'X' : 'O';
    setBoard(nextBoard);
    setXIsNext((prev) => !prev);
  };

  const resetGame = () => {
    setBoard(createEmptyBoard());
    setXIsNext(true);
  };

  return (
    <div className="app">
      <div className="game-container">
        <h1 className="title">Tic Tac Toe</h1>

        <div className="status-bar" role="status" aria-live="polite">
          {statusText}
        </div>

        <div className="turn-indicator" aria-label="Player turn indicator">
          <span
            className={`player-badge ${xIsNext ? 'active' : ''}`}
            aria-current={xIsNext ? 'true' : 'false'}
            aria-label={`Player X ${xIsNext ? 'active' : 'inactive'}`}
          >
            X
          </span>
          <span className="vs" aria-hidden="true">vs</span>
          <span
            className={`player-badge ${!xIsNext ? 'active' : ''}`}
            aria-current={!xIsNext ? 'true' : 'false'}
            aria-label={`Player O ${!xIsNext ? 'active' : 'inactive'}`}
          >
            O
          </span>
        </div>

        <div className="board" role="grid" aria-label="Tic Tac Toe Board">
          {board.map((value, i) => {
            const isWinning = line?.includes(i);
            const disabled = Boolean(winner) || Boolean(value);
            return (
              <button
                key={i}
                className={`square ${isWinning ? 'winning' : ''}`}
                onClick={() => handleClick(i)}
                aria-label={`Square ${i + 1}: ${value ?? 'empty'}`}
                aria-disabled={disabled ? 'true' : 'false'}
                disabled={disabled}
                role="gridcell"
              >
                <span>{value}</span>
              </button>
            );
          })}
        </div>

        <div className="controls">
          <button className="btn" onClick={resetGame} aria-label="Reset the game">
            Reset
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
