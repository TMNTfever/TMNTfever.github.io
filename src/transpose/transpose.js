/*
===============================================================================
File:      transpose.js
Desc:      Transposes a song's chords up or down in a Chords page.
Author:    JC Reyes
Called by: main/chords.html
Created:   2024-06-21
Modified:  2024-06-22
===============================================================================
*/
var chordMap = undefined; // Maps the original-key to the new-key
var chordMap2 = undefined; // Used for songs with key changes 

const majTable = [
  ["|1", ">1", "|2", ">2", "|3", "|4", ">4", "|5", ">5", "|6", ">6", "|7", "X", "x", "Riff"],
  ["A" , "A#", "B" , "C" , "C#", "D" , "D#", "E" , "F" , "F#", "G" , "G#", "X", "x", "R"],
  ["Bb", "B" , "C" , "Db", "D" , "Eb", "E" , "F" , "Gb", "G" , "Ab", "A" , "X", "x", "R"],
  ["B" , "C" , "C#", "D" , "D#", "E" , "F" , "F#", "G" , "G#", "A" , "A#", "X", "x", "R"], 
  ["C" , "C#", "D" , "D#", "E" , "F" , "F#", "G" , "G#", "A" , "A#", "B" , "X", "x", "R"],
  ["C#", "D" , "D#", "E" , "F" , "F#", "G" , "G#", "A" , "A#", "B" , "C" , "X", "x", "R"],
  ["D" , "D#", "E" , "F" , "F#", "G" , "G#", "A" , "A#", "B" , "C" , "C#", "X", "x", "R"],
  ["Eb", "E" , "F" , "Gb", "G" , "Ab", "A" , "Bb", "B" , "C" , "Db", "D" , "X", "x", "R"],
  ["E" , "F" , "F#", "G" , "G#", "A" , "A#", "B" , "C" , "C#", "D" , "D#", "X", "x", "R"],
  ["F" , "Gb", "G" , "Ab", "A" , "Bb", "B" , "C" , "Db", "D" , "Eb", "E" , "X", "x", "R"],
  ["F#", "G" , "G#", "A" , "A#", "B" , "C" , "C#", "D" , "D#", "E" , "F" , "X", "x", "R"],
  ["G" , "G#", "A" , "A#", "B" , "C" , "C#", "D" , "D#", "E" , "F" , "F#", "X", "x", "R"],
  ["Ab", "A" , "Bb", "B" , "C" , "Db", "D" , "Eb", "E" , "F" , "Gb", "G" , "X", "x", "R"]
];
const minTable = [
  ["|1", ">1", "|2", "|3", ">3", "|4", ">4", "|5", "|6", ">6", "|7", ">7", "X", "x", "Riff"],
  ["A" , "A#", "B" , "C" , "C#", "D" , "D#", "E" , "F" , "F#", "G" , "G#", "X", "x", "R"],
  ["Bb", "B" , "C" , "Db", "D" , "Eb", "E" , "F" , "Gb", "G" , "Ab", "A" , "X", "x", "R"],
  ["B" , "C" , "C#", "D" , "D#", "E" , "F" , "F#", "G" , "G#", "A" , "A#", "X", "x", "R"],
  ["C" , "Db", "D" , "Eb", "E" , "F" , "Gb", "G" , "Ab", "A" , "Bb", "B" , "X", "x", "R"],
  ["C#", "D" , "D#", "E" , "F" , "F#", "G" , "G#", "A" , "A#", "B" , "C" , "X", "x", "R"],
  ["D" , "Eb", "E" , "F" , "Gb", "G" , "Ab", "A" , "Bb", "B" , "C" , "Db", "X", "x", "R"],
  ["Eb", "E" , "F" , "Gb", "G" , "Ab", "A" , "Bb", "B" , "C" , "Db", "D" , "X", "x", "R"],
  ["E" , "F" , "F#", "G" , "G#", "A" , "A#", "B" , "C" , "C#", "D" , "D#", "X", "x", "R"],
  ["F" , "Gb", "G" , "Ab", "A" , "Bb", "B" , "C" , "Db", "D" , "Eb", "E" , "X", "x", "R"],
  ["F#", "G" , "G#", "A" , "A#", "B" , "C" , "C#", "D" , "D#", "E" , "F" , "X", "x", "R"],
  ["G" , "Ab", "A" , "Bb", "B" , "C" , "Db", "D" , "Eb", "E" , "F" , "Gb", "X", "x", "R"],
  ["G#", "A" , "A#", "B" , "C" , "C#", "D" , "D#", "E" , "F" , "F#", "G" , "X", "x", "R"]
];
/*
===============================================================================
Program:   transpose()
Desc:      Main function to transpose chords.
Called by: main/chords.html
Calls:     N/A
Arguments: isUp - Boolean value that says whether user wants to transpose the
                  song up or down.
Comments:  N/A
-------------------------------------------------------------------------------
Date         Programmer    Change
2024-06-21   JC Reyes      Initial version
2024-06-22   JC Reyes      Added functionality for songs with key changes,
                           songs that uses riffs on the chords line, and songs
                           songs have multiple (X) endings. Also added the
                           cleanLine() function.
===============================================================================
*/
function transpose(isUp) {
  // Determine the song's key, and whether it's major or minor
  var songKey = "";
  var chngKey = "";
  var isMaj = true;
  var isMaj2 = true;
  var keyTable;
  var keyRow = 0;
  var newRow = 0;
  var keyRow2 = 0;
  var newRow2 = 0;
  chordMap = new Map();

  // Retrieve the song's key through the <k-> tag
  try {
    songKey = document.getElementById("ukulele-chords").getElementsByTagName("k-")[0].innerHTML;
  } catch(error) {
    console.log("Chord chart does not contain the <k-> tag.");
    return;
  }
  
  // Determine if the song has a key change
  if(songKey.includes("to")) {
    hasKeyChange = true;
  } else {
    hasKeyChange = false;
  }
  
  // Assign songKey and chngKey (if required)
  var tSplit = songKey.split(" to "); // Temp var for split function
  
  // Check whether or not the song's key is minor or major
  if(songKey.includes("m")) { // Minor key found
    if(hasKeyChange) {
      songKey = tSplit[0];
      chngKey = tSplit[1];
      
      // Set isMaj and remove 'm' from songKey
      if(songKey.includes("m")) {
        isMaj = false;
        songKey = songKey.substring(0, songKey.length - 1);
      }
      
      // Set isMaj2 and remove 'm' from chngKey
      if(chngKey.includes("m")) {
        isMaj2 = false;
        chngKey = chngKey.substring(0, songKey.length - 1);
      }
    } else {
      songKey = songKey.substring(0, songKey.length - 1);
      isMaj = false;
    }
  } else { // Major key found
    isMaj = true;
    isMaj2 = true;
    
    if(hasKeyChange) {
      songKey = tSplit[0];
      chngKey = tSplit[1];
    }
  }

  // Assign keyTable to the major or minor table  
  if(isMaj) {
    keyTable = majTable;
  } else {
    keyTable = minTable;
  }
  
  // Determine which row the current key is on in keyTable
  for(x = 1; x < keyTable.length; x++) {
    if(keyTable[x][0] === songKey) keyRow = x;
    if(hasKeyChange && keyTable[x][0] === chngKey) keyRow2 = x;
  }
  
  // Key was invalid, could be a sharp/flat key that is unrepresented
  if(keyRow == 0) {
    console.log("Invalid Key: " + songKey);
    return;
  }

  // Determine transposition row, account for wrap-around
  if(isUp) {
    if(keyRow == 12) {
      newRow = 1;
    } else {
      newRow = keyRow + 1;
    }
  } else {
    if(keyRow == 1) {
      newRow = 12;
    } else {
      newRow = keyRow - 1;
    }
  }
  
  // Do the same for key change variables
  if(isUp && hasKeyChange) {
    if(keyRow2 == 12) {
      newRow2 = 1;
    } else {
      newRow2 = keyRow2 + 1;
    }
  } else {
    if(keyRow2 == 1) {
      newRow2 = 12;
    } else {
      newRow2 = keyRow2 - 1;
    }
  }

  // Populate chordMap with key = old note, and value = new note (in transposed key)
  chordMap = new Map();
  chordMap2 = new Map();

  for(x = 0; x < keyTable[keyRow].length; x++) {
    chordMap.set(keyTable[keyRow][x], keyTable[newRow][x]);
  }
  
  if(hasKeyChange) {
    for(x = 0; x < keyTable[keyRow2].length; x++) {
      chordMap2.set(keyTable[keyRow2][x], keyTable[newRow2][x]);
    }
  }

  // Retrieve HTMLCollection of <c-> tagged lines
  var chordLines = document.getElementById("ukulele-chords").getElementsByTagName("c-");
  var allTokens = new Array();
  var tLine = "";
  var tChar = "";
  var prevChar = "";
  var tSpace = "";
  var tChord = "";
  var tString = "";

  // Iterate through each line of chords to transpose tokens
  for(x = 0; x < chordLines.length; x++) {
    tLine = chordLines[x].innerHTML;
    tLine = cleanLine(tLine);
    if (tLine.includes("-->")) allTokens.push("-->"); // Account for comment closing bracket
console.log(tLine);
    allTokens.push("<c->");
    var y = 0;

    // Iterate through each character of the line
    while(y < tLine.length) {
      tChar = tLine.charAt(y);

      // Account for comment closing bracket, skip those characters
      while((tChar === "-") || (tChar === ">")) {
        y++;
        tChar = tLine.charAt(y);
      }

      if(isSpecial(tChar)) { // tChar is a special character
        if(!isSpecial(prevChar) && y > 0) {
          // Replace chord with transposed chord
          if(tChord.length == 1) { // Single major chord
            if(chordMap.has(tChord)) { // Chord is within the song's original key
              allTokens.push(chordMap.get(tChord));
            } else { // Might be part of the key change
              allTokens.push(chordMap2.get(tChord));
            }
          } else { // Chord contains a flat, sharp, and/or flavor
            // Check for flat or sharp
            if(tChord.charAt(1) === "b" || tChord.charAt(1) === "#") {
              tString = tChord.substr(0, 2);
                
              if(tChord.length == 2) { // No flavors
                if(chordMap.has(tString)) {
                  allTokens.push(chordMap.get(tString));
                } else {
                  allTokens.push(chordMap2.get(tString));
                }
              } else { // Flat/sharp with flavors
                if(chordMap.has(tString)) {
                  allTokens.push(chordMap.get(tString) + tChord.substring(2));
                } else {
                  allTokens.push(chordMap2.get(tString) + tChord.substring(2));
                }
              }
            } else { // No flat/sharp detected
              tString = tChord.substr(0, 1);
              
              if(chordMap.has(tString)) {
                allTokens.push(chordMap.get(tString) + tChord.substring(1));
              } else {
                allTokens.push(chordMap2.get(tString) + tChord.substring(1));
              }
            }
          }
          tChord = "";
        }
        tSpace += tChar;
      } else { // tChar is a chord
        if(isSpecial(prevChar) && y > 0) {
          allTokens.push(tSpace);
          tSpace = "";
        }
        tChord += tChar;
      }

      // Accounts for the last token in a line
      if(y === tLine.length - 1) {
        if(tChord !== "") { // Token is a chord
          if(tChord.length == 1) { // Single major chord
            if(chordMap.has(tChord)) {
              allTokens.push(chordMap.get(tChord));
            } else {
              allTokens.push(chordMap2.get(tChord));
            }
          } else { // Chord contains a flat, sharp, and/or flavor
            // Check for flat or sharp
            if(tChord.charAt(1) === "b" || tChord.charAt(1) === "#") {
              tString = tChord.substr(0, 2);
              
              if(tChord.length == 2) { // No flavors
                if(chordMap.has(tString)) {
                  allTokens.push(chordMap.get(tString));
                } else {
                  allTokens.push(chordMap2.get(tString));
                }
              } else { // Flat/sharp with flavors
                if(chordMap.has(tString)) {
                  allTokens.push(chordMap.get(tString) + tChord.substring(2));
                } else {
                  allTokens.push(chordMap2.get(tString) + tChord.substring(2));
                }
              }
            } else { // No flat/sharp detected
              tString = tChord.substr(0, 1);
              
              if(chordMap.has(tString)) {
                allTokens.push(chordMap.get(tString) + tChord.substring(1));
              } else {
                allTokens.push(chordMap2.get(tString) + tChord.substring(1));
              }
            }
          }
          tChord = "";
        } else if(tSpace !== "") { // Token is a special character, reached closing tag
          allTokens.push(tSpace);
          tSpace = "";
        }
      }
  
      prevChar = tChar;
      y++;
    }

    allTokens.push("</c->");
  }

  // Replace <c-> lines in ukulele-chords
  var wholeFile = document.getElementById("ukulele-chords").innerHTML;
  var allLines = wholeFile.split(/\r?\n|\r|\n/g);
  var tLine = "";
  var tokenIndex = 0;
  var newFile = "";

  // Iterate through every line in ukulele-chords to find which lines to replace
  for(x = 0; x < allLines.length; x++) {
    if(allLines[x].length > 1) {
      if(allLines[x].includes("<c->")) {
        do {
          tLine += allTokens[tokenIndex];
          tokenIndex++;
        } while(allTokens[tokenIndex] !== "</c->");
console.log(tLine);
        // Write to newFile to replace ukulele-chords
        newFile += tLine + "</c->";
        tokenIndex++;
        tLine = "";
      } else if(allLines[x].includes("<k->")) {
        // Rewrite line with the key accounting for key changes and minor keys
        if(hasKeyChange) {
          newFile = newFile + "Transcribed Key: <k->" + chordMap.get(songKey);
          if(!isMaj) newFile += "m";
          newFile = newFile + " to " + chordMap2.get(chngKey);
          if(!isMaj2) newFile += "m";
        } else {
          newFile = newFile + "Transcribed Key: <k->" + chordMap.get(songKey);
          if(!isMaj) newFile += "m";
        }
        newFile += "</k->";
      } else if(allLines[x].includes("<f->")) {
        // Chord fingerings become obsolete after tranposing, so write message
        newFile = newFile + allLines[x] + "\n  Chords section is deleted when transposing." + "\n  Refresh page for original chord fingering.";
      } else if(allLines[x].substr(0,2) === "  "){
        // Chord fingerings become obsolete, so this section is deleted
        newFile = newFile.trim()
      } else {
        newFile += allLines[x];
      }
    }

    // Add a newline character between each line, but prevent excess newlines at EOF
    if(x != allLines.length - 1) newFile += "\n";
  }

  // Replace ukulele-chords with newFile
  document.getElementById("ukulele-chords").innerHTML = newFile;
}

/*
===============================================================================
Program:   isSpecial()
Desc:      Determines if a character is a space, hyphen, pipe, greater-than,
           parenthesis, or a number.
Called by: transpose()
Calls:     N/A
Arguments: char - the character that is being checked
Comments:  N/A
-------------------------------------------------------------------------------
Date         Programmer    Change
2024-06-20   JC reyes      Initial version
===============================================================================
*/
function isSpecial(chara) {
  switch(chara){
    case " ": case "-": case "|": case ">": case "(": case ")": case ":": case "!":
      return true;
    default:
      return false;
  }
}

/*
===============================================================================
Program:   cleanLine()
Desc:      Looks for uncommon note names, like E# or Cb, and replaces them with
           the more common names, F and B, respectively. Also looks for HTML
           placehodler IDs for special characters and replaces them too.
Called by: transpose()
Calls:     N/A
Arguments: line - String which is a line of chords
Comments:  N/A
-------------------------------------------------------------------------------
Date         Programmer    Change
2024-06-22   JC reyes      Initial version
===============================================================================
*/
function cleanLine(line) {
  line = line.replaceAll("&gt;", ">"); // Get rid of HTML placeholder for '>'
  line = line.replaceAll("E#", "F");
  line = line.replaceAll("Fb", "E");
  line = line.replaceAll("B#", "C");
  line = line.replaceAll("Cb", "B");
  return line;
}
