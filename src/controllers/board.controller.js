const LETTERS = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'];
const board = {};
let boats = [];

board.setHiddenBoats = (req, res) => {
  boats = [];
  const { boatLength } = req.body;
  generateShipPositions(boatLength);

  res.json(boats);
};

module.exports = board;

function generateShipPositions(shipsLength) {
  shipsLength.forEach((shipLength) => {
    const spaces = shipLength;
    function generateHiddenBoats() {
      const letterIndex = Math.floor(Math.random() * 10) + 1 - 1;
      const number = Math.floor(Math.random() * 10) + 1;
      const isVertical = Math.round(Math.random()) === 1;

      return generate(letterIndex, number, isVertical, spaces);
    }

    let result = generateHiddenBoats();
    while (!result) {
      result = generateHiddenBoats();
    }
  });
}

function generate(letterIndex, number, isVertical, spaces) {
  function getBoat(startPos, endPos) {
    const boat = [];

    const start = {
      char: startPos.split('')[0],
      charIndex: LETTERS.indexOf(startPos.split('')[0]),
      number: parseInt(startPos.split('').slice(1).join(''))
    };
    const end = {
      char: endPos.split('')[0]
    };

    for (let i = 0; i < spaces; i++) {
      // by default HORIZONTAL
      let coord = [start.char, start.number + i].join('');

      // vertical
      if (start.char !== end.char) coord = [LETTERS[start.charIndex + i], start.number].join('');

      boat.push(coord);
    }

    return boat; // ["B2","B3"]
  }
  function getBoatPerimeter(startPos, endPos) {
    const boatPerimeter = [];

    const start = {
      char: startPos.split('')[0],
      charIndex: LETTERS.indexOf(startPos.split('')[0]),
      number: parseInt(startPos.split('').slice(1).join(''))
    };
    const end = {
      char: endPos.split('')[0],
      charIndex: LETTERS.indexOf(endPos.split('')[0]),
      number: parseInt(endPos.split('').slice(1).join(''))
    };

    const pushCoordPerimeter = (row, col) => {
      boatPerimeter.push([row, col].join(''));
    };

    for (let i = 0; i < spaces; i++) {
      if (start.char === end.char) {
        // horizontal

        // prev ROW
        if (start.charIndex - 1 >= 0)
          pushCoordPerimeter(LETTERS[start.charIndex - 1], start.number + i);

        // next ROW
        if (start.charIndex + 1 <= 9)
          pushCoordPerimeter(LETTERS[start.charIndex + 1], start.number + i);
      } else {
        // vertical

        // prev COL
        if (start.number - 1 > 0)
          pushCoordPerimeter(LETTERS[start.charIndex + i], start.number - 1);

        // next COL
        if (start.charIndex + 1 <= 10)
          pushCoordPerimeter(LETTERS[start.charIndex + i], start.number + 1);
      }
    }

    // vertices
    if (start.char === end.char) {
      // horizontal
      if (start.number - 1 > 0) {
        // prev COL
        if (start.charIndex - 1 >= 0)
          pushCoordPerimeter(LETTERS[start.charIndex - 1], start.number - 1);

        pushCoordPerimeter(LETTERS[start.charIndex], start.number - 1);

        if (start.charIndex + 1 <= 9)
          pushCoordPerimeter(LETTERS[start.charIndex + 1], start.number - 1);
      }
      if (end.number + 1 <= 10) {
        // next COL
        if (start.charIndex - 1 >= 0)
          pushCoordPerimeter(LETTERS[start.charIndex - 1], end.number + 1);

        pushCoordPerimeter(LETTERS[start.charIndex], end.number + 1);

        if (start.charIndex + 1 <= 9)
          pushCoordPerimeter(LETTERS[start.charIndex + 1], end.number + 1);
      }
    } else {
      // vertical
      if (start.charIndex - 1 >= 0) {
        // prev ROW
        if (start.number - 1 > 0)
          pushCoordPerimeter(LETTERS[start.charIndex - 1], start.number - 1);

        pushCoordPerimeter(LETTERS[start.charIndex - 1], start.number);

        if (start.number + 1 <= 10)
          pushCoordPerimeter(LETTERS[start.charIndex - 1], start.number + 1);
      }
      if (end.charIndex + 1 <= 9) {
        // next ROW
        if (start.number - 1 > 0) pushCoordPerimeter(LETTERS[end.charIndex + 1], start.number - 1);

        pushCoordPerimeter(LETTERS[end.charIndex + 1], start.number);

        if (start.number + 1 <= 10)
          pushCoordPerimeter(LETTERS[end.charIndex + 1], start.number + 1);
      }
    }

    return boatPerimeter; // ['A1', 'A2', 'A3', 'A4', 'B1', 'B4', 'C1', 'C2', 'C3', 'C4']
  }

  // by default Horizontal
  let endPosLetter = LETTERS[letterIndex];
  let endPosNumber = number + (spaces - 1);

  if (isVertical) {
    endPosLetter = LETTERS[letterIndex + (spaces - 1)];
    endPosNumber = number;
  }

  const startPos = [LETTERS[letterIndex], number].join('').trim();
  const endPos = [endPosLetter, endPosNumber].join('').trim();

  if (!endPosLetter || endPosNumber > 10) return false;

  const boat = getBoat(startPos, endPos, spaces);
  const boatPerimeter = getBoatPerimeter(startPos, endPos, spaces);

  /* BOATS i.e:
    - boat : ["B2","B3"],
    - boatPerimeter : ["A1","A2","A3","A4","B1","B4","C1","C2","C3","C4"]
  */

  if (boats.length === 0) {
    boats.push({
      boat,
      boatPerimeter
    });
    return true;
  }

  let boatsAvailable = true;
  boats.forEach((item) => {
    boatsAvailable &&
      boat.forEach((b) => {
        if (boatsAvailable)
          boatsAvailable = !(item.boat.indexOf(b) >= 0 || item.boatPerimeter.indexOf(b) >= 0);
      });
  });

  if (boatsAvailable) {
    boats.push({
      boat,
      boatPerimeter
    });
    return true;
  }

  return false;
}
