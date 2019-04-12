
class Clock {

  constructor() {
    let date = new Date();
    
    // 1. Create a Date object.
    this.hours = date.getHours();
    this.mins = date.getMinutes();
    this.secs = date.getSeconds();

    this.printTime();
    setInterval(this._tick.bind(this), 1000);
    // 2. Store the hours, minutes, and seconds.
    // 3. Call printTime.
    // 4. Schedule the tick at 1 second intervals.  
  }

  printTime() {
    let time = `${this.hours}:${this.mins}:${this.secs}`;
    console.log(time);
    // Format the time in HH:MM:SS
    // Use console.log to print it.
  }

  _tick() {
    this.secs = this.secs + 1;
    if (this.secs === 60) {
      this.secs = 0;
      this.mins += 1;
    } 

    if (this.mins === 60) {
      this.mins = 0;
      this.hours += 1;
    }

    if (this.hours === 24) {
      this.hours = 0;
    }
    this.printTime();
  }

}

// const readline = require('readline');

// const reader = readline.createInterface({
//   input: process.stdin,
//   output: process.stdout
// });

function addNumbers(sum, numsLeft, completionCallback) {
  if(numsLeft > 0){
    reader.question("Gimme a muddafuggin number, or else bish: ", function (answer){
      answer = parseInt(answer);
      sum = sum + answer;
      console.log(sum);
      addNumbers(sum, numsLeft-1, completionCallback)
    });
  }else if(numsLeft === 0){
    completionCallback(sum);
  }
}

// addNumbers(0, 3, sum => console.log(`Total Sum: ${sum}`));

const readline = require('readline');

const reader = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function askIfGreaterThan(el1, el2, callback) {
  reader.question(`you think da ${el1} est mo betta than ${el2}? `, function (answer) {
    if (answer === 'yes') {
      callback(true);
    } else if (answer === 'no') {
      callback(false);
    }
  });
}

// askIfGreaterThan('bananas', 'orange', console.log);

function innerBubbleSortLoop(arr, i, madeAnySwaps, outerBubbleSortLoop) {
  if (i < arr.length - 1) {
    askIfGreaterThan(arr[i], arr[i+1], function(isGreaterThan) {
      if (isGreaterThan === true) {
        [arr[i], arr[i+1]] = [arr[i+1], arr[i]];
        madeAnySwaps = true;
        innerBubbleSortLoop(arr, i+1, madeAnySwaps, outerBubbleSortLoop);
      } else {
        innerBubbleSortLoop(arr, i + 1, madeAnySwaps, outerBubbleSortLoop);
      }
    });
  } else {
    outerBubbleSortLoop(madeAnySwaps);
  }
}

// innerBubbleSortLoop([3,2,1], 0, false, console.log);

function absurdBubbleSort(arr, sortCompletionCallback) {
  function outerBubbleSortLoop(madeAnySwaps) {
    if (madeAnySwaps) {
      innerBubbleSortLoop(arr, 0, false, outerBubbleSortLoop);
    } else {
      sortCompletionCallback(arr);
    }
  }
  outerBubbleSortLoop(true);
}

// absurdBubbleSort([3, 2, 1], function (arr) {
//   console.log("Sorted array: " + JSON.stringify(arr));
//   reader.close();
// });

Function.prototype.myBind = function (context) {
  return () => {
    this.apply(context);
  };
}

class Lamp {
  constructor() {
    this.name = "a lamp";
  }
}

// const turnOn = function () {
//   console.log("Turning on " + this.name);
// };

// const lamp = new Lamp();

// turnOn(); // should not work the way we want it to

// const boundTurnOn = turnOn.bind(lamp);
// const myBoundTurnOn = turnOn.myBind(lamp);

// boundTurnOn(); // should say "Turning on a lamp"
// myBoundTurnOn(); 

Function.prototype.myThrottle = function (interval){
  let tooSoon = false;
  return () => {
    if(!tooSoon){
      tooSoon = true;
      setTimeout(() => {
        tooSoon = false;
      }, interval);
      this.call(arguments);
    }
  }
}

// class Neuron {
//   fire() {
//     console.log("Firing!");
//   }
// };

// const neuron = new Neuron;
// // When we create a new Neuron, 
// // we can call #fire as frequently as we want

// // The following code will try to #fire the neuron every 10ms. Try it in the console

// // Using Function#myThrottle, we should be able to throttle 
// // the #fire function of our neuron so that it can only fire 
// // once every 500ms:

// neuron.fire = neuron.fire.myThrottle(2000);

Function.prototype.myDebounce = function (interval){
  let mytime = setTimeout(() => { 
    this.call(arguments) 
  }, interval);
  return () => {
    clearTimeout(mytime);
  }
}

class SearchBar {
  constructor() {
    this.query = "";

    this.type = this.type.bind(this);
    this.search = this.search.bind(this);
  }

  type(letter) {
    this.query += letter;
    this.search();
  }

  search() {

    console.log(`searching for ${this.query}`);
  }
}
const searchBar = new SearchBar;

const queryForHelloWorld = () => {
  searchBar.type("h");
  searchBar.type("e");
  searchBar.type("l");
  searchBar.type("l");
  searchBar.type("o");
  searchBar.type(" ");
  searchBar.type("w");
  searchBar.type("o");
  searchBar.type("r");
  searchBar.type("l");
  searchBar.type("d");
}

searchBar.search = searchBar.search.myDebounce(500);
queryForHelloWorld();

