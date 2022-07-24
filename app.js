let score = 0;
let board;
let rows = 4;
let columns = 4;

window.addEventListener('DOMContentLoaded', () => {
    setGame();
});

board = [
    [2, 2, 2, 2],
    [2, 2, 2, 2],
    [4, 4, 8, 8],
    [4, 4, 8, 8]
];

const setGame = () => {
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < columns; c++) {
            let tile = document.createElement('div');
            tile.id = r.toString() + '-' + c.toString();
            tile.classList.add('tile');
            let num = board[r][c];
            updateTile(tile, num);
            document.getElementById('board').append(tile);
        }
    }
};

const updateTile = (tile, num) => {
    tile.innerText = '';
    tile.classList.value = '';
    tile.classList.add('tile');
    if (num > 0) {
        tile.innerText = num;
        if (num <= 4096) {
            tile.classList.add('x' + num.toString());
        } else {
            tile.classList.add('x8192');
        }
    }
};

const slideAndMultiply = (row) => {
    row = row.filter(num => num !== 0);

    for (let i = 0; i < row.length - 1; i++) {
        if (row[i] === row[i + 1]) {
            row[i] *= 2;
            row[i + 1] = 0;
            score += row[i];
        }
    }

    row = row.filter(num => num !== 0);

    while (row.length < columns) {
        row.push(0);
    } // [4, 2, 0, 0]

    document.getElementById('score').innerText = score;
    return row;
};

const slideLeft = () => {
    for (let r = 0; r < rows; r++) {
        let row = board[r];
        row = slideAndMultiply(row);
        board[r] = row;
        for (let c = 0; c < columns; c++) {
            let tile = document.getElementById(r.toString() + '-' + c.toString());
            let num = board[r][c];
            updateTile(tile, num);
        }
    }
};

const slideRight = () => {
    for (let r = 0; r < rows; r++) {
        let row = board[r];
        row.reverse();
        row = slideAndMultiply(row);
        row.reverse();
        board[r] = row;
        for (let c = 0; c < columns; c++) {
            let tile = document.getElementById(r.toString() + '-' + c.toString());
            let num = board[r][c];
            updateTile(tile, num);
        }
    }
};

const slideUp = () => {
    for (let c = 0; c < columns; c++) {
        let row = [board[0][c], board[1][c], board[2][c], board[3][c]];
        row = slideAndMultiply(row);
        for (let r = 0; r < rows; r++) {
            board[r][c] = row[r];
            let tile = document.getElementById(r.toString() + '-' + c.toString());
            let num = board[r][c];
            updateTile(tile, num);
        }
    }
};

const slideDown = () => {
    for (let c = 0; c < columns; c++) {
        let row = [board[0][c], board[1][c], board[2][c], board[3][c]];
        row.reverse();
        row = slideAndMultiply(row);
        row.reverse();
        for (let r = 0; r < rows; r++) {
            board[r][c] = row[r];
            let tile = document.getElementById(r.toString() + '-' + c.toString());
            let num = board[r][c];
            updateTile(tile, num);
        }
    }
};

// Events
document.addEventListener('keyup', (e) => {
    if (e.key === 'ArrowLeft') {
        slideLeft();
    }
    if (e.key === 'ArrowRight') {
        slideRight();
    }
    if (e.key === 'ArrowUp') {
        slideUp();
    }
    if (e.key === 'ArrowDown') {
        slideDown();
    }
});
