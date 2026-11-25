export const MISSING_VALUE_PUZZLES = [
  {
    id: 'mv-1',
    title: 'Missing Element in Sorted Array',
    category: 'Arithmetic Step',
    array: [12, 24, null, 48, 60, 72],
    missingIndex: 2,
    answer: 36,
    hint: 'Check the difference between consecutive neighbors: 24 - 12 = 12, and 60 - 48 = 12.',
    explanation:
      'Each element increases by +12. Adding 12 to A[1] (24) gives 36, which is 12 less than A[3] (48).',
  },
  {
    id: 'mv-2',
    title: 'Memory Address Mapping',
    category: '1D Addressing',
    array: [1000, 1004, 1008, null, 1016],
    missingIndex: 3,
    answer: 1012,
    hint: 'Base Address = 1000 and Element Size = 4 bytes. Use Base + (index × 4).',
    explanation: 'Address(A[3]) = 1000 + (3 × 4) = 1012 bytes.',
  },
  {
    id: 'mv-3',
    title: 'Doubling Sequence',
    category: 'Geometric Pattern',
    array: [3, 6, 12, null, 48, 96],
    missingIndex: 3,
    answer: 24,
    hint: 'Every value is twice the previous value (A[i] = A[i - 1] × 2).',
    explanation: '12 × 2 = 24, and 24 × 2 = 48. The missing element at index 3 is 24.',
  },
  {
    id: 'mv-4',
    title: 'Fibonacci Sum Array',
    category: 'Recurrence Pattern',
    array: [2, 3, 5, 8, null, 21],
    missingIndex: 4,
    answer: 13,
    hint: 'Each element from index 2 onward is the sum of the two elements before it.',
    explanation: 'A[4] = A[2] + A[3] = 5 + 8 = 13, and A[5] = 8 + 13 = 21.',
  },
  {
    id: 'mv-5',
    title: 'Square Numbers Array',
    category: 'Index Formula',
    array: [1, 4, 9, null, 25, 36],
    missingIndex: 3,
    answer: 16,
    hint: 'Notice each value is (index + 1)²: 1², 2², 3², ...',
    explanation: 'At index 3, (3 + 1)² = 4² = 16.',
  },
];

export const PATTERN_PUZZLES = [
  {
    id: 'pat-1',
    title: 'Alternating Step Pattern',
    prompt:
      'Observe the array rule: A[0] = 5, and each step alternates +10 then -3. What completes index 4?',
    array: [5, 15, 12, 22, null],
    options: ['19', '32', '25', '12'],
    correctIndex: 0,
    hint: 'Index 0→1 (+10), Index 1→2 (-3), Index 2→3 (+10), Index 3→4 (-3).',
    explanation: 'Following +10, -3, +10, -3: A[4] = A[3] - 3 = 22 - 3 = 19.',
  },
  {
    id: 'pat-2',
    title: 'Prefix Sum Transformation',
    prompt:
      'Array B is the prefix sum of A = [4, 6, 2, 8, 5], where B[i] = A[0] + ... + A[i]. Find B[3].',
    array: [4, 10, 12, null, 25],
    options: ['18', '20', '22', '16'],
    correctIndex: 1,
    hint: 'B[3] = B[2] + A[3] = 12 + 8.',
    explanation:
      'Prefix sums accumulate running totals: 4, 4+6=10, 10+2=12, 12+8=20, 20+5=25. So B[3] = 20.',
  },
  {
    id: 'pat-3',
    title: '2D Row-Major Flattened Index',
    prompt:
      'A 2×3 matrix {{11, 22, 33}, {44, 55, 66}} is stored in row-major 1D order. Which value is at flat index 4?',
    array: [11, 22, 33, 44, null, 66],
    options: ['33', '44', '55', '66'],
    correctIndex: 2,
    hint: 'Row 0 takes indices 0, 1, 2. Row 1 begins at index 3.',
    explanation:
      'In row-major order: [11, 22, 33, 44, 55, 66]. Flat index 4 corresponds to Row 1, Column 1, which is 55.',
  },
  {
    id: 'pat-4',
    title: 'Circular Right Shift by 1',
    prompt:
      'Original array [10, 20, 30, 40, 50] is rotated right by 1 position. What sits at index 0?',
    array: [null, 10, 20, 30, 40],
    options: ['20', '40', '50', '10'],
    correctIndex: 2,
    hint: 'When rotating right by 1, the last element wraps around to the front.',
    explanation:
      'Every element moves one index right, and the last element (50) wraps around to index 0: [50, 10, 20, 30, 40].',
  },
];

export const NEXT_OPERATION_PUZZLES = [
  {
    id: 'op-1',
    title: 'Predict Next Selection Sort Swap',
    algorithm: 'Selection Sort (Ascending)',
    beforeArray: [11, 45, 29, 18, 60],
    sortedPrefixCount: 1,
    prompt:
      'Index 0 (11) is already sorted. In Pass 2 (i = 1), which two indices will Selection Sort swap?',
    options: [
      'Swap index 1 (45) and index 3 (18)',
      'Swap index 1 (45) and index 2 (29)',
      'Swap index 2 (29) and index 3 (18)',
      'No swap occurs in Pass 2',
    ],
    correctIndex: 0,
    hint: 'Find the smallest element in the unsorted region [45, 29, 18, 60].',
    explanation:
      'In unsorted region [1..4], the minimum value is 18 at index 3. Selection Sort swaps A[1] (45) with A[3] (18), yielding [11, 18, 29, 45, 60].',
  },
  {
    id: 'op-2',
    title: 'Predict Next Binary Search Step',
    algorithm: 'Binary Search (Target = 75)',
    beforeArray: [15, 30, 45, 60, 75, 90, 105],
    sortedPrefixCount: 0,
    prompt:
      'First check is mid = 3 (A[3] = 60). Since 60 < 75, what are the new Left and Right bounds and next Mid index?',
    options: [
      'Left = 0, Right = 2, Mid = 1',
      'Left = 4, Right = 6, Mid = 5',
      'Left = 3, Right = 6, Mid = 4',
      'Left = 4, Right = 5, Mid = 4',
    ],
    correctIndex: 1,
    hint: 'When A[mid] < target, left updates to mid + 1 while right stays 6.',
    explanation:
      'Left becomes mid + 1 = 4, Right remains 6, and the next middle index is floor((4 + 6) / 2) = 5 (A[5] = 90).',
  },
  {
    id: 'op-3',
    title: 'Predict Radix Sort Bucket Placement',
    algorithm: 'Radix Sort — Tens Place Pass (exp = 10)',
    beforeArray: [170, 90, 802, 2, 24, 45],
    sortedPrefixCount: 0,
    prompt:
      'During the Tens place pass (exp = 10), which two numbers land in Bucket 0?',
    options: ['170 and 90', '802 and 2', '24 and 45', '802 and 90'],
    correctIndex: 1,
    hint: 'Compute (number / 10) % 10 for each element (treat 2 as 02).',
    explanation:
      '(802 / 10) % 10 = 80 % 10 = 0, and (2 / 10) % 10 = 0. Both 802 and 2 have Tens digit 0, so both go into Bucket 0.',
  },
  {
    id: 'op-4',
    title: 'Predict Array Insertion State',
    algorithm: 'Array Insertion (Insert 50 at index 2)',
    beforeArray: [10, 20, 30, 40],
    sortedPrefixCount: 0,
    prompt:
      'After shifting elements right and inserting 50 at index 2, what is the resulting array?',
    options: [
      '[10, 50, 20, 30, 40]',
      '[10, 20, 50, 30, 40]',
      '[10, 20, 30, 50, 40]',
      '[10, 20, 50, 40]',
    ],
    correctIndex: 1,
    hint: 'Elements at indices 2 and 3 (30 and 40) shift right to indices 3 and 4.',
    explanation:
      '40 moves to index 4, 30 moves to index 3, and 50 is placed at index 2, producing [10, 20, 50, 30, 40].',
  },
  {
    id: 'op-5',
    title: 'Predict Shell Sort Gap Pass',
    algorithm: 'Shell Sort (gap = 3)',
    beforeArray: [35, 12, 40, 10, 25, 18],
    sortedPrefixCount: 0,
    prompt:
      'With gap = 3 on [35, 12, 40, 10, 25, 18], which pairs of indices are compared?',
    options: [
      '(0,1), (1,2), (2,3), (3,4), (4,5)',
      '(0,3), (1,4), (2,5)',
      '(0,2), (1,3), (2,4), (3,5)',
      '(0,5), (1,4), (2,3)',
    ],
    correctIndex: 1,
    hint: 'Shell Sort compares each index j with index j - gap.',
    explanation:
      'With gap = 3, elements 3 indices apart are paired: (0,3) compares 35 & 10, (1,4) compares 12 & 25, and (2,5) compares 40 & 18.',
  },
];
