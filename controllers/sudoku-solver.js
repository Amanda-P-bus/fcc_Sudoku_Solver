
class SudokuSolver {
  
  validate(puzzleString) {

    if (/[^1-9.]/g.test(puzzleString))
      { return false }
      
    else {return true};
    }

  makeStringGrid(puzzleString) {
    let grid = [];
    for (let i = 0; i < 9; i++)
      {grid.push(
        puzzleString
        .slice(i*9, i*9+9)
        .split("")
        .map((item) =>
             (item === "." ? 0 : +item))
      )}
     return grid;
  }

getRowVal(row) {
  let rowVal;
  switch (row) {
     case "A": rowVal = 0; break;
     case "a": rowVal = 0; break;
     case "B": rowVal = 1; break;
     case "b": rowVal = 1; break;
     case "C": rowVal = 2; break;
     case "c": rowVal = 2; break;
     case "D": rowVal = 3; break;
     case "d": rowVal = 3; break;
     case "E": rowVal = 4; break;
     case "e": rowVal = 4; break;
     case "F": rowVal = 5; break;
     case "f": rowVal = 5; break;
     case "G": rowVal = 6; break; 
     case "g": rowVal = 6; break; 
     case "H": rowVal = 7; break; 
     case "h": rowVal = 7; break; 
     case "I": rowVal = 8; break;
     case "i": rowVal = 8; break;
     default:
       break;
   };
   return rowVal;
}

  checkRowPlacement(puzzleString, row, col, value) {
    
    let rowVal = this.getRowVal(row);

    let newGrid =
      typeof puzzleString === "string"
        ? this.makeStringGrid(puzzleString)
        : puzzleString; 
  
    let numVal = parseInt(value);

     if (newGrid[rowVal].includes(numVal))
       { return true }
     else {return false}
  
  }


  checkColPlacement(puzzleString, row, col, value) {
    let newGrid =
    typeof puzzleString === "string"
      ? this.makeStringGrid(puzzleString)
      : puzzleString;

  let colArr = []
    let colVal = parseInt(col-1)
    let valNum = parseInt(value);
//figure out how to get correct Arr values
      for (let i = 0; i < 9; i++) {
      
        colArr.push(newGrid[i][colVal]);
      }
      
    if (colArr.includes(valNum))
      { return true }
    else {return false}
  }


  checkRegionPlacement(puzzleString, row, col, value) {
  let newGrid = 
    typeof puzzleString === "string" ? 
    this.makeStringGrid(puzzleString) : puzzleString;


    let conflicts = [];

    let colVal = parseInt(col-1);
    let rowVal = this.getRowVal(row);
    let valNum = parseInt(value);
    let resArr = []
    console.log(rowVal, colVal, valNum);


//create regions to check against




//if statements to check value entered against regions

if (rowVal < 3 && colVal < 3)
  {
    let reg1 = newGrid[0].slice(0, 3).concat(newGrid[1].slice(0, 3), newGrid[2].slice(0, 3));

    return reg1.includes(valNum) ? true : false
  }

if ((rowVal >= 3 && rowVal <= 5 ) && (colVal < 3))
  {
    let reg2 = newGrid[3].slice(0, 3).concat(newGrid[4].slice(0, 3), newGrid[5].slice(0, 3));
   
    return reg2.includes(valNum) ? true : false
  }

if ((rowVal >= 6) && (colVal < 3))
  {
    let reg3 = newGrid[6].slice(0, 3).concat(newGrid[7].slice(0, 3), newGrid[8].slice(0, 3));

    return reg3.includes(valNum) ? true : false
  }  

if (rowVal < 3 && (colVal >= 3 && colVal <= 5))
  {
    let reg4 = newGrid[0].slice(3, 6).concat(newGrid[1].slice(3, 6), newGrid[2].slice(3, 6))

    return reg4.includes(valNum) ? true : false
  }

if ((rowVal >= 3 && rowVal <= 5) && (colVal >= 3 && colVal <= 5))
  {
    let reg5 = newGrid[3].slice(3, 6).concat(newGrid[4].slice(3, 6), newGrid[5].slice(3, 6))

    return reg5.includes(valNum) ? true : false
  }

if ((rowVal >= 6) && (colVal >= 3 && colVal <= 5))
  {
    let reg6 = newGrid[6].slice(3, 6).concat(newGrid[7].slice(3, 6), newGrid[8].slice(3, 6))

    return reg6.includes(valNum) ? true : false
  }

if (rowVal < 3 && (colVal >= 6)) 
  {
    let reg7 = newGrid[0].slice(6, 9).concat(newGrid[1].slice(6, 9), newGrid[2].slice(6, 9))
   
    return reg7.includes(valNum) ? true : false
  }

if ((rowVal >= 3 && rowVal <= 5) && (colVal >= 6))
  {
    let reg8 = newGrid[3].slice(6, 9).concat(newGrid[4].slice(6, 9), newGrid[5].slice(6, 9));
  
    return reg8.includes(valNum) ? true : false
  }

if ((rowVal >= 6) && (colVal >= 6))
  {
    let reg9 = newGrid[6].slice(6, 9).concat(newGrid[7].slice(6, 9), newGrid[7].slice(6, 9));

    return reg9.includes(valNum) ? true : false
  }

  }

  solve(puzzleString) {
    
  }
}

module.exports = SudokuSolver;

