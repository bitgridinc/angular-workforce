// Taken from: https://gist.github.com/abreckner/110e28897d42126a3bb9

// This is the equivalent of the old waitsFor/runs syntax
// which was removed from Jasmine 2
function waitsForAndRuns(escapeFunction, runFunction, escapeTime) {
  // check the escapeFunction every millisecond so as soon as it is met we can escape the function
  var interval = setInterval(function() {
    if (escapeFunction()) {
      clearMe();
      runFunction();
    }
  }, 1);

  // in case we never reach the escapeFunction, we will time out
  // at the escapeTime
  var timeOut = setTimeout(function() {
    clearMe();
    runFunction();
  }, escapeTime);

  // clear the interval and the timeout
  function clearMe(){
    clearInterval(interval);
    clearTimeout(timeOut);
  }
};

module.exports = waitsForAndRuns;