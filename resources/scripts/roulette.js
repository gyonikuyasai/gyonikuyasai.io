var roulette;
var idx;

// Lunch spot is read from csv
var lunchSpot = [];

// Make lunch table
window.onload = function() {
  this.makeLunchTable();
} 

function makeLunchTable(){
  var req = new XMLHttpRequest;
  req.open("get", "https://gyonikuyasai.github.io/gyonikuyasai.io/resources/csv/lunchSpot.csv");
  req.send(null);
  req.onload = function() {
    lunchSpot = convertCSVtoArray(req.responseText);
    makeTable(lunchSpot, "lunchTable");
  }
}

function convertCSVtoArray(str){
  var result = [];
  var tmp = str.split("\n");
  for(var i = 0; i < tmp.length; i++) {
    result[i] = tmp[i].split(',');
  }
  return result;
}

// Make table whose id `tableId` from `data`
function makeTable(data, tableId) {
  var table = document.createElement("table");
  var rows = [];

  for (var i = 0; i < data.length; i++) {
    rows.push(table.insertRow(-1));
    cell = rows[i].insertCell(-1);
    if (i == 0) {
      cell.style.backgroundColor = "#55acee";
      cell.style.color = "white";
      cell.appendChild(document.createTextNode(data[i][0]));
    } else {
      var anchor = createLink(data[i]);
      cell.appendChild(anchor);
    }
  }

  table.align = "center";
  document.getElementById(tableId).appendChild(table);
}

function createLink(row) {
  var anchor = document.createElement('a');
  anchor.textContent = row[0];
  anchor.innerText = row[0];
  anchor.href = row[1];
  return anchor;
}

// Start roulette
function start() {
  roulette = setInterval(generateRoulette, 100);
  // Reset `lunchSpot`
  document.getElementById("lunchSpot").innerHTML = "本日の昼食は?";
}

// Stop roulette
function stop() {
  if(roulette) {
    clearInterval(roulette);
    // Generate `lunchSpot`
    document.getElementById("lunchSpot").innerHTML = lunchSpot[idx][0];
  }
}

// Generate roulette with random value between from 1 to the length of `lunchSpot`
function generateRoulette() {
  // Generate random value from 1 to `lunchSpot.length - 2`(exclude top and last blank row)
  idx = Math.floor( Math.random() * (lunchSpot.length - 2)) + 1;
  
  // Generate roulette
  document.getElementById("roulette").innerHTML = idx;
}
