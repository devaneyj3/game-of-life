let container = document.querySelector('.main')
let grid = document.querySelector('.grid')

let rows = 16
let cols = 16

//make grid


function make2DArray(cols, rows) {
    let arr = new Array(cols)
    for (let i = 0; i < arr.length; i++) {
        arr[i] = new Array(rows)
    }
    return arr
}
function makeCellsAliveOrDead() {
    // TODO: How do we determine neighbors
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
function generateUIGrid(universe) {
    let column = ''
    for (let i = 0; i < universe.length; i++) {
        let row = document.createElement('div')
        row.className = 'row'
        for (let j = 0; j < universe[i].length; j++) {
            column = document.createElement("div");
            if (universe[i][j] === 1) {
                column.className = `col-xs column r${i}c${j} alive`
            } else {
                column.className = `col-xs column r${i}c${j} dead`
            }
            configureColumn(column)
            column.innerText = ' '
            row.appendChild(column)
            console.log(universe[i][j])
        }
        grid.appendChild(row)
    }
};
const configureColumn = (column) => {
    column.addEventListener('click', (e) => {
        // if you click on the cell its alive
        // TODO: toggling would be better but for some reason I could not make that work
        if( e.target.classList.contains('dead')) {
            e.target.classList.remove('dead')
            e.target.classList.add('alive')
        } else {
            e.target.classList.remove('alive')
            e.target.classList.add('dead')
        }
    })
}
function startGame() { 
    let startBtn = document.querySelector('.start')
    let endBtn = document.querySelector('.end')
    let column = document.getElementsByClassName('column')
    let clearBtn = document.querySelector('.clear')
    let edit = true
    startBtn.addEventListener('click', (e) => {
        // make cell unclicked when you hit start button
        for (let i = 0; i < column.length; i++) {
            column[i].classList.add('no_click')
        }
    })
    // endBtn.addEventListener('click', (e) => {

    // })
    // clear classes on clear button click
    clearBtn.addEventListener('click', (e) => {
        for (let i = 0; i < column.length; i++) {
            column[i].classList.remove('alive')
            column[i].classList.remove('no_click')
        }
    })
}

universe = makeCellsAliveOrDead()
generateUIGrid(universe);
startGame();

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

// check the eight surrounding neighbors to see if they are alive or dead
// loop through list
    // If a cell is ON and has fewer than two neighbors that are ON, it turns OFF
        // if cell[i] is alive and > 2 neighbor == on:
            // turn cell[i] = dead
    // If a cell is ON and has either two or three neighbors that are ON, it remains ON.
        // if cell[i] is alive and at least 2 neighbor are on:
            // cell[i] == 'alive'
    // If a cell is ON and has more than three neighbors that are ON, it turns OFF.
        // if cell[i] is alive and < 3 neighbor are on:
        //     cell[i] == 'dead'
    // If a cell is OFF and has exactly three neighbors that are ON, it turns ON.
        // if cell[i] is dead and 3 neighbor are on:
        //     cell[i] == 'alive'

            // how do we know what the 
            // let universe = [[1,0,0,1] // universe[0][0]
            //                 [0,1,1,1]]// universe[1][1]
        //     universe[1][1] = 0
        // if(cell[i] == 1) {
        //     cell[i] = alive
        // }
        // if(cell[i] == 0) {
        //     cell[i] = dead
        // }
        // if cell[i -1] 
        // cell[i] = 
        // [
        //     [0,0,1,1]
        //     [0,1,0,1]
        // ]     