// Variable definition and initialization
var ROW_HEADING = 0;
var COL_NUMBER = 0;
var COL_TEXT = 1;
var COL_URL = 2;

// Render HTML table from 2D Array `data` to the element whose ID is `tableId`
function renderTable(data, tableId) {
  var table = document.createElement("table");
  var rows = [];
  var text;
  var url;
  // Loop for row of `data`
  for (var i = 0; i < data.length; i++) {
    rows.push(table.insertRow(-1));
    cell = rows[i].insertCell(-1);
    number = data[i][COL_NUMBER];
    text = data[i][COL_TEXT];
    url = data[i][COL_URL];
    // For heading row
    if (i == ROW_HEADING) {
      // Change the color of the cell of heading
      cell.style.backgroundColor = "#55acee";
      cell.style.color = "white";
      // Append text to the cell
      cell.appendChild(document.createTextNode(text));
    } else {
      // Append link or text node to the cell
      cell.appendChild(createLinkOrTextNode(text,url));
    }
    cell.align = "left";
  }
  table.align = "center";
  document.getElementById(tableId).appendChild(table);
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

function createLinkOrTextNodeFromRow (row) {
  text = row[COL_TEXT];
  url = row[COL_URL];
  return createLinkOrTextNode(text, url);
}

// Return `a` tag element if `url` is not null
//  else return text node element
function createLinkOrTextNode(text, url) {
  if (url) {
    return createLink(text, url)
  } else {
    return document.createTextNode(text);
  }
}

// Create `a` tag element then return it
function createLink(text, url) {
  var anchor = document.createElement('a');
  anchor.textContent = text;
  anchor.innerText = text;
  anchor.href = url;
  anchor.target = "_blank";
  return anchor;
}