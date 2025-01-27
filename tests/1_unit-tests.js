const chai = require('chai');
const assert = chai.assert;
let server = require('../server');
const Solver = require('../controllers/sudoku-solver.js');
let solver = new Solver();

let puzzleArr = [
  [
    '1.5..2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37.',
    '135762984946381257728459613694517832812936745357824196473298561581673429269145378'
  ],
  [
    '5..91372.3...8.5.9.9.25..8.68.47.23...95..46.7.4.....5.2.......4..8916..85.72...3',
    '568913724342687519197254386685479231219538467734162895926345178473891652851726943'
  ],
  [
    '..839.7.575.....964..1.......16.29846.9.312.7..754.....62..5.78.8...3.2...492...1',
    '218396745753284196496157832531672984649831257827549613962415378185763429374928561'
  ],
  [
    '.7.89.....5....3.4.2..4..1.5689..472...6.....1.7.5.63873.1.2.8.6..47.1..2.9.387.6',
    '473891265851726394926345817568913472342687951197254638734162589685479123219538746'
  ],
  [
    '82..4..6...16..89...98315.749.157.............53..4...96.415..81..7632..3...28.51',
    '827549163531672894649831527496157382218396475753284916962415738185763249374928651'
  ]
];

let invalidLengthPuzz = "...956.."
let invalidCharPuzz =  '1.5..2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.3dD' 

suite('Unit Tests', () => {
  
suite('Validation Tests', () => {
//1. Logic handles a valid puzzle string of 81 characters  
test("Checks that puzzle string length is 81", function(done){
  assert.equal(
    solver.solve(puzzleArr[0][0]),
    puzzleArr[0][1],
  )
  done();
  })   

//2. Logic handles a puzzle string with invalid characters (not 1-9 or .)
test("Checks that doesn't include invalid characters", function(done){
  assert.equal(
    (solver.validate("..9..5.1.85.4t...2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6.."),
    undefined)
  )
  done();
  })  


//3. Logic handles a puzzle string that is not 81 characters in length
test("Serves error for length that isn't 81", function(done){
  assert.equal(
    (solver.solve("......34343..")),
    false,
  )
  done();
  })  
}) //end validation tests

suite('Placement Tests', () => {
//4. Logic handles a valid row placement
test("Checks that row placement is valid", function(done){
  chai.request(server)
  .post("/api/check")
  .send({puzzle: "..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..", coordinate: "B3", value: "1" })
  .end((err, res) => {
    assert.deepEqual(
    res.body, {valid: true});
  })
    done();
})  

//5. Logic handles an invalid row placement
test("Responds to invalid row placement", function(done){
  chai.request(server)
  .post("/api/check")
  .send({puzzle: "..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..", coordinate: "a2", value: "1" })
  .end((err, res) => {
    assert.deepEqual(
    res.body, { "valid": false, "conflict": [ "row" ] });
  })
    done();
})  

//6. Logic handles a valid column placement
test("Responds to valid column placement", function(done){
  chai.request(server)
  .post("/api/check")
  .send({puzzle: "..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..", coordinate: "b3", value: "1" })
  .end((err, res) => {
    assert.deepEqual(
    res.body, { "valid": true });
  })
    done();
})  

//7. Logic handles an invalid column placement
test("Responds to invalid column placement", function(done){
  chai.request(server)
  .post("/api/check")
  .send({puzzle: "..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..", coordinate: "a5", value: "6" })
  .end((err, res) => {
    assert.deepEqual(
    res.body, { "valid": false, "conflict": [ "column" ] });
  })
    done();
})  
//8.Logic handles a valid region (3x3 grid) placement
test("Responds to valid region placement", function(done){
  chai.request(server)
  .post("/api/check")
  .send({puzzle: "..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..", coordinate: "b3", value: "1" })
  .end((err, res) => {
    assert.deepEqual(
    res.body, { "valid": true });
  })
    done();
})  

//9.Logic handles an invalid region (3x3 grid) placement
test("Responds to invalid region placement", function(done){
  chai.request(server)
  .post("/api/check")
  .send({puzzle: "..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..", coordinate: "e3", value: "1" })
  .end((err, res) => {
    assert.deepEqual(
    res.body, { "valid": false, "conflict": [ "region" ] });
  })
    done();
})  

//10.Valid puzzle strings pass the solver
test("Checks that valid strings pass the solver", function(done){
  chai.request(server)
  .post("/api/solve")
  .send({ puzzle: puzzleArr[0][0] })
  .end((err, res) => {
  assert.isObject(res.body, res);
  })
  done();
}) 

//11. Invalid puzzle strings fail the solver
test("Checks that invalid strings fail (again I guess?)", function(done){
  chai.request(server)
  .post("/api/solve")
  .send({ puzzle: "" })
  .end((err, res) => {
  assert.deepEqual(res.body, { "error": "Required field missing" });
  })
  done();
}) 

//12. Solver returns the expected solution for an incomplete puzzle
test("Checks that puzzle returns expected solution", function(done){
  chai.request(server)
  .post("/api/solve")
  .send({ puzzle: puzzleArr[0][0] })
  .end((err, res) => {
  assert.isObject(res.body, res);
  })
  done();
}) 

}) //end placement tests
});



