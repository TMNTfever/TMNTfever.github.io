/*
===============================================================================
File:      tagSong.js
Desc:      Applies desired tags for css styling. Converts .txt to .html.
Author:    JC Reyes
Called by: main/chords.html
Created:   2025-06-10
Modified:  2025-06-16
===============================================================================
*/

/*
===============================================================================
Program:   tagSong()
Desc:      Main function to tag chord sheet.
Called by: main/chords.html
Calls:     N/A
Arguments: fileName - The song file to be manipulated.
Comments:  N/A
-------------------------------------------------------------------------------
Date         Programmer    Change
2024-06-16   JC Reyes      Initial version
===============================================================================
*/

function tagSong(fileName) {
  var lineCount = 0;
  var divOpen = false;
  var detOpen = false;
  var chordLine = true;
  var taggedHtml = "";
  var closeTag = "";
  var char0 = "";
  var char1 = "";
  var temp = "";

  // Load .txt into div, and then into string variable
  $("#ukulele-chords").load(fileName);
  var allLines = document.getElementById("ukulele-chords").innerHTML;

  // Create an array of lines
  var lines = allLines.split("\n");

  // Add first-line tags
  lines[0] = "<div><div class=\"song-info\"><h2>" + lines[0] + "</h2>";

  // Tag the rest of the info section
  // Iterate through each line, until you hit a '[' after [CHORDS]
  for (i = 1; lines.length; i++) {
    temp = lines[i];
    char0 = temp.charAt(0);

    // Transcribed Key is found
    if (char0 === 'T') {
      lines[i] = temp.slice(0, 16) + "<k->" + temp.slice(16) + "</k->";
    } // [CHORDS] section is found
    else if (char0 === '[') {
      lines[i] = "<f->" + temp + "</f->";
      divOpen = true;
    } // End of [CHORDS] section is reached, next section started
    else if (char0 === '[' && divOpen) {
      lines[i - 1] += "</div>";
      lineCount = i;
      divOpen = false;
    }
  }

  // Iterate through the rest of the document
  for (i = lineCount; i < lineArr.length; i++) {
    temp = lines[i];
    char0 = temp.charAt(0);
    
    // Section found
    if (char0 === '[') {
      divOpen = true;
      char5 = temp.charAt(5);
      
      switch(char5) {
        case 'O': case 'E': case 'C': // [intrO] [outrO] [versE] or [pre-Chorus]
          lines[i] = "<s->" + temp;
          closeTag = "</s->";
          break;
        case 'U': case 'A': // [chorUs] or [refrAin]
          lines[i] = "<f->" + temp;
          closeTag = "</f->";
          break;
        case 'G': case 'R': // [bridGe] or [inteRlude]
          lines[i] = "<b->" + temp;
          closeTag = "</b->";
          break;
        default:
          console.log("Invalid section name.");
      }
      
      // Section has a description within parenthesis 
      if (temp.contains("(")) {
        var endBrackIndex = temp.indexOf(']');
        lines[i] = temp.slice(0, endBrackIndex) + closeTag + temp.slice(endBrackIndex);
      } // Section does not have a description
      else {
        lines[i] += closeTag;
      }
    } // -RIFF- found
    else if (char0 === '-') {
      lines[i] = "<s->" + temp + "</s->";
    } // End of section found
    else if (char0 === '[' && divOpen) {
      lines[i - 1] += "</div>";
      divOpen = false;
    } // EOF reached
    else if (i = lineArr.length - 1 && divOpen) {
      lines[i - 1] += "</div>";
      divOpen = false;
    } // Chord or Lyric line found
    else {
      if (chordLine) {
        lines[i] = "<c->" + temp + "</c->";
        chordLine = false;
      }
      else {
        lines[i] = "<l->" + temp + "</l->";
      }
    }
  }

  // Turn array into string
  for (i = lineCount; i < lineArr.length; i++) {
    taggedHtml += (lines[i] + "\n");
  }

  // When end of the document is reached, add closing </div>
  taggedHtml += "</div>\n";

  // Load taggedHtml to #ukulele-chords
  $("#ukulele-chords").load(taggedHtml);
}
