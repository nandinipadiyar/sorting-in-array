export const GUESS_OUTPUT_QUESTIONS = [
  {
    id: 'go-1',
    title: 'Array Index Update',
    topic: '1D Arrays',
    code: `#include <iostream>
using namespace std;

int main() {
    int arr[5] = {2, 4, 6, 8, 10};
    for (int i = 0; i < 5; i++) {
        if (i % 2 == 1) {
            arr[i] = arr[i] + arr[i - 1];
        }
    }
    for (int i = 0; i < 5; i++) {
        cout << arr[i] << " ";
    }
    return 0;
}`,
    options: [
      '2 6 6 14 10',
      '2 4 10 8 18',
      '6 4 14 8 10',
      '2 6 12 20 30',
    ],
    correctIndex: 0,
    expectedOutput: '2 6 6 14 10',
    explanation:
      'Only odd indices (i = 1 and i = 3) satisfy i % 2 == 1. So arr[1] becomes 4 + 2 = 6, and arr[3] becomes 8 + 6 = 14. Even indices stay unchanged: 2 6 6 14 10.',
  },
  {
    id: 'go-2',
    title: 'Single Pass of Bubble Sort',
    topic: 'Bubble Sort',
    code: `#include <iostream>
using namespace std;

int main() {
    int arr[5] = {7, 3, 9, 2, 5};
    for (int j = 0; j < 4; j++) {
        if (arr[j] > arr[j + 1]) {
            int temp = arr[j];
            arr[j] = arr[j + 1];
            arr[j + 1] = temp;
        }
    }
    for (int i = 0; i < 5; i++) {
        cout << arr[i] << " ";
    }
    return 0;
}`,
    options: [
      '2 3 5 7 9',
      '3 7 2 5 9',
      '3 2 5 7 9',
      '7 3 2 5 9',
    ],
    correctIndex: 1,
    expectedOutput: '3 7 2 5 9',
    explanation:
      'One outer pass compares adjacent pairs: (7,3)->swap to [3,7,9,2,5]; (7,9)->ok; (9,2)->swap to [3,7,2,9,5]; (9,5)->swap to [3,7,2,5,9]. The largest element 9 bubbles to the end.',
  },
  {
    id: 'go-3',
    title: 'Binary Search Mid Trace',
    topic: 'Binary Search',
    code: `#include <iostream>
using namespace std;

int main() {
    int arr[6] = {10, 20, 30, 40, 50, 60};
    int left = 0, right = 5, target = 50;
    while (left <= right) {
        int mid = (left + right) / 2;
        cout << arr[mid] << " ";
        if (arr[mid] == target) break;
        if (arr[mid] < target) left = mid + 1;
        else right = mid - 1;
    }
    return 0;
}`,
    options: [
      '30 50',
      '40 50',
      '30 40 50',
      '10 20 30 40 50',
    ],
    correctIndex: 0,
    expectedOutput: '30 50',
    explanation:
      'First iteration: mid = (0 + 5) / 2 = 2 -> prints arr[2] = 30. Since 30 < 50, left becomes 3. Second iteration: mid = (3 + 5) / 2 = 4 -> prints arr[4] = 50 and breaks.',
  },
  {
    id: 'go-4',
    title: 'Right Shift for Insertion',
    topic: 'Array Insertion',
    code: `#include <iostream>
using namespace std;

int main() {
    int arr[5] = {10, 20, 30, 40, 0};
    int n = 4, pos = 1, val = 99;
    for (int i = n; i > pos; i--) {
        arr[i] = arr[i - 1];
    }
    arr[pos] = val;
    for (int i = 0; i < 5; i++) {
        cout << arr[i] << " ";
    }
    return 0;
}`,
    options: [
      '99 10 20 30 40',
      '10 99 20 30 40',
      '10 20 99 30 40',
      '10 99 30 40 0',
    ],
    correctIndex: 1,
    expectedOutput: '10 99 20 30 40',
    explanation:
      'Elements from index 3 down to index 1 (40, 30, 20) shift one slot right, freeing index 1. Then arr[1] = 99 produces 10 99 20 30 40.',
  },
  {
    id: 'go-5',
    title: 'Selection Sort Minimums',
    topic: 'Selection Sort',
    code: `#include <iostream>
using namespace std;

int main() {
    int arr[4] = {25, 10, 35, 5};
    int swaps = 0;
    for (int i = 0; i < 3; i++) {
        int minIdx = i;
        for (int j = i + 1; j < 4; j++) {
            if (arr[j] < arr[minIdx]) minIdx = j;
        }
        if (minIdx != i) {
            int t = arr[i]; arr[i] = arr[minIdx]; arr[minIdx] = t;
            swaps++;
        }
    }
    cout << "Swaps=" << swaps << " First=" << arr[0];
    return 0;
}`,
    options: [
      'Swaps=3 First=5',
      'Swaps=2 First=5',
      'Swaps=1 First=5',
      'Swaps=3 First=10',
    ],
    correctIndex: 1,
    expectedOutput: 'Swaps=2 First=5',
    explanation:
      'Pass 1 (i=0): min is 5 at idx 3 -> swap(25,5) -> [5,10,35,25] (swaps=1). Pass 2 (i=1): min is 10 at idx 1 -> no swap. Pass 3 (i=2): min is 25 at idx 3 -> swap(35,25) (swaps=2).',
  },
  {
    id: 'go-6',
    title: '2D Matrix Diagonal Sum',
    topic: '2D Arrays',
    code: `#include <iostream>
using namespace std;

int main() {
    int mat[3][3] = {
        {1, 2, 3},
        {4, 5, 6},
        {7, 8, 9}
    };
    int sum = 0;
    for (int i = 0; i < 3; i++) {
        sum += mat[i][i];
    }
    cout << sum;
    return 0;
}`,
    options: ['12', '15', '18', '45'],
    correctIndex: 1,
    expectedOutput: '15',
    explanation:
      'The loop sums the main diagonal elements: mat[0][0] (1) + mat[1][1] (5) + mat[2][2] (9) = 15.',
  },
];

export const FIND_ERROR_QUESTIONS = [
  {
    id: 'fe-1',
    title: 'Array Traversal Out-of-Bounds',
    topic: 'Array Indexing',
    buggyCode: `#include <iostream>
using namespace std;

int main() {
    int arr[4] = {10, 20, 30, 40};
    int sum = 0;
    for (int i = 0; i <= 4; i++) {
        sum += arr[i];
    }
    cout << sum;
    return 0;
}`,
    options: [
      'Line 5: Array size 4 is too small for 4 elements.',
      'Line 7: Loop condition i <= 4 accesses arr[4], which is out of bounds.',
      'Line 8: sum += arr[i] should be sum = arr[i].',
      'Line 10: cout << sum is missing endl.',
    ],
    correctIndex: 1,
    fixedCode: `#include <iostream>
using namespace std;

int main() {
    int arr[4] = {10, 20, 30, 40};
    int sum = 0;
    for (int i = 0; i < 4; i++) {
        sum += arr[i];
    }
    cout << sum;
    return 0;
}`,
    expectedOutput: '100',
    explanation:
      'In C++, a 4-element array uses valid indices 0, 1, 2, and 3. Using i <= 4 reads garbage memory at arr[4] (undefined behavior). Changing it to i < 4 fixes the bug.',
  },
  {
    id: 'fe-2',
    title: 'Broken Swap in Bubble Sort',
    topic: 'Bubble Sort',
    buggyCode: `#include <iostream>
using namespace std;

int main() {
    int arr[3] = {30, 10, 20};
    for (int i = 0; i < 2; i++) {
        for (int j = 0; j < 2 - i; j++) {
            if (arr[j] > arr[j + 1]) {
                arr[j] = arr[j + 1];
                arr[j + 1] = arr[j];
            }
        }
    }
    for (int i = 0; i < 3; i++) cout << arr[i] << " ";
    return 0;
}`,
    options: [
      'Line 6: Outer loop must run until i < 3.',
      'Line 8: Comparison should be arr[j] < arr[j + 1].',
      'Lines 9-10: Overwrites arr[j] without saving it in a temp variable.',
      'Line 14: Loop prints indices instead of values.',
    ],
    correctIndex: 2,
    fixedCode: `#include <iostream>
using namespace std;

int main() {
    int arr[3] = {30, 10, 20};
    for (int i = 0; i < 2; i++) {
        for (int j = 0; j < 2 - i; j++) {
            if (arr[j] > arr[j + 1]) {
                int temp = arr[j];
                arr[j] = arr[j + 1];
                arr[j + 1] = temp;
            }
        }
    }
    for (int i = 0; i < 3; i++) cout << arr[i] << " ";
    return 0;
}`,
    expectedOutput: '10 20 30',
    explanation:
      'Setting arr[j] = arr[j + 1] first destroys the original value of arr[j], leaving both elements equal. Saving arr[j] in a temporary variable temp preserves it for arr[j + 1] = temp.',
  },
  {
    id: 'fe-3',
    title: 'Assignment Instead of Comparison',
    topic: 'Linear Search',
    buggyCode: `#include <iostream>
using namespace std;

int main() {
    int arr[4] = {15, 25, 35, 45};
    int target = 35, found = -1;
    for (int i = 0; i < 4; i++) {
        if (arr[i] = target) {
            found = i;
            break;
        }
    }
    cout << found;
    return 0;
}`,
    options: [
      'Line 6: found should be initialized to 0.',
      'Line 8: Uses assignment (=) instead of equality comparison (==).',
      'Line 10: break should be continue.',
      'Line 13: Should print arr[found] instead of found.',
    ],
    correctIndex: 1,
    fixedCode: `#include <iostream>
using namespace std;

int main() {
    int arr[4] = {15, 25, 35, 45};
    int target = 35, found = -1;
    for (int i = 0; i < 4; i++) {
        if (arr[i] == target) {
            found = i;
            break;
        }
    }
    cout << found;
    return 0;
}`,
    expectedOutput: '2',
    explanation:
      'if (arr[i] = target) assigns 35 to arr[0] and evaluates to 35 (true!), wrongly returning index 0. Using == performs equality comparison and returns index 2.',
  },
  {
    id: 'fe-4',
    title: 'Insertion Sort Wrong Shift Direction',
    topic: 'Insertion Sort',
    buggyCode: `#include <iostream>
using namespace std;

int main() {
    int arr[4] = {8, 3, 5, 2};
    for (int i = 1; i < 4; i++) {
        int key = arr[i];
        int j = i - 1;
        while (j >= 0 && arr[j] > key) {
            arr[j] = arr[j + 1];
            j--;
        }
        arr[j + 1] = key;
    }
    for (int i = 0; i < 4; i++) cout << arr[i] << " ";
    return 0;
}`,
    options: [
      'Line 6: Outer loop must start at i = 0.',
      'Line 9: Condition should be arr[j] < key.',
      'Line 10: Shifts left (arr[j] = arr[j + 1]) instead of right (arr[j + 1] = arr[j]).',
      'Line 13: Should be arr[j] = key.',
    ],
    correctIndex: 2,
    fixedCode: `#include <iostream>
using namespace std;

int main() {
    int arr[4] = {8, 3, 5, 2};
    for (int i = 1; i < 4; i++) {
        int key = arr[i];
        int j = i - 1;
        while (j >= 0 && arr[j] > key) {
            arr[j + 1] = arr[j];
            j--;
        }
        arr[j + 1] = key;
    }
    for (int i = 0; i < 4; i++) cout << arr[i] << " ";
    return 0;
}`,
    expectedOutput: '2 3 5 8',
    explanation:
      'Insertion Sort must shift larger elements one position to the RIGHT (arr[j + 1] = arr[j]) to open space for key. Writing arr[j] = arr[j + 1] copies the wrong direction and loses data.',
  },
  {
    id: 'fe-5',
    title: 'Binary Search Missing +1/-1 Update',
    topic: 'Binary Search',
    buggyCode: `#include <iostream>
using namespace std;

int main() {
    int arr[5] = {10, 20, 30, 40, 50};
    int left = 0, right = 4, target = 50, ans = -1;
    while (left <= right) {
        int mid = (left + right) / 2;
        if (arr[mid] == target) { ans = mid; break; }
        else if (arr[mid] < target) left = mid;
        else right = mid - 1;
    }
    cout << ans;
    return 0;
}`,
    options: [
      'Line 7: Condition should be left < right.',
      'Line 10: left = mid can cause an infinite loop when left == 3, right == 4.',
      'Line 8: mid should be (left - right) / 2.',
      'Line 11: right = mid - 1 should be right = mid + 1.',
    ],
    correctIndex: 1,
    fixedCode: `#include <iostream>
using namespace std;

int main() {
    int arr[5] = {10, 20, 30, 40, 50};
    int left = 0, right = 4, target = 50, ans = -1;
    while (left <= right) {
        int mid = (left + right) / 2;
        if (arr[mid] == target) { ans = mid; break; }
        else if (arr[mid] < target) left = mid + 1;
        else right = mid - 1;
    }
    cout << ans;
    return 0;
}`,
    expectedOutput: '4',
    explanation:
      'When left = 3 and right = 4, mid = (3 + 4) / 2 = 3. Setting left = mid leaves left = 3 forever! Using left = mid + 1 advances left past mid and avoids the infinite loop.',
  },
  {
    id: 'fe-6',
    title: 'Selection Sort Inner Loop Start',
    topic: 'Selection Sort',
    buggyCode: `#include <iostream>
using namespace std;

int main() {
    int arr[4] = {40, 10, 30, 20};
    for (int i = 0; i < 3; i++) {
        int minIdx = i;
        for (int j = 0; j < 4; j++) {
            if (arr[j] < arr[minIdx]) minIdx = j;
        }
        int temp = arr[i]; arr[i] = arr[minIdx]; arr[minIdx] = temp;
    }
    for (int i = 0; i < 4; i++) cout << arr[i] << " ";
    return 0;
}`,
    options: [
      'Line 8: Inner loop starts at j = 0 instead of j = i + 1, re-scanning sorted elements.',
      'Line 6: Outer loop should run up to i < 4.',
      'Line 7: minIdx should be initialized to 0.',
      'Line 11: Swap uses temp incorrectly.',
    ],
    correctIndex: 0,
    fixedCode: `#include <iostream>
using namespace std;

int main() {
    int arr[4] = {40, 10, 30, 20};
    for (int i = 0; i < 3; i++) {
        int minIdx = i;
        for (int j = i + 1; j < 4; j++) {
            if (arr[j] < arr[minIdx]) minIdx = j;
        }
        int temp = arr[i]; arr[i] = arr[minIdx]; arr[minIdx] = temp;
    }
    for (int i = 0; i < 4; i++) cout << arr[i] << " ";
    return 0;
}`,
    expectedOutput: '10 20 30 40',
    explanation:
      'Starting j at 0 makes Selection Sort pick the already-sorted smallest element from index 0 and swap it forward, corrupting the sorted prefix. The inner loop must start at j = i + 1.',
  },
];

export const OUTPUT_CHALLENGE_QUESTIONS = [
  {
    id: 'oc-1',
    title: 'Reverse Index Jump',
    topic: 'Arrays',
    code: `#include <iostream>
using namespace std;

int main() {
    int arr[6] = {10, 20, 30, 40, 50, 60};
    for (int i = 5; i >= 1; i -= 2) {
        cout << arr[i] << " ";
    }
    return 0;
}`,
    expectedOutput: '60 40 20',
    hint: 'Start at index 5 (60) and subtract 2 from i each iteration.',
    explanation:
      'i takes values 5, 3, 1. So it prints arr[5] = 60, arr[3] = 40, and arr[1] = 20 -> "60 40 20".',
  },
  {
    id: 'oc-2',
    title: 'Linear Search Comparisons',
    topic: 'Searching',
    code: `#include <iostream>
using namespace std;

int main() {
    int arr[5] = {12, 45, 23, 67, 89};
    int target = 67, checks = 0;
    for (int i = 0; i < 5; i++) {
        checks++;
        if (arr[i] == target) break;
    }
    cout << checks;
    return 0;
}`,
    expectedOutput: '4',
    hint: 'Count how many elements are inspected from index 0 until 67 is found.',
    explanation:
      'Checks arr[0]=12 (1), arr[1]=45 (2), arr[2]=23 (3), arr[3]=67 (4 -> match, break!). Total checks = 4.',
  },
  {
    id: 'oc-3',
    title: 'Insertion Sort Pass 1 Output',
    topic: 'Sorting',
    code: `#include <iostream>
using namespace std;

int main() {
    int arr[4] = {9, 4, 7, 2};
    int key = arr[1];
    int j = 0;
    while (j >= 0 && arr[j] > key) {
        arr[j + 1] = arr[j];
        j--;
    }
    arr[j + 1] = key;
    for (int i = 0; i < 4; i++) cout << arr[i] << " ";
    return 0;
}`,
    expectedOutput: '4 9 7 2',
    hint: 'Only Pass 1 (inserting key = arr[1] = 4) is executed.',
    explanation:
      'key is 4. arr[0] (9) > 4, so 9 shifts right to arr[1], and 4 is inserted at arr[0]. Remaining elements 7 and 2 are untouched: "4 9 7 2".',
  },
  {
    id: 'oc-4',
    title: 'Binary Search Result',
    topic: 'Searching',
    code: `#include <iostream>
using namespace std;

int binarySearch(int arr[], int n, int target) {
    int l = 0, r = n - 1;
    while (l <= r) {
        int mid = (l + r) / 2;
        if (arr[mid] == target) return mid;
        if (arr[mid] < target) l = mid + 1;
        else r = mid - 1;
    }
    return -1;
}

int main() {
    int arr[5] = {5, 15, 25, 35, 45};
    cout << binarySearch(arr, 5, 15);
    return 0;
}`,
    expectedOutput: '1',
    hint: 'Binary Search returns the 0-based index of 15.',
    explanation:
      'Initially l=0, r=4 -> mid=2 (arr[2]=25 > 15 -> r=1). Next l=0, r=1 -> mid=0 (arr[0]=5 < 15 -> l=1). Next l=1, r=1 -> mid=1 (arr[1]=15 == 15) -> returns 1.',
  },
  {
    id: 'oc-5',
    title: 'Array Deletion Shift',
    topic: 'Array Deletion',
    code: `#include <iostream>
using namespace std;

int main() {
    int arr[5] = {10, 20, 30, 40, 50};
    int n = 5, delIdx = 2;
    for (int i = delIdx; i < n - 1; i++) {
        arr[i] = arr[i + 1];
    }
    n--;
    for (int i = 0; i < n; i++) cout << arr[i] << " ";
    return 0;
}`,
    expectedOutput: '10 20 40 50',
    hint: 'Element at index 2 (30) is deleted and remaining elements shift left.',
    explanation:
      'Index 2 (30) is overwritten by 40, index 3 by 50, and n decreases to 4. Printing indices 0..3 outputs "10 20 40 50".',
  },
  {
    id: 'oc-6',
    title: 'Quick Sort Lomuto Pivot Index',
    topic: 'Sorting',
    code: `#include <iostream>
using namespace std;

int main() {
    int arr[5] = {8, 3, 7, 1, 5};
    int pivot = arr[4];
    int i = -1;
    for (int j = 0; j < 4; j++) {
        if (arr[j] <= pivot) {
            i++;
            int t = arr[i]; arr[i] = arr[j]; arr[j] = t;
        }
    }
    int t = arr[i + 1]; arr[i + 1] = arr[4]; arr[4] = t;
    cout << i + 1;
    return 0;
}`,
    expectedOutput: '2',
    hint: 'Count how many elements before pivot (5) are <= 5.',
    explanation:
      'Pivot is 5. Elements <= 5 among {8, 3, 7, 1} are 3 and 1 (two elements), so i ends at 1. The pivot is placed at index i + 1 = 2.',
  },
];

export const QUICK_QUIZ_QUESTIONS = [
  {
    id: 'qq-1',
    category: 'Array Operations',
    question:
      'In a 1D array with Base Address = 1000 and Element Size = 4 bytes, what is the memory address of A[3]?',
    options: ['1003', '1008', '1012', '1016'],
    correctIndex: 2,
    explanation: 'Address(A[i]) = Base + (i × ElementSize) = 1000 + (3 × 4) = 1012.',
  },
  {
    id: 'qq-2',
    category: 'Searching',
    question: 'Which condition MUST be true before running Binary Search on an array?',
    options: [
      'The array must contain only positive numbers',
      'The array must already be sorted',
      'The array size must be a power of 2',
      'The array must have no duplicate values',
    ],
    correctIndex: 1,
    explanation:
      'Binary Search relies on comparing the middle element to discard half of the search range, which only works when the array is sorted.',
  },
  {
    id: 'qq-3',
    category: 'Time Complexity',
    question:
      'What is the worst-case time complexity of Merge Sort on an array of n elements?',
    options: ['O(n)', 'O(n log n)', 'O(n²)', 'O(log n)'],
    correctIndex: 1,
    explanation:
      'Merge Sort always splits the array into halves (log n levels) and merges n elements per level, giving guaranteed O(n log n) in best, average, and worst cases.',
  },
  {
    id: 'qq-4',
    category: 'Sorting Algorithms',
    question:
      'Which sorting algorithm performs at most n - 1 swaps regardless of the input array?',
    options: ['Bubble Sort', 'Selection Sort', 'Insertion Sort', 'Quick Sort'],
    correctIndex: 1,
    explanation:
      'Selection Sort finds the minimum element for each position i and swaps at most once per outer pass, totaling at most n - 1 swaps.',
  },
  {
    id: 'qq-5',
    category: 'Sorting Algorithms',
    question:
      'Which of these sorting algorithms is NOT in-place because it requires O(n) auxiliary space for merging?',
    options: ['Shell Sort', 'Insertion Sort', 'Merge Sort', 'Selection Sort'],
    correctIndex: 2,
    explanation:
      'Standard array Merge Sort allocates temporary Left and Right subarrays during merging, requiring O(n) extra memory.',
  },
  {
    id: 'qq-6',
    category: 'Time Complexity',
    question:
      'What is the best-case time complexity of Insertion Sort when the input array is already sorted?',
    options: ['O(1)', 'O(n)', 'O(n log n)', 'O(n²)'],
    correctIndex: 1,
    explanation:
      'When already sorted, the inner while loop immediately fails at the first comparison on every pass, so Insertion Sort finishes in O(n) time.',
  },
  {
    id: 'qq-7',
    category: 'Sorting Algorithms',
    question:
      'How does Shell Sort improve upon standard Insertion Sort?',
    options: [
      'It uses a pivot element to partition into two halves',
      'It compares and moves elements far apart using a shrinking gap before finishing with gap = 1',
      'It sorts digits using 10 buckets labeled 0 to 9',
      'It recursively splits the array down to size 1',
    ],
    correctIndex: 1,
    explanation:
      'Shell Sort sorts elements separated by a decreasing gap (e.g., n/2, n/4, ..., 1), allowing distant elements to jump quickly toward their final spots.',
  },
  {
    id: 'qq-8',
    category: 'Sorting Algorithms',
    question:
      'Why does standard Radix Sort use a stable sorting pass (like FIFO buckets 0–9) for each digit?',
    options: [
      'To save memory compared to Selection Sort',
      'To preserve the sorted order achieved by less significant digits from earlier passes',
      'To convert negative numbers into positive numbers',
      'To guarantee O(1) space complexity',
    ],
    correctIndex: 1,
    explanation:
      'When two numbers share the same current digit (e.g., Tens digit), stability keeps them in the order established by earlier digits (e.g., Ones digit).',
  },
  {
    id: 'qq-9',
    category: 'Array Operations',
    question:
      'To delete an element at index 2 from an array of size 6, which direction do the remaining elements shift?',
    options: [
      'Elements at indices 3, 4, 5 shift left by 1',
      'Elements at indices 0, 1 shift right by 1',
      'No elements shift; only the size changes',
      'All elements reverse order',
    ],
    correctIndex: 0,
    explanation:
      'Deletion closes the gap at index 2 by shifting elements after it (indices 3, 4, 5) one position to the left.',
  },
  {
    id: 'qq-10',
    category: 'Time Complexity',
    question:
      'When does standard Lomuto Quick Sort hit its O(n²) worst-case time complexity?',
    options: [
      'When the pivot consistently splits the array into equal halves',
      'When the pivot is consistently the smallest or largest element in the subarray',
      'When the array contains random distinct integers',
      'Only when the array has fewer than 5 elements',
    ],
    correctIndex: 1,
    explanation:
      'If the pivot is always the extreme value (such as on an already sorted array when picking the last element), partitions have size 0 and n - 1, leading to O(n²) time.',
  },
];
