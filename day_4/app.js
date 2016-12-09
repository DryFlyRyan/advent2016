var fs = require('fs');

fs.readFile('data.js', 'utf-8', function(err, data) {
  data = data.split('\n')
  var idArray = [];
  data.forEach(function(element) {
    var verifiedCode = verifyCode(element);
    if(verifiedCode) {
      idArray.push(verifiedCode);
    }
  })
  var reducedIds = !idArray.length ? 0 : idArray.reduce(function(a, b) {
    return a + b;
  })
});

function verifyCode(testString) {
  var formattedArray = spliceCode(testString);
  var letterCounts = countLetters(formattedArray[0])
  var testedChecksum = testChecksum(letterCounts, formattedArray[2]);
  // console.log(letterCounts)
  // console.log(formattedArray[2])
  // console.log(testedChecksum)

  if (!testedChecksum) {
    return false
  }

  var decodedString = decodeString(formattedArray[3], formattedArray[1]);

  if (decodedString.substring(0, 5) === 'north') {
    console.log(decodedString, formattedArray[1])
  };

  return formattedArray[1];
}

function spliceCode(testString) {
  var firstDigitIndex = testString.indexOf(testString.match(/\d/));
  var splicedString = [
    testString.slice(0, firstDigitIndex - 1).split('-').join(''),
    parseInt(testString.substring(firstDigitIndex, testString.lastIndexOf('['))),
    testString.substring(testString.lastIndexOf('[') + 1, testString.lastIndexOf(']')).split(''),
    testString.slice(0, firstDigitIndex - 1).replace(/\-/g, ' ').split('')
  ];

  return splicedString
}

function countLetters(encryptedCode) {
  var letterCount = {};
  var countHash = [];

  for (var i = 0; i < encryptedCode.length; i++) {
    var letter = encryptedCode.charAt(i);
    if (letterCount[letter]) {
      letterCount[letter]++
    } else {
      letterCount[letter] = 1
    }
  }

  for (var key in letterCount) {
    if (!countHash[letterCount[key]]) {
      countHash[letterCount[key]] = []
    }
    countHash[letterCount[key]].push(key);
  }

  countHash = countHash.map(function(element) {
    return element.sort(function(a, b) {
      return a < b ? 1 : -1;
    })
  });

  var flattened = countHash.reduce(function(a, b) {
    return a.concat(b);
  }).reverse()

  return flattened;
}

function testChecksum(countedArray, checksum) {
  for (var i = 0; i < checksum.length; i++) {
    if (checksum[i] !== countedArray[i]) {
      // console.log('checksum false', countedArray, checksum, countedArray[i], checksum[i])
      return false
    }
  }
  return true;
}

function decodeString(codedStringArray, shiftNumber) {
  var shift = shiftNumber % 26;
  var decodedArray = codedStringArray.map(function(value) {
    if (value === ' ') {
      return value
    }
    var shiftedCharCode = value.charCodeAt(0) + shift;
    var formattedCode = shiftedCharCode > 122 ? shiftedCharCode - 26 : shiftedCharCode;

    return String.fromCharCode(formattedCode);
  })

  return decodedArray.join('')

}