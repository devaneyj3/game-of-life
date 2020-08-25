let container = document.querySelector('.main')
let grid = document.querySelector('.grid')

let rows = 16
let startBtn = document.querySelector('.start')
let endBtn = document.querySelector('.end')
let column = document.getElementsByClassName('column')
let clearBtn = document.querySelector('.clear')
let cols = 16

//make grid


function make2DArray(cols, rows) {
    let arr = new Array(cols)
    for (let i = 0; i < arr.length; i++) {
        arr[i] = new Array(rows)
    }
    return arr
}
function randomGrid() {
    let universe = make2DArray(cols, rows)
    // store what cells are dead into array
    for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
            // 0 signifies a dead cell
            // 1 signifies an alive cell
            universe[i][j] = Math.floor(Math.random() * 2)
        }
    } 
    return universe
}

// generate the UI Grid
function generateUIGrid(universe) {
    let column = ''
    for (let i = 0; i < universe.length; i++) {
        let row = document.createElement('div')
        row.className = 'row'
        for (let j = 0; j < universe[i].length; j++) {
            column = document.createElement("div");
            column.className = `col-xs cell${i}:${j}`
            if (universe[i][j] === 1) {
                column.style.backgroundColor = 'black'
            } else {
                column.style.backgroundColor = 'white'
            }
            // configureColumn(column)
            column.innerText = ' '
            row.appendChild(column)
        }
        grid.appendChild(row)
    }
    return grid
    // TODO: how do I replace this grid with the new generation
};


// Why do I get an infinite loop
function nextGenGrid(arr) {
    // this function make a grid for the next generation
    console.log(`the arr in nextGenGrid is ${arr}`)
    let operations = [
        [0, 1],
        [0, -1],
        [0, +1],
        [1, -1],
        [1, +1],
        [+1, -1],
        [+1, 1],
        [+1, +1]
    ]
    // row 
    for (let i = 0; i < arr.length; i++) {
        // column
        for (let j = 0; j < arr[i].length; j++) {
            let neighbors = 0
            // console.log(`cell at ${i}:${j} is, ${arr[i][j]}`)
            operations.forEach(([x, y]) => {
                let newI = x + j;
                let newJ = y + j
                // check the bounds
                if(newI >= 0  && newI < arr.length && newJ >= 0 && newJ < arr[i].length) {
                    neighbors += arr[newI][newJ]
                    // console.log(`neighbor value for ${i}:${j} are ${neighbors}`)
                }
                if(neighbors < 2 || neighbors > 3) {
                    // console.log(`cell at ${i}:${j} has less than 2 neighbors on or more than 3 neighbors on`)
                    arr[i][j] = 0
                } else if (arr[i][j] === 0 && neighbors === 3) {
                    arr[i][j] = 1
                }
            })
        }
        // make UI updates
        generateUIGrid(arr)
    }
}
window.onload = () => {
    let randomArr = randomGrid()
    generateUIGrid(randomArr)

    startBtn.addEventListener('click', (e) => {
        // run computer geration grid
        // TODO: conect the update grid to the UI grid
        setTimeout(nextGenGrid(randomArr), 1000)
        // make cell unclicked when you hit start button
        for (let i = 0; i < column.length; i++) {
            column[i].classList.add('no_click')
        }
    })
}

    // // endBtn.addEventListener('click', (e) => {
        
    //     // })
    //     // clear classes on clear button click
    //     clearBtn.addEventListener('click', (e) => {
    //         for (let i = 0; i < column.length; i++) {
    //             column[i].classList.remove('alive')
    //             column[i].classList.remove('no_click')
    //         }
    //     })
    // }
    
    // // user clicking the column
    // const configureColumn = (column) => {
    //     column.addEventListener('click', (e) => {
    //         // if you click on the cell its alive
    //         // TODO: toggling would be better but for some reason I could not make that work
    //         if( e.target.classList.contains('dead')) {
    //             e.target.classList.remove('dead')
    //             e.target.classList.add('alive')
    //         } else {
    //             e.target.classList.remove('alive')
    //             e.target.classList.add('dead')
    //         }
    //     })
    // }
    // Behaviors
    
    // # Toggle state functionality: switch between alive & dead either because user manually toggled cell before starting simulation or simulation is running and rules of life caused cell to change state
    
    // # Utilize a timeout function to build the next generation of cells & update the display at the chosen time interval
    
    // function changeGeneration() {
//     setTimeout(function () {
//         // display new generation grid after cells change between dead and alive
//         // increment geration counter by one
//     },3000)
// }

// # Write an algorithm that:

// # Implements the following basic steps:
// # For each cell in the current generation's grid:
// # Examine state of all eight neighbors (it's up to you whether you want cells to wrap around the grid and consider cells on the other side or not)
// # Apply rules of life to determine if this cell will change states
// # When main loop completes:
// # Swap current and next grids
// # Repeat until simulation stopped
// # Breaks down above steps into appropriate sub-tasks implemented with helper functions to improve readability
// # Uses double buffering to update grid with next generation.
// # Does something well-documented with the edge of the grid. (e.g. wrap around to the far side--most fun!--or assumes all edge cells are permanently dead.)

