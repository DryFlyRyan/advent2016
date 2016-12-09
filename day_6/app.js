var fs = require('fs');

fs.readFile('data.js', 'utf-8', function(err, data) {
  data = data.split('\n');
  data = data.map(function(value) {
    return value.split('')
  });
  console.log(findCommonLetters(data))
  // console.log(data)
})

function findCommonLetters(data) {
  var columnCounts = [];

  data.forEach(function(codeWord) {
    codeWord.forEach(function(letter, ind) {
      if (!columnCounts[ind]) {
        columnCounts[ind] = {}
      }

      if (!columnCounts[ind][letter]) {
        columnCounts[ind][letter] = 1
      } else {
        columnCounts[ind][letter]++
      }

    })
  })
  return decodeMessage(columnCounts).join('')

}

function decodeMessage(columnCounts) {
  return columnCounts.map(function(value) {
    return findMostCommonLetter(value);
  })
}

function findMostCommonLetter(columnCount) {
  var lowestNumber;
  var lowestLetter;
  for (var key in columnCount) {
     if (columnCount[key] < lowestNumber || !lowestNumber) {
       lowestNumber = columnCount[key];
       lowestLetter = key;
     }
  }
  return lowestLetter
}