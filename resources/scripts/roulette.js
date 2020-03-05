// Variable definition
var roulette;
var idx;
var lunchSpotData = [];
var csvURL = "https://gyonikuyasai.github.io/gyonikuyasai.io/resources/csv/lunchSpot.csv";

// Render lunch spot table when this page loaded
window.onload = function() {
  renderLunchSpotTable();
} 

// Render lunch spot table from CSV
function renderLunchSpotTable() {
  var url = csvURL;
  var req = new XMLHttpRequest;
  req.open("get", url);
  req.send(null);
  req.onload = function() {
    lunchSpotData = convertCSVtoArray(req.responseText);
    renderTable(lunchSpotData, "lunchSpotTable");
  }
}

// Start roulette
function start() {
  roulette = setInterval(renderRoulette, 100);
  // Reset `lunchSpot`
  document.getElementById("lunchSpot").innerHTML = "本日の昼食は?";
}

// Stop roulette
function stop() {
  if(roulette) {
    clearInterval(roulette);
    // Render `lunchSpot`
    document.getElementById("lunchSpot").innerHTML = lunchSpotData[idx][0];
  }
}

// Render roulette with random value
function renderRoulette() {
  // Generate random value from 1 to (`lunchSpotData`.length - 1)
  //   Exclude the value 0 (row:0 is heading)
  idx = Math.floor( Math.random() * (lunchSpotData.length - 1)) + 1;
  // Render roulette
  document.getElementById("roulette").innerHTML = idx;
}
