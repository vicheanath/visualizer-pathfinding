import { Grid, Item } from "../components/Visualizer/Visualizer";

export function dfs(grid: Grid, startNode: Item, finishNode: Item) {
  const visitedNodesInOrder = [];
  if (!startNode || !finishNode || startNode === finishNode) {
    return false;
  }
  const unvisitedNodes = [];
  unvisitedNodes.push(startNode);
  while (unvisitedNodes.length) {
    const currentNode = unvisitedNodes.pop() as Item;

    if (currentNode.isWall) continue;
    //@ts-ignore
    if (currentNode === Infinity) return visitedNodesInOrder;

    currentNode.isVisited = true;
    visitedNodesInOrder.push(currentNode);
    if (currentNode === finishNode) {
      return visitedNodesInOrder;
    }
    updateUnvisitedNeighbors(currentNode, grid, unvisitedNodes);
  }
  return false;
}

function updateUnvisitedNeighbors(
  node: Item,
  grid: Grid,
  unvisitedNodes: Item[]
) {
  const unvisitedNeighbors = getUnvisitedNeighbors(node, grid);
  for (const neighbor of unvisitedNeighbors) {
    neighbor.previousNode = node;
    unvisitedNodes.push(neighbor);
  }

  function getUnvisitedNeighbors(node: Item, grid: Grid) {
    const neighbors = [];
    const { col, row } = node;
    if (row < grid.length - 1) neighbors.unshift(grid[row + 1][col]);
    if (col < grid[0].length - 1) neighbors.unshift(grid[row][col + 1]);
    if (row > 0) neighbors.unshift(grid[row - 1][col]);
    if (col > 0) neighbors.unshift(grid[row][col - 1]);
    return neighbors.filter((neighbor) => !neighbor.isVisited);
  }
}

export function getNodesInShortestPathDFS(finishNode: Item) {
  const nodesInShortestPathOrder = [];
  let currentNode = finishNode;
  while (currentNode !== null) {
    nodesInShortestPathOrder.unshift(currentNode);
    //@ts-ignore
    currentNode = currentNode.previousNode;
  }
  return nodesInShortestPathOrder;
}
