let canvas
let gc

const GRID_WIDTH = 50
const GRID_HEIGHT = 25
const CELL_SIZE = 32

// How much the mouse can move (in pixels) before being considered a 'drag' event rather than a 'click'
const MOVEMENT_THRESHOLD = 2

let cameraX = 0
let cameraY = 0
let isMouseDown = false
let clickMovement
let grid

export function start (canvasElement) {
  canvas = canvasElement
  canvas.width = window.innerWidth
  canvas.height = window.innerHeight

  gc = canvas.getContext('2d')

  grid = new Array(GRID_HEIGHT)
  for (let y = 0; y < GRID_HEIGHT; ++y) {
    grid[y] = new Array(GRID_WIDTH)
    for (let x = 0; x < GRID_WIDTH; ++x) {
      grid[y][x] = {
        x: x * CELL_SIZE,
        y: y * CELL_SIZE,
        state: 0
      }
    }
  }

  // Attach event hooks
  canvas.addEventListener('mousedown', mouseDown)
  canvas.addEventListener('mousemove', mouseMove)
  canvas.addEventListener('mouseup', mouseUp)

  // Begin update hook
  update()
}

function mouseDown (e) {
  isMouseDown = true
  clickMovement = 0
}

function mouseMove (e) {
  if (isMouseDown) {
    cameraX += e.movementX
    cameraY += e.movementY
    clickMovement += Math.abs(e.movementX) + Math.abs(e.movementY)
  }
}

function mouseUp (e) {
  isMouseDown = false
  if (clickMovement <= MOVEMENT_THRESHOLD) {
    // Fire a click event
    click(e.clientX, e.clientY)
  }
}

function click (x, y) {
  // Offset by camera position
  x -= cameraX
  y -= cameraY
  const gridX = Math.floor(x / CELL_SIZE)
  const gridY = Math.floor(y / CELL_SIZE)
  grid[gridY][gridX].state = 1 - grid[gridY][gridX].state
}

function update () {
  // Logic

  // Render
  render()
  // Anim frame
  window.requestAnimationFrame(update)
}

function render () {
  gc.clearRect(0, 0, canvas.width, canvas.height)
  gc.save()
  gc.translate(cameraX, cameraY)
  gc.lineWidth = 2
  gc.strokeStyle = 'rgba(0, 0, 0, .1)'
  grid.forEach(row => {
    row.forEach(cell => {
      gc.fillStyle = cell.state === 0 ? 'white' : 'black'
      gc.beginPath()
      gc.rect(cell.x, cell.y, CELL_SIZE, CELL_SIZE)
      gc.closePath()
      gc.fill()
      gc.stroke()
    })
  })
  gc.restore()
}
