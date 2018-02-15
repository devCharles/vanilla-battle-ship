console.log('🚀 Run!')

const constants = {
  STEP: {
    PLACING: 1,
    SHOOTING: 2,
    FINISHED: 3
  }
}

let gameState = {
  placedShips: [],
  ocupiedCells: [],
  selectedShip: '',
  gameStep: 1,
  placingDirection: 'horizontal'
}

function drawGameBoard (height , width, clean = false) {
  let tablero = document.getElementById('tablero')
  if(clean) tablero.innerHTML = ''
  let area = height * width
  let x = 1
  let y = 1
  for (let i=1; i <= area; i++) {
    let cell = document.createElement('div')
    cell.id = `${x}-${y}`
    cell.classList.add("cell")
    cell.addEventListener('mouseover', onCellOver)
    cell.addEventListener('mouseleave', onCellLeave)
    tablero.appendChild(cell)
    if (x >= height) {
      x = 1
      y = y + 1
    }else {
      if (y > width) y = 1
      x = x + 1
    }
  }
}

function Ship (id, size = 0, coordinates = {}) {
  return {id, size, coordinates}
}

drawGameBoard(10, 10)
let ships = {
  ship1: new Ship('s1', 2),
  ship2: new Ship('s2', 3),
  ship3: new Ship('s3', 6),
  ship4: new Ship('s4', 4),
  ship5: new Ship('s5', 1),
  ship6: new Ship('s6', 5),
  ship7: new Ship('s7', 10),
}

function drawShip(ship, htmlElement) {
  for(let i = 1; i <= ship.size; i++){
    let shipCell = document.createElement('div')
    shipCell.classList.add('shipCell')
    htmlElement.appendChild(shipCell)
  }
  return htmlElement
}

function clickOnShipListItem (e) {
  let shipKey = e.target.parentElement.id
  let shipContainers = document.querySelectorAll('.shipContainer')
  shipContainers.forEach(container => {
    container.classList.remove('selected')
    gameState.placedShips.push(shipKey)
    gameState.selectedShip = shipKey
  })
  if (e.target.parentElement.id.startsWith('ship')) {
    e.target.parentElement.classList.add('selected')
  } else {
    e.target.classList.add('selected')
  }
  
}

function drawShipList(shipList = {}) {
  let shipListEl = document.getElementById('list')
  shipListEl.innerHTML = 'SHIP LIST'
  Object.keys(shipList).forEach(shipKey => {
    let ship = shipList[shipKey]
    let shipContainer = document.createElement('div')
    shipContainer.classList.add('shipContainer')
    shipContainer = drawShip(ship, shipContainer)
    shipContainer.id = shipKey
    shipContainer.addEventListener('click', clickOnShipListItem)
    shipListEl.appendChild(shipContainer)
  })
}

drawShipList(ships)

function onCellOver (e) {
  let cells = document.querySelectorAll('.cell')
  cells.forEach(cell => {
    cell.classList.remove('selected')
  })
  let id = e.target.id
  let coordinates = id.split('-')
  let x = parseInt(coordinates[0])
  let y = parseInt(coordinates[1])
  if (gameState.gameStep === constants.STEP.PLACING) {
    let nextCoords = getNextCells( x,y, ships[gameState.selectedShip].size )
    nextCoords.forEach(cell => {
      document.getElementById(cell).classList.add('selected')
    })
  } else if (gameState.gameStep === constants.STEP.SHOOTING) {
    
  } else { // finished game

  }
}

function onCellLeave () {
  let cells = document.querySelectorAll('.cell')
  cells.forEach(cell => {
    cell.classList.remove('selected')
  })
}

function getNextCells (x, y, size = 1) {
  let coordinates = []
  if (gameState.placingDirection === 'horizontal') {
    if (size === 1) {
      coordinates.push({x,y})
    } else {
      for (let i = 1; i < size; i++) {
        coordinates.push({x: x + i, y })
      }
    }
  } else {
    if (size === 1) {
      coordinates.push({x,y})
    } else {
      for (let i = 1; i < size; i++) {
        coordinates.push({x: x, y: y + i })
      }
    }
  }
  return coordinates.map(coo => {
    return `${coo.x}-${coo.y}`
  })
}



