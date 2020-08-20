let container = document.querySelector('.main')
let grid = document.querySelector('.grid')

//make grid


function makeGrid(cols, rows) {
    let startBtn = document.createElement('btn')
    startBtn.className = 'start'
    startBtn.innerText = 'Start'

    let endBtn = document.createElement('btn')
    endBtn.className = 'end'
    endBtn.innerText = 'End'
    for (let r = 0; r < rows; r++) {
        let row = document.createElement('div')
        row.className = 'row'
        for (c = 0; c <  cols; c++) {
            let column = document.createElement("div");
            column.className = 'col-xs'
            column.innerText = (c + 1);
            row.appendChild(column)
        }
        grid.appendChild(row)
    };
    container.appendChild(startBtn)
    container.appendChild(endBtn)
};

makeGrid(16, 16);

// 0 is dead, 1 is alive
[[0, 1],[1,1]]
[[1],[0],[1],[1]]


// # Cell objects or components that, at a minimum, should have:
// # Properties
// # current state: (alive, dead), (black, white)
// # Clickable/Tappable:
// # can be clicked to allow user to setup initial cell configuration
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
