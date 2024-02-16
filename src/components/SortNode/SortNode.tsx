import { FC } from "react";
import style from "./SortNode.module.scss";

interface SortNodeProps {
  value: number;
  isSorted?: boolean;
  isComparing?: boolean;
  isSwapping?: boolean;
  isPivot?: boolean;
  isPartitioning?: boolean;
  isMerging?: boolean;
  isAuxiliary?: boolean;
  isMain?: boolean;
  isStart?: boolean;
  isEnd?: boolean;
  isMiddle?: boolean;
}

const SortNode: FC<SortNodeProps> = ({
  value,
  isSorted,
  isComparing,
  isSwapping,
  isPivot,
  isPartitioning,
  isMerging,
  isAuxiliary,
  isMain,
  isStart,
  isEnd,
  isMiddle,
}) => {
  const classes = [style.node];
  if (isSorted) classes.push(style.sorted);
  if (isComparing) classes.push(style.comparing);
  if (isSwapping) classes.push(style.swapping);
  if (isPivot) classes.push(style.pivot);
  if (isPartitioning) classes.push(style.partitioning);
  if (isMerging) classes.push(style.merging);
  if (isAuxiliary) classes.push(style.auxiliary);
  if (isMain) classes.push(style.main);
  if (isStart) classes.push(style.start);
  if (isEnd) classes.push(style.end);
  if (isMiddle) classes.push(style.middle);

  return (
    <div
      className={`node ${classes.join(" ")}`}
      style={{ height: `${value * 5}px` }}
    >
      <span>{value}</span>
    </div>
  );
};

export default SortNode;
