// Real, deterministic step-snapshot execution engine for all 7 sorting algorithms.
// Every step reflects actual algorithm comparisons, swaps/shifts/writes, and internal state.

function cloneItems(items) {
  return items.map((item) => ({ ...item }));
}

function cmp(a, b, order) {
  return order === 'asc' ? a <= b : a >= b;
}

function strictBefore(a, b, order) {
  return order === 'asc' ? a < b : a > b;
}

function shouldSwapAdjacent(a, b, order) {
  return order === 'asc' ? a > b : a < b;
}

function makeBaseItems(arr) {
  return arr.map((val, idx) => ({ id: `el-${idx}-${val}`, val }));
}

// 1. SELECTION SORT
function generateSelectionSort(initialArr, order) {
  const items = makeBaseItems(initialArr);
  const n = items.length;
  const steps = [];
  let comparisons = 0;
  let swaps = 0;
  const sorted = [];

  const pushStep = (extra) => {
    steps.push({
      items: cloneItems(items),
      stepNumber: steps.length,
      comparisons,
      swaps,
      comparing: [],
      swapping: [],
      sorted: [...sorted],
      isComplete: false,
      ...extra,
    });
  };

  const targetWord = order === 'asc' ? 'minimum' : 'maximum';

  pushStep({
    passNumber: 0,
    passLabel: 'Initial',
    minOrMaxIdx: null,
    message: `Starting Selection Sort (${order === 'asc' ? 'Ascending' : 'Descending'}). Array has ${n} elements.`,
  });

  if (n <= 1) {
    if (n === 1) sorted.push(0);
    pushStep({
      passNumber: 1,
      passLabel: 'Complete',
      minOrMaxIdx: null,
      isComplete: true,
      message: 'Array has 1 element and is already sorted!',
    });
    return steps;
  }

  for (let i = 0; i < n - 1; i++) {
    let bestIdx = i;
    pushStep({
      passNumber: i + 1,
      passLabel: `Pass ${i + 1}`,
      minOrMaxIdx: bestIdx,
      message: `Pass ${i + 1}: Assume index ${i} (${items[i].val}) is the ${targetWord} in the unsorted region [${i}..${n - 1}].`,
    });

    for (let j = i + 1; j < n; j++) {
      comparisons++;
      const isBetter = strictBefore(items[j].val, items[bestIdx].val, order);
      pushStep({
        passNumber: i + 1,
        passLabel: `Pass ${i + 1}`,
        comparing: [bestIdx, j],
        minOrMaxIdx: bestIdx,
        message: `Comparing A[${j}] (${items[j].val}) with current ${targetWord} A[${bestIdx}] (${items[bestIdx].val}).`,
      });

      if (isBetter) {
        bestIdx = j;
        pushStep({
          passNumber: i + 1,
          passLabel: `Pass ${i + 1}`,
          minOrMaxIdx: bestIdx,
          message: `New ${targetWord} found! A[${bestIdx}] = ${items[bestIdx].val}.`,
        });
      }
    }

    if (bestIdx !== i) {
      swaps++;
      pushStep({
        passNumber: i + 1,
        passLabel: `Pass ${i + 1}`,
        swapping: [i, bestIdx],
        minOrMaxIdx: bestIdx,
        message: `Swapping A[${i}] (${items[i].val}) with ${targetWord} A[${bestIdx}] (${items[bestIdx].val}).`,
      });
      const tmp = items[i];
      items[i] = items[bestIdx];
      items[bestIdx] = tmp;
    } else {
      pushStep({
        passNumber: i + 1,
        passLabel: `Pass ${i + 1}`,
        minOrMaxIdx: i,
        message: `A[${i}] (${items[i].val}) is already the ${targetWord}; no swap needed.`,
      });
    }

    sorted.push(i);
    pushStep({
      passNumber: i + 1,
      passLabel: `Pass ${i + 1}`,
      minOrMaxIdx: null,
      message: `Index ${i} (${items[i].val}) is now locked in the sorted section.`,
    });
  }

  sorted.push(n - 1);
  pushStep({
    passNumber: n - 1,
    passLabel: 'Complete',
    minOrMaxIdx: null,
    isComplete: true,
    message: 'Selection Sort complete! All elements are in sorted order.',
  });

  return steps;
}

// 2. BUBBLE SORT
function generateBubbleSort(initialArr, order) {
  const items = makeBaseItems(initialArr);
  const n = items.length;
  const steps = [];
  let comparisons = 0;
  let swaps = 0;
  const sorted = [];

  const pushStep = (extra) => {
    steps.push({
      items: cloneItems(items),
      stepNumber: steps.length,
      comparisons,
      swaps,
      comparing: [],
      swapping: [],
      sorted: [...sorted],
      isComplete: false,
      ...extra,
    });
  };

  pushStep({
    passNumber: 0,
    passLabel: 'Initial',
    message: `Starting Bubble Sort (${order === 'asc' ? 'Ascending' : 'Descending'}). Adjacent elements will be compared and bubbled toward the end.`,
  });

  if (n <= 1) {
    if (n === 1) sorted.push(0);
    pushStep({
      passNumber: 1,
      passLabel: 'Complete',
      isComplete: true,
      message: 'Array has 1 element and is already sorted!',
    });
    return steps;
  }

  for (let i = 0; i < n - 1; i++) {
    let swappedInPass = false;
    for (let j = 0; j < n - i - 1; j++) {
      comparisons++;
      const needSwap = shouldSwapAdjacent(items[j].val, items[j + 1].val, order);
      pushStep({
        passNumber: i + 1,
        passLabel: `Pass ${i + 1}`,
        comparing: [j, j + 1],
        message: `Pass ${i + 1}: Comparing adjacent elements A[${j}] (${items[j].val}) and A[${j + 1}] (${items[j + 1].val}).`,
      });

      if (needSwap) {
        swaps++;
        swappedInPass = true;
        const tmp = items[j];
        items[j] = items[j + 1];
        items[j + 1] = tmp;
        pushStep({
          passNumber: i + 1,
          passLabel: `Pass ${i + 1}`,
          swapping: [j, j + 1],
          message: `Swapped ${items[j + 1].val} and ${items[j].val} so the ${order === 'asc' ? 'larger' : 'smaller'} value moves right.`,
        });
      }
    }

    sorted.push(n - 1 - i);
    pushStep({
      passNumber: i + 1,
      passLabel: `Pass ${i + 1}`,
      message: `End of Pass ${i + 1}: A[${n - 1 - i}] (${items[n - 1 - i].val}) reached its final sorted position.`,
    });

    if (!swappedInPass) {
      for (let k = 0; k < n - 1 - i; k++) {
        if (!sorted.includes(k)) sorted.push(k);
      }
      pushStep({
        passNumber: i + 1,
        passLabel: 'Early Exit',
        isComplete: true,
        message: `No swaps occurred in Pass ${i + 1}! Array is already sorted — stopping early.`,
      });
      return steps;
    }
  }

  if (!sorted.includes(0)) sorted.push(0);
  pushStep({
    passNumber: n - 1,
    passLabel: 'Complete',
    isComplete: true,
    message: 'Bubble Sort complete! All elements are sorted.',
  });

  return steps;
}

// 3. INSERTION SORT
function generateInsertionSort(initialArr, order) {
  const items = makeBaseItems(initialArr);
  const n = items.length;
  const steps = [];
  let comparisons = 0;
  let swaps = 0;

  const rangeArr = (endInclusive) =>
    Array.from({ length: endInclusive + 1 }, (_, idx) => idx);

  const pushStep = (extra) => {
    steps.push({
      items: cloneItems(items),
      stepNumber: steps.length,
      comparisons,
      swaps,
      comparing: [],
      swapping: [],
      sorted: [],
      isComplete: false,
      ...extra,
    });
  };

  pushStep({
    passNumber: 0,
    passLabel: 'Initial',
    sorted: n > 0 ? [0] : [],
    keyInfo: { val: null, fromIdx: null, holeIdx: null, sortedEnd: n > 0 ? 0 : -1 },
    message: `Starting Insertion Sort (${order === 'asc' ? 'Ascending' : 'Descending'}). Index 0 (${items[0]?.val ?? ''}) forms the initial sorted section.`,
  });

  if (n <= 1) {
    pushStep({
      passNumber: 1,
      passLabel: 'Complete',
      sorted: n === 1 ? [0] : [],
      keyInfo: { val: null, fromIdx: null, holeIdx: null, sortedEnd: n - 1 },
      isComplete: true,
      message: 'Array is already sorted!',
    });
    return steps;
  }

  for (let i = 1; i < n; i++) {
    const keyItem = { ...items[i] };
    let j = i - 1;

    pushStep({
      passNumber: i,
      passLabel: `Pass ${i}`,
      sorted: rangeArr(i - 1),
      comparing: [i],
      keyInfo: { val: keyItem.val, fromIdx: i, holeIdx: i, sortedEnd: i - 1 },
      message: `Pass ${i}: Pick key = ${keyItem.val} from index ${i} to insert into sorted section [0..${i - 1}].`,
    });

    while (j >= 0) {
      comparisons++;
      const shouldShift = shouldSwapAdjacent(items[j].val, keyItem.val, order);
      pushStep({
        passNumber: i,
        passLabel: `Pass ${i}`,
        sorted: rangeArr(i - 1),
        comparing: [j],
        keyInfo: { val: keyItem.val, fromIdx: i, holeIdx: j + 1, sortedEnd: i - 1 },
        message: `Comparing key (${keyItem.val}) with sorted element A[${j}] (${items[j].val}).`,
      });

      if (shouldShift) {
        swaps++;
        items[j + 1] = { ...items[j] };
        pushStep({
          passNumber: i,
          passLabel: `Pass ${i}`,
          sorted: rangeArr(i),
          swapping: [j + 1],
          keyInfo: { val: keyItem.val, fromIdx: i, holeIdx: j, sortedEnd: i },
          message: `Shifting A[${j}] (${items[j].val}) right to index ${j + 1} to open space for key ${keyItem.val}.`,
        });
        j--;
      } else {
        break;
      }
    }

    items[j + 1] = keyItem;
    swaps++;
    pushStep({
      passNumber: i,
      passLabel: `Pass ${i}`,
      sorted: rangeArr(i),
      swapping: [j + 1],
      keyInfo: { val: keyItem.val, fromIdx: i, holeIdx: j + 1, sortedEnd: i },
      message: `Inserted key ${keyItem.val} at index ${j + 1}. Sorted section is now [0..${i}].`,
    });
  }

  pushStep({
    passNumber: n - 1,
    passLabel: 'Complete',
    sorted: rangeArr(n - 1),
    keyInfo: { val: null, fromIdx: null, holeIdx: null, sortedEnd: n - 1 },
    isComplete: true,
    message: 'Insertion Sort complete! All elements are in sorted order.',
  });

  return steps;
}

// 4. QUICK SORT (Lomuto Partition with recursion stack tracking)
function generateQuickSort(initialArr, order) {
  const items = makeBaseItems(initialArr);
  const n = items.length;
  const steps = [];
  let comparisons = 0;
  let swaps = 0;
  const sortedSet = new Set();
  const callStack = [];
  let callSeq = 0;
  let passCount = 0;

  const pushStep = (extra) => {
    const { quickInfo: qExtra, ...rest } = extra;
    steps.push({
      items: cloneItems(items),
      stepNumber: steps.length,
      comparisons,
      swaps,
      comparing: [],
      swapping: [],
      sorted: Array.from(sortedSet),
      isComplete: false,
      ...rest,
      quickInfo: {
        low: null,
        high: null,
        pivotIdx: null,
        iBoundary: null,
        jScanner: null,
        leftIndices: [],
        rightIndices: [],
        callStack: callStack.map((f) => ({ ...f })),
        ...(qExtra || {}),
      },
    });
  };

  pushStep({
    passNumber: 0,
    passLabel: 'Initial',
    message: `Starting Quick Sort (${order === 'asc' ? 'Ascending' : 'Descending'}) using Lomuto Partitioning.`,
  });

  function partition(low, high, frameId) {
    passCount++;
    const currentPass = passCount;
    const pivotVal = items[high].val;
    let i = low - 1;

    const getPartitionBuckets = (jEnd) => {
      const leftIndices = [];
      const rightIndices = [];
      for (let k = low; k <= i; k++) leftIndices.push(k);
      for (let k = i + 1; k < jEnd; k++) rightIndices.push(k);
      return { leftIndices, rightIndices };
    };

    const frame = callStack.find((f) => f.id === frameId);
    if (frame) frame.pivotIdx = high;

    pushStep({
      passNumber: currentPass,
      passLabel: `Partition [${low}..${high}]`,
      quickInfo: {
        low,
        high,
        pivotIdx: high,
        iBoundary: i,
        jScanner: null,
        leftIndices: [],
        rightIndices: [],
      },
      message: `Selected pivot A[${high}] = ${pivotVal} for subarray [${low}..${high}].`,
    });

    for (let j = low; j < high; j++) {
      comparisons++;
      const belongsLeft = cmp(items[j].val, pivotVal, order);
      const { leftIndices, rightIndices } = getPartitionBuckets(j);

      pushStep({
        passNumber: currentPass,
        passLabel: `Partition [${low}..${high}]`,
        comparing: [j, high],
        quickInfo: {
          low,
          high,
          pivotIdx: high,
          iBoundary: i,
          jScanner: j,
          leftIndices,
          rightIndices,
        },
        message: `Comparing A[${j}] (${items[j].val}) with pivot ${pivotVal}: ${
          belongsLeft
            ? `${items[j].val} belongs in the left partition.`
            : `${items[j].val} stays in the right partition.`
        }`,
      });

      if (belongsLeft) {
        i++;
        if (i !== j) {
          swaps++;
          const tmp = items[i];
          items[i] = items[j];
          items[j] = tmp;
          const updated = getPartitionBuckets(j + 1);
          pushStep({
            passNumber: currentPass,
            passLabel: `Partition [${low}..${high}]`,
            swapping: [i, j],
            quickInfo: {
              low,
              high,
              pivotIdx: high,
              iBoundary: i,
              jScanner: j,
              ...updated,
            },
            message: `Swapped A[${i}] (${items[i].val}) and A[${j}] (${items[j].val}) to grow left partition [..${i}].`,
          });
        }
      }
    }

    const finalPivotPos = i + 1;
    if (finalPivotPos !== high) {
      swaps++;
      const tmp = items[finalPivotPos];
      items[finalPivotPos] = items[high];
      items[high] = tmp;
      pushStep({
        passNumber: currentPass,
        passLabel: `Partition [${low}..${high}]`,
        swapping: [finalPivotPos, high],
        quickInfo: {
          low,
          high,
          pivotIdx: finalPivotPos,
          iBoundary: i,
          jScanner: null,
          leftIndices: Array.from({ length: finalPivotPos - low }, (_, k) => low + k),
          rightIndices: Array.from(
            { length: high - finalPivotPos },
            (_, k) => finalPivotPos + 1 + k
          ),
        },
        message: `Moving pivot ${pivotVal} to its final sorted index ${finalPivotPos}.`,
      });
    }

    sortedSet.add(finalPivotPos);
    if (frame) frame.pivotIdx = finalPivotPos;

    pushStep({
      passNumber: currentPass,
      passLabel: `Pivot Placed @ ${finalPivotPos}`,
      quickInfo: {
        low,
        high,
        pivotIdx: finalPivotPos,
        iBoundary: i,
        jScanner: null,
        leftIndices: Array.from({ length: finalPivotPos - low }, (_, k) => low + k),
        rightIndices: Array.from(
          { length: high - finalPivotPos },
          (_, k) => finalPivotPos + 1 + k
        ),
      },
      message: `Pivot ${pivotVal} is now fixed at index ${finalPivotPos}. Left subarray [${low}..${finalPivotPos - 1}], Right subarray [${finalPivotPos + 1}..${high}].`,
    });

    return finalPivotPos;
  }

  function quickSortRec(low, high) {
    if (low > high) return;
    const frameId = `qs-${++callSeq}`;
    callStack.forEach((f) => {
      if (f.status === 'active') f.status = 'waiting';
    });
    callStack.push({ id: frameId, low, high, status: 'active', pivotIdx: null });

    if (low === high) {
      sortedSet.add(low);
      pushStep({
        passNumber: passCount + 1,
        passLabel: `Base Case [${low}]`,
        quickInfo: {
          low,
          high,
          pivotIdx: low,
          iBoundary: low,
          jScanner: null,
          leftIndices: [],
          rightIndices: [],
        },
        message: `Base case: Single element subarray [${low}] (${items[low].val}) is already sorted.`,
      });
      const idx = callStack.findIndex((f) => f.id === frameId);
      if (idx !== -1) callStack[idx].status = 'done';
      return;
    }

    const pi = partition(low, high, frameId);
    const frameIdx = callStack.findIndex((f) => f.id === frameId);
    if (frameIdx !== -1) callStack[frameIdx].status = 'waiting';

    quickSortRec(low, pi - 1);
    quickSortRec(pi + 1, high);

    if (frameIdx !== -1) callStack[frameIdx].status = 'done';
  }

  if (n > 0) quickSortRec(0, n - 1);

  for (let k = 0; k < n; k++) sortedSet.add(k);
  pushStep({
    passNumber: passCount,
    passLabel: 'Complete',
    isComplete: true,
    message: 'Quick Sort complete! All partitions have been recursively sorted.',
  });

  return steps;
}

// 5. MERGE SORT (with Visual Division Tree & Merge Buffers)
function generateMergeSort(initialArr, order) {
  const items = makeBaseItems(initialArr);
  const n = items.length;
  const steps = [];
  let comparisons = 0;
  let swaps = 0;
  let passCount = 0;

  // Build static binary division tree nodes upfront
  const treeNodes = [];
  function buildTree(left, right, level, id) {
    const node = {
      id,
      left,
      right,
      level,
      values: items.slice(left, right + 1).map((x) => x.val),
      status: 'pending',
    };
    treeNodes.push(node);
    if (left < right) {
      const mid = Math.floor((left + right) / 2);
      buildTree(left, mid, level + 1, `${id}-L`);
      buildTree(mid + 1, right, level + 1, `${id}-R`);
    }
  }
  if (n > 0) buildTree(0, n - 1, 0, 'root');

  const cloneTree = () =>
    treeNodes.map((node) => ({ ...node, values: [...node.values] }));

  const setNode = (id, patch) => {
    const node = treeNodes.find((nd) => nd.id === id);
    if (node) Object.assign(node, patch);
  };

  const pushStep = (extra) => {
    const { mergeInfo: mExtra, ...rest } = extra;
    steps.push({
      items: cloneItems(items),
      stepNumber: steps.length,
      comparisons,
      swaps,
      comparing: [],
      swapping: [],
      sorted: [],
      isComplete: false,
      ...rest,
      mergeInfo: {
        activeRange: null,
        mid: null,
        leftBuffer: [],
        rightBuffer: [],
        leftPtr: 0,
        rightPtr: 0,
        treeNodes: cloneTree(),
        ...(mExtra || {}),
      },
    });
  };

  pushStep({
    passNumber: 0,
    passLabel: 'Initial',
    message: `Starting Merge Sort (${order === 'asc' ? 'Ascending' : 'Descending'}). We divide the array recursively, then merge sorted halves.`,
  });

  function mergeSortRec(left, right, id) {
    if (left > right) return;

    if (left === right) {
      setNode(id, {
        status: 'merged',
        values: [items[left].val],
      });
      pushStep({
        passNumber: passCount,
        passLabel: `Leaf [${left}]`,
        mergeInfo: {
          activeRange: [left, right],
          mid: left,
          leftBuffer: [],
          rightBuffer: [],
          leftPtr: 0,
          rightPtr: 0,
        },
        message: `Base case reached at [${left}] (${items[left].val}) — a single element is trivially sorted.`,
      });
      return;
    }

    const mid = Math.floor((left + right) / 2);
    setNode(id, {
      status: 'divided',
      values: items.slice(left, right + 1).map((x) => x.val),
    });
    setNode(`${id}-L`, {
      status: 'active',
      values: items.slice(left, mid + 1).map((x) => x.val),
    });
    setNode(`${id}-R`, {
      status: 'active',
      values: items.slice(mid + 1, right + 1).map((x) => x.val),
    });

    pushStep({
      passNumber: passCount,
      passLabel: `Divide [${left}..${right}]`,
      comparing: Array.from({ length: right - left + 1 }, (_, k) => left + k),
      mergeInfo: {
        activeRange: [left, right],
        mid,
        leftBuffer: items.slice(left, mid + 1).map((x) => x.val),
        rightBuffer: items.slice(mid + 1, right + 1).map((x) => x.val),
        leftPtr: 0,
        rightPtr: 0,
      },
      message: `Dividing subarray [${left}..${right}] at mid=${mid} into Left [${left}..${mid}] and Right [${mid + 1}..${right}].`,
    });

    mergeSortRec(left, mid, `${id}-L`);
    mergeSortRec(mid + 1, right, `${id}-R`);

    // Merge phase
    passCount++;
    const leftArr = items.slice(left, mid + 1).map((x) => ({ ...x }));
    const rightArr = items.slice(mid + 1, right + 1).map((x) => ({ ...x }));
    let i = 0;
    let j = 0;
    let k = left;

    setNode(id, { status: 'merging' });
    pushStep({
      passNumber: passCount,
      passLabel: `Merge [${left}..${right}]`,
      mergeInfo: {
        activeRange: [left, right],
        mid,
        leftBuffer: leftArr.map((x) => x.val),
        rightBuffer: rightArr.map((x) => x.val),
        leftPtr: i,
        rightPtr: j,
      },
      message: `Merging sorted halves [${leftArr.map((x) => x.val).join(', ')}] and [${rightArr.map((x) => x.val).join(', ')}].`,
    });

    while (i < leftArr.length && j < rightArr.length) {
      comparisons++;
      const takeLeft = cmp(leftArr[i].val, rightArr[j].val, order);
      pushStep({
        passNumber: passCount,
        passLabel: `Merge [${left}..${right}]`,
        comparing: [left + i, mid + 1 + j],
        mergeInfo: {
          activeRange: [left, right],
          mid,
          leftBuffer: leftArr.map((x) => x.val),
          rightBuffer: rightArr.map((x) => x.val),
          leftPtr: i,
          rightPtr: j,
        },
        message: `Comparing Left (${leftArr[i].val}) and Right (${rightArr[j].val}): selecting ${
          takeLeft ? leftArr[i].val : rightArr[j].val
        }.`,
      });

      if (takeLeft) {
        items[k] = { ...leftArr[i] };
        i++;
      } else {
        items[k] = { ...rightArr[j] };
        j++;
      }
      swaps++;
      setNode(id, { values: items.slice(left, right + 1).map((x) => x.val) });
      pushStep({
        passNumber: passCount,
        passLabel: `Merge [${left}..${right}]`,
        swapping: [k],
        mergeInfo: {
          activeRange: [left, right],
          mid,
          leftBuffer: leftArr.map((x) => x.val),
          rightBuffer: rightArr.map((x) => x.val),
          leftPtr: i,
          rightPtr: j,
        },
        message: `Placed ${items[k].val} at index ${k}.`,
      });
      k++;
    }

    while (i < leftArr.length) {
      items[k] = { ...leftArr[i] };
      i++;
      swaps++;
      setNode(id, { values: items.slice(left, right + 1).map((x) => x.val) });
      pushStep({
        passNumber: passCount,
        passLabel: `Merge [${left}..${right}]`,
        swapping: [k],
        mergeInfo: {
          activeRange: [left, right],
          mid,
          leftBuffer: leftArr.map((x) => x.val),
          rightBuffer: rightArr.map((x) => x.val),
          leftPtr: i,
          rightPtr: j,
        },
        message: `Copying remaining Left element ${items[k].val} to index ${k}.`,
      });
      k++;
    }

    while (j < rightArr.length) {
      items[k] = { ...rightArr[j] };
      j++;
      swaps++;
      setNode(id, { values: items.slice(left, right + 1).map((x) => x.val) });
      pushStep({
        passNumber: passCount,
        passLabel: `Merge [${left}..${right}]`,
        swapping: [k],
        mergeInfo: {
          activeRange: [left, right],
          mid,
          leftBuffer: leftArr.map((x) => x.val),
          rightBuffer: rightArr.map((x) => x.val),
          leftPtr: i,
          rightPtr: j,
        },
        message: `Copying remaining Right element ${items[k].val} to index ${k}.`,
      });
      k++;
    }

    setNode(id, {
      status: 'merged',
      values: items.slice(left, right + 1).map((x) => x.val),
    });

    pushStep({
      passNumber: passCount,
      passLabel: `Merged [${left}..${right}]`,
      sorted:
        left === 0 && right === n - 1
          ? Array.from({ length: n }, (_, idx) => idx)
          : [],
      mergeInfo: {
        activeRange: [left, right],
        mid,
        leftBuffer: [],
        rightBuffer: [],
        leftPtr: i,
        rightPtr: j,
      },
      message: `Subarray [${left}..${right}] is now merged and sorted: [${items
        .slice(left, right + 1)
        .map((x) => x.val)
        .join(', ')}].`,
    });
  }

  if (n > 0) mergeSortRec(0, n - 1, 'root');

  pushStep({
    passNumber: passCount,
    passLabel: 'Complete',
    sorted: Array.from({ length: n }, (_, idx) => idx),
    isComplete: true,
    message: 'Merge Sort complete! All subarrays have been merged into sorted order.',
  });

  return steps;
}

// 6. SHELL SORT
function generateShellSort(initialArr, order) {
  const items = makeBaseItems(initialArr);
  const n = items.length;
  const steps = [];
  let comparisons = 0;
  let swaps = 0;
  const gapHistory = [];
  let passCount = 0;

  const pushStep = (extra) => {
    const { shellInfo: sExtra, ...rest } = extra;
    steps.push({
      items: cloneItems(items),
      stepNumber: steps.length,
      comparisons,
      swaps,
      comparing: [],
      swapping: [],
      sorted: [],
      isComplete: false,
      ...rest,
      shellInfo: {
        gap: null,
        gapHistory: [...gapHistory],
        gapPair: null,
        isFinalInsertion: false,
        ...(sExtra || {}),
      },
    });
  };

  pushStep({
    passNumber: 0,
    passLabel: 'Initial',
    message: `Starting Shell Sort (${order === 'asc' ? 'Ascending' : 'Descending'}). Elements far apart are sorted first using shrinking gaps.`,
  });

  if (n <= 1) {
    pushStep({
      passNumber: 1,
      passLabel: 'Complete',
      sorted: n === 1 ? [0] : [],
      isComplete: true,
      message: 'Array has 1 element and is already sorted!',
    });
    return steps;
  }

  for (let gap = Math.floor(n / 2); gap > 0; gap = Math.floor(gap / 2)) {
    passCount++;
    gapHistory.push(gap);
    const isFinalInsertion = gap === 1;

    pushStep({
      passNumber: passCount,
      passLabel: isFinalInsertion ? `Gap = 1 (Final Insertion Sort)` : `Gap = ${gap}`,
      shellInfo: { gap, gapPair: null, isFinalInsertion },
      message: isFinalInsertion
        ? `Gap decreased to 1: Running final Insertion Sort pass on nearly-sorted array!`
        : `Pass ${passCount}: Gap = ${gap}. Comparing elements ${gap} positions apart.`,
    });

    for (let i = gap; i < n; i++) {
      const tempItem = { ...items[i] };
      let j = i;

      while (j >= gap) {
        comparisons++;
        const needShift = shouldSwapAdjacent(items[j - gap].val, tempItem.val, order);
        pushStep({
          passNumber: passCount,
          passLabel: isFinalInsertion ? `Gap = 1 (Final Insertion)` : `Gap = ${gap}`,
          comparing: [j - gap, j],
          shellInfo: { gap, gapPair: [j - gap, j], isFinalInsertion },
          message: `Gap ${gap}: Comparing A[${j - gap}] (${items[j - gap].val}) with A[${j}] (${tempItem.val}).`,
        });

        if (needShift) {
          swaps++;
          items[j] = { ...items[j - gap] };
          pushStep({
            passNumber: passCount,
            passLabel: isFinalInsertion ? `Gap = 1 (Final Insertion)` : `Gap = ${gap}`,
            swapping: [j - gap, j],
            shellInfo: { gap, gapPair: [j - gap, j], isFinalInsertion },
            message: `Shifting A[${j - gap}] (${items[j].val}) forward by gap ${gap} to index ${j}.`,
          });
          j -= gap;
        } else {
          break;
        }
      }

      if (j !== i) {
        items[j] = tempItem;
        swaps++;
        pushStep({
          passNumber: passCount,
          passLabel: isFinalInsertion ? `Gap = 1 (Final Insertion)` : `Gap = ${gap}`,
          swapping: [j],
          shellInfo: { gap, gapPair: null, isFinalInsertion },
          message: `Placed ${tempItem.val} at index ${j}.`,
        });
      }
    }
  }

  pushStep({
    passNumber: passCount,
    passLabel: 'Complete',
    sorted: Array.from({ length: n }, (_, idx) => idx),
    shellInfo: { gap: 0, gapPair: null, isFinalInsertion: false },
    isComplete: true,
    message: 'Shell Sort complete! Shrinking gaps followed by gap=1 Insertion Sort finished cleanly.',
  });

  return steps;
}

// 7. RADIX SORT (Non-negative integers, LSD base-10 with 0–9 buckets)
function generateRadixSort(initialArr, order) {
  const items = makeBaseItems(initialArr);
  const n = items.length;
  const steps = [];
  let comparisons = 0; // Digit extractions/inspections (Radix is non-comparative, tracked clearly)
  let swaps = 0;       // Bucket distributions + collections

  const emptyBuckets = () => Array.from({ length: 10 }, () => []);

  const getPlaceName = (exp) => {
    if (exp === 1) return 'Ones';
    if (exp === 10) return 'Tens';
    if (exp === 100) return 'Hundreds';
    if (exp === 1000) return 'Thousands';
    return `10^${Math.round(Math.log10(exp))}`;
  };

  const pushStep = (extra) => {
    const { radixInfo: rExtra, ...rest } = extra;
    steps.push({
      items: cloneItems(items),
      stepNumber: steps.length,
      comparisons,
      swaps,
      comparing: [],
      swapping: [],
      sorted: [],
      isComplete: false,
      ...rest,
      radixInfo: {
        exp: 1,
        placeName: 'Ones',
        phase: 'start',
        activeIdx: null,
        activeDigit: null,
        buckets: emptyBuckets(),
        activeBucket: null,
        ...(rExtra || {}),
      },
    });
  };

  pushStep({
    passNumber: 0,
    passLabel: 'Initial',
    message: `Starting Radix Sort (${order === 'asc' ? 'Ascending' : 'Descending'}). Processing non-negative integers digit by digit using buckets 0–9.`,
  });

  if (n <= 1) {
    pushStep({
      passNumber: 1,
      passLabel: 'Complete',
      sorted: n === 1 ? [0] : [],
      isComplete: true,
      message: 'Array is already sorted!',
    });
    return steps;
  }

  const maxVal = Math.max(...items.map((x) => x.val));
  let passCount = 0;

  for (let exp = 1; Math.floor(maxVal / exp) > 0 || (maxVal === 0 && exp === 1); exp *= 10) {
    passCount++;
    const placeName = getPlaceName(exp);
    const buckets = emptyBuckets();

    pushStep({
      passNumber: passCount,
      passLabel: `${placeName} Pass (×${exp})`,
      radixInfo: {
        exp,
        placeName,
        phase: 'start',
        buckets: buckets.map((b) => b.map((x) => ({ ...x }))),
      },
      message: `Pass ${passCount}: Sorting by the ${placeName} digit (exp = ${exp}).`,
    });

    // Distribute into buckets 0..9
    for (let i = 0; i < n; i++) {
      const digit = Math.floor(items[i].val / exp) % 10;
      buckets[digit].push({ ...items[i] });
      swaps++;
      pushStep({
        passNumber: passCount,
        passLabel: `${placeName} Pass (×${exp})`,
        comparing: [i],
        radixInfo: {
          exp,
          placeName,
          phase: 'distribute',
          activeIdx: i,
          activeDigit: digit,
          activeBucket: digit,
          buckets: buckets.map((b) => b.map((x) => ({ ...x }))),
        },
        message: `Element ${items[i].val} has ${placeName} digit ${digit} → placed in Bucket ${digit}.`,
      });
    }

    // Collect stably from buckets (0->9 for Asc, 9->0 for Desc)
    let writeIdx = 0;
    const bucketOrder =
      order === 'asc'
        ? [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
        : [9, 8, 7, 6, 5, 4, 3, 2, 1, 0];

    for (const bDigit of bucketOrder) {
      while (buckets[bDigit].length > 0) {
        const pulled = buckets[bDigit].shift();
        items[writeIdx] = pulled;
        swaps++;
        pushStep({
          passNumber: passCount,
          passLabel: `${placeName} Pass (×${exp})`,
          swapping: [writeIdx],
          radixInfo: {
            exp,
            placeName,
            phase: 'collect',
            activeIdx: writeIdx,
            activeDigit: bDigit,
            activeBucket: bDigit,
            buckets: buckets.map((b) => b.map((x) => ({ ...x }))),
          },
          message: `Collecting ${pulled.val} from Bucket ${bDigit} → placed at index ${writeIdx} (FIFO stable order).`,
        });
        writeIdx++;
      }
    }

    if (maxVal === 0) break;
  }

  pushStep({
    passNumber: passCount,
    passLabel: 'Complete',
    sorted: Array.from({ length: n }, (_, idx) => idx),
    radixInfo: {
      exp: 1,
      placeName: 'Done',
      phase: 'done',
      buckets: emptyBuckets(),
    },
    isComplete: true,
    message: 'Radix Sort complete! All digit passes finished in stable order.',
  });

  return steps;
}

export function generateSortingSteps(algoId, arr, order = 'asc') {
  const cleanArr = [...arr];
  switch (algoId) {
    case 'selection':
      return generateSelectionSort(cleanArr, order);
    case 'bubble':
      return generateBubbleSort(cleanArr, order);
    case 'insertion':
      return generateInsertionSort(cleanArr, order);
    case 'quick':
      return generateQuickSort(cleanArr, order);
    case 'merge':
      return generateMergeSort(cleanArr, order);
    case 'shell':
      return generateShellSort(cleanArr, order);
    case 'radix':
      return generateRadixSort(cleanArr, order);
    default:
      return generateSelectionSort(cleanArr, order);
  }
}
