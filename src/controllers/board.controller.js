// let letters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'];
const shipPositions = [];

const board = {};

board.setShipsHide = (req, res) => {
  const { shipsLength } = req.body;

  generateShipPositions(shipsLength);

  res.json(shipPositions);
};

module.exports = board;

function generateShipPositions(shipsLength) {
  shipsLength.forEach((shipLength) => {
    const letterIndex = Math.floor(Math.random() * 10) + 1 - 1;
    const number = Math.floor(Math.random() * 10) + 1;
    const isVertical = Math.round(Math.random()) === 1;
    const spaces = shipLength;

    console.log(letterIndex, number, isVertical, spaces);
    const boardShip = isAvailable(letterIndex, number, isVertical, spaces);
    console.log(boardShip);
    if (boardShip) {
      console.log('respuesta OK');
      const { startPos } = boardShip; // 'A1'
      const { endPos } = boardShip; // 'A4'
      shipPositions.push({
        shipLong: spaces,
        startPos,
        endPos,
      });
    }
  });

  //   const shipPositions = [
  //     { shipLong: 4, startPos: 'A1', endPos: 'A4' },
  //     { shipLong: 3, startPos: 'B3', endPos: 'D3' },
  //     { shipLong: 3, startPos: 'G8', endPos: 'G10' },
  //     { shipLong: 2, startPos: 'H1', endPos: 'I1' },
  //     { shipLong: 2, startPos: 'J1', endPos: 'J2' },
  //     { shipLong: 2, startPos: 'I7', endPos: 'J7' },
  //     { shipLong: 1, startPos: 'G10', endPos: 'G10' }
  //   ];
}

function isAvailable(letterIndex, number, isVertical, spaces) {
  const letters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'];
  let endPos = '';
  let row = '';
  let col = '';
  // if (shipPositions.length === 0) {

  if (isVertical) {
    row = letters[letterIndex + spaces];
    col = number;
  } else {
    row = letters[letterIndex];
    col = number + spaces;
  }

  if (row) return undefined;

  endPos = [row, col].join('');

  return {
    startPos: [letters[letterIndex], number].join(''),
    endPos,
  };
  // }

  //   return {
  //     startPos: 'A1',
  //     endPos: 'A4'
  //   };
}
