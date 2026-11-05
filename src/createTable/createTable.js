/*
===============================================================================
File:      createTable.js
Desc:      Generates an HTML table from csv.
Author:    JC Reyes
Called by: main/ukulele.html, main/setlist.html, main/pw.html
Created:   2025-06-26
Modified:  2026-11-05
===============================================================================
*/

/*
===============================================================================
Program:   createTable()
Desc:      Main function to generate table.
Called by: main/ukulele.html, main/setlist.html
Calls:     N/A
Arguments: divId     The ID of the div to read from and write to.
           tableId   The ID of the table for styling.
           numbered  Whether or not the table should be numbered.
Comments:  N/A
-------------------------------------------------------------------------------
Date        Programmer  Change
2025-06-26  JC Reyes    Initial version.
2025-06-27  JC Reyes    Made the function abstract and added arguments so that
                        it can generate different tables.
2026-11-06  JC Reyes    Added argument 'basic', which populates the entire
                        table, not ignoring columns, and without hyperlinks.
===============================================================================
*/
function createTable(divId, tableId, numbered, basic) {
  var finalHtml = "";
  var iStart = basic ? 0 : 1;
  
  // Load textContent into string variable
  let element = document.getElementById(divId);
  let allText = element.textContent;

  // Create an array of lines
  var rows = allText.split("\n");

  // Create table opening tags and header
  finalHtml += "<table id=\"" + tableId + "\" class=\"sortTable\"><thead><tr>";
  var cols = rows[0].split("\t");
  if (numbered) finalHtml += "<th>#</th>";

  // Iterate through column headers, skip column 0 if not a basic table
  for (i = iStart; i < cols.length; i++) {
    finalHtml += ("<th>" + cols[i] + "</th>");
  }

  finalHtml += "</tr></thead><tbody>";

  // Create the body of the table, iterate through rows
  for (i = 1; i < rows.length; i++) {
    if (rows[i] !== "") {
      cols = rows[i].split("\t");
      finalHtml += "<tr>";
      if (numbered) finalHtml += "<td>" + i + "</td>";
  
      // Iterate through columns, skip column 0 if not a basic table
      for (j = iStart; j < cols.length; j++) {      
        // First element has a hyperlink
        if (j === 1 && !basic) {
          // External link provided for chord sheet
          if (cols[0].includes("http")) {
            finalHtml += "<td><a href=\"" + cols[0] + "\">" + cols[j] + "</a></td>";
          } // Internal link provided
          else {
            finalHtml += "<td><a href=\"chords.html?" + cols[0] + "\">" + cols[j] + "</a></td>";
          }
        } // Every other row is regular text
        else {
          finalHtml += "<td>" + cols[j] + "</td>";
        }
      }
  
      finalHtml += "</tr>";
    }
  }

  // Add closing tags
  finalHtml += "</tbody></table>";

  // Load HTML into div
  $("#" + divId).html(finalHtml);
}


