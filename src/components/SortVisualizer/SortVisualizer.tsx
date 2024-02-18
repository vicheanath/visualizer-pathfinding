import { useEffect, useState } from "react";
import SortNode from "../SortNode/SortNode";
import { v4 as uuidv4 } from "uuid";
export type SortItem = {
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
};

const SortVisualizer = () => {
  const [node, setNode] = useState<SortItem[]>([]);
  useEffect(() => {
    resetArray();
  }, []);

  const resetArray = () => {
    const array = [] as SortItem[];
    for (let i = 0; i < 50; i++) {
      array.push({
        value: randomIntFromInterval(5, 100),
        isSorted: false,
        isComparing: false,
        isSwapping: false,
        isPivot: false,
        isPartitioning: false,
        isMerging: false,
        isAuxiliary: false,
        isMain: false,
        isStart: false,
      });
    }
    setNode(array);
  };

  const randomIntFromInterval: (min: number, max: number) => number = (
    min,
    max
  ) => {
    return Math.floor(Math.random() * (max - min + 1) + min);
  };
  const ANIMATION_SPEED_MS = 50;

  const animateMergeSort = (items: SortItem[]) => {
    const animations = getMergeSortAnimations(items);

    animations.forEach((animation: any, idx: number) => {
      const arrayBars = document.getElementsByClassName("node");
      const isColorChange = idx % 3 !== 2;
      if (isColorChange) {
        const [barOneIdx, barTwoIdx] = animation;
        const barOneStyle = arrayBars[barOneIdx] as HTMLElement;
        const barTwoStyle = arrayBars[barTwoIdx] as HTMLElement;
        const color = idx % 3 === 0 ? "red" : "turquoise";
        setTimeout(() => {
          barOneStyle.style.backgroundColor = color;
          barTwoStyle.style.backgroundColor = color;
        }, idx * ANIMATION_SPEED_MS);
      } else {
        setTimeout(() => {
          const [barOneIdx, newHeight] = animation;
          const barOneStyle = arrayBars[barOneIdx] as HTMLElement;
          barOneStyle.style.height = `${25 + newHeight * 5}px`;
        }, idx * ANIMATION_SPEED_MS);
      }
     
    });
  };
  const getMergeSortAnimations = (array: SortItem[]) => {
    const animations = [] as any;
    if (array.length <= 1) return array;
    const auxiliaryArray = array.slice();
    mergeSortHelper(array, 0, array.length - 1, auxiliaryArray, animations);
    return animations;
  };

  const mergeSortHelper = (
    mainArray: SortItem[],
    startIdx: number,
    endIdx: number,
    auxiliaryArray: SortItem[],
    animations: any
  ) => {
    if (startIdx === endIdx) return;
    const middleIdx = Math.floor((startIdx + endIdx) / 2);
    mergeSortHelper(auxiliaryArray, startIdx, middleIdx, mainArray, animations);
    mergeSortHelper(
      auxiliaryArray,
      middleIdx + 1,
      endIdx,
      mainArray,
      animations
    );
    doMerge(mainArray, startIdx, middleIdx, endIdx, auxiliaryArray, animations);
  };

  const doMerge = (
    mainArray: SortItem[],
    startIdx: number,
    middleIdx: number,
    endIdx: number,
    auxiliaryArray: SortItem[],
    animations: any
  ) => {
    let k = startIdx;
    let i = startIdx;
    let j = middleIdx + 1;
    while (i <= middleIdx && j <= endIdx) {
      animations.push([i, j]);
      animations.push([i, j]);
      if (auxiliaryArray[i].value <= auxiliaryArray[j].value) {
        animations.push([k, auxiliaryArray[i].value]);
        mainArray[k++] = auxiliaryArray[i++];
      } else {
        animations.push([k, auxiliaryArray[j].value]);
        mainArray[k++] = auxiliaryArray[j++];
      }
    }
    while (i <= middleIdx) {
      animations.push([i, i]);
      animations.push([i, i]);
      animations.push([k, auxiliaryArray[i].value]);
      mainArray[k++] = auxiliaryArray[i++];
    }
    while (j <= endIdx) {
      animations.push([j, j]);
      animations.push([j, j]);
      animations.push([k, auxiliaryArray[j].value]);
      mainArray[k++] = auxiliaryArray[j++];
    }
  };

  return (
    <div>
      <button onClick={resetArray}>Generate New Array</button>
      <button onClick={() => animateMergeSort(node)}>Merge Sort</button>
      <div>
        {node.map((item, idx) => (
          <SortNode {...item} key={uuidv4()} />
        ))}
      </div>
    </div>
  );
};

export default SortVisualizer;
