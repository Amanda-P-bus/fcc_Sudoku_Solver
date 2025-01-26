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

      if (puzzleLength !== 81) 
        { res.json({error: "Expected puzzle to be 81 characters long"});  }
     
      if (solver.validate(puzzle) === false) 
        { return res.json({ error: 'Invalid characters in puzzle' })}

      if (solver.validate(puzzle) === true)
        {res.json({valid: true});}
   
      let row = coordinate[0]; //letter
      let col = coordinate[1]; //number
      let coordLength = coordinate.length;
      if (coordLength !== 2) 
        {res.json({ error: 'Invalid coordinate'})}
      
      if (row.length === 1 && solver.checkRowPlacement(puzzle, row, col, value) === true)
      {res.json({valid: true});
    console.log(/[0-9]/.test(col))
      }

      if (solver.checkRowPlacement(puzzle, row, col, value) === false)
        {res.json({ error: 'Invalid coordinate'})}


      if (col.length === 1 && solver.checkColPlacement(puzzle, row, col, value) === true)
        {res.json({valid: true});}
  
        if (solver.checkColPlacement(puzzle, row, col, value) === false)
          {res.json({ error: 'Invalid coordinate'})}
      
     
     // solver.checkRowPlacement(puzzle, row, value) + "check check";
      
      console.log(row, col)

      //console.log(solver.validate(puzzle) + " valid check check")

    //If the object submitted to /api/check is missing puzzle, coordinate or value, the returned value will be { error: 'Required field(s) missing' }
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
