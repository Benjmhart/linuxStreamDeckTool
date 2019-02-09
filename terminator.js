
const terminate = require('terminate');

module.exports = (processPid)=>{
  terminate(processPid, function (err) {
    if (err) { // you will get an error if you did not supply a valid process.pid
      console.log("Oopsy: " + err); // handle errors in your preferred way.
    }
    else {
      console.log('done'); // terminating the Processes succeeded.
    }
  });
} 