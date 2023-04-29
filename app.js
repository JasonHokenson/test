const http = require('http');

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/html');
  
  let timeStamps = JSON.parse(localStorage.getItem('timeStamps') || '[]');
  
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
          var timeStamps = JSON.parse(localStorage.getItem('timeStamps') || '[]');
          timeStamps.push(formattedTimeStamp + " - " + ipAddress);
          localStorage.setItem('timeStamps', JSON.stringify(timeStamps));
          displayTimeStamps(timeStamps);
        }
      };
      xhr.open("GET", "https://api.ipify.org/?format=json", true);
      xhr.send();
    }

    function displayTimeStamps(timeStamps) {
      var timeStampsList = document.getElementById("time-stamps");
      timeStampsList.innerHTML = "";
      timeStamps.forEach(function(timeStamp) {
        var listItem = document.createElement("li");
        listItem.appendChild(document.createTextNode(timeStamp));
        timeStampsList.appendChild(listItem);
      });
    }

    showIpAddress();
    setInterval(updateClock, 1);
    displayTimeStamps(${JSON.stringify(timeStamps)});
  </script>
</body>
</html>`);
});

server.listen(8080, function() {
	console.log("Server started on port 8080");
});
