import React, { useState, useEffect } from "react";
import Node, { NodeProps } from "../Node";
import styles from "./Visualizer.module.scss";

const START_NODE_ROW = 10;
const START_NODE_COL = 15;
const FINISH_NODE_ROW = 10;
const FINISH_NODE_COL = 35;

const Visualizer: React.FC = () => {
  const [grid, setGrid] = useState<NodeProps[][]>([]);
  const [mouseIsPressed, setMouseIsPressed] = useState(false);
  useEffect(() => {
    const grid = getInitialGrid();
    setGrid(grid);
  }, []);

  const onMouseDown = (row: number, col: number) => {
    console.log("mouse down");
  };

  const onMouseEnter = (row: number, col: number) => {
    console.log("mouse enter");
  };

  const onMouseUp = () => {
    console.log("mouse up");
  };

  const getNewGridWithWallToggled = (
    grid: NodeProps[][],
    row: number,
    col: number
  ) => {
    const newGrid = grid.slice();
    const node = grid[row][col];
    const newNode = {
      ...node,
      isWall: !node.isWall,
    };
    newGrid[row][col] = newNode;
    return newGrid;
  };

  const getInitialGrid = () => {
    const grid = [];
    for (let row = 0; row < 20; row++) {
      const currentRow = [];
      for (let col = 0; col < 50; col++) {
        currentRow.push(createNode(col, row));
      }
      grid.push(currentRow);
    }
    return grid;
  };
  const createNode = (col: number, row: number) => {
    return {
      col,
      row,
      isStart: row === START_NODE_ROW && col === START_NODE_COL,
      isFinish: row === FINISH_NODE_ROW && col === FINISH_NODE_COL,
      isWall: false,
      isVisited: false,
      onMouseDown,
      onMouseEnter,
      onMouseUp,
    };
  };

  const clearGrid = () => {
    const newGrid = grid.slice();
    for (const row of newGrid) {
      for (const node of row) {
        const newNode = {
          ...node,
          isVisited: false,
          isWall: false,
        };
        row[node.col] = newNode;
      }
    }
    setGrid(newGrid);
  };

  const animateDijkstra = () => {
    const startNode = grid[START_NODE_ROW][START_NODE_COL];
    const finishNode = grid[FINISH_NODE_ROW][FINISH_NODE_COL];
    const visitedNodesInOrder = dijkstra(
      grid,
      startNode,
      finishNode
    ) as NodeProps[];
    const nodesInShortestPathOrder = getNodesInShortestPathOrder(finishNode);
    animate(visitedNodesInOrder, nodesInShortestPathOrder);
  };

  const dijkstra = (
    grid: NodeProps[][],
    startNode: NodeProps,
    finishNode: NodeProps
  ) => {
    if (!startNode || !finishNode || startNode === finishNode) {
      return [];
    }

    const visitedNodesInOrder = [];
    startNode.distance = 0;
    const unvisitedNodes = getAllNodes(grid);
    while (!!unvisitedNodes.length) {
      sortNodesByDistance(unvisitedNodes);
      const closestNode = unvisitedNodes.shift();
      if (closestNode?.isWall) continue;
      if (closestNode?.distance === Infinity) return visitedNodesInOrder;
      closestNode!.isVisited = true;
      visitedNodesInOrder.push(closestNode!);
      if (closestNode === finishNode) return visitedNodesInOrder;
      updateUnvisitedNeighbors(closestNode!, grid);
    }
  };

  const sortNodesByDistance = (unvisitedNodes: NodeProps[]) => {
    unvisitedNodes.sort((nodeA, nodeB) => nodeA.distance! - nodeB.distance!);
  };

  const updateUnvisitedNeighbors = (node: NodeProps, grid: NodeProps[][]) => {
    const unvisitedNeighbors = getUnvisitedNeighbors(node, grid);
    for (const neighbor of unvisitedNeighbors) {
      neighbor.distance = node.distance! + 1;
      neighbor.previousNode = node;
    }
  };

  const getUnvisitedNeighbors = (node: NodeProps, grid: NodeProps[][]) => {
    const neighbors = [];
    const { col, row } = node;
    if (row > 0) neighbors.push(grid[row - 1][col]);
    if (row < grid.length - 1) neighbors.push(grid[row + 1][col]);
    if (col > 0) neighbors.push(grid[row][col - 1]);
    if (col < grid[0].length - 1) neighbors.push(grid[row][col + 1]);
    return neighbors.filter((neighbor) => !neighbor.isVisited);
  };

  const getAllNodes = (grid: NodeProps[][]) => {
    const nodes = [];
    for (const row of grid) {
      for (const node of row) {
        nodes.push(node);
      }
    }
    return nodes;
  };

  const getNodesInShortestPathOrder = (finishNode: NodeProps) => {
    const nodesInShortestPathOrder = [];
    let currentNode = finishNode as NodeProps | undefined;
    while (currentNode !== undefined) {
      nodesInShortestPathOrder.unshift(currentNode);
      currentNode = currentNode.previousNode;
    }
    return nodesInShortestPathOrder;
  };

  const animate = (
    visitedNodesInOrder: NodeProps[],
    nodesInShortestPathOrder: NodeProps[]
  ) => {
    for (let i = 0; i <= visitedNodesInOrder.length; i++) {
      if (i === visitedNodesInOrder.length) {
        setTimeout(() => {
          animateShortestPath(nodesInShortestPathOrder);
        }, 10 * i);
        return;
      }
      setTimeout(() => {
        const node = visitedNodesInOrder[i];
        document.getElementById(`node-${node.row}-${node.col}`)!.className =
          "node node-visited";
      }, 10 * i);
    }
  };

  const animateShortestPath = (nodesInShortestPathOrder: NodeProps[]) => {
    for (let i = 0; i < nodesInShortestPathOrder.length; i++) {
      setTimeout(() => {
        const node = nodesInShortestPathOrder[i];
        document.getElementById(`node-${node.row}-${node.col}`)!.className =
          "node node-shortest-path";
      }, 50 * i);
    }
  };

  return (
    <div>
      <button onClick={animateDijkstra}>Visualize Dijkstra's Algorithm</button>
      <button onClick={clearGrid}>Clear Grid</button>
      {grid.map((row, rowIdx) => {
        return (
          <div key={rowIdx}>
            {row.map((node, nodeIdx) => {
              const { row, col, isFinish, isStart, isWall, isVisited } = node;
              return (
                <Node
                  key={nodeIdx}
                  col={col}
                  row={row}
                  isFinish={isFinish}
                  isStart={isStart}
                  isWall={isWall}
                  isVisited={isVisited}
                  onMouseDown={node.onMouseDown}
                  onMouseEnter={node.onMouseEnter}
                  onMouseUp={node.onMouseUp}
                ></Node>
              );
            })}
          </div>
        );
      })}
    </div>
  );
};

export default Visualizer;
