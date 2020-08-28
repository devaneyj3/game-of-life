
let canvas = document.querySelector('.grid')
let ctx = canvas.getContext('2d')

let startBtn = document.querySelector('.start')
let clearBtn = document.querySelector('.clear')
let generation_tag = document.querySelector('.generation')

let colorTag = document.querySelector('.colorForm')

let resolution = 40
canvas.height = 800
canvas.width = 800
let form = document.querySelector('.form')

let deadColor = 'white'
let aliveColor = 'black'

let rows = 100;
let cols = 100;

let colorBtnClicked = false
let cleared = false

let generation = 0

let intervalSpeed = 500


if (colorBtnClicked) {
    colorBtnClicked = false
}
let grid = buildGrid(rows, cols)
function buildGrid(rows, cols) {
    return new Array(cols).fill(null)
    .map(() => new Array(rows).fill(null)
    .map(() => Math.floor(Math.random() * 2)))
}
renderGrid(grid, aliveColor, deadColor)
let incrementGeneration
// start animating on click
startBtn.addEventListener('click', (e) => {
    startBtn.disabled = true
    if(cleared) {
        grid = buildGrid(rows, cols)
        renderGrid(grid, aliveColor, deadColor)
        cleared = false
    }
    incrementGeneration = setInterval(displayNextGen, intervalSpeed)
})
let slider = document.querySelector('.slider')
slider.oninput = function() {
    intervalSpeed = this.value;
}
// change colors of the dead and alive cells
const changeColor = (e) => {
    let alive = document.querySelector('.alive')
    let dead = document.querySelector('.dead')
    
    aliveColor = alive.value
    deadColor = dead.value;
    
    e.preventDefault()
    colorBtnClicked = true
}

colorTag.addEventListener('submit',changeColor)

function displayNextGen() {
        grid = nextGenGrid(grid)
        renderGrid(grid, aliveColor, deadColor)
        // TODO: generation incrementer doesn't stop when the animation does
        generation += 1
        generation_tag.innerText = `Generation ${generation}`
}
clearBtn.addEventListener('click', (e) => {
    // this shows an empty grid
    let clearedGrid = clearGrid(grid)
    renderGrid(clearedGrid, aliveColor, deadColor)
    clearInterval(incrementGeneration)
    resetTimer()
    startBtn.disabled = false
    startBtn.innerText= 'Start'
})

function resetTimer() {
    cleared = true
    generation = 0
    generation_tag.innerText = `Generation ${generation}`

    clearInterval(incrementGeneration)
}


function clearGrid(grid) {
    for (let col = 0; col < grid.length; col++) {
        for (let row = 0; row < grid[col].length; row++) {
            grid[col][row] = 0
        }
    }
    return grid
}


function renderGrid(grid, aliveColor, deadColor) {
    for (let col = 0; col < grid.length; col++) {
        for (let row = 0; row < grid[col].length; row++) {
            let cell = grid[col][row]

            ctx.beginPath()
            ctx.rect(col * resolution, row * resolution, resolution, resolution)
            ctx.fillStyle = cell ? aliveColor: deadColor
            ctx.fill()
            ctx.stroke()
        }
    }
}
// this function make a grid for the next generation
function nextGenGrid(grid) {
    let nextGen = grid.map(array => [...array])
    for (let col = 0; col < grid.length; col++) {
        for (let row = 0; row < grid[col].length; row++) {
            let cell = grid[col][row]
            let numNeighbors = 0
            // looping through neighbors of the current cell
            for (let i = -1; i < 2; i++) {
                for (let j = -1; j < 2; j++) {
                    // don't count the cell we are currently on
                    if( i === 0 && j === 0) {
                        continue
                    }
                    const x_cell = col + i
                    const y_cell = row + j

                    // checking if we it checks outside of the bounds of the grid 
                    if( x_cell >= 0 && y_cell >=0 && x_cell < cols && y_cell < rows) {
                        const currentNeighbor = grid[col + i][row + j]
                        numNeighbors += currentNeighbor
                    } 
                }
            }

            // 
            // Any live cell with fewer than two live neighbours dies, as if by underpopulation.
            if(cell === 1 & numNeighbors < 2) {
                nextGen[col][row] = 0
            } 
                // Any live cell with more than three live neighbours dies, as if by overpopulation.
            else if (cell === 1 && numNeighbors > 3) {
                nextGen[col][row] = 0
            }
            // Any dead cell with exactly three live neighbours becomes a live cell, as if by reproduction.
            else if (cell === 0 && numNeighbors === 3) {
                nextGen[col][row] = 1
            }
        }
    }
    return nextGen
}