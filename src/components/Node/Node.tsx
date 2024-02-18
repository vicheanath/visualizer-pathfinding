import { FC } from "react";
import styles from "./Node.module.scss";

export interface NodeProps {
  col: number;
  row: number;
  isStart: boolean;
  isFinish: boolean;
  isVisited: boolean;
  isWall: boolean;
  onMouseDown: (row: number, col: number) => void;
  onMouseEnter: (row: number, col: number) => void;
  onMouseUp: () => void;
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
  onMouseUp,
}) => {
  const extraClassName = isFinish
    ? styles.nodeFinish
    : isStart
      ? styles.nodeStart
      : isVisited
        ? styles.nodeVisited
        : isWall
          ? styles.nodeWall
          : "";

  return (
    <div
      id={`node-${row}-${col}`}
      className={`${styles.node} ${extraClassName}`}
      onMouseDown={() => onMouseDown(row, col)}
      onMouseEnter={() => onMouseEnter(row, col)}
      onMouseUp={() => onMouseUp()}
    ></div>
  );
};
export default Node;
