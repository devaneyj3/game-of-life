let container = document.querySelector('.main')
let grid = document.querySelector('.grid')

//make grid

function makeGrid(cols, rows) {
    let startBtn = document.createElement('btn')
    startBtn.className = 'start'
    startBtn.innerText = 'Start'
    let column = ''

    let endBtn = document.createElement('btn')
    endBtn.className = 'end'
    endBtn.innerText = 'End'
    
    let clearBtn = document.createElement('btn')
    clearBtn.className = 'clear'
    clearBtn.innerText = 'Clear'

    
    for (let r = 0; r < rows; r++) {
        let row = document.createElement('div')
        row.className = 'row'
        for (c = 0; c <  cols; c++) {
            column = document.createElement("div");
            column.className = `col-xs column r${r}c${c} dead`
            configureColumn(column)
            column.innerText = ' ';
            row.appendChild(column)
        }
        grid.appendChild(row)
    };
    container.appendChild(startBtn)
    container.appendChild(endBtn)
    container.appendChild(clearBtn)
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
    let generationInfo = document.createElement('span')
    generationInfo.className = 'generation'
    generationInfo.innerText = 'Generation 0'
    startBtn.addEventListener('click', (e) => {
        // make cell unclicked when you hit start button
        for (let i = 0; i < column.length; i++) {
            column[i].classList.add('no_click')
        }
        storeColumnData()
        // # Text to display current generation # being displayed
        container.appendChild(generationInfo)
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

    console.log(edit)
}
function storeColumnData() {
    let column = document.getElementsByClassName('column')
    // TODO: How do we determine neighbors
    let universe = []     
    // store what cells are dead into array
    for (let i = 0; i < column.length; i++) {
        if(column[i].classList.contains('dead')) {
            // universe.push(column[i].classList.item(2))
            // 0 signifies a dead cell
            universe.push(0)
            // if colunm is clicked then it is alive and add to alive list
        } else if (column[i].classList.contains('alive')) {
            // universe.push(column[i].classList.item(2))
            // 1 signifies an alive cell
            universe.push(1)
        } 
    }  
    console.log('universe', universe)
}
makeGrid(16, 16);
startGame()

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