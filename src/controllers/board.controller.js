// let letters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'];

const board = {};
let shipPositions = [];

board.setShipsHide = (req, res) => {
  const { shipsLength } = req.body;
  shipPositions = [];
  generateShipPositions(shipsLength);

  res.json(shipPositions);
};

module.exports = board;

function generateShipPositions(shipsLength) {
  shipsLength.forEach((shipLength) => {
    const spaces = shipLength;
    function getBoardShip() {
      const letterIndex = Math.floor(Math.random() * 10) + 1 - 1;
      const number = Math.floor(Math.random() * 10) + 1;
      const isVertical = Math.round(Math.random()) === 1;

      return isAvailable(letterIndex, number, isVertical, spaces);
    }

    let boardShip = getBoardShip();
    while (!boardShip) {
      boardShip = getBoardShip();
    }

    if (boardShip) {
      const { startPos, endPos, busyPos } = boardShip;
      shipPositions.push({
        shipLong: spaces,
        startPos,
        endPos,
        busyPos
      });
    }
  });

  console.log('shipPositions', shipPositions);
}

function isAvailable(letterIndex, number, isVertical, spaces) {
  function isEndPositionOk(endPos) {
    if (isNaN(endPos)) {
      if (endPos.length === 3) {
        const partNumber = endPos.split('').slice(1).join('');
        return ['11', '12', '13'].indexOf(partNumber) === -1;
      }
      return true;
    }
    return false;
  }

  function getBusyPos(startPos, endPos) {
    const busyPos = [];
    const firstCharStart = startPos.split('')[0];
    const endCharStart = endPos.split('')[0];

    if (firstCharStart === endCharStart) {
      // horizontal
      const numberStart = parseInt(startPos.split('').slice(1).join(''));
      const lengthStart = numberStart + spaces;

      const indexFirstLetter = letters.indexOf(firstCharStart);

      if (indexFirstLetter === 0) {
        // first row
        const letterBusy = letters[indexFirstLetter + 1];

        if (numberStart !== 1) {
          busyPos.push(firstCharStart + (numberStart - 1));
          busyPos.push(letterBusy + (numberStart - 1));
        }
        for (let i = numberStart; i < lengthStart; i++) {
          busyPos.push(letterBusy + i);
        }
        if (lengthStart <= 10) {
          busyPos.push(letterBusy + lengthStart);
          busyPos.push(firstCharStart + lengthStart);
        }
      } else if (indexFirstLetter === 9) {
        // last row
        const letterBusy = letters[indexFirstLetter - 1];

        if (numberStart !== 1) {
          busyPos.push(firstCharStart + (numberStart - 1));
          busyPos.push(letterBusy + (numberStart - 1));
        }
        for (let i = numberStart; i < lengthStart; i++) {
          busyPos.push(letterBusy + i);
        }
        if (lengthStart <= 10) {
          busyPos.push(letterBusy + lengthStart);
          busyPos.push(firstCharStart + lengthStart);
        }
      } else {
        const letterBusyPre = letters[indexFirstLetter - 1];
        const letterBusyNex = letters[indexFirstLetter + 1];
        if (numberStart !== 1) {
          busyPos.push(letterBusyPre + (numberStart - 1));
          busyPos.push(firstCharStart + (numberStart - 1));
          busyPos.push(letterBusyNex + (numberStart - 1));
        }
        for (let i = numberStart; i < lengthStart; i++) {
          busyPos.push(letterBusyPre + i);
          busyPos.push(letterBusyNex + i);
        }
        if (lengthStart <= 10) {
          busyPos.push(letterBusyPre + lengthStart);
          busyPos.push(firstCharStart + lengthStart);
          busyPos.push(letterBusyNex + lengthStart);
        }
      }
    } else {
      // vertical
      const numberStart = parseInt(startPos.split('').slice(1).join(''));
      const lengthStart = numberStart + spaces;

      const indexFirstLetter = letters.indexOf(firstCharStart);

      if (numberStart === 1) {
        // first column
        if (indexFirstLetter === 0) {
          // first row
          for (let i = indexFirstLetter; i < lengthStart; i++) {
            busyPos.push(letters.indexOf(i) + (numberStart + 1));
          }
          busyPos.push(letters.indexOf(indexFirstLetter + 1) + numberStart);
          busyPos.push(letters.indexOf(indexFirstLetter + 1) + numberStart + 1);
        } else if (indexFirstLetter === 9) {
          // last row
          busyPos.push(letters.indexOf(indexFirstLetter - 1) + numberStart);
          busyPos.push(letters.indexOf(indexFirstLetter - 1) + numberStart + 1);
          for (let i = indexFirstLetter; i < lengthStart; i++) {
            busyPos.push(letters.indexOf(i) + (numberStart + 1));
          }
        } else {
          // middle rows
          busyPos.push(letters.indexOf(indexFirstLetter - 1) + numberStart);
          busyPos.push(letters.indexOf(indexFirstLetter - 1) + numberStart + 1);
          for (let i = indexFirstLetter; i < lengthStart; i++) {
            busyPos.push(letters.indexOf(i) + (numberStart + 1));
          }
          busyPos.push(letters.indexOf(indexFirstLetter + 1) + numberStart);
          busyPos.push(letters.indexOf(indexFirstLetter + 1) + numberStart + 1);
        }
      } else if (numberStart === 10) {
        // last column
        if (indexFirstLetter === 0) {
          // first row
          for (let i = indexFirstLetter; i < lengthStart; i++) {
            busyPos.push(letters.indexOf(i) + (numberStart - 1));
          }
          busyPos.push(letters.indexOf(indexFirstLetter + 1) + numberStart);
          busyPos.push(letters.indexOf(indexFirstLetter + 1) + numberStart - 1);
        } else if (indexFirstLetter === 9) {
          // last row
          busyPos.push(letters.indexOf(indexFirstLetter - 1) + numberStart);
          busyPos.push(letters.indexOf(indexFirstLetter - 1) + numberStart - 1);
          for (let i = indexFirstLetter; i < lengthStart; i++) {
            busyPos.push(letters.indexOf(i) + (numberStart - 1));
          }
        } else {
          // middle rows
          busyPos.push(letters.indexOf(indexFirstLetter - 1) + numberStart);
          busyPos.push(letters.indexOf(indexFirstLetter - 1) + numberStart - 1);
          for (let i = indexFirstLetter; i < lengthStart; i++) {
            busyPos.push(letters.indexOf(i) + (numberStart - 1));
          }
          busyPos.push(letters.indexOf(indexFirstLetter + 1) + numberStart);
          busyPos.push(letters.indexOf(indexFirstLetter + 1) + numberStart - 1);
        }
      } else {
        // middle columns
        const prevCol = numberStart - 1;
        const nextCol = numberStart + 1;
        if (indexFirstLetter === 0) {
          // first row
          for (let i = indexFirstLetter; i < lengthStart; i++) {
            busyPos.push(letters[i] + prevCol);
            busyPos.push(letters[i] + nextCol);
          }
          busyPos.push(letters[indexFirstLetter + 1] + prevCol);
          busyPos.push(letters[indexFirstLetter + 1] + numberStart);
          busyPos.push(letters[indexFirstLetter + 1] + nextCol);
        } else if (indexFirstLetter === 9) {
          // last row
          busyPos.push(letters[indexFirstLetter - 1] + prevCol);
          busyPos.push(letters[indexFirstLetter - 1] + numberStart);
          busyPos.push(letters[indexFirstLetter - 1] + nextCol);
          for (let i = indexFirstLetter; i < lengthStart; i++) {
            busyPos.push(letters[i] + prevCol);
            busyPos.push(letters[i] + (numberStart + 1));
          }
        } else {
          // middle rows
          busyPos.push(letters[indexFirstLetter - 1] + prevCol);
          busyPos.push(letters[indexFirstLetter - 1] + numberStart);
          busyPos.push(letters[indexFirstLetter - 1] + nextCol);
          for (let i = indexFirstLetter; i < lengthStart; i++) {
            busyPos.push(letters[i] + prevCol);
            busyPos.push(letters[i] + nextCol);
          }
          busyPos.push(letters[indexFirstLetter + 1] + prevCol);
          busyPos.push(letters[indexFirstLetter + 1] + numberStart);
          busyPos.push(letters[indexFirstLetter + 1] + nextCol);
        }
      }
    }

    return busyPos;
  }

  const letters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'];
  let row = '';
  let col = '';

  if (isVertical) {
    row = letters[letterIndex + (spaces - 1)];
    col = number;
  } else {
    row = letters[letterIndex];
    col = number + (spaces - 1);
  }

  const startPos = [letters[letterIndex], number].join('');
  const endPos = [row, col].join('');

  if (!isEndPositionOk(endPos)) return undefined;

  const busyPos = getBusyPos(startPos, endPos, spaces);

  return {
    startPos,
    endPos,
    busyPos
  };
}
