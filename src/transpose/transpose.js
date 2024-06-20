/*
============================================================================
File:      transpose.js
Desc:      Transposes a song's chords up or down in a Chords page.
Called by: main/chords.html
Comments:  N/A
---------------------------------------------------------------------------
Date         Programmer    Change
2024-06-17   JC Reyes      Written
============================================================================
*/
var chordMap = undefined; // Maps the original-key to the new-key

const majTable = [
  ["|1", ">1", "|2", ">2", "|3", "|4", ">4", "|5", ">5", "|6", ">6", "|7"],
  ["A" , "A#", "B" , "C" , "C#", "D" , "D#", "E" , "F" , "F#", "G" , "G#"],
  ["Bb", "B" , "C" , "Db", "D" , "Eb", "E" , "F" , "Gb", "G" , "Ab", "A" ],
  ["B" , "C" , "C#", "D" , "D#", "E" , "F" , "F#", "G" , "G#", "A" , "A#"], 
  ["C" , "C#", "D" , "D#", "E" , "F" , "F#", "G" , "G#", "A" , "A#", "B" ],
  ["C#", "D" , "D#", "E" , "F" , "F#", "G" , "G#", "A" , "A#", "B" , "C" ],
  ["D" , "D#", "E" , "F" , "F#", "G" , "G#", "A" , "A#", "B" , "C" , "C#"],
  ["Eb", "E" , "F" , "Gb", "G" , "Ab", "A" , "Bb", "B" , "C" , "Db", "D" ],
  ["E" , "F" , "F#", "G" , "G#", "A" , "A#", "B" , "C" , "C#", "D" , "D#"],
  ["F" , "Gb", "G" , "Ab", "A" , "Bb", "B" , "C" , "Db", "D" , "Eb", "E" ],
  ["F#", "G" , "G#", "A" , "A#", "B" , "C" , "C#", "D" , "D#", "E" , "F" ],
  ["G" , "G#", "A" , "A#", "B" , "C" , "C#", "D" , "D#", "E" , "F" , "F#"],
  ["Ab", "A" , "Bb", "B" , "C" , "Db", "D" , "Eb", "E" , "F" , "Gb", "G" ]
];
const minTable = [
  ["|1", ">1", "|2", "|3", ">3", "|4", ">4", "|5", "|6", ">6", "|7", ">7"],
  ["A" , "A#", "B" , "C" , "C#", "D" , "D#", "E" , "F" , "F#", "G" , "G#"],
  ["Bb", "B" , "C" , "Db", "D" , "Eb", "E" , "F" , "Gb", "G" , "Ab", "A" ],
  ["B" , "C" , "C#", "D" , "D#", "E" , "F" , "F#", "G" , "G#", "A" , "A#"],
  ["C" , "Db", "D" , "Eb", "E" , "F" , "Gb", "G" , "Ab", "A" , "Bb", "B" ],
  ["C#", "D" , "D#", "E" , "F" , "F#", "G" , "G#", "A" , "A#", "B" , "C" ],
  ["D" , "Eb", "E" , "F" , "Gb", "G" , "Ab", "A" , "Bb", "B" , "C" , "Db"],
  ["Eb", "E" , "F" , "Gb", "G" , "Ab", "A" , "Bb", "B" , "C" , "Db", "D" ],
  ["E" , "F" , "F#", "G" , "G#", "A" , "A#", "B" , "C" , "C#", "D" , "D#"],
  ["F" , "Gb", "G" , "Ab", "A" , "Bb", "B" , "C" , "Db", "D" , "Eb", "E" ],
  ["F#", "G" , "G#", "A" , "A#", "B" , "C" , "C#", "D" , "D#", "E" , "F" ],
  ["G" , "Ab", "A" , "Bb", "B" , "C" , "Db", "D" , "Eb", "E" , "F" , "Gb"],
  ["G#", "A" , "A#", "B" , "C" , "C#", "D" , "D#", "E" , "F" , "F#", "G" ]
];
/*
============================================================================
Program:   transpose()
Desc:      Main function to transpose chords.
Called by: main/chords.html
Calls:     N/A
Arguments: isUp - Boolean value that says whether user wants to transpose
                  up or down.
Comments:  N/A
---------------------------------------------------------------------------
Date         Programmer    Change
2024-06-17   JC Reyes      Written
============================================================================
*/
function transpose(isUp) {
  // Determine the song's key, and whether it's major or minor
  var songKey;
  var isMaj;
  var keyTable;
  var keyRow = 0;
  var newRow = 0;
  chordMap = new Map();

  try {
    songKey = document.getElementById("ukulele-chords").getElementsByTagName("k-")[0].innerHTML;
  } catch {
    console.log("Chord chart does not contain the <k-> tag.");
    return;
  }
  
  if(songKey.includes("m")) {
    isMaj = false;
    songKey = songKey.substring(0, str.length - 1);
  } else {
    isMaj = true;
  }
  
  // Assign keyTable to the major or minor table  
  if(isMaj) {
    keyTable = majTable;
  } else {
    keyTable = minTable;
  }
  
  // Determine which row the current key is on in keyTable
  for(x = 1; x < keyTable.length; x++) {
    if(keyTable[x][0] === songKey) {
      keyRow = x;
    }
  }
  
  // Key was invalid, could be a sharp/flat key that is unrepresented ****DO SOMETHING ABOUT IT???****
  if(keyRow == 0) {
    console.log("Invalid Key: " + songKey);
    return;
  }

  // Populate chordMap with key = old note, and value = new note (in transposed key)
  if(isUp) {
    if(keyRow == 13) {
      newRow = 1;
    } else {
      newRow = keyRow + 1;
    }
  } else {
    if(keyRow == 1) {
      newRow = 13;
    } else {
      newRow = keyRow - 1;
    }
  }

  chordMap = new Map();

  for(x = 0; x < keyTable[keyRow].length; x++) {
    chordMap.set(keyTable[keyRow][x], keyTable[newRow][x]);
  }
  
  // Retrieve HTMLCollection of <c-> tagged lines
  var chordLines = document.getElementById("ukulele-chords").getElementsByTagName("c-");
  var allTokens = new Array();
  var tLine = "";
  var tChar = "";
  var prevChar = "";
  var tSpace = "";
  var tChord = "";

  // Iterate through each line of chords
  for(x = 0; x < chordLines.length; x++) {
    tLine = chordLines[x].innerHTML;
    allTokens.push("<c->");
    y = 0;

    // Iterate through each character of the line
    while(y < tLine.length) {
      tChar = tLine.charAt(y);
      
      if(isSpecial(tChar)) { // tChar is a special character
        if(!isSpecial(prevChar) && y > 0) {
          // Replace chord with transposed chord
          if(tChord.length == 1) { // Single major chord
            allTokens.push(chordMap.get(tChord));
          } else { // Chord contains a flat, sharp, and/or flavor
            // Check for flat or sharp
            if(tChord.charAt(1) === "b" || tChord.charAt(1) === "#") {
              if(tChord.length == 2) { // No flavors
                allTokens.push(chordMap.get(tChord.substr(0, 2)));
              } else { // Flat/sharp with flavors
                allTokens.push(chordMap.get(tChord.substr(0, 2)) + tChord.substring(2));
              }
            } else { // No flat/sharp detected
              allTokens.push(chordMap.get(tChord.substr(0, 1)) + tChord.substring(1));
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

      // Accounts for the last chord in a line
      if(y === tLine.length - 1 && tChord !== "") {
        if(tChord.length == 1) { // Single major chord
            allTokens.push(chordMap.get(tChord));
          } else { // Chord contains a flat, sharp, and/or flavor
            // Check for flat or sharp
            if(tChord.charAt(1) === "b" || tChord.charAt(1) === "#") {
              if(tChord.length == 2) { // No flavors
                allTokens.push(chordMap.get(tChord.substr(0, 2)));
              } else { // Flat/sharp with flavors
                allTokens.push(chordMap.get(tChord.substr(0, 2)) + tChord.substring(2));
              }
            } else { // No flat/sharp detected
              allTokens.push(chordMap.get(tChord.substr(0, 1)) + tChord.substring(1));
            }
          }
        tChord = "";
      }
  
      prevChar = tChar;
      y++;
    }

    allTokens.push("</c->");
  }
console.log(allTokens.toString());
  
  // Replace <c-> lines in ukulele-chords
  var wholeFile = document.getElementById("ukulele-chords").innerHTML;
  var allLines = wholeFile.split(/\r?\n|\r|\n/g);
  var tLine = "";
  var tokenIndex = 0;
  var newFile = "";

  for(x = 0; x < allLines.length; x++) {
    if(allLines[x].length > 1) {
      if(allLines[x].includes("<c->")) {
        do {
          tLine += allTokens[tokenIndex];
          tokenIndex++;
        } while(allTokens[tokenIndex] !== "</c->");

        // Write to newFile to replace ukulele-chords
        newFile += tLine + "</c->";
        tokenIndex++;
        tLine = "";
      } else {
        newFile += allLines[x];
      }
    }
    newFile += "\n";
  }
console.log(newFile)
  // Replace ukulele-chords with newFile
  document.getElementById("ukulele-chords").innerHTML = newFile;
}

/*
============================================================================
Program:   isSpecial()
Desc:      Determines if a character is a space, hyphen, pipe, greater-than,
           or parenthesis.
Called by: transpose()
Calls:     N/A
Arguments: char - the character that is being checked
Comments:  N/A
---------------------------------------------------------------------------
Date         Programmer    Change
2024-06-20   JC reyes      Written
============================================================================
*/
function isSpecial(char) {
  switch(char){
    case " ": case "-": case "/": case "|": case ">": case "(": case ")":
      return true;
    default:
      return false;
  }
}
