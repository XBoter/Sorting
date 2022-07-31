// ================================ Important Config Values ================================ //
const arraySize = 500;
const stepInterval = 1;
const minArrayValue = 0;
const maxArrayValue = 1000000;

// ================================================================ Main Code ================================================================ //
var sortingArray = [];
var memArray = [];
var generatedArray = [];
var sortingOngoing = false;

window.addEventListener(
  "DOMContentLoaded",
  function () {
    document.getElementById("scoreboardArraySize").innerHTML =
      arraySize.toString();
    document.getElementById("scoreboardMinArrayValues").innerHTML =
      minArrayValue.toString();
    document.getElementById("scoreboardMaxArrayValues").innerHTML =
      maxArrayValue.toString();
    generateFunction();
  },
  false
);

function generateFunction() {
  if (!sortingOngoing) {
    console.log("Generating new random Data");
    randomizeArray();
    drawArrayToCanvas(generatedArray);
  }
}

function resetFunction() {
  if (!sortingOngoing) {
    console.log("Reset Data");
    drawArrayToCanvas(generatedArray);
  }
}

// ================================ Bubble Sort ================================ //
function bubbleSortFunction() {
  if (!sortingOngoing) {
    sortingOngoing = true;
    document.getElementById("scoreboardSortActive").innerHTML = "Bubble Sort";
    for (i = 0; i < generatedArray.length; i++) {
      sortingArray[i] = generatedArray[i];
    }
    bubbleSort(sortingArray);
  }
}

async function bubbleSort(arr) {
  var len = arr.length;
  for (var i = 0; i < len; i++) {
    for (var j = 0; j < len - i - 1; j++) {
      if (arr[j] > arr[j + 1]) {
        var temp = arr[j];
        arr[j] = arr[j + 1];
        arr[j + 1] = temp;
      }
    }
    await drawCanvasTask();
  }
  sortingOngoing = false;
  document.getElementById("scoreboardSortActive").innerHTML = "None";
  await drawCanvasTask(); // Clear draw
  return arr;
}

// ================================ Selection Sort ================================ //
function selectionSortFunction() {
  if (!sortingOngoing) {
    sortingOngoing = true;
    document.getElementById("scoreboardSortActive").innerHTML =
      "Selection Sort";
    for (i = 0; i < generatedArray.length; i++) {
      sortingArray[i] = generatedArray[i];
    }
    selectionSort(sortingArray);
  }
}

async function selectionSort(arr) {
  let n = arr.length;
  for (let i = 0; i < n; i++) {
    let min = i;
    for (let j = i + 1; j < n; j++) {
      if (arr[j] < arr[min]) {
        min = j;
      }
    }
    if (min != i) {
      let tmp = arr[i];
      arr[i] = arr[min];
      arr[min] = tmp;
    }
    await drawCanvasTask();
  }
  sortingOngoing = false;
  document.getElementById("scoreboardSortActive").innerHTML = "None";
  await drawCanvasTask(); // Clear draw
  return arr;
}

// ================================ Insertion Sort ================================ //
function insertionSortFunction() {
  if (!sortingOngoing) {
    sortingOngoing = true;
    document.getElementById("scoreboardSortActive").innerHTML =
      "Insertion Sort";
    for (i = 0; i < generatedArray.length; i++) {
      sortingArray[i] = generatedArray[i];
    }
    insertionSort(sortingArray);
  }
}

async function insertionSort(arr) {
  let n = arr.length;
  for (let i = 1; i < n; i++) {
    let current = arr[i];
    let j = i - 1;
    while (j > -1 && current < arr[j]) {
      arr[j + 1] = arr[j];
      j--;
    }
    arr[j + 1] = current;
    await drawCanvasTask();
  }
  sortingOngoing = false;
  document.getElementById("scoreboardSortActive").innerHTML = "None";
  await drawCanvasTask(); // Clear draw
  return arr;
}

// ================================ Merge Sort ================================ //
// ToDo

// ================================ Quick Sort ================================ //
// ToDo

// ================================ Counting Sort ================================ //
function countingSortFunction() {
  if (!sortingOngoing) {
    sortingOngoing = true;
    document.getElementById("scoreboardSortActive").innerHTML = "Counting Sort";
    for (i = 0; i < generatedArray.length; i++) {
      sortingArray[i] = generatedArray[i];
    }
    var min = sortingArray[0];
    var max = sortingArray[0];
    for (i = 0; i < sortingArray.length; i++) {
      min = Math.min(min, sortingArray[i]);
      max = Math.max(max, sortingArray[i]);
    }
    countingSort(sortingArray, min, max);
  }
}

async function countingSort(arr, min, max) {
  const count = {};
  for (let i = min; i <= max; i++) {
    count[i] = 0;
  }
  for (let i = 0; i < arr.length; i++) {
    count[arr[i]] += 1;
  }
  const sortedArr = [];
  for (let i = min; i <= max; i++) {
    while (count[i] > 0) {
      sortedArr.push(i);
      count[i]--;
      await drawCanvasTask1(sortedArr);
    }
  }
  sortingOngoing = false;
  document.getElementById("scoreboardSortActive").innerHTML = "None";
  for (i = 0; i < sortedArr.length; i++) {
    sortingArray[i] = sortedArr[i];
  }
  await drawCanvasTask(); // Clear draw
  return sortedArr;
}

// ================================ Radix Sort ================================ //
function radixSortFunction() {
  if (!sortingOngoing) {
    sortingOngoing = true;
    document.getElementById("scoreboardSortActive").innerHTML = "Radix Sort";
    for (i = 0; i < generatedArray.length; i++) {
      sortingArray[i] = generatedArray[i];
    }
    radixSort(sortingArray);
  }
}

async function radixSort(arr) {
  let maxDigitCount = mostDigits(arr);
  for (let k = 0; k < maxDigitCount; k++) {
    let digitBuckets = Array.from({ length: 10 }, () => []);
    for (let i = 0; i < arr.length; i++) {
      let digit = getDigit(arr[i], k);
      digitBuckets[digit].push(arr[i]);
    }
    arr = [].concat(...digitBuckets);
    await drawCanvasTask2(arr, stepInterval * 300);
  }
  sortingOngoing = false;
  document.getElementById("scoreboardSortActive").innerHTML = "None";
  for (i = 0; i < arr.length; i++) {
    sortingArray[i] = arr[i];
  }
  await drawCanvasTask(); // Clear draw
  return arr;
}

function getDigit(num, place) {
  return Math.floor(Math.abs(num) / Math.pow(10, place)) % 10;
}

function digitCount(num) {
  if (num === 0) return 1;
  return Math.floor(Math.log10(Math.abs(num))) + 1;
}

function mostDigits(nums) {
  let maxDigits = 0;
  for (let i = 0; i < nums.length; i++) {
    maxDigits = Math.max(maxDigits, digitCount(nums[i]));
  }
  return maxDigits;
}

// ================================ Bucket Sort ================================ //
function bucketSortFunction() {
  if (!sortingOngoing) {
    sortingOngoing = true;
    document.getElementById("scoreboardSortActive").innerHTML = "Bucket Sort";
    for (i = 0; i < generatedArray.length; i++) {
      sortingArray[i] = generatedArray[i];
    }
    bucketSort(sortingArray, 5);
  }
}

async function bucketSort(arr, bucketSize) {
  const min = Math.min(...arr);
  const max = Math.max(...arr);
  const buckets = Array.from(
    { length: Math.floor((max - min) / bucketSize) + 1 },
    () => []
  );
  arr.forEach((val) => {
    buckets[Math.floor((val - min) / bucketSize)].push(val);
  });
  x = buckets.reduce((acc, b) => [...acc, ...b.sort((a, b) => a - b)], []);
  await drawCanvasTask1(x);
  sortingOngoing = false;
  document.getElementById("scoreboardSortActive").innerHTML = "None";
  await drawCanvasTask(); // Clear draw
  return arr;
}

// ================================ Heap Sort ================================ //
function heapSortFunction() {
  if (!sortingOngoing) {
    sortingOngoing = true;
    document.getElementById("scoreboardSortActive").innerHTML = "Heap Sort";
    for (i = 0; i < generatedArray.length; i++) {
      sortingArray[i] = generatedArray[i];
    }
    heapSort(sortingArray);
  }
}

async function heapSort(arr) {
  buildMaxHeap(arr);
  lastElement = arr.length - 1;
  while (lastElement > 0) {
    swap(arr, 0, lastElement);
    heapify(arr, 0, lastElement);
    lastElement -= 1;
    await drawCanvasTask();
  }
  sortingOngoing = false;
  document.getElementById("scoreboardSortActive").innerHTML = "None";
  await drawCanvasTask(); // Clear draw
  return arr;
}

function buildMaxHeap(arr) {
  let i = Math.floor(arr.length / 2 - 1);
  while (i >= 0) {
    heapify(arr, i, arr.length);
    i -= 1;
  }
}

function heapify(heap, i, max) {
  let index;
  let leftChild;
  let rightChild;

  while (i < max) {
    index = i;
    leftChild = 2 * i + 1;
    rightChild = leftChild + 1;
    if (leftChild < max && heap[leftChild] > heap[index]) {
      index = leftChild;
    }
    if (rightChild < max && heap[rightChild] > heap[index]) {
      index = rightChild;
    }
    if (index === i) {
      return;
    }
    swap(heap, i, index);
    i = index;
  }
}

function swap(arr, firstItemIndex, lastItemIndex) {
  const temp = arr[firstItemIndex];
  arr[firstItemIndex] = arr[lastItemIndex];
  arr[lastItemIndex] = temp;
}

// ================================ Shell Sort ================================ //
function shellSortFunction() {
  if (!sortingOngoing) {
    sortingOngoing = true;
    document.getElementById("scoreboardSortActive").innerHTML = "Shell Sort";
    for (i = 0; i < generatedArray.length; i++) {
      sortingArray[i] = generatedArray[i];
    }
    shellSort(sortingArray);
  }
}

async function shellSort(arr) {
  let n = arr.length;

  for (let gap = Math.floor(n / 2); gap > 0; gap = Math.floor(gap / 2)) {
    for (let i = gap; i < n; i += 1) {
      let temp = arr[i];
      let j;
      for (j = i; j >= gap && arr[j - gap] > temp; j -= gap) {
        arr[j] = arr[j - gap];
      }
      arr[j] = temp;
      await drawCanvasTask();
    }
  }
  sortingOngoing = false;
  document.getElementById("scoreboardSortActive").innerHTML = "None";
  await drawCanvasTask(); // Clear draw
  return arr;
}

// ================================ Other ================================ //
function drawCanvasTask() {
  return new Promise(function (resolve) {
    setTimeout(function () {
      drawArrayToCanvas(sortingArray, true);
      resolve();
    }, stepInterval);
  });
}

function drawCanvasTask1(arr) {
  return new Promise(function (resolve) {
    setTimeout(function () {
      drawArrayToCanvas(arr, true);
      resolve();
    }, stepInterval);
  });
}

function drawCanvasTask2(arr, stepInterval) {
  return new Promise(function (resolve) {
    setTimeout(function () {
      drawArrayToCanvas(arr, true);
      resolve();
    }, stepInterval);
  });
}

function randomizeArray() {
  generatedArray = [];
  for (let i = 0; i < arraySize; i++) {
    generatedArray[i] = getRndInteger(minArrayValue, maxArrayValue);
  }
}

function consoleLogArray() {
  console.log("==== Start sortingArray ====");
  for (let i = 0; i < arraySize; i++) {
    console.log(sortingArray[i]);
  }
  console.log("==== End sortingArray ====");
}

function getRndInteger(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

function drawArrayToCanvas(array, markChanges = false) {
  var canvas = document.getElementById("canvas");
  const width = (canvas.width = window.innerWidth);
  const height = (canvas.height = window.innerHeight);
  const barSpacing = 1;

  var ctx = canvas.getContext("2d");
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  var barWidth = width / arraySize;
  var barHeight = height;

  for (let i = 0; i < arraySize; i++) {
    if (markChanges) {
      if (memArray[i] != array[i]) {
        ctx.fillStyle = "#d50000";
      } else {
        ctx.fillStyle = "#00e676";
      }
    } else {
      ctx.fillStyle = "#00e676";
    }
    var currentBarHeight = barHeight * (array[i] / maxArrayValue);
    ctx.fillRect(
      i * barWidth,
      0,
      barWidth - barSpacing,
      barHeight * (array[i] / maxArrayValue)
    );
  }
  memArray = [];
  for (i = 0; i < array.length; i++) {
    memArray[i] = array[i];
  }
}
