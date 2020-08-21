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
    let edit = true
    startBtn.addEventListener('click', (e) => {
        storeColumnData()
    })
    console.log(edit)
}
function storeColumnData() {
    let column = document.getElementsByClassName('column')
    let deadList = []
    let aliveList = []      
    // store what cells are dead into array
    for (let i = 0; i < column.length; i++) {
        if(column[i].classList.contains('dead')) {
            deadList.push(column[i].classList.item(2))
            // if colunm is clicked then it is alive and add to alive list
        } else if (column[i].classList.contains('alive')) {
            console.log('here')
            aliveList.push(column[i].classList.item(2))
        }
    }  
    console.log('deadList', deadList)
    console.log('aliveList', aliveList)
}
makeGrid(16, 16);
startGame()
// check the eight surrounding neighbors to see if they are alive or dead
// loop through all columns to see what are alive and dead to store them in a data structure
// 0 is dead, 1 is alive

// [[1],[0],[1],[1]]

//  1 is alive, 0 is dead
// if(dataStructure[i] === 1 ) {
//     // alive
//     data
// }

// # should NOT be clickable while simulation is running
// # Behaviors
// # Toggle state functionality: switch between alive & dead either because user manually toggled cell before starting simulation or simulation is running and rules of life caused cell to change state
// # An appropriate data structure to hold a grid of cells that is at least 25x25. Go as big as you want.
// # Text to display current generation # being displayed
// # Utilize a timeout function to build the next generation of cells & update the display at the chosen time interval
// # Button(s) that start & stop the animation
// # Button to clear the grid
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
