const chai = require("chai");
const chaiHttp = require('chai-http');
const assert = chai.assert;
const Solver = require('../controllers/sudoku-solver.js');
const server = require('../server');
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

  
chai.use(chaiHttp);

suite('Functional Tests', () => {

//1. Solve a puzzle with valid puzzle string: POST request to /api/solve
test("Checks that valid strings pass the solver", function(done){
  chai.request(server)
  .post("/api/solve")
  .send({ puzzle: puzzleArr[0][0] })
  .end((err, res) => {
  assert.isObject(res.body, res);
  })
  done();
}) 

//2. Solve a puzzle with missing puzzle string: POST request to /api/solve
test("Click solve with no puzzle string entered", function(done){
  chai.request(server)
  .post("/api/solve")
  .send({ puzzle: "" })
  .end((err, res) => {
  assert.deepEqual(res.body, { "error": "Required field missing" });
  })
  done();
}) 

//3. Solve a puzzle with invalid characters: POST request to /api/solve
test("Checks that puzzle string has only valid characters", function(done){
  chai.request(server)
  .post("/api/solve")
  .send({ puzzle: '82..4..6...16..89...98315.749.157.............53..4...96.415..81..7632..3...28.dD' })
  .end((err, res) => {
  assert.equal(res.body.error, 'Invalid characters in puzzle')});

done();
})   

//4. Solve a puzzle with incorrect length: POST request to /api/solve
test("Returns error for incorrect puzzle length", function(done){
  chai.request(server)
  .post("/api/solve")
  .send({ puzzle: '82..4..6...16..89...98315.749.157.............53..4...96.415..81..7632..3' })
  .end((err, res) => {
  assert.deepEqual(res.body, { "error": "Expected puzzle to be 81 characters long" }  )});
done();
})  

//5. Solve a puzzle that cannot be solved: POST request to /api/solve
test("Checks that puzzle string length has only valid characters", function(done){
  chai.request(server)
  .post("/api/solve")
  .send({ puzzle: "1.5..2.84..63.12.7.2..52....9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37." })
  .end((err, res) => {
  assert.deepEqual(res.body.error, "Puzzle cannot be solved")});
done();
}) 

//6. Check a puzzle placement with all fields: POST request to /api/check
test("Responds to invalid row placement", function(done){
  chai.request(server)
  .post("/api/check")
  .send({puzzle: puzzleArr[1][0], coordinate: "a2", value: "4" })
  .end((err, res) => {
    assert.deepEqual(
    res.body, { "valid": true });
  })
    done();
})  

//7. Check a puzzle placement with single placement conflict: POST request to /api/check
test("Responds to placement with only one conflict", function(done){
  chai.request(server)
  .post("/api/check")
  .send({puzzle: puzzleArr[1][0], coordinate: "a2", value: "1" })
  .end((err, res) => {
    assert.deepEqual(
    res.body, { "valid": false, "conflict": [ "row" ] });
  })
    done();
})  

//8. Check a puzzle placement with multiple placement conflicts: POST request to /api/check
test("Responds 2 conflicts", function(done){
  chai.request(server)
  .post("/api/check")
  .send({puzzle: puzzleArr[1][0], coordinate: "h2", value: "9" })
  .end((err, res) => {
    assert.deepEqual(
    res.body, { "valid": false, "conflict": [ "row", "column" ] });
  })
    done();
})  

//9. Check a puzzle placement with all placement conflicts: POST request to /api/check
test("Responds to invalid row placement", function(done){
  chai.request(server)
  .post("/api/check")
  .send({puzzle: puzzleArr[1][0], coordinate: "a2", value: "9" })
  .end((err, res) => {
    assert.deepEqual(
    res.body, { "valid": false, "conflict": [ "row", "column", "region" ] });
  })
    done();
})  

//10. Check a puzzle placement with missing required fields: POST request to /api/check
test("Responds to Check Placement with only value and puzzle entered", function(done){
  chai.request(server)
  .post("/api/check")
  .send({puzzle: puzzleArr[1][0], coordinate: "", value: "9" })
  .end((err, res) => {
    assert.deepEqual(
    res.body, { "error": "Required field(s) missing" });
  })
    done();
})  


//11. Check a puzzle placement with invalid characters: POST request to /api/check
test("Responds to Check Placement invalid entry characters", function(done){
  chai.request(server)
  .post("/api/check")
  .send({puzzle: puzzleArr[1][0], coordinate: "j0", value: "9" })
  .end((err, res) => {
    assert.deepEqual(
    res.body, { "error": "Invalid coordinate" } );
  })
    done();
})  


//12. Check a puzzle placement with incorrect length: POST request to /api/check
test("Returns error for incorrect puzzle length when checking placement", function(done){
  chai.request(server)
  .post("/api/check")
  .send({ puzzle: '82..4..6...16..89...98315.749.157.............53..4...96.415..81..7632..3', coordinate: "b3", value: "5" })
  .end((err, res) => {
  assert.deepEqual(res.body, { "error": "Expected puzzle to be 81 characters long" }  )});
done();
}) 


//13. Check a puzzle placement with invalid placement coordinate: POST request to /api/check
test("Responds to Check Placement entry coordinate length > 2", function(done){
  chai.request(server)
  .post("/api/check")
  .send({puzzle: puzzleArr[1][0], coordinate: "j10", value: "9" })
  .end((err, res) => {
    assert.deepEqual(
    res.body, { "error": "Invalid coordinate" });
  })
    done();
})  


//14. Check a puzzle placement with invalid placement value: POST request to /api/check
test("Responds to Check Placement entry coordinate length > 2", function(done){
  chai.request(server)
  .post("/api/check")
  .send({puzzle: puzzleArr[1][0], coordinate: "b3", value: "10" })
  .end((err, res) => {
    assert.deepEqual(
    res.body, { "error": "Invalid value" });
  })
    done();
})  

  });

