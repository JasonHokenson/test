const http = require('http');

// initialize the timeStamps array
let timeStamps = [];

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/html');
  res.end(`<!DOCTYPE html>
<html>
<head>
  <title>Current Date and Time</title>
</head>
<body>
  <h1>Today's Date and Time</h1>
  <p>Your IP address is: <span id="ip-address"></span></p>
  <p>The current date and time is: <span id="current-date"></span></p>

  <button onclick="showTimeStamp()">Show Time Stamp</button>
  <ul id="time-stamps"></ul>

  <!-- Add a new div element to display the timeStamps array -->
  <div id="time-stamps-array"></div>

  <script>
    function updateClock() {
      var currentDate = new Date();
      var formattedDate = currentDate.toLocaleDateString();
      var hours = currentDate.getHours();
      var minutes = currentDate.getMinutes();
      var seconds = currentDate.getSeconds();
      var milliseconds = currentDate.getMilliseconds();

      var formattedTime = hours + ":" + minutes + ":" + seconds + "." + milliseconds;
      var formattedDateTime = formattedDate + " " + formattedTime;

      document.getElementById("current-date").innerHTML = formattedDateTime;
    }

    function showIpAddress() {
      var xhr = new XMLHttpRequest();
      xhr.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
          var ipAddress = JSON.parse(this.responseText).ip;
          document.getElementById("ip-address").innerHTML = ipAddress;
        }
      };
      xhr.open("GET", "https://api.ipify.org/?format=json", true);
      xhr.send();
    }

    function showTimeStamp() {
      var timeStamp = new Date();
      var formattedTimeStamp = timeStamp.toLocaleString();

      var xhr = new XMLHttpRequest();
      xhr.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
          var ipAddress = JSON.parse(this.responseText).ip;
          var listItem = document.createElement("li");
          listItem.appendChild(document.createTextNode(formattedTimeStamp + " - " + ipAddress));
          document.getElementById("time-stamps").appendChild(listItem);
          // add the timeStamp to the timeStamps array
          timeStamps.push(formattedTimeStamp + " - " + ipAddress);
        }
      };
      xhr.open("GET", "https://api.ipify.org/?format=json", true);
      xhr.send();
    }

    showIpAddress();
    setInterval(updateClock, 1);

    // populate the time-stamps-array div with the contents of the timeStamps array
    document.getElementById("time-stamps-array").innerHTML = timeStamps.join("<br>");
  </script>
</body>
</html>`);
});

server.listen(8080, () => {
  console.log('Server running at http://127.0.0.1:8080/');
});
