export const SORTING_ALGORITHMS = [
  {
    id: 'selection',
    number: '01',
    name: 'Selection Sort',
    tagline: 'Repeatedly select the minimum element and place it at the front.',
    shortDesc:
      'Divides the array into a sorted left part and an unsorted right part, repeatedly picking the smallest unsorted element.',
    defaultArray: [64, 25, 12, 22, 11],
    methodType: 'Comparison-Based',
    inputNote: 'Works with any integers (positive, negative, zero, or duplicates).',
    introduction: {
      summary:
        'Selection Sort is a simple, intuitive comparison-based sorting algorithm that sorts an array by repeatedly finding the minimum element (for ascending order) from the unsorted part and putting it at the beginning of the unsorted part.',
      definition:
        'In simple terms, imagine arranging numbered cards on a table: you scan all remaining cards, pick out the smallest one, and place it in the next sorted position from left to right until no unsorted cards remain.',
    },
    workingPrinciple: [
      'Divide the array conceptually into two subarrays: a sorted subarray on the left (initially empty) and an unsorted subarray on the right (initially the whole array).',
      'In Pass 1 (i = 0), assume the first element at index 0 is the minimum (minIndex = 0).',
      'Scan the remaining unsorted elements from index i + 1 to n - 1. Whenever a smaller element is found, update minIndex to that index.',
      'After scanning the unsorted region, swap the element at index i with the element at minIndex.',
      'Now index 0 is in its final sorted position, and the sorted boundary moves one step right.',
      'Repeat this process for i = 1, 2, ..., n - 2 until the entire array is sorted.',
    ],
    example: {
      initialArray: [64, 25, 12, 22, 11],
      passes: [
        {
          passTitle: 'Pass 1 (i = 0)',
          before: [64, 25, 12, 22, 11],
          after: [11, 25, 12, 22, 64],
          highlightIndices: [0, 4],
          sortedUpTo: 0,
          explanation:
            'Scan [64, 25, 12, 22, 11]. Minimum is 11 at index 4. Swap A[0] (64) and A[4] (11).',
        },
        {
          passTitle: 'Pass 2 (i = 1)',
          before: [11, 25, 12, 22, 64],
          after: [11, 12, 25, 22, 64],
          highlightIndices: [1, 2],
          sortedUpTo: 1,
          explanation:
            'Scan unsorted part [25, 12, 22, 64]. Minimum is 12 at index 2. Swap A[1] (25) and A[2] (12).',
        },
        {
          passTitle: 'Pass 3 (i = 2)',
          before: [11, 12, 25, 22, 64],
          after: [11, 12, 22, 25, 64],
          highlightIndices: [2, 3],
          sortedUpTo: 2,
          explanation:
            'Scan unsorted part [25, 22, 64]. Minimum is 22 at index 3. Swap A[2] (25) and A[3] (22).',
        },
        {
          passTitle: 'Pass 4 (i = 3)',
          before: [11, 12, 22, 25, 64],
          after: [11, 12, 22, 25, 64],
          highlightIndices: [3],
          sortedUpTo: 4,
          explanation:
            'Scan unsorted part [25, 64]. Minimum is already 25 at index 3. No swap needed; 64 at index 4 is automatically sorted.',
        },
      ],
      finalArray: [11, 12, 22, 25, 64],
    },
    pseudocode: [
      'Step 1: Start with array A of size n.',
      'Step 2: Repeat Steps 3 to 6 for i = 0 to n - 2:',
      'Step 3:     Set minIndex = i.',
      'Step 4:     For j = i + 1 to n - 1:',
      '                If A[j] < A[minIndex], then set minIndex = j.',
      'Step 5:     If minIndex != i, swap A[i] and A[minIndex].',
      'Step 6: End of outer loop.',
      'Step 7: Array A is now sorted. Stop.',
    ],
    cppCode: `#include <iostream>
using namespace std;

// Function to perform Selection Sort
void selectionSort(int arr[], int n) {
    for (int i = 0; i < n - 1; i++) {
        // Assume the current index holds the minimum element
        int minIndex = i;

        // Search for the smallest element in the unsorted subarray
        for (int j = i + 1; j < n; j++) {
            if (arr[j] < arr[minIndex]) {
                minIndex = j;
            }
        }

        // Swap the found minimum with the first unsorted element
        if (minIndex != i) {
            int temp = arr[i];
            arr[i] = arr[minIndex];
            arr[minIndex] = temp;
        }
    }
}

int main() {
    int arr[] = {64, 25, 12, 22, 11};
    int n = sizeof(arr) / sizeof(arr[0]);

    selectionSort(arr, n);

    cout << "Sorted array: ";
    for (int i = 0; i < n; i++) {
        cout << arr[i] << " ";
    }
    cout << endl;

    return 0;
}`,
    complexity: {
      best: 'O(n²)',
      bestNote: 'Even if already sorted, it scans the full unsorted region every pass.',
      average: 'O(n²)',
      averageNote: 'Performs n(n - 1) / 2 comparisons regardless of input order.',
      worst: 'O(n²)',
      worstNote: 'Occurs on any input due to nested loops; at most n - 1 swaps.',
      space: 'O(1)',
      spaceNote: 'Sorts in-place using only a few scalar variables.',
      stable: 'Unstable',
      inPlace: 'Yes',
    },
    advantages: [
      'Very easy to understand, trace by hand, and implement.',
      'Performs at most n - 1 swaps, making it useful when memory writes are expensive (e.g., EEPROM/Flash memory).',
      'Requires O(1) extra memory (in-place).',
    ],
    disadvantages: [
      'Always takes O(n²) time, even if the array is already sorted.',
      'Does not adapt to partially sorted data.',
      'Unstable by default (swapping distant elements can change relative order of duplicates).',
    ],
    applications: [
      'Sorting small datasets where simplicity matters more than asymptotic speed.',
      'Systems where write/swap operations are costly compared to reads (e.g., flash memory).',
      'Teaching foundational loop invariants and index tracking in introductory CS courses.',
    ],
  },
  {
    id: 'bubble',
    number: '02',
    name: 'Bubble Sort',
    tagline: 'Compare adjacent pairs and bubble the largest element to the end.',
    shortDesc:
      'Repeatedly steps through the array, compares adjacent elements, and swaps them if they are in the wrong order.',
    defaultArray: [5, 1, 4, 2, 8],
    methodType: 'Comparison-Based',
    inputNote: 'Works with any integers (positive, negative, zero, or duplicates).',
    introduction: {
      summary:
        'Bubble Sort is one of the simplest comparison-based sorting algorithms. It works by repeatedly comparing neighboring elements and swapping them whenever they are out of order.',
      definition:
        'It gets its name because with each complete pass through the array, the largest unsorted element gradually rises ("bubbles up") to its correct position at the right end of the array, just like air bubbles rising to the surface of water.',
    },
    workingPrinciple: [
      'Start from the first index (j = 0) and compare adjacent elements A[j] and A[j + 1].',
      'If A[j] > A[j + 1] (for ascending order), swap them so the larger value moves right.',
      'Continue comparing adjacent pairs up to the end of the unsorted portion (n - i - 1).',
      'At the end of Pass 1, the largest element is guaranteed to be at the last index (n - 1).',
      'Use a boolean flag (swapped) during each pass. If no swaps occur during an entire pass, the array is already sorted and we stop early.',
      'Repeat for subsequent passes, shrinking the unsorted boundary by 1 each pass.',
    ],
    example: {
      initialArray: [5, 1, 4, 2, 8],
      passes: [
        {
          passTitle: 'Pass 1',
          before: [5, 1, 4, 2, 8],
          after: [1, 4, 2, 5, 8],
          highlightIndices: [3, 4],
          sortedUpTo: 4,
          explanation:
            '(5,1)→swap→[1,5,4,2,8], (5,4)→swap→[1,4,5,2,8], (5,2)→swap→[1,4,2,5,8], (5,8)→ok. Largest element 8 is now at the end.',
        },
        {
          passTitle: 'Pass 2',
          before: [1, 4, 2, 5, 8],
          after: [1, 2, 4, 5, 8],
          highlightIndices: [1, 2],
          sortedUpTo: 3,
          explanation:
            '(1,4)→ok, (4,2)→swap→[1,2,4,5,8], (4,5)→ok. Element 5 is now locked in position.',
        },
        {
          passTitle: 'Pass 3 (Early Exit Check)',
          before: [1, 2, 4, 5, 8],
          after: [1, 2, 4, 5, 8],
          highlightIndices: [0, 1, 2],
          sortedUpTo: 4,
          explanation:
            '(1,2)→ok, (2,4)→ok. Zero swaps happened in Pass 3! The swapped flag stays false, so Bubble Sort stops early.',
        },
      ],
      finalArray: [1, 2, 4, 5, 8],
    },
    pseudocode: [
      'Step 1: Start with array A of size n.',
      'Step 2: Repeat Steps 3 to 7 for i = 0 to n - 2:',
      'Step 3:     Set swapped = false.',
      'Step 4:     For j = 0 to n - i - 2:',
      '                If A[j] > A[j + 1], then:',
      '                    Swap A[j] and A[j + 1].',
      '                    Set swapped = true.',
      'Step 5:     If swapped == false, break out of the loop (array is sorted).',
      'Step 6: End of outer loop.',
      'Step 7: Array A is sorted. Stop.',
    ],
    cppCode: `#include <iostream>
using namespace std;

// Function to perform optimized Bubble Sort
void bubbleSort(int arr[], int n) {
    for (int i = 0; i < n - 1; i++) {
        bool swapped = false;

        // Last i elements are already in their final positions
        for (int j = 0; j < n - i - 1; j++) {
            if (arr[j] > arr[j + 1]) {
                // Swap adjacent elements
                int temp = arr[j];
                arr[j] = arr[j + 1];
                arr[j + 1] = temp;
                swapped = true;
            }
        }

        // If no two elements were swapped, array is already sorted
        if (!swapped) {
            break;
        }
    }
}

int main() {
    int arr[] = {5, 1, 4, 2, 8};
    int n = sizeof(arr) / sizeof(arr[0]);

    bubbleSort(arr, n);

    cout << "Sorted array: ";
    for (int i = 0; i < n; i++) {
        cout << arr[i] << " ";
    }
    cout << endl;

    return 0;
}`,
    complexity: {
      best: 'O(n)',
      bestNote: 'Occurs when the array is already sorted (with swapped flag optimization).',
      average: 'O(n²)',
      averageNote: 'Random order requires roughly n² / 4 swaps and n² / 2 comparisons.',
      worst: 'O(n²)',
      worstNote: 'Occurs when the array is sorted in reverse order.',
      space: 'O(1)',
      spaceNote: 'Sorts in-place using only a single temporary variable.',
      stable: 'Stable',
      inPlace: 'Yes',
    },
    advantages: [
      'Extremely simple logic and very easy to trace.',
      'Stable sorting algorithm: equal elements retain their original relative order.',
      'Can detect an already-sorted array in O(n) time using the swapped flag.',
    ],
    disadvantages: [
      'Very slow O(n²) time complexity for large datasets.',
      'Performs many unnecessary adjacent swaps compared to Selection or Insertion Sort.',
      'Not practical for production sorting on large inputs.',
    ],
    applications: [
      'Introductory computer science education to demonstrate nested loops and swapping.',
      'Quickly checking or fixing nearly sorted small lists where almost every item is 1 position off.',
      'Simple embedded or graphics routines with very tiny fixed-size arrays (e.g., 4–10 items).',
    ],
  },
  {
    id: 'insertion',
    number: '03',
    name: 'Insertion Sort',
    tagline: 'Pick each element and insert it into its proper place in the sorted part.',
    shortDesc:
      'Builds the final sorted array one item at a time by shifting larger elements right and inserting the key.',
    defaultArray: [12, 11, 13, 5, 6],
    methodType: 'Comparison-Based',
    inputNote: 'Works with any integers (positive, negative, zero, or duplicates).',
    introduction: {
      summary:
        'Insertion Sort builds the sorted array one element at a time. At each step, it picks the next unsorted element (called the key) and inserts it into its exact sorted position among the elements already processed on the left.',
      definition:
        'It works just like sorting playing cards in your hand: you hold a sorted group of cards on the left, pick up the next card, shift larger cards to the right to open a gap, and slide the new card into place.',
    },
    workingPrinciple: [
      'Treat the first element A[0] as a sorted subarray of size 1.',
      'Pick the next element A[i] (starting at i = 1) and store it in a variable called key.',
      'Compare key with elements to its left (j = i - 1 down to 0).',
      'As long as j >= 0 and A[j] > key, shift A[j] one position to the right (A[j + 1] = A[j]) and decrement j.',
      'Once we find an element <= key (or reach index -1), insert key at A[j + 1].',
      'Repeat for i = 1 to n - 1 until the whole array is sorted.',
    ],
    example: {
      initialArray: [12, 11, 13, 5, 6],
      passes: [
        {
          passTitle: 'Pass 1 (i = 1, key = 11)',
          before: [12, 11, 13, 5, 6],
          after: [11, 12, 13, 5, 6],
          highlightIndices: [0, 1],
          sortedUpTo: 1,
          explanation: '12 > 11, so shift 12 to index 1 and insert 11 at index 0.',
        },
        {
          passTitle: 'Pass 2 (i = 2, key = 13)',
          before: [11, 12, 13, 5, 6],
          after: [11, 12, 13, 5, 6],
          highlightIndices: [2],
          sortedUpTo: 2,
          explanation: '12 <= 13, so no shifting is needed. 13 stays at index 2.',
        },
        {
          passTitle: 'Pass 3 (i = 3, key = 5)',
          before: [11, 12, 13, 5, 6],
          after: [5, 11, 12, 13, 6],
          highlightIndices: [0, 1, 2, 3],
          sortedUpTo: 3,
          explanation:
            '13, 12, and 11 are all > 5. Shift 13, 12, 11 one position right and insert 5 at index 0.',
        },
        {
          passTitle: 'Pass 4 (i = 4, key = 6)',
          before: [5, 11, 12, 13, 6],
          after: [5, 6, 11, 12, 13],
          highlightIndices: [1, 2, 3, 4],
          sortedUpTo: 4,
          explanation:
            'Shift 13, 12, and 11 right; stop at 5 (since 5 <= 6) and insert 6 at index 1.',
        },
      ],
      finalArray: [5, 6, 11, 12, 13],
    },
    pseudocode: [
      'Step 1: Start with array A of size n.',
      'Step 2: Repeat Steps 3 to 6 for i = 1 to n - 1:',
      'Step 3:     Set key = A[i] and j = i - 1.',
      'Step 4:     While j >= 0 and A[j] > key:',
      '                Set A[j + 1] = A[j].',
      '                Set j = j - 1.',
      'Step 5:     Set A[j + 1] = key.',
      'Step 6: End of loop.',
      'Step 7: Array A is sorted. Stop.',
    ],
    cppCode: `#include <iostream>
using namespace std;

// Function to perform Insertion Sort
void insertionSort(int arr[], int n) {
    for (int i = 1; i < n; i++) {
        int key = arr[i]; // Element to be inserted into sorted part
        int j = i - 1;

        // Shift elements greater than key one position ahead
        while (j >= 0 && arr[j] > key) {
            arr[j + 1] = arr[j];
            j--;
        }

        // Insert key at its correct position
        arr[j + 1] = key;
    }
}

int main() {
    int arr[] = {12, 11, 13, 5, 6};
    int n = sizeof(arr) / sizeof(arr[0]);

    insertionSort(arr, n);

    cout << "Sorted array: ";
    for (int i = 0; i < n; i++) {
        cout << arr[i] << " ";
    }
    cout << endl;

    return 0;
}`,
    complexity: {
      best: 'O(n)',
      bestNote: 'Occurs when the array is already sorted (inner while loop never shifts).',
      average: 'O(n²)',
      averageNote: 'On average, each element shifts halfway across the sorted prefix.',
      worst: 'O(n²)',
      worstNote: 'Occurs when the array is sorted in reverse order.',
      space: 'O(1)',
      spaceNote: 'Sorts in-place using only key and index variables.',
      stable: 'Stable',
      inPlace: 'Yes',
    },
    advantages: [
      'Adaptive and super fast O(n) on already-sorted or nearly-sorted arrays.',
      'Stable sorting algorithm with low constant-factor overhead.',
      'Works as an online algorithm: can sort data as it arrives one element at a time.',
    ],
    disadvantages: [
      'Slow O(n²) performance on large randomly ordered or reverse-sorted arrays.',
      'Requires shifting many elements when small values appear near the end.',
    ],
    applications: [
      'Used as the base-case sorter inside hybrid algorithms like Timsort (Python/Java) and Introsort (C++ std::sort) for small subarrays.',
      'Sorting nearly-sorted streams or maintaining a small sorted leaderboard.',
      'Best choice among quadratic sorts when array size n is small (n <= 32).',
    ],
  },
  {
    id: 'quick',
    number: '04',
    name: 'Quick Sort',
    tagline: 'Choose a pivot, partition around it, and sort subarrays recursively.',
    shortDesc:
      'A fast divide-and-conquer algorithm that selects a pivot element and partitions the array into smaller and larger halves.',
    defaultArray: [10, 7, 8, 9, 1, 5],
    methodType: 'Divide & Conquer',
    inputNote: 'Works with any integers (positive, negative, zero, or duplicates).',
    introduction: {
      summary:
        'Quick Sort is a widely used Divide-and-Conquer sorting algorithm. It works by selecting a "pivot" element from the array and rearranging (partitioning) the other elements so that everything smaller than or equal to the pivot moves to its left, and everything larger moves to its right.',
      definition:
        'Once partitioned, the pivot sits in its exact final sorted position, and Quick Sort recursively applies the same procedure to the left and right subarrays.',
    },
    workingPrinciple: [
      'Pick a pivot element from the subarray [low..high] (here we use Lomuto partitioning, choosing the last element A[high] as the pivot).',
      'Maintain a boundary pointer i = low - 1 tracking the end of the "smaller-or-equal" region.',
      'Scan j from low to high - 1. Whenever A[j] <= pivot, increment i and swap A[i] with A[j].',
      'After the loop, swap A[i + 1] with the pivot A[high]. The pivot is now at its final sorted index pi = i + 1.',
      'Recursively apply Quick Sort to the left subarray [low..pi - 1] and the right subarray [pi + 1..high].',
      'Recursion stops when a subarray has 0 or 1 element (low >= high).',
    ],
    example: {
      initialArray: [10, 7, 8, 9, 1, 5],
      passes: [
        {
          passTitle: 'Partition [0..5] with Pivot = 5',
          before: [10, 7, 8, 9, 1, 5],
          after: [1, 5, 8, 9, 10, 7],
          highlightIndices: [1],
          sortedUpTo: -1,
          explanation:
            'Pivot is 5. Only 1 <= 5 moves to the left; swapping 5 into index 1 gives [1] | 5 | [8, 9, 10, 7]. 5 is now fixed at index 1.',
        },
        {
          passTitle: 'Left Subarray [0..0] & Right Subarray [2..5] (Pivot = 7)',
          before: [1, 5, 8, 9, 10, 7],
          after: [1, 5, 7, 9, 10, 8],
          highlightIndices: [0, 2],
          sortedUpTo: -1,
          explanation:
            'Left [0..0] has 1 element (sorted). Right [2..5] picks pivot 7: no elements < 7, so 7 swaps to index 2.',
        },
        {
          passTitle: 'Right Subarray [3..5] (Pivot = 8)',
          before: [1, 5, 7, 9, 10, 8],
          after: [1, 5, 7, 8, 10, 9],
          highlightIndices: [3],
          sortedUpTo: -1,
          explanation:
            'Subarray [9, 10, 8] picks pivot 8: 8 swaps to index 3, leaving [10, 9] on its right.',
        },
        {
          passTitle: 'Right Subarray [4..5] (Pivot = 9)',
          before: [1, 5, 7, 8, 10, 9],
          after: [1, 5, 7, 8, 9, 10],
          highlightIndices: [4, 5],
          sortedUpTo: 5,
          explanation:
            'Subarray [10, 9] picks pivot 9: 9 swaps to index 4, leaving 10 at index 5. All elements sorted!',
        },
      ],
      finalArray: [1, 5, 7, 8, 9, 10],
    },
    pseudocode: [
      'Step 1: Define PARTITION(A, low, high):',
      '        Set pivot = A[high], i = low - 1.',
      '        For j = low to high - 1:',
      '            If A[j] <= pivot, then i = i + 1 and swap A[i] with A[j].',
      '        Swap A[i + 1] with A[high].',
      '        Return i + 1.',
      'Step 2: Define QUICKSORT(A, low, high):',
      'Step 3:     If low < high, then:',
      'Step 4:         Set pi = PARTITION(A, low, high).',
      'Step 5:         Call QUICKSORT(A, low, pi - 1).',
      'Step 6:         Call QUICKSORT(A, pi + 1, high).',
      'Step 7: Call QUICKSORT(A, 0, n - 1). Stop.',
    ],
    cppCode: `#include <iostream>
using namespace std;

// Helper function to swap two integers
void swapVal(int &a, int &b) {
    int temp = a;
    a = b;
    b = temp;
}

// Lomuto partition: places pivot at correct sorted index
int partition(int arr[], int low, int high) {
    int pivot = arr[high]; // Choose last element as pivot
    int i = low - 1;       // Boundary of elements <= pivot

    for (int j = low; j < high; j++) {
        if (arr[j] <= pivot) {
            i++;
            swapVal(arr[i], arr[j]);
        }
    }

    swapVal(arr[i + 1], arr[high]);
    return i + 1;
}

// Recursive Quick Sort function
void quickSort(int arr[], int low, int high) {
    if (low < high) {
        int pi = partition(arr, low, high);

        // Sort elements before and after partition
        quickSort(arr, low, pi - 1);
        quickSort(arr, pi + 1, high);
    }
}

int main() {
    int arr[] = {10, 7, 8, 9, 1, 5};
    int n = sizeof(arr) / sizeof(arr[0]);

    quickSort(arr, 0, n - 1);

    cout << "Sorted array: ";
    for (int i = 0; i < n; i++) {
        cout << arr[i] << " ";
    }
    cout << endl;

    return 0;
}`,
    complexity: {
      best: 'O(n log n)',
      bestNote: 'Occurs when the pivot divides the array into two roughly equal halves.',
      average: 'O(n log n)',
      averageNote: 'Very fast in practice with great CPU cache locality.',
      worst: 'O(n²)',
      worstNote: 'Occurs when the pivot is always the smallest or largest element (e.g., already sorted with last-element pivot).',
      space: 'O(log n)',
      spaceNote: 'Auxiliary recursion call stack space (O(n) in worst-case unbalanced recursion).',
      stable: 'Unstable',
      inPlace: 'Yes',
    },
    advantages: [
      'Fastest general-purpose in-place sorting algorithm in practice due to cache efficiency.',
      'Requires only O(log n) average extra space (no large auxiliary arrays like Merge Sort).',
      'Easily parallelizable across independent left and right subarrays.',
    ],
    disadvantages: [
      'Worst-case time complexity is O(n²) if poor pivots are chosen consistently.',
      'Not stable (partition swaps can reorder equal keys).',
      'Recursive overhead can hit stack limits on pathological inputs unless randomized/tail-call optimized.',
    ],
    applications: [
      'Foundation of C++ std::sort (Introsort) and many language standard libraries for primitive types.',
      'In-memory sorting of large arrays where extra RAM for Merge Sort is undesirable.',
      'Order-statistics algorithms like Quickselect for finding the k-th smallest element in O(n) average time.',
    ],
  },
  {
    id: 'merge',
    number: '05',
    name: 'Merge Sort',
    tagline: 'Divide the array in half recursively, then merge sorted halves.',
    shortDesc:
      'A reliable divide-and-conquer algorithm that splits arrays down to single elements and merges them back in sorted order.',
    defaultArray: [38, 27, 43, 3, 9, 82],
    methodType: 'Divide & Conquer',
    inputNote: 'Works with any integers (positive, negative, zero, or duplicates).',
    introduction: {
      summary:
        'Merge Sort is a classic Divide-and-Conquer sorting algorithm with guaranteed O(n log n) performance. It splits the array into two halves, recursively sorts each half, and then merges the two sorted halves into a single sorted array.',
      definition:
        'Because any 1-element array is already sorted by definition, splitting down to single items and carefully zipping (merging) pairs of sorted lists back together guarantees completely sorted output every time.',
    },
    workingPrinciple: [
      'Divide: Find the middle index mid = left + (right - left) / 2 and split [left..right] into [left..mid] and [mid + 1..right].',
      'Conquer: Recursively call Merge Sort on the left half and the right half until subarrays reach length 1 (left == right).',
      'Combine (Merge): Create temporary Left and Right arrays holding the two sorted halves.',
      'Compare the front elements of Left and Right, copying the smaller value back into the main array.',
      'When one half finishes, copy all remaining elements from the other half into the main array.',
    ],
    example: {
      initialArray: [38, 27, 43, 3, 9, 82],
      passes: [
        {
          passTitle: 'Divide Phase',
          before: [38, 27, 43, 3, 9, 82],
          after: [38, 27, 43, 3, 9, 82],
          highlightIndices: [0, 1, 2, 3, 4, 5],
          sortedUpTo: -1,
          explanation:
            'Split [38, 27, 43, 3, 9, 82] → [38, 27, 43] & [3, 9, 82] → further down to [38], [27], [43], [3], [9], [82].',
        },
        {
          passTitle: 'Merge Leaves (Left & Right Halves)',
          before: [38, 27, 43, 3, 9, 82],
          after: [27, 38, 43, 3, 9, 82],
          highlightIndices: [0, 1, 3, 4],
          sortedUpTo: -1,
          explanation:
            'Merge [38] & [27] → [27, 38]; merge with [43] → [27, 38, 43]. Merge [3] & [9] → [3, 9]; merge with [82] → [3, 9, 82].',
        },
        {
          passTitle: 'Final Merge: [27, 38, 43] + [3, 9, 82]',
          before: [27, 38, 43, 3, 9, 82],
          after: [3, 9, 27, 38, 43, 82],
          highlightIndices: [0, 1, 2, 3, 4, 5],
          sortedUpTo: 5,
          explanation:
            'Compare fronts repeatedly: pick 3, 9, then 27, 38, 43, and 82 to produce the final sorted array.',
        },
      ],
      finalArray: [3, 9, 27, 38, 43, 82],
    },
    pseudocode: [
      'Step 1: Define MERGESORT(A, left, right):',
      'Step 2:     If left >= right, return (base case: 1 element).',
      'Step 3:     Set mid = left + (right - left) / 2.',
      'Step 4:     Call MERGESORT(A, left, mid).',
      'Step 5:     Call MERGESORT(A, mid + 1, right).',
      'Step 6:     Call MERGE(A, left, mid, right).',
      'Step 7: Define MERGE(A, left, mid, right):',
      '        Copy A[left..mid] into L and A[mid+1..right] into R.',
      '        Use pointers i=0, j=0, k=left to pick the smaller of L[i] and R[j] into A[k].',
      '        Copy any leftover elements from L or R into A.',
      'Step 8: Call MERGESORT(A, 0, n - 1). Stop.',
    ],
    cppCode: `#include <iostream>
using namespace std;

// Merge two sorted subarrays arr[left..mid] and arr[mid+1..right]
void merge(int arr[], int left, int mid, int right) {
    int n1 = mid - left + 1;
    int n2 = right - mid;

    // Temporary arrays to hold left and right halves
    int* L = new int[n1];
    int* R = new int[n2];

    for (int i = 0; i < n1; i++)
        L[i] = arr[left + i];
    for (int j = 0; j < n2; j++)
        R[j] = arr[mid + 1 + j];

    int i = 0, j = 0, k = left;

    // Merge elements back in sorted order
    while (i < n1 && j < n2) {
        if (L[i] <= R[j]) {
            arr[k] = L[i];
            i++;
        } else {
            arr[k] = R[j];
            j++;
        }
        k++;
    }

    // Copy any remaining elements of L[] and R[]
    while (i < n1) {
        arr[k] = L[i];
        i++;
        k++;
    }
    while (j < n2) {
        arr[k] = R[j];
        j++;
        k++;
    }

    delete[] L;
    delete[] R;
}

// Recursive Merge Sort function
void mergeSort(int arr[], int left, int right) {
    if (left >= right)
        return;

    int mid = left + (right - left) / 2;
    mergeSort(arr, left, mid);
    mergeSort(arr, mid + 1, right);
    merge(arr, left, mid, right);
}

int main() {
    int arr[] = {38, 27, 43, 3, 9, 82};
    int n = sizeof(arr) / sizeof(arr[0]);

    mergeSort(arr, 0, n - 1);

    cout << "Sorted array: ";
    for (int i = 0; i < n; i++) {
        cout << arr[i] << " ";
    }
    cout << endl;

    return 0;
}`,
    complexity: {
      best: 'O(n log n)',
      bestNote: 'Always divides in half and merges all n elements across log n levels.',
      average: 'O(n log n)',
      averageNote: 'Guaranteed O(n log n) regardless of input distribution.',
      worst: 'O(n log n)',
      worstNote: 'No worst-case quadratic degradation unlike Quick Sort.',
      space: 'O(n)',
      spaceNote: 'Requires temporary auxiliary arrays during merging (not in-place).',
      stable: 'Stable',
      inPlace: 'No',
    },
    advantages: [
      'Guaranteed O(n log n) time complexity in Best, Average, and Worst cases.',
      'Stable sorting algorithm: preserves the relative order of duplicate elements.',
      'Excellent for linked lists and external sorting of huge files on disk.',
    ],
    disadvantages: [
      'Requires O(n) extra memory for temporary merge buffers.',
      'Slightly slower than Quick Sort in memory on small/medium arrays due to copying overhead.',
    ],
    applications: [
      'External sorting (sorting gigabytes of data on disk that do not fit in RAM).',
      'Standard sorting for objects/records where stability is required (basis of Timsort in Python and Java).',
      'Sorting linked lists efficiently without random-access overhead and counting inversions.',
    ],
  },
  {
    id: 'shell',
    number: '06',
    name: 'Shell Sort',
    tagline: 'Compare distant elements using shrinking gaps, ending with Insertion Sort.',
    shortDesc:
      'An optimized generalization of Insertion Sort that moves far-apart elements closer to their positions using decreasing gap intervals.',
    defaultArray: [23, 29, 15, 19, 31, 7, 9, 5],
    methodType: 'Gap-Based Insertion',
    inputNote: 'Works with any integers (positive, negative, zero, or duplicates).',
    introduction: {
      summary:
        'Shell Sort (invented by Donald Shell in 1959) is an improved version of Insertion Sort. Instead of only comparing adjacent elements (gap = 1), it starts by comparing and sorting elements far apart at a large gap, and progressively shrinks the gap down to 1.',
      definition:
        'By allowing elements to jump long distances early on, small values near the end quickly leap toward the front, making the final Insertion Sort pass (gap = 1) extraordinarily fast.',
    },
    workingPrinciple: [
      'Choose an initial gap size: commonly gap = floor(n / 2).',
      'For each i from gap to n - 1, perform a gapped insertion sort on elements separated by gap positions (comparing A[j - gap] with temp).',
      'Shift elements A[j - gap] forward by gap positions while A[j - gap] > temp, then insert temp.',
      'Once a full pass finishes, shrink the gap: gap = floor(gap / 2).',
      'Repeat until gap reaches 1. At gap = 1, Shell Sort performs a standard Insertion Sort on an already nearly-sorted array!',
    ],
    example: {
      initialArray: [23, 29, 15, 19, 31, 7, 9, 5],
      passes: [
        {
          passTitle: 'Pass 1 (gap = 4)',
          before: [23, 29, 15, 19, 31, 7, 9, 5],
          after: [23, 7, 9, 5, 31, 29, 15, 19],
          highlightIndices: [1, 5, 2, 6, 3, 7],
          sortedUpTo: -1,
          explanation:
            'Compare pairs 4 apart: (23,31)→ok, (29,7)→swap, (15,9)→swap, (19,5)→swap. Small values leap forward!',
        },
        {
          passTitle: 'Pass 2 (gap = 2)',
          before: [23, 7, 9, 5, 31, 29, 15, 19],
          after: [9, 5, 15, 7, 23, 19, 31, 29],
          highlightIndices: [0, 2, 4, 6],
          sortedUpTo: -1,
          explanation:
            'Sort even indices [23, 9, 31, 15] → [9, 15, 23, 31] and odd indices [7, 5, 29, 19] → [5, 7, 19, 29].',
        },
        {
          passTitle: 'Pass 3 (gap = 1 — Final Insertion Sort)',
          before: [9, 5, 15, 7, 23, 19, 31, 29],
          after: [5, 7, 9, 15, 19, 23, 29, 31],
          highlightIndices: [0, 1, 2, 3, 4, 5, 6, 7],
          sortedUpTo: 7,
          explanation:
            'With gap = 1, standard Insertion Sort makes only a few adjacent shifts because every element is already close to home.',
        },
      ],
      finalArray: [5, 7, 9, 15, 19, 23, 29, 31],
    },
    pseudocode: [
      'Step 1: Start with array A of size n.',
      'Step 2: Initialize gap = floor(n / 2).',
      'Step 3: While gap > 0, repeat Steps 4 to 7:',
      'Step 4:     For i = gap to n - 1:',
      '                Set temp = A[i] and j = i.',
      'Step 5:         While j >= gap and A[j - gap] > temp:',
      '                    Set A[j] = A[j - gap].',
      '                    Set j = j - gap.',
      'Step 6:         Set A[j] = temp.',
      'Step 7:     Set gap = floor(gap / 2).',
      'Step 8: Array A is sorted. Stop.',
    ],
    cppCode: `#include <iostream>
using namespace std;

// Function to perform Shell Sort using n/2 gap sequence
void shellSort(int arr[], int n) {
    // Start with a large gap, then halve it each pass
    for (int gap = n / 2; gap > 0; gap /= 2) {
        // Perform gapped insertion sort for this gap size
        for (int i = gap; i < n; i++) {
            int temp = arr[i];
            int j = i;

            // Shift earlier gap-sorted elements up until correct spot is found
            while (j >= gap && arr[j - gap] > temp) {
                arr[j] = arr[j - gap];
                j -= gap;
            }

            arr[j] = temp;
        }
    }
}

int main() {
    int arr[] = {23, 29, 15, 19, 31, 7, 9, 5};
    int n = sizeof(arr) / sizeof(arr[0]);

    shellSort(arr, n);

    cout << "Sorted array: ";
    for (int i = 0; i < n; i++) {
        cout << arr[i] << " ";
    }
    cout << endl;

    return 0;
}`,
    complexity: {
      best: 'O(n log n)',
      bestNote: 'Occurs on already-sorted arrays across O(log n) gap passes.',
      average: 'O(n^(3/2))',
      averageNote: 'Depends on gap sequence; ~O(n^1.3) to O(n^1.5) in practice.',
      worst: 'O(n²)',
      worstNote: 'With Shell’s n/2 sequence, worst case is O(n²); better sequences reach O(n log² n).',
      space: 'O(1)',
      spaceNote: 'Sorts completely in-place with no recursion stack or extra buffers.',
      stable: 'Unstable',
      inPlace: 'Yes',
    },
    advantages: [
      'Much faster than Bubble, Selection, and Insertion Sort on medium-sized arrays.',
      'Requires O(1) extra memory and uses simple iterative loops (no recursion stack overflow risk).',
      'Great cache locality and minimal code footprint.',
    ],
    disadvantages: [
      'Unstable: long-distance swaps across gaps can change the order of equal elements.',
      'Time complexity analysis depends heavily on the chosen gap sequence.',
      'Slower than O(n log n) algorithms like Quick/Merge Sort for very large datasets.',
    ],
    applications: [
      'Embedded systems and firmware where recursion and dynamic heap allocation are restricted (e.g., uClibc qsort fallback).',
      'Sorting medium-sized arrays (a few hundred to a few thousand items) with tight memory budgets.',
      'Sub-routines in libraries when a simple non-recursive O(1)-space sort is required.',
    ],
  },
  {
    id: 'radix',
    number: '07',
    name: 'Radix Sort',
    tagline: 'Sort non-negative integers digit by digit using buckets 0–9.',
    shortDesc:
      'A non-comparative sorting algorithm that processes integers place-by-place (Ones, Tens, Hundreds) using stable digit buckets.',
    defaultArray: [170, 45, 75, 90, 802, 24, 2, 66],
    methodType: 'Non-Comparative (Digit Buckets)',
    inputNote:
      'Supports non-negative integers (>= 0) only, as it distributes numbers into digit buckets 0–9.',
    introduction: {
      summary:
        'Radix Sort is a non-comparative integer sorting algorithm. Instead of comparing two numbers directly (< or >), it sorts numbers digit by digit from the Least Significant Digit (Ones place) to the Most Significant Digit (Tens, Hundreds, etc.).',
      definition:
        'At each digit position, numbers are placed into 10 buckets labeled 0 through 9 and collected back in order. Because each pass preserves the relative order of earlier passes (stability), the array ends up completely sorted! Note: Standard Radix Sort operates on non-negative integers (0 or greater).',
    },
    workingPrinciple: [
      'Verify all elements are non-negative integers (>= 0) and find the maximum value to determine the number of digits (d).',
      'Start at the Ones place (exp = 1). Create 10 empty buckets for digits 0 through 9 (or a count array of size 10).',
      'For every element in the array, extract its current digit: (element / exp) % 10, and place it into the matching bucket.',
      'Collect elements back from Bucket 0 to Bucket 9 in FIFO (First-In, First-Out) order so ties keep their order from previous passes.',
      'Multiply exp by 10 to move to the Tens place (exp = 10), then Hundreds place (exp = 100), and repeat until exp exceeds the maximum value.',
    ],
    example: {
      initialArray: [170, 45, 75, 90, 802, 24, 2, 66],
      passes: [
        {
          passTitle: 'Pass 1: Ones Place (exp = 1)',
          before: [170, 45, 75, 90, 802, 24, 2, 66],
          after: [170, 90, 802, 2, 24, 45, 75, 66],
          highlightIndices: [0, 1, 2, 3, 4, 5, 6, 7],
          sortedUpTo: -1,
          explanation:
            'Buckets: 0:[170,90], 2:[802,2], 4:[24], 5:[45,75], 6:[66]. Collect 0→9 to get [170, 90, 802, 2, 24, 45, 75, 66].',
        },
        {
          passTitle: 'Pass 2: Tens Place (exp = 10)',
          before: [170, 90, 802, 2, 24, 45, 75, 66],
          after: [802, 2, 24, 45, 66, 170, 75, 90],
          highlightIndices: [0, 1, 2, 3, 4, 5, 6, 7],
          sortedUpTo: -1,
          explanation:
            'Treat 2 as 02. Buckets: 0:[802,2], 2:[24], 4:[45], 6:[66], 7:[170,75], 9:[90]. Notice 170 stays before 75!',
        },
        {
          passTitle: 'Pass 3: Hundreds Place (exp = 100)',
          before: [802, 2, 24, 45, 66, 170, 75, 90],
          after: [2, 24, 45, 66, 75, 90, 170, 802],
          highlightIndices: [0, 1, 2, 3, 4, 5, 6, 7],
          sortedUpTo: 7,
          explanation:
            'Buckets: 0:[2,24,45,66,75,90], 1:[170], 8:[802]. Collecting 0→9 produces the final sorted array!',
        },
      ],
      finalArray: [2, 24, 45, 66, 75, 90, 170, 802],
    },
    pseudocode: [
      'Step 1: Start with non-negative integer array A of size n.',
      'Step 2: Find maxVal = maximum element in A.',
      'Step 3: Initialize exp = 1 (Ones place).',
      'Step 4: While floor(maxVal / exp) > 0, repeat Steps 5 to 8:',
      'Step 5:     Initialize count[0..9] = 0 and output[0..n-1].',
      'Step 6:     Count occurrences of each digit (A[i] / exp) % 10, then compute prefix sums.',
      'Step 7:     Traverse A from right to left (i = n - 1 down to 0) to place A[i] stably into output[].',
      'Step 8:     Copy output[] back into A[] and set exp = exp * 10.',
      'Step 9: Array A is sorted. Stop.',
    ],
    cppCode: `#include <iostream>
using namespace std;

// Find the maximum value in the array
int getMax(int arr[], int n) {
    int maxVal = arr[0];
    for (int i = 1; i < n; i++) {
        if (arr[i] > maxVal)
            maxVal = arr[i];
    }
    return maxVal;
}

// Stable Counting Sort based on the digit represented by exp (1, 10, 100...)
void countingSortByDigit(int arr[], int n, int exp) {
    int* output = new int[n];
    int count[10] = {0};

    // Count frequency of each digit (0-9)
    for (int i = 0; i < n; i++) {
        int digit = (arr[i] / exp) % 10;
        count[digit]++;
    }

    // Convert count[] to cumulative positions
    for (int i = 1; i < 10; i++) {
        count[i] += count[i - 1];
    }

    // Build output array from right to left to preserve stability
    for (int i = n - 1; i >= 0; i--) {
        int digit = (arr[i] / exp) % 10;
        output[count[digit] - 1] = arr[i];
        count[digit]--;
    }

    // Copy sorted digit pass back into arr[]
    for (int i = 0; i < n; i++) {
        arr[i] = output[i];
    }

    delete[] output;
}

// Main Radix Sort function (for non-negative integers)
void radixSort(int arr[], int n) {
    if (n <= 0) return;
    int maxVal = getMax(arr, n);

    // Sort for every digit place: 1s, 10s, 100s, ...
    for (int exp = 1; maxVal / exp > 0; exp *= 10) {
        countingSortByDigit(arr, n, exp);
    }
}

int main() {
    int arr[] = {170, 45, 75, 90, 802, 24, 2, 66};
    int n = sizeof(arr) / sizeof(arr[0]);

    radixSort(arr, n);

    cout << "Sorted array: ";
    for (int i = 0; i < n; i++) {
        cout << arr[i] << " ";
    }
    cout << endl;

    return 0;
}`,
    complexity: {
      best: 'O(d × (n + k))',
      bestNote: 'Where d is the number of digits and k = 10 (base-10 buckets).',
      average: 'O(d × (n + k))',
      averageNote: 'Linear time O(n) when digit count d is small/constant.',
      worst: 'O(d × (n + k))',
      worstNote: 'Consistent across all input orders; depends only on d and n.',
      space: 'O(n + k)',
      spaceNote: 'Needs an auxiliary output array of size n and bucket counts of size k = 10.',
      stable: 'Stable',
      inPlace: 'No',
    },
    advantages: [
      'Can beat the O(n log n) comparison-sort lower bound when digit length d is small.',
      'Stable sorting algorithm when paired with Counting Sort or FIFO buckets.',
      'Predictable runtime regardless of whether input is sorted or reversed.',
    ],
    disadvantages: [
      'Standard implementation only handles non-negative integers (needs offset/sign handling for negatives or floats).',
      'Requires O(n + k) extra memory (not in-place).',
      'Less efficient than Quick Sort if numbers have very large digit counts d.',
    ],
    applications: [
      'Sorting large lists of fixed-width integers, phone numbers, postal/ZIP codes, or timestamps.',
      'Suffix array construction and string/lexicographical sorting of fixed-length keys.',
      'GPU parallel sorting pipelines where non-comparative passes scale predictably.',
    ],
  },
];

export function getAlgorithmById(id) {
  return SORTING_ALGORITHMS.find((a) => a.id === id) || SORTING_ALGORITHMS[0];
}
