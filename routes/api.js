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

    if (!puzzle ||!coordinate ||!value)
        {res.json({ error: 'Required field(s) missing' })}
      
let valLength = value.length;
let valReg = /[1-9]/.test(value);   
let valReg2 = /([a-z]|[A-Z])/g.test(value)
 

     if (valLength > 1 || valReg2 || !valReg)
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

 
     let coordTrue = (coordLength === 2);
     let rowTrue = (row.length === 1 &&(/([a-i]|[A-I])/.test(row)));
     let colTrue = (col.length === 1 && (/[1-9]/.test(col)));

  
  if (!coordTrue)
      {res.json({ error: 'Invalid coordinate' })}

  if (coordTrue)
    { if (!rowTrue || !colTrue || coordinate === undefined) 
      { return res.json({ error: 'Invalid coordinate' }) }
    }
      
      
 //check region, if false, error and push to conflicts array

 const rowConflict = solver.checkRowPlacement(puzzle, row, col, value);
 const colConflict = solver.checkColPlacement(puzzle, row, col, value);
 const regConflict = solver.checkRegionPlacement(puzzle, row, col, value);
 const valPlaced = solver.checkValuePlacement(puzzle, row, col, value);

  let conflict = [];    

  if (!valPlaced)
 { 
  if (colConflict === true || rowConflict === true || regConflict === true) 
  {  if (rowConflict === true )
      {conflict.push("row"); }

    if (colConflict === true )
      {conflict.push("column")  }    

    if (regConflict === true )
      {conflict.push("region")} 

  return res.json({ valid: false, conflict });  
  }// end nested if !colConflict === true

  
  if (!colConflict && !rowConflict && !regConflict)
  {res.json({ valid: true })} 

}//end !valPlaced


if (valPlaced && regConflict)
  {res.json({ valid: true })}

}



catch (e) { 
  if (e.message.includes("includes"))
    {return e.message = { "error": "Invalid coordinate" }}
  console.log(e.message + " check");}

    }));
    

  app.route('/api/solve')
    .post(asyncHandler(async (req, res) =>{
 
 try {    

  
  
  //start true false checks to try to work on headers issue
  //   let headers = req.headers;     
//      console.log(headers)    
   const puzzle = req.body.puzzle;      
      let puzzleLength = puzzle.length;

      if (puzzleLength !== 81 && solver.validate(puzzle))
      {      
         if (puzzleLength === 0 || puzzle === undefined)
            {res.json({ error: "Required field missing" })}

        else  {res.json({error: "Expected puzzle to be 81 characters long"})}
        }

     else if (!solver.validate(puzzle))
          { return res.json({ error: 'Invalid characters in puzzle' })}  

    else {

    const solution = solver.solve(puzzle);
    if (!solution) 
    {return res.json({ error: "Puzzle cannot be solved" })}
    res.json({ solution });

      } 
    }

    catch (e) { 
      if (e.message.includes("read") || e.message.includes("0"))
        {return e.message = { "error": "Required field missing" }}
      console.log(e.message + " solve"); }
  }));
};
