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
function tagSong() {
  var lineCount = 0;
  var divOpen = false;
  var detOpen = false;
  var chordLine = true;
  var taggedHtml = "";
  var openTag = "";
  var closeTag = "";
  var char0 = "";
  var char1 = "";
  var temp = "";

  // Load textContent into string variable
  let element = document.getElementById("ukulele-chords");
  let allText = element.textContent;

  // Create an array of lines
  var lines = allText.split("\n");

  // Add first-line tags
  lines[0] = "<div><div class=\"song-info\"><h2>" + lines[0] + "</h2>";

  // Tag the rest of the info section
  // Iterate through each line, until you hit a '[' after [CHORDS]
  for (i = 1; i < lines.length; i++) {
    temp = lines[i] || "";
    char0 = temp.charAt(0);

    // Transcribed Key is found
    if (char0 === 'T') {
      lines[i] = temp.slice(0, 17) + "<k->" + temp.slice(17) + "</k->";
    } // [CHORDS] section is found
    else if (char0 === '[' && !divOpen) {
      lines[i] = "<f->" + temp + "</f->";
      divOpen = true;
    } // End of [CHORDS] section is reached, next section started
    else if ((char0 === '[' || char0 === '-') && divOpen) {
      lines[i - 1] += "</div>";
      lineCount = i;
      divOpen = false;
      break;
    }
  }

  // Iterate through the rest of the document
  for (i = lineCount; i < lines.length; i++) {
    temp = lines[i] || "";
    char0 = temp.charAt(0);
    
    // Section found
    if (char0 === '[') {
      chordLine = true;
      char5 = temp.charAt(5);
      
      // Details tag is open
      if (detOpen){
        lines[i - 1] += "</details>";
        detOpen = false;
      }
      
      // Div for "focus" is open
      if (divOpen){
        lines[i - 1] += "</div>";
        divOpen = false;
      }
      
      switch(char5) {
        case 'O': case 'E': case 'C': // [intrO] [outrO] [versE] or [pre-Chorus]
          openTag = "<s->";
          closeTag = "</s->";
          break;
        case 'U': case 'A': // [chorUs] or [refrAin]
          divOpen = true;
          openTag = "<div class=\"focus\"><r->";
          closeTag = "</r->";
          break;
        case 'G': case 'R': // [bridGe] or [inteRlude]
          openTag = "<b->";
          closeTag = "</b->";
          break;
        default:
          console.log("Invalid section name.");
      }
      
      // Section has a description within parenthesis, or a repeat
      if (temp.includes('(') || temp.includes('x')) {
        var endBrackIndex = temp.indexOf(']') + 1;
        
        if (temp.includes("Same")) {
          lines[i] = openTag.slice(0, 19) + "<details><summary>" + openTag.slice(19) + temp.slice(0, endBrackIndex) + closeTag + temp.slice(endBrackIndex) + "</summary>";
          detOpen = true;
        }
        else {
          lines[i] = openTag + temp.slice(0, endBrackIndex) + closeTag + temp.slice(endBrackIndex);
        }
      } // Section does not have a description
      else {
        lines[i] = openTag + temp + closeTag;
      }
    } // -RIFF- found
    else if (char0 === '-') {
      lines[i] = "<s->" + temp + "</s->";
    } // EOF reached
    else if (i == lines.length - 1 && divOpen) {
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
        chordLine = true;
      }
    }
  }

  // Turn array into string
  for (i = 0; i < lines.length; i++) {
    taggedHtml += (lines[i] + "\n");
  }

  // When end of the document is reached, add closing </div>
  taggedHtml += "</div>\n";

  // Load taggedHtml to #ukulele-chords
  $("#ukulele-chords").html(taggedHtml);
}
