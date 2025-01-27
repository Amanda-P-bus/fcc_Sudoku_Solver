'use strict';

const SudokuSolver = require('../controllers/sudoku-solver.js');

module.exports = function (app) {
  
  let solver = new SudokuSolver();

  app.route('/api/check')
    .post((req, res) => {
      const { puzzle, coordinate, value } = req.body;
      console.log(puzzle, coordinate, value)
      if (!puzzle ||!coordinate ||!value)
        {res.json({ error: 'Required field(s) missing' })}

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
     let colTrue = (col.length === 1 && (/[0-9]/.test(col)));

  /////////
      console.log(validTrue, coordTrue, rowTrue, colTrue);
      console.log("validTrue: " + validTrue, "coordTrue," + coordTrue, "rowTrue: " + rowTrue, "colTrue: " + colTrue);
  ////////
  
  if (!rowTrue || !colTrue || !coordTrue)
      {res.json({ error: 'Invalid coordinate'})}
      
 //check region, if false, error and push to conflicts array

 let rowConflict = solver.checkRowPlacement(puzzle, row, col, value);
 let colConflict = solver.checkColPlacement(puzzle, row, col, value);
 let regConflict = solver.checkRegionPlacement(puzzle, row, col, value);

  console.log(colConflict + "colconflict");
  console.log(rowConflict + "rowconflict");
  console.log(regConflict + "regconflict");

    let conflicts = [];    
  if (colConflict === true || rowConflict === true || regConflict === true  )
  {  if (rowConflict === true )
      {conflicts.push("row"); }

    if (colConflict === true )
      {conflicts.push("col")  }    

    if (regConflict === true )
      {conflicts.push("region")} 

  return res.json({ conflicts });  
}

if (!colConflict && !rowConflict && !regConflict)
  {res.json({ valid: true })}
   


    

    });
    
  app.route('/api/solve')
    .post((req, res) => {
      const puzzle = req.body.puzzle;      
      let puzzleLength = puzzle.length;


      if (puzzleLength !== 81) 
        { res.json({error: "Expected puzzle to be 81 characters long"});  }

      if (puzzleLength === 81)
      {

    if (solver.validate(puzzle) === false) 
       { return res.json({ error: 'Invalid characters in puzzle' })}

        else {console.log("move on to solving") } 

      }
     // console.log(puzzle)
     // console.log(solver.validate(puzzle) + " solver")
    

    /*
    
  
      const solution = solver.solve(puzzle);
      console.log(solution);
      if (!solution)
      { console.log("Cannot solve");  }
       // return res.json({ error: "Puzzle cannot be solved" });

      res.json({ solution });
      console.log(solution)
*/
    });
};
