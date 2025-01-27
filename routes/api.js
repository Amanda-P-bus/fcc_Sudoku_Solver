'use strict';
const SudokuSolver = require('../controllers/sudoku-solver.js');
const asyncHandler = require('express-async-handler');
import regeneratorRuntime from "regenerator-runtime";
module.exports = function (app) {
  
  let solver = new SudokuSolver();

  app.route('/api/check')
    .post(asyncHandler(async (req, res) => {
   try  {
    const { puzzle, coordinate, value } = req.body;
      console.log(puzzle, coordinate, value)
      if (!puzzle ||!coordinate ||!value)
        {res.json({ error: 'Required field(s) missing' })}
      
     console.log(value.length)
     if (value.length > 1 || /([a-z]|[A-Z])/g.test(value))
     {return res.json({error: "Invalid value"})}


      let puzzleLength = puzzle.length;
      let row = coordinate[0]; //letter
      let col = coordinate[1]; //number
      let coordLength = coordinate.length;
      let validTrue = solver.validate(puzzle);

      if (puzzleLength !== 81) 
        { res.json({error: "Expected puzzle to be 81 characters long"});  }
     
      if (!validTrue) 
        { return res.json({ error: 'Invalid characters in puzzle' })}


  
  //start true false checks to try to work on headers issue
     // let headers = req.headers;     ??
      // console.log(headers)     ??
 
     let coordTrue = (coordLength === 2);
     let rowTrue = (row.length === 1 &&(/([a-i]|[A-I])/.test(row)));
     let colTrue = (col.length === 1 && (/[1-9]/.test(col)));

  
  if (!rowTrue || !colTrue || !coordTrue)
      {res.json({ error: 'Invalid coordinate' })}
      
 //check region, if false, error and push to conflicts array

 let rowConflict = solver.checkRowPlacement(puzzle, row, col, value);
 let colConflict = solver.checkColPlacement(puzzle, row, col, value);
 let regConflict = solver.checkRegionPlacement(puzzle, row, col, value);
 let valPlaced = solver.checkValuePlacement(puzzle, row, col, value);

 console.log(valPlaced + "valplaced")

//if valPlaced is true and the value is correct, we want to return valid: true

  let conflict = [];    

  if (!valPlaced)
 { if (colConflict === true || rowConflict === true || regConflict === true) 
  {  if (rowConflict === true )
      {conflict.push("row"); }

    if (colConflict === true )
      {conflict.push("column")  }    

    if (regConflict === true )
      {conflict.push("region")} 

  return res.json({ valid: false, conflict });  }
}


if (!colConflict && !rowConflict && !regConflict)
  {  res.json({ valid: true })}  

if (valPlaced === true && regConflict)
  {res.json({ valid: true })}

}



catch (e) { 
  if (e.message.includes("includes"))
    {return { "error": "Invalid coordinate" }}
  console.log(e.message);}

    }));
    
  app.route('/api/solve')
    .post(asyncHandler(async (req, res) =>{
 
 try {    
   const puzzle = req.body.puzzle;      
      let puzzleLength = puzzle.length;

      if (!puzzle)
        {res.json({ error: 'Required field(s) missing' })}

      if (puzzleLength !== 81) 
        { res.json({error: "Expected puzzle to be 81 characters long"});  }

      if (puzzleLength === 81)
      {

    if (solver.validate(puzzle) === false) 
       { return res.json({ error: 'Invalid characters in puzzle' })}

    else {

    const solution = solver.solve(puzzle);
    if (!solution) 
    {return res.json({ error: "Puzzle cannot be solved" })}
    res.json({ solution });

      } 
    }}

    catch (e) { console.log(e.message); }
  }));
};
