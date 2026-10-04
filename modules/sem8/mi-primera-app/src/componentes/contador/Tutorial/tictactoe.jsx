import { useState } from 'react';
import './tictactoe.css';

function Square({ value, onSquareClick, isWinning }) {
    return (
        <button
            className={`square ${value ? `square-${value}` : ''} ${isWinning ? 'square-winning' : ''}`}
            onClick={onSquareClick}
        >
            {value}
        </button>
    );
}

function Board({ xIsNext, squares, onPlay }) {
    function handleClick(i) {
        if (calculateWinner(squares) || squares[i]) {
            return;
        }
        const nextSquares = squares.slice();
        nextSquares[i] = xIsNext ? 'X' : 'O';
        onPlay(nextSquares);
    }

    const winnerInfo = calculateWinner(squares);
    const winningLine = winnerInfo ? winnerInfo.line : [];
    const isDraw = !winnerInfo && squares.every((square) => square !== null);

    let status;
    if (winnerInfo) {
        status = `¡Ganó ${winnerInfo.winner}!`;
    } else if (isDraw) {
        status = 'Empate';
    } else {
        status = `Turno de ${xIsNext ? 'X' : 'O'}`;
    }

    function renderSquare(i) {
        return (
            <Square
                key={i}
                value={squares[i]}
                onSquareClick={() => handleClick(i)}
                isWinning={winningLine.includes(i)}
            />
        );
    }

    return (
        <>
            <div className={`status ${winnerInfo ? 'status-winner' : ''} ${isDraw ? 'status-draw' : ''}`}>
                {status}
            </div>
            <div className="board-row">
                {renderSquare(0)}
                {renderSquare(1)}
                {renderSquare(2)}
            </div>
            <div className="board-row">
                {renderSquare(3)}
                {renderSquare(4)}
                {renderSquare(5)}
            </div>
            <div className="board-row">
                {renderSquare(6)}
                {renderSquare(7)}
                {renderSquare(8)}
            </div>
        </>
    );
}

export default function Game() {
    const [history, setHistory] = useState([Array(9).fill(null)]);
    const [currentMove, setCurrentMove] = useState(0);
    const xIsNext = currentMove % 2 === 0;
    const currentSquares = history[currentMove];

    const winnerInfo = calculateWinner(currentSquares);
    const isDraw = !winnerInfo && currentSquares.every((square) => square !== null);
    const gameOver = Boolean(winnerInfo) || isDraw;

    function handlePlay(nextSquares) {
        const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
        setHistory(nextHistory);
        setCurrentMove(nextHistory.length - 1);
    }

    function jumpTo(nextMove) {
        setCurrentMove(nextMove);
    }

    function handleRestart() {
        setHistory([Array(9).fill(null)]);
        setCurrentMove(0);
    }

    const moves = history.map((squares, move) => {
        const description = move > 0 ? `Movimiento #${move}` : 'Inicio del juego';
        const isCurrent = move === currentMove;
        return (
            <li key={move}>
                <button
                    className={isCurrent ? 'move-button move-button-active' : 'move-button'}
                    onClick={() => jumpTo(move)}
                >
                    {description}
                </button>
            </li>
        );
    });

    return (
        <div className="game">
            <div className="game-board">
                <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} />
            </div>

            <div className="game-info">
                <button className="restart-button" onClick={handleRestart}>
                    ↺ Reiniciar partida
                </button>
                <h3 className="history-title">Historial de movimientos</h3>
                <ol>{moves}</ol>
            </div>

            {gameOver && (
                <div className="winner-overlay">
                    <div className="winner-card">
                        {winnerInfo ? (
                            <>
                                <div className="winner-trophy">🏆</div>
                                <h2>¡{winnerInfo.winner} ha ganado!</h2>
                            </>
                        ) : (
                            <>
                                <div className="winner-trophy">🤝</div>
                                <h2>Empate</h2>
                            </>
                        )}
                        <button className="winner-restart-button" onClick={handleRestart}>
                            Jugar de nuevo
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}

function calculateWinner(squares) {
    const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i];
        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
            return { winner: squares[a], line: lines[i] };
        }
    }
    return null;
}