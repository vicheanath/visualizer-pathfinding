import React, { useState, useEffect } from "react";
import Node from "../Node";
import styles from "./Visualizer.module.scss";
import {
  dijkstra,
  getNodesInShortestPathOrder,
} from "../../algorithims/Dijkstra";

import { dfs, getNodesInShortestPathDFS } from "../../algorithims/DFS";

const START_NODE_ROW = 10;
const START_NODE_COL = 10;
const FINISH_NODE_ROW = 10;
const FINISH_NODE_COL = 40;

const Visualizer: React.FC = () => {
  const [grid, setGrid] = useState<Item[][]>([]);
  const [mouseIsPressed, setMouseIsPressed] = useState(false);
  
  const [startNode, setStartNode] = useState<{ row: number; col: number } | null>({
    row: START_NODE_ROW,
    col: START_NODE_COL,
  })
  const [finishNode, setFinishNode] = useState<{ row: number; col: number } | null>({
    row: FINISH_NODE_ROW,
    col: FINISH_NODE_COL,
  })

  useEffect(() => {
    const grid = getInitialGrid();
    setGrid(grid);
  }, []);

  const onMouseDown = (row: number, col: number) => {
    const newGrid = getNewGridWithWallToggled(grid, row, col);
    setGrid(newGrid);
    setMouseIsPressed(true);
  };

  const onMouseEnter = (row: number, col: number) => {
    if (!mouseIsPressed) return;
    const newGrid = getNewGridWithWallToggled(grid, row, col);
    setGrid(newGrid);
  };

  const onMouseUp = () => {
    setMouseIsPressed(false);
  };

  const animate = (
    visitedNodesInOrder: Item[],
    nodesInShortestPathOrder: Item[]
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
        if (!node.isStart && !node.isFinish) {
          //@ts-ignore
          document.getElementById(`node-${node.row}-${node.col}`).className =
            "node node-visited";
        }
      }, 10 * i);
    }
  };

  const animateShortestPath = (nodesInShortestPathOrder: Item[]) => {
    for (let i = 0; i < nodesInShortestPathOrder.length; i++) {
      setTimeout(() => {
        const node = nodesInShortestPathOrder[i];
        //@ts-ignore
        document.getElementById(`node-${node.row}-${node.col}`).className =
          "node node-shortest-path";
      }, 50 * i);
    }
  };
  const visualizeDijkstra = () => {
    const startNode = grid[START_NODE_ROW][START_NODE_COL];
    const finishNode = grid[FINISH_NODE_ROW][FINISH_NODE_COL];
    const vistedNodesInOrder = dijkstra(grid, startNode, finishNode) as Item[];
    const nodesInShortestPathOrder = getNodesInShortestPathOrder(finishNode);
    animate(vistedNodesInOrder, nodesInShortestPathOrder);
  };

  const visualizeDFS = () => {
    const startNode = grid[START_NODE_ROW][START_NODE_COL];
    const finishNode = grid[FINISH_NODE_ROW][FINISH_NODE_COL];
    const visitedNodesInOrder = dfs(grid, startNode, finishNode) as Item[];
    const nodesInShortestPathOrder = getNodesInShortestPathDFS(finishNode);
    animate(visitedNodesInOrder, nodesInShortestPathOrder);
  }

  const clearGrid = () => {
    const grid = getInitialGrid();
    for (let i = 0; i < grid.length; i++) {
      for (let j = 0; j < grid[i].length; j++) {
        const node = grid[i][j];
        if (!node.isStart && !node.isFinish && !node.isWall) {
          //@ts-ignore
          document.getElementById(`node-${node.row}-${node.col}`).className =
            "node";
        } else if (node.isStart) {
          //@ts-ignore
          document.getElementById(`node-${node.row}-${node.col}`).className =
            "node node-start";
        } else if (node.isFinish) {
          //@ts-ignore
          document.getElementById(`node-${node.row}-${node.col}`).className =
            "node node-finish";
        }
      }
    }
    setGrid(grid);
  };

  return (
    <div>
      <div className={styles.header}>
        <button onClick={() => visualizeDijkstra()} className={styles.button}>
          Visualize Dijkstra's Algorithm
        </button>
        <button onClick={() => visualizeDFS()} className={styles.button}>
          Visualize DFS Algorithm
        </button>
        <button onClick={() => clearGrid()} className={styles.button}>
          Clear Grid
        </button>
      </div>
      <div className={styles.grid}>
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
                    onMouseDown={onMouseDown}
                    onMouseEnter={onMouseEnter}
                    onMouseUp={onMouseUp}
                  ></Node>
                );
              })}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Visualizer;

const getInitialGrid = () => {
  const grid = [];
  for (let row = 0; row < 21; row++) {
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
    distance: Infinity,
    totalDistance: Infinity,
    heuristic: Infinity,
    isVisited: false,
    isWall: false,
    previousNode: null,
  };
};

const getNewGridWithWallToggled = (
  grid: Grid,
  row: number,
  col: number
) => {
  const newGrid = grid.slice();
  const node = newGrid[row][col];
  if (node.isStart || node.isFinish) {
    return grid;
  }
  const newNode = {
    ...node,
    isWall: !node.isWall,
  };
  newGrid[row][col] = newNode;
  return newGrid;
};

export type Grid = Item[][];

export type Item = {
  col: number;
  row: number;
  isStart: boolean;
  isFinish: boolean;
  distance: number;
  totalDistance: number;
  heuristic: number;
  isVisited: boolean;
  isWall: boolean;
  previousNode: Item | null;
};
