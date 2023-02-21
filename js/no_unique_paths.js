var uniquePathsWithObstacles = function(obstacleGrid) {
    const m = obstacleGrid.length;
    const n = obstacleGrid[0].length;
    if (obstacleGrid[0][0] === 1 || obstacleGrid[m-1][n-1] === 1) {
        return 0; 
    }
    const queue = [[0, 0]]; 
    const visited = new Set();
    visited.add('0,0');
    const paths = Array(m).fill().map(() => Array(n).fill(0));
    // console.log(paths)
    paths[0][0] = 1;
    while (queue.length > 0) {
        const [i, j] = queue.shift();
        for (const [di, dj] of [[0, 1], [1, 0], [0, -1], [-1, 0]]) {
            const newI = i + di;
            const newJ = j + dj;
            if (newI >= 0 && newI < m && newJ >= 0 && newJ < n && obstacleGrid[newI][newJ] === 0) {
                const key = `${newI},${newJ}`;
                if (!visited.has(key)) {
                    visited.add(key);
                    queue.push([newI, newJ]);
                }
                paths[newI][newJ] += paths[i][j];
            }
        }
    }
    // console.log(paths,visited)
    return paths[m-1][n-1];
};


