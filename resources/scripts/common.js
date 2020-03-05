// Make HTML Table From 2D Array `data` to the Element whose ID is `tableId`
// `data` assume the following 2D array:
//  - row    0: heading
//  - column 0: label
//  - column 1: url
function makeTable(data, tableId) {
  var table = document.createElement("table");
  var rows = [];
  // Loop for rows of data
  for (var i = 0; i < data.length; i++) {
    rows.push(table.insertRow(-1));
    cell = rows[i].insertCell(-1);
    // First row is heading
    if (i == 0) {
      // Change the color of the cell for heading
      cell.style.backgroundColor = "#55acee";
      cell.style.color = "white";
      // Append label to the cell using label in column 0
      cell.appendChild(document.createTextNode(data[i][0]));
    } else {
      // Append link to the cell
      var anchor = createLink(data[i]);
      cell.appendChild(anchor);
    }
  }
  table.align = "center";
  document.getElementById(tableId).appendChild(table);
}

// Convert CSV to 2D array then return the 2D array
//  - str: responseText of XMLHttpRequest to the URL of CSV
function convertCSVtoArray(str){
  var result = [];
  var tmp = str.split("\n");
  for(var i = 0; i < tmp.length; i++) {
    result[i] = tmp[i].split(',');
  }
  return result;
}

// Create `a` tag element
// `row` assume the following 1D array:
//  - row 0: label
//  - row 1: url
function createLink(row) {
  var anchor = document.createElement('a');
  anchor.textContent = row[0];
  anchor.innerText = row[0];
  anchor.href = row[1];
  return anchor;
}