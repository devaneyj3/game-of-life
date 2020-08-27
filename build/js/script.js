let container = document.querySelector('.main')
let canvas = document.querySelector('.grid')
let ctx = canvas.getContext('2d')

let startBtn = document.querySelector('.start')
let endBtn = document.querySelector('.end')
let clearBtn = document.querySelector('.clear')
let generation_tag = document.querySelector('.generation')

let resolution = 40
canvas.height = 800
canvas.width = 800

let rows = 16
let cols = 16

let cleared = false
let ended = false

let generation = 0
function buildGrid() {
    return new Array(cols).fill(null)
    .map(() => new Array(rows).fill(null)
    .map(() => Math.floor(Math.random() * 2)))
}


let grid = buildGrid()
renderGrid(grid)
// if I hit the clear button
let incrementGeneration
// start animating on click
startBtn.addEventListener('click', (e) => {
    if(cleared) {
        grid = buildGrid()
        renderGrid(grid)
        cleared = false
    }
    incrementGeneration = setInterval(displayNextGen, 500)
    // make cell unclicked when you hit start button
    // for (let i = 0; i < column.length; i++) {
        //     column[i].classList.add('no_click')
        // }
})

function displayNextGen() {
        grid = nextGenGrid(grid)
        renderGrid(grid)
        // TODO: generation incrementer doesn't stop when the animation does
        generation += 1
        generation_tag.innerText = `Generation ${generation}`
}

endBtn.addEventListener('click', (e) => {
    ended = true
})
    
clearBtn.addEventListener('click', (e) => {
    // this shows an empty grid
    let clearedGrid = clearGrid(grid)
    renderGrid(clearedGrid)
    clearInterval(incrementGeneration)
    resetTimer()
})

function resetTimer() {
    cleared = true
    generation = 0
    generation_tag.innerText = `Generation ${generation}`

    clearInterval(incrementGeneration)
}
        // for (let i = 0; i < column.length; i++) {
            //     column[i].classList.remove('alive')
            //     column[i].classList.remove('no_click')
            // }

function clearGrid(grid) {
    for (let col = 0; col < grid.length; col++) {
        for (let row = 0; row < grid[col].length; row++) {
            grid[col][row] = 0
        }
    }
    return grid
}
// function update() {
//     grid = nextGenGrid(grid)
//     renderGrid(grid)
//     setTimeout(() => {
//         update()
//     },500)
// }

function renderGrid(grid) {
    for (let col = 0; col < grid.length; col++) {
        for (let row = 0; row < grid[col].length; row++) {
            let cell = grid[col][row]

            ctx.beginPath()
            ctx.rect(col * resolution, row * resolution, resolution, resolution)
            ctx.fillStyle = cell ? 'black': 'white'
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

//     // // endBtn.addEventListener('click', (e) => {
        
//     //     // })
//     //     // clear classes on clear button click
//     //     })
//     // }
    
//     // // user clicking the column
//     // const configureColumn = (column) => {
//     //     column.addEventListener('click', (e) => {
//     //         // if you click on the cell its alive
//     //         // TODO: toggling would be better but for some reason I could not make that work
//     //         if( e.target.classList.contains('dead')) {
//     //             e.target.classList.remove('dead')
//     //             e.target.classList.add('alive')
//     //         } else {
//     //             e.target.classList.remove('alive')
//     //             e.target.classList.add('dead')
//     //         }
//     //     })
//     // }