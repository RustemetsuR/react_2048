export const moveLeft = arr => {
    for (let row = 0; row < arr.length; row++) {
        for (let col = 1; col < arr.length; col++) {
            if (arr[row][col - 1] === 0) {
                arr[row][col - 1] = arr[row][col];
                arr[row][col] = 0;
            }
        }
    }
}

export const moveRight = arr => {
    for (let row = 0; row < arr.length; row++) {
        for (let col = 2; col >= 0; col--) {
            if (arr[row][col + 1] === 0) {
                arr[row][col + 1] = arr[row][col];
                arr[row][col] = 0;
            }
        }
    }
}
export const combineLeft = arr => {
    let score = 0;
    for (let row = 0; row < arr.length; row++) {
        for (let col = 0; col < arr.length - 1; col++) {
            if (arr[row][col + 1] === arr[row][col]) {
                arr[row][col] = 2 * arr[row][col];
                score += arr[row][col];
                arr[row][col + 1] = 0;
            }
        }
    }
    return score;
}
export const combineRight = arr => {
    let score = 0;
    for (let row = 0; row < arr.length; row++) {
        for (let col = 3; col >= 0; col--) {
            if (arr[row][col - 1] === arr[row][col]) {
                arr[row][col] = 2 * arr[row][col];
                score += arr[row][col];
                arr[row][col - 1] = 0;
            }
        }
    }
    return score;
}
export const moveUp = arr => {
    for (let row = 1; row < arr.length; row++) {
        for (let col = 0; col < arr.length; col++) {
            if (arr[row - 1][col] === 0) {
                arr[row - 1][col] = arr[row][col];
                arr[row][col] = 0;
            }
        }
    }
}
export const moveDown = arr => {
    for (let row = 2; row >= 0; row--) {
        for (let col = 0; col < arr.length; col++) {
            if (arr[row + 1][col] === 0) {
                arr[row + 1][col] = arr[row][col];
                arr[row][col] = 0;
            }
        }
    }
}
export const combineUp = arr => {
    let score = 0;
    for (let row = 0; row < arr.length - 1; row++) {
        for (let col = 0; col < arr.length; col++) {
            if (arr[row + 1][col] === arr[row][col]) {
                arr[row][col] = 2 * arr[row][col];
                score += arr[row][col];
                arr[row + 1][col] = 0;
            }
        }
    }
    return score;
}

export const combineDown = arr => {
    let score = 0;
    for (let row = 3; row > 0; row--) {
        for (let col = 0; col < arr.length; col++) {
            if (arr[row - 1][col] === arr[row][col]) {
                arr[row][col] = 2 * arr[row][col];
                score += arr[row][col];
                arr[row - 1][col] = 0;
            }
        }
    }
    return score;
}

export const onClickUp = arr => {
    for (let i = 0; i < 4; i++) {
        moveUp(arr);
    }
    const score = combineUp(arr);
    moveUp(arr);
    return score;
}

export const onClickDown = arr => {
    for (let i = 0; i < 4; i++) {
        moveDown(arr);
    }
    const score = combineDown(arr);
    moveDown(arr);
    return score;
}

export const onClickLeft = arr => {
    for (let i = 0; i < 4; i++) {
        moveLeft(arr);
    }
    const score = combineLeft(arr);
    moveLeft(arr);
    return score;
}

export const onClickRight = arr => {
    for (let i = 0; i < 4; i++) {
        moveRight(arr);
    }
    const score = combineRight(arr);
    moveRight(arr);
    return score;
}