let container = document.querySelector('.container')

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
        container.appendChild(row)
    };
    container.appendChild(startBtn)
    container.appendChild(endBtn)
};

makeGrid(16, 16);

// 0 is dead, 1 is alive
[[0, 1],[1,1]]
[[1],[0],[1],[1]]
