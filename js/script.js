let container = document.querySelector('.main')
let canvas = document.querySelector('.grid')
let ctx = canvas.getContext('2d')

let rows = 16
let startBtn = document.querySelector('.start')
let endBtn = document.querySelector('.end')
let column = document.getElementsByClassName('column')
let clearBtn = document.querySelector('.clear')
let cols = 16
let universe;

let resolution = 40
canvas.height = 800
canvas.width = 800

function buildGrid() {
    return new Array(cols).fill(null)
        .map(() => new Array(rows).fill(null)
        .map(() => Math.floor(Math.random() * 2)))
}

let grid = buildGrid()
// setInterval(() => {
    update()
// }, 1000)
//     startBtn.addEventListener('click', (e) => {
//         // make cell unclicked when you hit start button
//         for (let i = 0; i < column.length; i++) {
//             column[i].classList.add('no_click')
//         }
//     })
// }

function update() {
    // the bug is in next gen grid
    grid = nextGenGrid(grid)
    renderGrid(grid)
    // setInterval(() => {
    //     update()
    // }, 1000)
}

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

function makeNew2dArray(cols, row, grid) {

    let newArray = new Array(cols)
    for (let i = 0; i < grid.length; i++) {
        newArray[cols] = new Array(row)
    }
    return newArray
}
// this function make a grid for the next generation
function nextGenGrid(grid) {
    console.table(grid)

    let nextGen = grid.map(array => [...array])
    console.table(nextGen)
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
                    // TODO: not counting neihbors correctly
                    if( x_cell >= 0 && y_cell >=0 && x_cell < col && y_cell < row) {
                        // say that neighbor is dead
                        console.log(`\nchecking cell ${cell}`)
                        let currentNeighbor = grid[x_cell][y_cell]
                        console.log(`ncurrent neighbor is`, currentNeighbor)
                        numNeighbors += currentNeighbor
                        console.log(`numNeighbors is ${numNeighbors}\n`)
                    } 
                }
            }

            // 
            // Any live cell with fewer than two live neighbours dies, as if by underpopulation.
            if(cell === 1 & numNeighbors < 2) {
                // console.log(`cell at ${col}:${row} has less than 2 neighbors on or more than 3 neighbors on`)
                nextGen[col][row] = 0
                // Any live cell with two or three live neighbours lives on to the next generation.
            } else if (cell=== 1 && numNeighbors === 2 || numNeighbors === 3) {
                // console.log(`cell at ${col}:${row} has less than 2 neighbors on or more than 3 neighbors on`)
                nextGen[col][row] = 1
                
                // Any live cell with more than three live neighbours dies, as if by overpopulation.
                // TODO: this is where our bug lies
            } else if (cell === 1 && numNeighbors > 3) {
                console.log(`cell at ${col}:${row} has less than 2 neighbors on or more than 3 neighbors on`)
                nextGen[col][row] = 1
                // console.log(nextGen)
            }
            // Any dead cell with exactly three live neighbours becomes a live cell, as if by reproduction.
            else if (cell === 0 && numNeighbors === 3) {
                console.log(`cell at ${col}:${row} has less than 2 neighbors on or more than 3 neighbors on`)
                nextGen[col][row] = 1
                // console.log(nextGen)
            }
        
        }
    }
    console.table('next gen grid after modification',nextGen)
    return nextGen
}

//     // // endBtn.addEventListener('click', (e) => {
        
//     //     // })
//     //     // clear classes on clear button click
//     //     clearBtn.addEventListener('click', (e) => {
//     //         for (let i = 0; i < column.length; i++) {
//     //             column[i].classList.remove('alive')
//     //             column[i].classList.remove('no_click')
//     //         }
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