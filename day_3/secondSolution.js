var fs = require('fs');

var testData =
  '200 1 100\n1 10 50\n1 10 50';

// console.log(getTheAnswer(testData).length)

fs.readFile('data.js', 'utf-8', function(err, data) {
  data = getTheAnswer(data);
  console.log(data.length)
});


function getTheAnswer(data) {
  var resultData = [];
  data = data.split('\n');
  data = data.map(function(value) {
    value = trimStringSpaces(value);
    value = value.map(function(value) {
      return Number(value);
    });
    return value;
  });
  data = flipArrays(data);
  data = data.forEach(function(value) {
    var testedTriangle = testTriangle(value)
    if (testedTriangle) {
      resultData.push(testedTriangle);
    }
  })
  return resultData;
}

function trimStringSpaces(string) {
  string = string.replace(/\s+/gi, ' ');
  if(string.charAt === 0) {
    trimStringSpaces(string.splice(1))
  }
  return string.split(' ')
}

function flipArrays(data) {
  var flippedArr = [];
  data.forEach(function(elem, ind, arr) {
    if ((ind + 1) % 3 === 0) {
      for (var i = 0; i < 3; i++) {
        flippedArr.push([
          arr[ind][i],
          arr[ind - 1][i],
          arr[ind - 2][i]
        ])
      }
    }
  });
  return flippedArr
}

function testTriangle(possibleTriangle) {
  possibleTriangle.sort(function(a, b) {
    return b - a;
  })
  if (possibleTriangle[1] + possibleTriangle[2] > possibleTriangle[0]) {
    return possibleTriangle;
  };
  return false;
}