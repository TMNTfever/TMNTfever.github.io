/*
===============================================================================
File:      createUkuleleTable.js
Desc:      Generates an HTML table from csv.
Author:    JC Reyes
Called by: main/ukulele.html
Created:   2025-06-26
Modified:  -
===============================================================================
*/

/*
===============================================================================
Program:   createUkuleleTable()
Desc:      Main function to generate table.
Called by: main/ukulele.html
Calls:     N/A
Arguments: N/A
Comments:  N/A
-------------------------------------------------------------------------------
Date        Programmer  Change
2025-06-26  JC Reyes    Initial version.
===============================================================================
*/
function createUkuleleTable() {
  var finalHtml = "";
  
  // Load textContent into string variable
  let element = document.getElementById("ukulele-div");
  let allText = element.textContent;

  // Create an array of lines
  var rows = allText.split("\n");

  // Create table opening tags and header
  finalHtml += "<table id=\"ukulele-table\" class=\"sortTable\"><thead><tr>";
  var cols = rows[1].split("|");

  // Iterate through columns, skip column 0
  for (i = 1; i < cols.length; i++) {
    finalHtml += ("<th>" + cols[i] + "</th>");
  }

  finalHtml += "</tr></thead><tbody>";

  // Create the body of the table, iterate through rows
  for (i = 1; i < rows.length; i++) {
    cols = rows[i].split("|");
    finalHtml += "<tr>";

    // Iterate through columns, skip column 0
    for (j = 1; j < cols.length; j++) {
      // First element has a hyperlink
      if (j === 1) {
        finalHtml += "<td><a href=\"chords.html?" + cols[0] + "\">" + cols[j] + "</td>";
      } // Every other row is regular text
      else {
        finalHtml += "<td>" + cols[j] + "</td>";
      }
    }

    finalHtml += "</tr>";
  }

  // Add closing tags
  finalHtml += "</tbody></table>";

  // Load HTML into div
  $("#ukulele-div").html(finalHtml);
}
