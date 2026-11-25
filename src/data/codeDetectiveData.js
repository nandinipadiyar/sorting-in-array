export const IDENTIFY_ALGORITHM_PUZZLES = [
  {
    id: 'ia-1',
    title: 'Mystery Function #1',
    code: `#include <iostream>
using namespace std;

void mysterySort(int arr[], int n) {
    for (int i = 0; i < n - 1; i++) {
        int idx = i;
        for (int j = i + 1; j < n; j++) {
            if (arr[j] < arr[idx]) {
                idx = j;
            }
        }
        if (idx != i) {
            int temp = arr[i];
            arr[i] = arr[idx];
            arr[idx] = temp;
        }
    }
}`,
    options: ['Bubble Sort', 'Selection Sort', 'Insertion Sort', 'Shell Sort'],
    correctIndex: 1,
    clue: 'Tracks idx = i, scans j = i + 1..n - 1 to find the smallest element, then performs at most one swap per pass.',
    explanation:
      'This is Selection Sort! It repeatedly selects the minimum element index (idx) from the unsorted suffix and swaps it into position i.',
  },
  {
    id: 'ia-2',
    title: 'Mystery Function #2',
    code: `#include <iostream>
using namespace std;

void mysterySort(int arr[], int n) {
    for (int i = 1; i < n; i++) {
        int val = arr[i];
        int j = i - 1;
        while (j >= 0 && arr[j] > val) {
            arr[j + 1] = arr[j];
            j--;
        }
        arr[j + 1] = val;
    }
}`,
    options: ['Selection Sort', 'Quick Sort', 'Insertion Sort', 'Merge Sort'],
    correctIndex: 2,
    clue: 'Stores val = arr[i], shifts larger sorted elements one slot right (arr[j + 1] = arr[j]), and inserts val at j + 1.',
    explanation:
      'This is Insertion Sort! Each pass picks arr[i] (the key) and slides it backward into its proper position within the sorted left prefix.',
  },
  {
    id: 'ia-3',
    title: 'Mystery Function #3',
    code: `#include <iostream>
using namespace std;

void mysterySort(int arr[], int n) {
    for (int g = n / 2; g > 0; g /= 2) {
        for (int i = g; i < n; i++) {
            int temp = arr[i];
            int j = i;
            while (j >= g && arr[j - g] > temp) {
                arr[j] = arr[j - g];
                j -= g;
            }
            arr[j] = temp;
        }
    }
}`,
    options: ['Merge Sort', 'Radix Sort', 'Shell Sort', 'Bubble Sort'],
    correctIndex: 2,
    clue: 'Starts with g = n / 2 and halves g each pass, running gapped shifts (j - g) down to g = 1.',
    explanation:
      'This is Shell Sort! It generalizes Insertion Sort by comparing and shifting elements separated by a shrinking gap g until g reaches 1.',
  },
  {
    id: 'ia-4',
    title: 'Mystery Function #4',
    code: `#include <iostream>
using namespace std;

int helper(int arr[], int low, int high) {
    int p = arr[high];
    int i = low - 1;
    for (int j = low; j < high; j++) {
        if (arr[j] <= p) {
            i++;
            int t = arr[i]; arr[i] = arr[j]; arr[j] = t;
        }
    }
    int t = arr[i + 1]; arr[i + 1] = arr[high]; arr[high] = t;
    return i + 1;
}

void mysterySort(int arr[], int low, int high) {
    if (low < high) {
        int pos = helper(arr, low, high);
        mysterySort(arr, low, pos - 1);
        mysterySort(arr, pos + 1, high);
    }
}`,
    options: ['Quick Sort', 'Merge Sort', 'Selection Sort', 'Radix Sort'],
    correctIndex: 0,
    clue: 'Picks p = arr[high], partitions elements <= p to the left, places p at pos, and recurses on [low..pos-1] and [pos+1..high].',
    explanation:
      'This is Quick Sort (using Lomuto partitioning)! Unlike Merge Sort, partitioning does the ordering work before the recursive calls.',
  },
  {
    id: 'ia-5',
    title: 'Mystery Function #5',
    code: `#include <iostream>
using namespace std;

void mysteryPass(int arr[], int n, int exp) {
    int* out = new int[n];
    int cnt[10] = {0};
    for (int i = 0; i < n; i++) cnt[(arr[i] / exp) % 10]++;
    for (int i = 1; i < 10; i++) cnt[i] += cnt[i - 1];
    for (int i = n - 1; i >= 0; i--) {
        int d = (arr[i] / exp) % 10;
        out[cnt[d] - 1] = arr[i];
        cnt[d]--;
    }
    for (int i = 0; i < n; i++) arr[i] = out[i];
    delete[] out;
}`,
    options: ['Insertion Sort', 'Radix Sort', 'Shell Sort', 'Quick Sort'],
    correctIndex: 1,
    clue: 'Uses a 10-element count array cnt[10] and extracts (arr[i] / exp) % 10 without comparing array values against each other.',
    explanation:
      'This is the digit-counting pass of Radix Sort! For exp = 1, 10, 100..., it stably groups non-negative integers by each base-10 digit.',
  },
  {
    id: 'ia-6',
    title: 'Mystery Function #6',
    code: `#include <iostream>
using namespace std;

void mysterySort(int arr[], int n) {
    for (int i = 0; i < n - 1; i++) {
        bool changed = false;
        for (int j = 0; j < n - i - 1; j++) {
            if (arr[j] > arr[j + 1]) {
                int t = arr[j]; arr[j] = arr[j + 1]; arr[j + 1] = t;
                changed = true;
            }
        }
        if (!changed) break;
    }
}`,
    options: ['Bubble Sort', 'Selection Sort', 'Insertion Sort', 'Merge Sort'],
    correctIndex: 0,
    clue: 'Compares adjacent pairs arr[j] and arr[j + 1] and stops early if changed stays false for an entire pass.',
    explanation:
      'This is optimized Bubble Sort! The boolean flag lets it exit in O(n) time when the array is already sorted.',
  },
];

export const COMPLETE_CODE_PUZZLES = [
  {
    id: 'cc-1',
    title: 'Complete Insertion Sort Shift',
    topic: 'Insertion Sort',
    templateCode: `#include <iostream>
using namespace std;

int main() {
    int arr[5] = {14, 7, 19, 3, 10};
    for (int i = 1; i < 5; i++) {
        int key = arr[i];
        int j = i - 1;
        while (j >= 0 && arr[j] > key) {
            /* ??? MISSING LINE ??? */
            j--;
        }
        arr[j + 1] = key;
    }
    for (int i = 0; i < 5; i++) cout << arr[i] << " ";
    return 0;
}`,
    options: [
      'arr[j + 1] = arr[j];',
      'arr[j] = arr[j + 1];',
      'arr[j + 1] = key;',
      'arr[i] = arr[j];',
    ],
    correctIndex: 0,
    completeCode: `#include <iostream>
using namespace std;

int main() {
    int arr[5] = {14, 7, 19, 3, 10};
    for (int i = 1; i < 5; i++) {
        int key = arr[i];
        int j = i - 1;
        while (j >= 0 && arr[j] > key) {
            arr[j + 1] = arr[j];
            j--;
        }
        arr[j + 1] = key;
    }
    for (int i = 0; i < 5; i++) cout << arr[i] << " ";
    return 0;
}`,
    expectedOutput: '3 7 10 14 19',
    explanation:
      'While arr[j] > key, we shift arr[j] one step right into arr[j + 1] so space opens up for key at the end of the while loop.',
  },
  {
    id: 'cc-2',
    title: 'Complete Binary Search Bounds',
    topic: 'Binary Search',
    templateCode: `#include <iostream>
using namespace std;

int main() {
    int arr[6] = {4, 8, 15, 16, 23, 42};
    int left = 0, right = 5, target = 23, ans = -1;
    while (left <= right) {
        int mid = left + (right - left) / 2;
        if (arr[mid] == target) {
            ans = mid;
            break;
        } else if (arr[mid] < target) {
            /* ??? MISSING LINE ??? */
        } else {
            right = mid - 1;
        }
    }
    cout << ans;
    return 0;
}`,
    options: [
      'left = mid + 1;',
      'left = mid - 1;',
      'right = mid + 1;',
      'left = mid;',
    ],
    correctIndex: 0,
    completeCode: `#include <iostream>
using namespace std;

int main() {
    int arr[6] = {4, 8, 15, 16, 23, 42};
    int left = 0, right = 5, target = 23, ans = -1;
    while (left <= right) {
        int mid = left + (right - left) / 2;
        if (arr[mid] == target) {
            ans = mid;
            break;
        } else if (arr[mid] < target) {
            left = mid + 1;
        } else {
            right = mid - 1;
        }
    }
    cout << ans;
    return 0;
}`,
    expectedOutput: '4',
    explanation:
      'Since arr[mid] is strictly less than target, the target can only lie in the right half [mid + 1 .. right], so we set left = mid + 1.',
  },
  {
    id: 'cc-3',
    title: 'Complete Selection Sort Update',
    topic: 'Selection Sort',
    templateCode: `#include <iostream>
using namespace std;

int main() {
    int arr[5] = {29, 10, 14, 37, 13};
    for (int i = 0; i < 4; i++) {
        int minIdx = i;
        for (int j = i + 1; j < 5; j++) {
            if (arr[j] < arr[minIdx]) {
                /* ??? MISSING LINE ??? */
            }
        }
        int temp = arr[i];
        arr[i] = arr[minIdx];
        arr[minIdx] = temp;
    }
    for (int i = 0; i < 5; i++) cout << arr[i] << " ";
    return 0;
}`,
    options: [
      'minIdx = j;',
      'minIdx = i;',
      'arr[minIdx] = arr[j];',
      'j = minIdx;',
    ],
    correctIndex: 0,
    completeCode: `#include <iostream>
using namespace std;

int main() {
    int arr[5] = {29, 10, 14, 37, 13};
    for (int i = 0; i < 4; i++) {
        int minIdx = i;
        for (int j = i + 1; j < 5; j++) {
            if (arr[j] < arr[minIdx]) {
                minIdx = j;
            }
        }
        int temp = arr[i];
        arr[i] = arr[minIdx];
        arr[minIdx] = temp;
    }
    for (int i = 0; i < 5; i++) cout << arr[i] << " ";
    return 0;
}`,
    expectedOutput: '10 13 14 29 37',
    explanation:
      'When arr[j] is smaller than arr[minIdx], we only record the new minimum index (minIdx = j) and wait until the inner loop finishes before swapping.',
  },
  {
    id: 'cc-4',
    title: 'Complete Quick Sort Partition Boundary',
    topic: 'Quick Sort',
    templateCode: `#include <iostream>
using namespace std;

int main() {
    int arr[5] = {9, 4, 7, 2, 5};
    int pivot = arr[4];
    int i = -1;
    for (int j = 0; j < 4; j++) {
        if (arr[j] <= pivot) {
            /* ??? MISSING LINE ??? */
            int t = arr[i]; arr[i] = arr[j]; arr[j] = t;
        }
    }
    int t = arr[i + 1]; arr[i + 1] = arr[4]; arr[4] = t;
    for (int k = 0; k < 5; k++) cout << arr[k] << " ";
    return 0;
}`,
    options: ['i++;', 'j++;', 'i--;', 'pivot = arr[j];'],
    correctIndex: 0,
    completeCode: `#include <iostream>
using namespace std;

int main() {
    int arr[5] = {9, 4, 7, 2, 5};
    int pivot = arr[4];
    int i = -1;
    for (int j = 0; j < 4; j++) {
        if (arr[j] <= pivot) {
            i++;
            int t = arr[i]; arr[i] = arr[j]; arr[j] = t;
        }
    }
    int t = arr[i + 1]; arr[i + 1] = arr[4]; arr[4] = t;
    for (int k = 0; k < 5; k++) cout << arr[k] << " ";
    return 0;
}`,
    expectedOutput: '4 2 5 9 7',
    explanation:
      'i tracks the end of the <= pivot region (starting at low - 1 = -1). Whenever arr[j] <= pivot, we advance i++ before swapping arr[i] and arr[j].',
  },
  {
    id: 'cc-5',
    title: 'Complete Merge Sort Leftover Copy',
    topic: 'Merge Sort',
    templateCode: `#include <iostream>
using namespace std;

int main() {
    int L[2] = {3, 8}, R[2] = {5, 10}, out[4];
    int i = 0, j = 0, k = 0;
    while (i < 2 && j < 2) {
        if (L[i] <= R[j]) out[k++] = L[i++];
        else out[k++] = R[j++];
    }
    while (i < 2) out[k++] = L[i++];
    /* ??? MISSING LINE ??? */
    for (int x = 0; x < 4; x++) cout << out[x] << " ";
    return 0;
}`,
    options: [
      'while (j < 2) out[k++] = R[j++];',
      'while (j < 2) out[k++] = L[j++];',
      'while (i < 2) out[k++] = R[i++];',
      'out[k] = R[0];',
    ],
    correctIndex: 0,
    completeCode: `#include <iostream>
using namespace std;

int main() {
    int L[2] = {3, 8}, R[2] = {5, 10}, out[4];
    int i = 0, j = 0, k = 0;
    while (i < 2 && j < 2) {
        if (L[i] <= R[j]) out[k++] = L[i++];
        else out[k++] = R[j++];
    }
    while (i < 2) out[k++] = L[i++];
    while (j < 2) out[k++] = R[j++];
    for (int x = 0; x < 4; x++) cout << out[x] << " ";
    return 0;
}`,
    expectedOutput: '3 5 8 10',
    explanation:
      'After the main merge loop ends, either L or R may still have uncopied elements. The second cleanup loop copies any leftover elements from R[j++].',
  },
];
