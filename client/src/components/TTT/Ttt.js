import React, { useState } from 'react';
import './ttt.css';
import player1 from './test1.png';
import player2 from './test2.png';

const playerOne = <img src={player1} alt="player1"/>;
const playerTwo = <img src={player2} alt="player1"/>

const Ttt = () => {
	// const [turn, setTurn] = useState('player1');
	const [turn, setTurn] = useState(<img src={player1} alt="player1"/>);
	const [boxes, setBoxes] = useState(Array(9).fill(''));
	const [winner, setWinner] = useState();

	const winningComb = (squares) => {
		var combos = {
			across: [
				[0, 1, 2],
				[3, 4, 5],
				[6, 7, 8],
			],
			down: [
				[0, 3, 6],
				[1, 4, 7],
				[2, 5, 8],
			],
			diagonal: [
				[0, 4, 8],
				[2, 4, 6],
			],
		};

		for (var combo in combos) {
			combos[combo].forEach((pattern) => {
				if (
					squares[pattern[0]] === '' || squares[pattern[1]] === '' || squares[pattern[2]] === ''
				) {
					// == 
				} else if (
					squares[pattern[0]] === squares[pattern[1]] && squares[pattern[1]] === squares[pattern[2]]
				) {
					setWinner(squares[pattern[0]]);
				}
			});
		}
	};

	const handleClick = (num) => {
		if (boxes[num] !== '') {
			alert('already clicked');
			return;
		}

		var squares = [...boxes];


		if (turn === playerOne) {
			squares[num] = playerOne;
			setTurn(playerTwo);
		} else {
			squares[num] = playerTwo;
			setTurn(playerOne);
		}

		winningComb(squares);
		setBoxes(squares);
	};

	const handleRestart = () => {
		setWinner(null);
		setBoxes(Array(9).fill(''));
	};

	const Cell = ({ num }) => {
		return <td onClick={() => handleClick(num)}>{boxes[num]}</td>;
	};

	return (
		<div className='tttcontainer'>
			<table>
				Turn: {turn}
				<tbody>
					<tr>
						<Cell num={0} />
						<Cell num={1} />
						<Cell num={2} />
					</tr>
					<tr>
						<Cell num={3} />
						<Cell num={4} />
						<Cell num={5} />
					</tr>
					<tr>
						<Cell num={6} />
						<Cell num={7} />
						<Cell num={8} />
					</tr>
				</tbody>
			</table>
			{winner && (
				<>
					<p>{winner} is the winner!</p>
					<button onClick={() => handleRestart()}>Play Again</button>
				</>
			)}
		</div>
	);
};

export default Ttt;