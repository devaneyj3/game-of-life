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
// requestAnimationFrame(update)

// function update() {
    grid = nextGenGrid(grid)
    renderGrid(grid)
    //     requestAnimationFrame(update)
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

// function makeNew2dArray() {

//     let newArray = new Array(grid.length)
//     for (let col = 0; col < grid.length; col++) {

//         newArray[col] = new Array()
//         for (let row = 0; row < grid[col].length; row++) {
//         }
//     }
// }
function nextGenGrid(grid) {
    // this function make a grid for the next generation
    console.log('initial array', grid)
    // let nextGen = new Array(grid.length)
    let nextGen = Array.from(grid, () => new Array(grid.length))
    console.log(nextGen)
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

                    if( x_cell >= 0 && y_cell >=0 && x_cell < col && y_cell < row) {
                        const currentNeighbor = grid[col + i][row + j]
                        numNeighbors += currentNeighbor
                        // console.log(numNeighbors)
                    }
                }
            }
            if(cell === 1 & numNeighbors < 2) {
                // console.log(`cell at ${i}:${j} has less than 2 neighbors on or more than 3 neighbors on`)
                console.log(cell)
                nextGen[col][row] = 0
            } else if (cell=== 1 && numNeighbors > 3) {
                console.log(cell)
                nextGen[col][row] = 0
            } else if (cell === 0 && numNeighbors === 3) {
                nextGen[col][row] = 1
                console.log(cell)
            }
        }
    }
    return nextGen
}
// }
// window.onload = () => {
//     randomGrid()
//     generateUIGrid(universe)


//     startBtn.addEventListener('click', (e) => {
//         // run computer geration grid
//         // TODO: conect the update grid to the UI grid
//         let updatedArray = nextGenGrid()
//         console.log('new array will be', updatedArray)
//         // make UI updates
//         setTimeout(() => {
//             generateUIGrid(updatedArray)
//         }, 1000)
//         // make cell unclicked when you hit start button
//         for (let i = 0; i < column.length; i++) {
//             column[i].classList.add('no_click')
//         }
//     })
// }

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