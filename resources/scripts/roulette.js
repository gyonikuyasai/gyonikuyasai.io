var roulette;
var idx;

var lunchSpot2 = [
  '昼食処一覧',
  '食堂',
  'Austin American Grill',
  'Five Guys',
  'Suehiro',
  'Star of India'
];

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
    this.lunchSpot = convertCSVtoArray(req.responseText);
    makeTable(this.lunchSpot, "lunchTable");
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
    cell.appendChild(document.createTextNode(data[i]));
    if (i == 0) {
      cell.style.backgroundColor = "#55acee";
      cell.style.color = "white";
    }
  }

  table.align = "center";
  document.getElementById(tableId).appendChild(table);
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
    document.getElementById("lunchSpot").innerHTML = lunchSpot[idx];
  }
}

// Generate roulette with random value between from 1 to the length of `lunchSpots`
function generateRoulette() {
  // Generate random value between from 1 to the length of `lunchSpots`
  idx = Math.floor( Math.random() * (lunchSpot.length-1) ) +1;
  
  // Generate roulette
  document.getElementById("roulette").innerHTML = idx;
}
