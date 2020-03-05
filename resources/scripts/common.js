// Create `a` tag element then return it
function createLink(text, url) {
  var anchor = document.createElement('a');
  anchor.textContent = text;
  anchor.innerText = text;
  anchor.href = url;
  anchor.target = "_blank";
  return anchor;
}

// Convert CSV to 2D array then return the 2D array
//  - `str`: responseText of XMLHttpRequest to the URL of CSV
function convertCSVtoArray(str){
  var result = [];
  var tmp = str.split("\r\n");
  for(var i = 0; i < tmp.length; i++) {
    result[i] = tmp[i].split(',');
  }
  return result;
}

// Render HTML table from 2D Array `data` to the element whose ID is `tableId`
//   `data` assume the following 2D array:
//     - row    0: heading
//     - column 0: text
//     - column 1: url
function renderTable(data, tableId) {
  var table = document.createElement("table");
  var rows = [];
  var text;
  var url;
  // Loop for row of `data`
  for (var i = 0; i < data.length; i++) {
    rows.push(table.insertRow(-1));
    cell = rows[i].insertCell(-1);
    text = data[i][0];
    url = data[i][1];
    // row 0 is heading
    if (i == 0) {
      // Change the color of the cell of heading
      cell.style.backgroundColor = "#55acee";
      cell.style.color = "white";
      // Append text to the cell
      cell.appendChild(document.createTextNode(text));
    } else {
      if (!url) {
        // Append text to the cell
        cell.appendChild(document.createTextNode(text));
      } else {
        // Append link to the cell
        var anchor = createLink(text, url);
        cell.appendChild(anchor);
      }
    }
    cell.align = "left";
  }
  table.align = "center";
  document.getElementById(tableId).appendChild(table);
}