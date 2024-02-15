import { FC } from "react";
import styles from "./Node.module.scss";

export interface NodeProps {
  col: number;
  row: number;
  isFinish: boolean;
  isStart: boolean;
  isWall: boolean;
  isVisited: boolean;
  onMouseDown: (row: number, col: number) => void;
  onMouseEnter: (row: number, col: number) => void;
  onMouseUp: () => void;
  distance?: number | 0;
  previousNode?: NodeProps;
}

const Node: FC<NodeProps> = ({
  col,
  row,
  isFinish,
  isStart,
  isWall,
  isVisited,
  onMouseDown,
  onMouseEnter,
  onMouseUp
}) => {
  const extraClassName = isFinish
    ? styles.nodeFinish
    : isStart
    ? styles.nodeStart
    : isWall
    ? styles.nodeWall
    : isVisited
    ? styles.nodeVisited
    : "";

  return (
    <div
      id={`node-${row}-${col}`}
      className={`${styles.node} ${extraClassName}`}
      onMouseDown={() => onMouseDown(row, col)}
      onMouseEnter={() => onMouseEnter(row, col)}
      onMouseUp={onMouseUp}
    ></div>
  );
};
export default Node;
