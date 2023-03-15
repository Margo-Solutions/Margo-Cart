function Astar(startNode, endNode){
    let openList = [];
    let closedList = [];
    let path = [];

    openList.push(startNode);
    while(openList.length > 0){
        let leastIndex = 0;
        for(let i = 0; i < openList.length; i++){
            if(openList[i].f < openList[leastIndex].f){
                leastIndex = i;
            }
        }
        let currentNode = openList[leastIndex];
        if(currentNode === endNode){
            let temp = currentNode;
            path.push(temp);
            while(temp.previous){
                path.push(temp.previous);
                temp = temp.previous;
            }

            
            return path.reverse();
        }
        openList = openList.filter(node => node !== currentNode);
        closedList.push(currentNode);
        let neighbors = currentNode.neighbors;
        for(let i = 0; i < neighbors.length; i++){
            let neighbor = neighbors[i];
            if(!closedList.includes(neighbor) && !neighbor.hylle){
                let tempG = currentNode.g + 1;
                let newPath = false;
                if(openList.includes(neighbor)){
                    if(tempG < neighbor.g){
                        neighbor.g = tempG;
                        newPath = true;
                    }
                } else {
                    neighbor.g = tempG;
                    newPath = true;
                    openList.push(neighbor);
                }
                if(newPath){
                    neighbor.h = heuristic(neighbor, endNode);
                    neighbor.f = neighbor.g + neighbor.h;
                    neighbor.previous = currentNode;
                }
            }
        }
    }

}
function heuristic(a, b){
    let d = Math.abs(a.x - b.x) + Math.abs(a.y - b.y);
    return d;
}

export default Astar;