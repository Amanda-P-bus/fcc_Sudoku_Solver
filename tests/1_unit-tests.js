const chai = require('chai');
const assert = chai.assert;

import { puzzlesAndSolutions } from "./puzzle-strings";

//there are 5 puzzles and solutions in array ([0]-[4])
  //console.log(puzzlesAndSolutions[0][0]) = unsolved
  // console.log(puzzlesAndSolutions[0][1]) = solved

const Solver = require('../controllers/sudoku-solver.js');
let solver;

suite('Unit Tests', () => {

//1. Logic handles a valid puzzle string of 81 characters
//2. Logic handles a puzzle string with invalid characters (not 1-9 or .)
//3. Logic handles a puzzle string that is not 81 characters in length
//4. Logic handles a valid row placement
//5. Logic handles an invalid row placement
//6. Logic handles a valid column placement
//7. Logic handles an invalid column placement
//8.Logic handles a valid region (3x3 grid) placement
//9.Logic handles an invalid region (3x3 grid) placement
//10.Valid puzzle strings pass the solver
//11. Invalid puzzle strings fail the solver
//12. Solver returns the expected solution for an incomplete puzzle

});
