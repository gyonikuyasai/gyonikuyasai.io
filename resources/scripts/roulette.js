var roulette;
var idx;
var lunchSpotData = [];

// Make lunch table when this page loaded
window.onload = function() {
  makeLunchSpotTable();
} 

// Make lunch table from CSV
function makeLunchSpotTable() {
  var url = "https://gyonikuyasai.github.io/gyonikuyasai.io/resources/csv/lunchSpot.csv";
  var req = new XMLHttpRequest;
  req.open("get", url);
  req.send(null);
  req.onload = function() {
    lunchSpotData = convertCSVtoArray(req.responseText);
    makeTable(lunchSpotData, "lunchSpotTable");
  }
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
    document.getElementById("lunchSpot").innerHTML = lunchSpotData[idx][0];
  }
}

// Generate roulette with random value between from 1 to the length of `lunchSpotData`
function generateRoulette() {
  // Generate random value from 1 to (`lunchSpotData`.length - 1) (exclude heading row)
  idx = Math.floor( Math.random() * (lunchSpotData.length - 1)) + 1;
  // Generate roulette
  document.getElementById("roulette").innerHTML = idx;
}
