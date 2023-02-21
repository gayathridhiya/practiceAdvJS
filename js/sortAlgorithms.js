function insertionSort(arr) {
    // 8 5 9 2 4 6
    for (let i = 1; i < arr.length; i++) {
      let elementToBeInserted = arr[i]; //5
      let j = i - 1;
      while (j >= 0 && elementToBeInserted < arr[j]) {
        // 5<8
        arr[j + 1] = arr[j];
        j--;
      }
      arr[j + 1] = elementToBeInserted;
    }
    return arr;
  }
  
  let arr = [8, 5, 9, 2, 4, 6];
  console.log(insertionSort(arr));
  console.log(arr);

  //ins sort - abdul bari

  //selction sort - https://www.youtube.com/watch?v=p2lN3HnekB0

 
  function selectionSort(arr) {
    for (let i = 0; i < arr.length - 1; i++) {
      let minIdx = i; //8, 5, 9, 2, 4, 6 minIdx=0
      for (let j = i + 1; j < arr.length; j++) {
        if (arr[minIdx] > arr[j]) {
          minIdx = j; //minIdx = 5's index 2's index => 2's index
        }
      }
      if (minIdx !== i) {
        [arr[i], arr[minIdx]] = [arr[minIdx], arr[i]];
      }
    }
    return arr;
  }
  
  let array3 = [8, 5, 9, 2, 4, 6];
  let array4 = selectionSort(array3);
  console.log(array3);
  console.log(array4);
  
  