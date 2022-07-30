const arraySize = 400;
const stepInterval = 0;
const minArrayValue = 0;
const maxArrayValue = 100;
var sortingArray = [];
var generatedArray = [];
var sortingOngoing = false;

window.addEventListener(
  "DOMContentLoaded",
  function () {
    document.getElementById("scoreboardStepInterval").innerHTML =
      stepInterval.toString();
    document.getElementById("scoreboardArraySize").innerHTML =
      arraySize.toString();
    generateFunction();
  },
  false
);

function generateFunction() {
  if (!sortingOngoing) {
    console.log("Generating new random Data");
    randomizeArray();
    drawArrayToCanvas(generatedArray);
    document.getElementById("scoreboardTime").innerHTML = "Not set";
  }
}

function resetFunction() {
  if (!sortingOngoing) {
    console.log("Reset Data");
    drawArrayToCanvas(generatedArray);
    document.getElementById("scoreboardTime").innerHTML = "Not set";
  }
}

// ================================ Bubble Sort ================================ //
function bubbleSortFunction() {
  if (!sortingOngoing) {
    document.getElementById("scoreboardTime").innerHTML = "Calculating...";
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
  var startTime = Date.now();
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
  var endTime = Date.now();
  document.getElementById("scoreboardTime").innerHTML =
    endTime - startTime + "ms";
  sortingOngoing = false;
  document.getElementById("scoreboardSortActive").innerHTML = "None";
  return arr;
}

// ================================ Selection Sort ================================ //
function selectionSortFunction() {
  if (!sortingOngoing) {
    document.getElementById("scoreboardTime").innerHTML = "Calculating...";
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
  var startTime = Date.now();
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
  var endTime = Date.now();
  document.getElementById("scoreboardTime").innerHTML =
    endTime - startTime + "ms";
  sortingOngoing = false;
  document.getElementById("scoreboardSortActive").innerHTML = "None";
  return arr;
}

// ================================ Insertion Sort ================================ //
function insertionSortFunction() {
  if (!sortingOngoing) {
    document.getElementById("scoreboardTime").innerHTML = "Calculating...";
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
  var startTime = Date.now();
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
  var endTime = Date.now();
  document.getElementById("scoreboardTime").innerHTML =
    endTime - startTime + "ms";
  sortingOngoing = false;
  document.getElementById("scoreboardSortActive").innerHTML = "None";
  return arr;
}

// ================================ Merge Sort ================================ //

// ================================ Quick Sort ================================ //

// ================================ Counting Sort ================================ //
function countingSortFunction() {
  if (!sortingOngoing) {
    document.getElementById("scoreboardTime").innerHTML = "Calculating...";
    sortingOngoing = true;
    document.getElementById("scoreboardSortActive").innerHTML = "Counting Sort";
    for (i = 0; i < generatedArray.length; i++) {
      sortingArray[i] = generatedArray[i];
    }
    var startTime = Date.now();
    var min = sortingArray[0];
    var max = sortingArray[0];
    for (i = 0; i < sortingArray.length; i++) {
      min = Math.min(min, sortingArray[i]);
      max = Math.max(max, sortingArray[i]);
    }
    countingSort(sortingArray, min, max, startTime);
  }
}

async function countingSort(arr, min, max, startTime) {
  const count = {};
  for (let i = min; i <= max; i++) {
    count[i] = 0;
  }
  for (let i = 0; i < arr.length; i++) {
    count[arr[i]] += 1;
  }
  const sortedArr = [];
  sortingArray = sortedArr;
  for (let i = min; i <= max; i++) {
    while (count[i] > 0) {
      sortedArr.push(i);
      count[i]--;
    }
    await drawCanvasTask();
  }

  var endTime = Date.now();
  document.getElementById("scoreboardTime").innerHTML =
    endTime - startTime + "ms";
  sortingOngoing = false;
  document.getElementById("scoreboardSortActive").innerHTML = "None";
  return sortedArr;
}

// ================================ Other ================================ //
function drawCanvasTask() {
  return new Promise(function (resolve) {
    setTimeout(function () {
      drawArrayToCanvas(sortingArray);
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

function drawArrayToCanvas(array) {
  var canvas = document.getElementById("canvas");
  const width = (canvas.width = window.innerWidth);
  const height = (canvas.height = window.innerHeight);
  const barSpacing = 1;

  var ctx = canvas.getContext("2d");
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  var barWidth = width / arraySize;
  var barHeight = height;

  ctx.fillStyle = "#ff6d00";

  for (let i = 0; i < arraySize; i++) {
    var currentBarHeight = barHeight * (array[i] / maxArrayValue);
    ctx.fillRect(
      i * barWidth,
      0,
      barWidth - barSpacing,
      barHeight * (array[i] / maxArrayValue)
    );
  }
}
