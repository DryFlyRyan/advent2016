var md5 = require('./md5');

var iteration = 0;
var string = '';
var result = ['*', '*', '*', '*', '*', '*', '*', '*'];
var hashArray = [];

var start = Date.now();

var completedResult = false;

var animationString = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz012345678901234567890123456789';

while (string.length < 8) {
  string = string + animationString.charAt(Math.floor(Math.random() * animationString.length));
}

while(!completedResult) {
  var hashIteration = string + iteration;
  var hash = md5(hashIteration);
  if (
    hash.substr(0, 5) === '00000' &&
    hash.charAt(5) >= 0 &&
    hash.charAt(5) < 8 &&
    result[hash.charAt(5)] === '*'
  )
  {
    result[hash.charAt(5)] = hash.charAt(6);
    hashArray.push(hash);

    var animatedResults = result.map(function(value) {
      if (value === '*') {
        return animationString.charAt(Math.floor(Math.random() * animationString.length));
      }else {
        return value
      }
    })

    console.log('\x1B[2J\x1B[0f\u001b[0;0H');
    console.log('**************************************')
    console.log('Password Progress: ', animatedResults.join(' - '));
    console.log('Coded String: ', string)
    console.log('Hashes Tested: ', iteration);
    console.log('Crack duration: ', parseInt((Date.now() - start) / 1000), ' seconds')
    console.log('Hash Array: ');
    console.log(hashArray);
    console.log('**************************************')
  }

  if(iteration % 25000 === 0) {

    var animatedResults = result.map(function(value) {
      if (value === '*') {
        return animationString.charAt(Math.floor(Math.random() * animationString.length));
      } else {
        return value
      }
    })
    console.log('\x1B[2J\x1B[0f\u001b[0;0H');
    console.log('**************************************')
    console.log('Password Progress: ', animatedResults.join(' - '));
    console.log('Coded String: ', string)
    console.log('Hashes Tested: ', iteration);
    console.log('Crack duration: ', parseInt((Date.now() - start) / 1000), ' seconds')
    console.log('Hash Array: ');
    console.log(hashArray);
    console.log('**************************************')

  }

  completedResult = testResults(result);

  if(completedResult) {

  }

  iteration++
}

function displayResults(result) {


  console.log('\x1B[2J\x1B[0f\u001b[0;0H');
  console.log('**************************************')
  console.log('Password Progress: ', animatedResults.join(' - '));
  console.log('Coded String: ', string)
  console.log('Hashes Tested: ', iteration);
  console.log('Crack duration: ', parseInt((Date.now() - start) / 1000), ' seconds')
  console.log('Hash Array: ');
  console.log(hashArray);
  console.log('**************************************')
}

function testResults(resultHash) {
  for (var i = 0; i < resultHash.length; i++) {
    if (resultHash[i] === '*') {
      return false
    }
  }
  return true;
}
