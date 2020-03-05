// Variable definition and initialization
var ROW_HEADING = 0;
var COL_NUMBER = 0;
var COL_TEXT = 1;
var COL_URL = 2;
var HEADING_BG_COLOR = "#99CCFF";
var HEADING_COLOR = "white";
var TABLE_STYLE_BORDER = "thin groove gray";
var CELL_STYLE_BORDER = "thin groove gray";
var TABLE_CELL_SPACING = "2px";
var TABLE_CELL_PADDING = "2px";

// Render HTML table from 2D Array `data` to the element whose ID is `tableId`
function renderTable(data, tableId) {
  var table = document.createElement("table");
  var rows = [];
  var text;
  var url;
  
  // Loop for row of `data`
  for (var i = 0; i < data.length; i++) {
    rows.push(table.insertRow(-1));
    number = data[i][COL_NUMBER];
    text = data[i][COL_TEXT];
    url = data[i][COL_URL];
    
    // Append number to the cell
    cell = rows[i].insertCell(-1);
    cell.appendChild(document.createTextNode(number));
    cell.align = "center"
    cell.style.border = CELL_STYLE_BORDER;
    if (i == ROW_HEADING) {
      // Change the color of the cell of heading
      cell.style.backgroundColor = HEADING_BG_COLOR;
      cell.style.color = HEADING_COLOR;
    }
  
    // Append link or text to the cell
    cell = rows[i].insertCell(-1);
    if (i == ROW_HEADING) {
      // Change the color of the cell of heading
      cell.style.backgroundColor = HEADING_BG_COLOR;
      cell.style.color = HEADING_COLOR;
      // Append text to the cell
      cell.appendChild(document.createTextNode(text));
    } else {
      // Append link or text node to the cell
      cell.appendChild(createLinkOrTextNode(text,url));
    }
    cell.align = "left";
    cell.style.border = CELL_STYLE_BORDER;
  }
  table.cellSpacing = TABLE_CELL_SPACING;
  table.cellPadding = TABLE_CELL_PADDING;
  table.align = "center";
  table.style.border = TABLE_STYLE_BORDER;
  document.getElementById(tableId).appendChild(table);
}

// Convert CSV to 2D array then return the 2D array
//  - `str`: responseText of XMLHttpRequest to the URL of CSV
function convertCSVtoArray(str){
  var result = [];
  var row = str.split("\r\n");
  for(var i = 0; i < row.length; i++) {
    // Skip blank row
    if(!row[i]){
      continue;
    }
    result[i] = row[i].split(',');
  }
  return result;
}

// Return `a` tag element if `url` is not null
//  else return text node element
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