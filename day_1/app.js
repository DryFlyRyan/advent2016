var input = "R3, L5, R2, L1, L2, R5, L2, R2, L2, L2, L1, R2, L2, R4, R4, R1, L2, L3, R3, L1, R2, L2, L4, R4, R5, L3, R3, L3, L3, R4, R5, L3, R3, L5, L1, L2, R2, L1, R3, R1, L1, R187, L1, R2, R47, L5, L1, L2, R4, R3, L3, R3, R4, R1, R3, L1, L4, L1, R2, L1, R4, R5, L1, R77, L5, L4, R3, L2, R4, R5, R5, L2, L2, R2, R5, L2, R194, R5, L2, R4, L5, L4, L2, R5, L3, L2, L5, R5, R2, L3, R3, R1, L4, R2, L1, R5, L1, R5, L1, L1, R3, L1, R5, R2, R5, R5, L4, L5, L5, L5, R3, L2, L5, L4, R3, R1, R1, R4, L2, L4, R5, R5, R4, L2, L2, R5, R5, L5, L2, R4, R4, L4, R1, L3, R1, L1, L1, L1, L4, R5, R4, L4, L4, R5, R3, L2, L2, R3, R1, R4, L3, R1, L4, R3, L3, L2, R2, R2, R2, L1, L4, R3, R2, R2, L3, R2, L3, L2, R4, L2, R3, L4, R5, R4, R1, R5, R3".split(', ')

var parsedDirections = input.map(function(element) {
  var newElement = [
    element.charAt(0),
    parseInt(element.slice(1))
  ];
  return newElement;
});

var axes = {};

var directions = [
  {
    axis: 'Y',
    direction: '+'
  },
  {
    axis: 'X',
    direction: '+'
  },
  {
    axis: 'Y',
    direction: '-'
  },
  {
    axis: 'X',
    direction: '-'
  }
];

var trip = [];

var currentDirection = directions[0];

function calculateDirections(inputArray, checkRepeatVisits) {
  axes.X = 0;
  axes.Y = 0;

  if (checkRepeatVisits) {
    trip.push([0, 0]);
  }

  for (var i = 0; i < inputArray.length; i++) {
    var element = inputArray[i];
    changeDirections(element[0]);
    var navigationResult = navigate(trip, currentDirection.axis, element[1], currentDirection.direction, checkRepeatVisits);
    if (checkRepeatVisits && navigationResult) {
      return navigationResult
    }
  }

  return Math.abs(axes.X) + Math.abs(axes.Y);
}

function changeDirections(turn) {
  var currentIndex = findIndex(directions, currentDirection);
  if (turn === 'L') {
    if (currentIndex) {
      currentDirection = directions[currentIndex - 1];
    } else {
      currentDirection = directions[directions.length - 1];
    }
  } else {
    if (currentIndex === directions.length -1) {
      currentDirection = directions[0];
    } else {
      currentDirection = directions[currentIndex + 1];
    }
  }
}

function findIndex(array, value) {
  var foundIndex;
  array.forEach(function(element, index) {
    if (element === value) {
      foundIndex = index;
    }
  });
  return foundIndex;
}

function checkIfPreviouslyVisited(trip, currentLocation) {
 for (var i = 0; i < trip.length; i++) {
    var element = trip[i];
    if (element[0] === currentLocation[0] && element[1] === currentLocation[1]) {
      return true;
    }
  }
  return false;
}
function navigate(tripArray, workingAxis, blocks, direction, checkRepeatVisits) {
  for (var i = 0; i < blocks; i++) {
    if (direction === '+') {
      axes[workingAxis] += 1;
    } else {
      axes[workingAxis] -=1;
    }
    var currentLocation = [
      axes.X,
      axes.Y
    ];
    if (checkRepeatVisits && checkIfPreviouslyVisited(tripArray, currentLocation)) {
      return Math.abs(axes.X) + Math.abs(axes.Y);
    };
    tripArray.push(currentLocation)
  }
  return false;
}

console.log(calculateDirections(parsedDirections, true));