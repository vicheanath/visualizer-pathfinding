import { FC, memo } from "react";
import style from "./SortNode.module.scss";

export interface SortNodeProps {
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
  ref?: React.Ref<any>;
}

const SortNode: FC<SortNodeProps> = memo(
  ({
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
    ref,
  }) => {
    const classes = [style.node];
    if (isComparing) classes.push(style.comparing);
    if (isSorted) classes.push(style.sorted);
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
        ref={ref}
        className={`node ${classes.join(" ")}`}
        style={{ height: `${25 + value * 5}px` }}
      >
        <span>{value}</span>
      </div>
    );
  }
);

export default SortNode;
