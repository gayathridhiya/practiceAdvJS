var numIslands = function(grid) {
    let count=0;
    console.log(grid.length);
    for(let i=0;i<grid.length;i++){
        for(let j=0;j<grid[i].length;j++){
            // console.log(grid[i])
            if(grid[i][j]==="1"){
                count++;
                dfs(grid,i,j,grid.length,grid[i].length)
            }
        }
    }
    return count;
};

function dfs(arr,i,j,r,c){
    if(i<0 || i>=r || j<0 || j>=c){
        return;
    }
    if(arr[i][j]==="0"){
        return;
    }
    if(arr[i][j]==="#"){
        return;
    }

    arr[i][j]="#";
    dfs(arr,i-1,j,r,c);
    dfs(arr,i,j-1,r,c);
    dfs(arr,i,j+1,r,c);
    dfs(arr,i+1,j,r,c);
}