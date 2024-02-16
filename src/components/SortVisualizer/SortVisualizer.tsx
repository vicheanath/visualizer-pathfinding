import {  useState } from "react";
import SortNode from "../SortNode/SortNode";
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
  const [array, setArray] = useState<SortItem[]>([]);

 

    const resetArray = () => {
        const array = [] as SortItem[];
        for (let i = 0; i < 50; i++) {
            array.push({
                value: randomIntFromInterval(5, 100),
                
            });
        }
        setArray(array);
    };

    const randomIntFromInterval : (min: number, max: number) => number = (min, max) => {
        return Math.floor(Math.random() * (max - min + 1) + min);
    };
    const PRIMARY_COLOR = 'var(--green-500)';
    const SECONDARY_COLOR = 'var(--red-500)';
    const ANIMATION_SPEED_MS = 20;


    const animateMergeSort = (array: SortItem[]) => {
        const animations = getMergeSortAnimations(array);
        for (let i = 0; i < animations.length; i++) {
            const arrayBars = document.getElementsByClassName('node');
            const isColorChange = i % 3 !== 2;
            if (isColorChange) {
                const [barOneIdx, barTwoIdx] = animations[i];
                const barOneStyle = arrayBars[barOneIdx] as HTMLElement;
                const barTwoStyle = arrayBars[barTwoIdx] as HTMLElement;
                const color = i % 3 === 0 ? SECONDARY_COLOR : PRIMARY_COLOR;
                setTimeout(() => {
                    barOneStyle.style.backgroundColor = color;
                    barTwoStyle.style.backgroundColor = color;
                }, i * ANIMATION_SPEED_MS);
            } else {
                setTimeout(() => {
                    const [barOneIdx, newHeight] = animations[i];
                    const barOneStyle = arrayBars[barOneIdx] as HTMLElement;
                    barOneStyle.style.height = `${newHeight}px`;
                }, i * ANIMATION_SPEED_MS);
            }
        }
    }
    const getMergeSortAnimations = (array: SortItem[]) => {
        const animations = [] as any;
        if (array.length <= 1) return array;
        const auxiliaryArray = array.slice();
        mergeSortHelper(array, 0, array.length - 1, auxiliaryArray, animations);
        return animations;
    }

    const mergeSortHelper = (mainArray: SortItem[], startIdx: number, endIdx: number, auxiliaryArray: SortItem[], animations: any) => {
        if (startIdx === endIdx) return;
        const middleIdx = Math.floor((startIdx + endIdx) / 2);
        mergeSortHelper(auxiliaryArray, startIdx, middleIdx, mainArray, animations);
        mergeSortHelper(auxiliaryArray, middleIdx + 1, endIdx, mainArray, animations);
        doMerge(mainArray, startIdx, middleIdx, endIdx, auxiliaryArray, animations);
    }

    const doMerge = (mainArray: SortItem[], startIdx: number, middleIdx: number, endIdx: number, auxiliaryArray: SortItem[], animations: any) => {
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
    }




    return (
        <div>
            <div>
                {array.map((item, idx) => (
                    <SortNode key={idx} value={item.value} />
                ))}
            </div>
            <button onClick={resetArray}>Generate New Array</button>
            <button onClick={() => animateMergeSort(array)}>Merge Sort</button>

        </div>
    );



  
}

export default SortVisualizer;
