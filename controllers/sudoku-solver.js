
class SudokuSolver {


  validate(puzzleString) {

    if (/[^1-9.]/g.test(puzzleString))
      { return false }
      
    else {return true};
    }

  checkRowPlacement(puzzleString, row, col, value) {
    let rowLength = row.length;
    if (rowLength === 1 && /([a-i]|[A-I])/.test(row))
      {return true}
    else {return false };

  }

  checkColPlacement(puzzleString, row, col, value) {
    let colLength = col.length;
    if (colLength === 1 && /[0-9]/.test(col))
      {return true}
    else {return false };

  }

  checkRegionPlacement(puzzleString, row, col, value) {

  }

  solve(puzzleString) {
    
  }
}

module.exports = SudokuSolver;

