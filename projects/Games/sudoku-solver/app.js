/**
 * ═══════════════════════════════════════════════════════════════════════
 * © 2025 Abdel Ali - All Rights Reserved
 * This project is part of Abdel Ali's portfolio
 * Unauthorized copying or distribution is prohibited
 * Contact: abdel.ali@example.com
 * ═══════════════════════════════════════════════════════════════════════
 */
let board=Array(9).fill().map(()=>Array(9).fill(0));function createGrid(){const grid=document.getElementById('sudokuGrid');grid.innerHTML='';for(let i=0;i<9;i++){for(let j=0;j<9;j++){const input=document.createElement('input');input.type='number';input.min='1';input.max='9';input.value=board[i][j]||'';input.addEventListener('input',e=>{board[i][j]=parseInt(e.target.value)||0});grid.appendChild(input)}}}function isValid(board,row,col,num){for(let x=0;x<9;x++)if(board[row][x]===num)return false;for(let x=0;x<9;x++)if(board[x][col]===num)return false;let startRow=row-row%3,startCol=col-col%3;for(let i=0;i<3;i++)for(let j=0;j<3;j++)if(board[i+startRow][j+startCol]===num)return false;return true}function solve(board){for(let row=0;row<9;row++){for(let col=0;col<9;col++){if(board[row][col]===0){for(let num=1;num<=9;num++){if(isValid(board,row,col,num)){board[row][col]=num;if(solve(board))return true;board[row][col]=0}}return false}}}return true}function solveSudoku(){if(solve(board)){createGrid();alert('Solved!')}else alert('No solution exists!')}function clearBoard(){board=Array(9).fill().map(()=>Array(9).fill(0));createGrid()}function generatePuzzle(){clearBoard();for(let i=0;i<20;i++){let row=Math.floor(Math.random()*9);let col=Math.floor(Math.random()*9);let num=Math.floor(Math.random()*9)+1;if(isValid(board,row,col,num))board[row][col]=num}createGrid()}createGrid();console.log('Sudoku Solver - Built by Abdel Ali');
