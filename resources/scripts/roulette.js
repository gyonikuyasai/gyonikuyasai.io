// Variable definition and initialization
var roulette;
var idx;
var lunchSpotData = [];

var csvURL = "https://gyonikuyasai.github.io/gyonikuyasai.io/resources/csv/lunchSpot.csv";
var lunchSpotTableId = "lunchSpotTable";
var lunchSpotId = "lunchSpot";
var rouletteId = "roulette";
var welcomeMessage = "本日の昼食は?";

// Render lunch spot table when the page loaded
window.onload = function() {
  renderLunchSpotTable();
} 

// Render lunch spot table from CSV
function renderLunchSpotTable() {
  var req = new XMLHttpRequest;
  req.open("get", csvURL);
  req.send(null);
  req.onload = function() {
    lunchSpotData = convertCSVtoArray(req.responseText);
    renderTable(lunchSpotData, lunchSpotTableId);
  }
}

// Start roulette
function start() {
  roulette = setInterval(renderRoulette, 100);
  // Reset `lunchSpot`
  document.getElementById(lunchSpotId).innerHTML = welcomeMessage;
}

// Stop roulette
function stop() {
  if(roulette) {
    clearInterval(roulette);
    // Render `lunchSpot`
    var elm = document.getElementById(lunchSpotId);
    var node = createLinkOrTextNodeFromRow(lunchSpotData[idx]);
    elm.innerHTML = "";
    elm.appendChild(node);
  }
}

// Render roulette with random value
function renderRoulette() {
  // Generate random value from 1 to (`lunchSpotData`.length - 1)
  //   Exclude the value 0 (row:0 is heading)
  idx = Math.floor( Math.random() * (lunchSpotData.length - 1)) + 1;
  // Render roulette
  document.getElementById(rouletteId).innerHTML = idx;
}
