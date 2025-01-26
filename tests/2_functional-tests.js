const chai = require("chai");
const chaiHttp = require('chai-http');
const assert = chai.assert;
const server = require('../server');

import { puzzlesAndSolutions } from "./puzzle-strings";

//there are 5 puzzles and solutions in array ([0]-[4])
  //console.log(puzzlesAndSolutions[0][0]) = unsolved
  // console.log(puzzlesAndSolutions[0][1]) = solved
  
chai.use(chaiHttp);

suite('Functional Tests', () => {

});

