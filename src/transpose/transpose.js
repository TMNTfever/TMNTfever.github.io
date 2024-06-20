/*
============================================================================
File:      transpose.js
Desc:      Transposes a song's chords up or down in a Chords page.
Called by: main/chords.html
Calls:     abstractChords()
Arguments: isUp - Boolean value that says whether user wants to transpose
                  up or down.
Comments:  N/A
---------------------------------------------------------------------------
Date         Programmer    Change
2024-06-17   JC Reyes      Written
============================================================================
*/
var chordMap = undefined; // Maps abstract IDs to chord for specific key

const majTable = [
  ["|1", ">1", "|2", ">2", "|3", "|4", ">4", "|5", ">5", "|6", ">6", "|7"],
  ["A" , "A#", "B" , "B#", "C#", "D" , "D#", "E" , "E#", "F#", "G" , "G#"],
  ["Bb", "Cb", "C" , "Db", "D" , "Eb", "Fb", "F" , "Gb", "G" , "Ab", "A" ],
  ["B" , "B#", "C#", "D" , "D#", "E" , "E#", "F#", "G" , "G#", "A" , "A#"], 
  ["C" , "C#", "D" , "D#", "E" , "F" , "F#", "G" , "G#", "A" , "A#", "B" ],
  ["C#", "D" , "D#", "E" , "E#", "F#", "G" , "G#", "A" , "A#", "B" , "B#"],
  ["D" , "D#", "E" , "E#", "F#", "G" , "G#", "A" , "A#", "B" , "B#", "C#"],
  ["Eb", "Fb", "F" , "Gb", "G" , "Ab", "A" , "Bb", "Cb", "C" , "Db", "D" ],
  ["E" , "E#", "F#", "G" , "G#", "A" , "A#", "B" , "B#", "C#", "D" , "D#"],
  ["F" , "Gb", "G" , "Ab", "A" , "Bb", "Cb", "C" , "Db", "D" , "Eb", "E" ],
  ["F#", "G" , "G#", "A" , "A#", "B" , "B#", "C#", "D" , "D#", "E" , "E#"],
  ["G" , "G#", "A" , "A#", "B" , "C" , "C#", "D" , "D#", "E" , "E#", "F#"],
  ["Ab", "A" , "Bb", "Cb", "C" , "Db", "D" , "Eb", "Fb", "F" , "Gb", "G" ]
];
const minTable = [
  ["|1", ">1", "|2", "|3", ">3", "|4", ">4", "|5", "|6", ">6", "|7", ">7"],
  ["A" , "A#", "B" , "C" , "C#", "D" , "D#", "E" , "F" , "F#", "G" , "G#"],
  ["Bb", "B" , "C" , "Db", "D" , "Eb", "E" , "F" , "Gb", "G" , "Ab", "A" ],
  ["B" , "B#", "C#", "D" , "D#", "E" , "E#", "F#", "G" , "G#", "A" , "A#"],
  ["C" , "Db", "D" , "Eb", "E" , "F" , "Gb", "G" , "Ab", "A" , "Bb", "B" ],
  ["C#", "D" , "D#", "E" , "E#", "F#", "G" , "G#", "A" , "A#", "B" , "B#"],
  ["D" , "Eb", "E" , "F" , "Gb", "G" , "Ab", "A" , "Bb", "B" , "C" , "Db"],
  ["Eb", "E" , "F" , "Gb", "G" , "Ab", "A" , "Bb", "B" , "C" , "Db", "D" ],
  ["E" , "E#", "F#", "G" , "G#", "A" , "A#", "B" , "C" , "C#", "D" , "D#"],
  ["F" , "Gb", "G" , "Ab", "A" , "Bb", "B" , "C" , "Db", "D" , "Eb", "E" ],
  ["F#", "G" , "G#", "A" , "A#", "B" , "B#", "C#", "D" , "D#", "E" , "E#"],
  ["G" , "Ab", "A" , "Bb", "B" , "C" , "Db", "D" , "Eb", "E" , "F" , "Gb"],
  ["G#", "A" , "A#", "B" , "B#", "C#", "D" , "D#", "E" , "E#", "F#", "G" ]
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
2019-12-19   JC reyes      Written in .vba
2024-06-17   JC Reyes      Converted into .js
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
  
  // Retrieve HTMLCollection of <c-> tags
  // Tokenize allLines into allTokens with 3 columns, 1=abstract (|#,<#,>#), 2=flavor, 3=preceding whitespace
  var allLines = document.getElementById("ukulele-chords").getElementsByTagName("c-");
  var allTokens = new Array();
  var tLine = "";
  var tChar = "";
  var prevChar = "";
  var tSpace = "";
  var tChord = "";
  var tFlavor = "";
  var tAbstract = "";

  // Iterate through each line of chords
  for(x = 0; x < allLines.length; x++) {
    tLine = allLines[x].innerHTML;
    allTokens.push("<c->");
    y = 0;

    // Iterate through each character of the line
    while(y < tLine.length) {
      tChar = tLine.charAt(y);
      
      if(tChar === " ") { // tChar is a space
        if(prevChar !== " " && y > 0) {
          // Replace chord with transposed chord
          if(tChord.length == 1) { // Single major chord
            allTokens.push(chordMap.get(tChord));
          } else { // Chord contains a flat, sharp, and/or flavor
            // Check for flat or sharp
            if(tChord.charAt(1) === "b" || tChord.charAt(1) === "#") {
              allTokens.push(chordMap.get(tChord.substr(0, 2)));
            } else { // Flavors detected
              allTokens.push(chordMap.get(tChord.substr(0, 1)));
            }
          }
          
          tChord = "";
        }
        tSpace += tChar;
      } else { // tChar is a chord
        if(prevChar === " " && y > 0) {
          allTokens.push(tSpace);
          tSpace = "";
        }
        tChord += tChar;
      }

      // Accounts for the last chord in a line
      if(y === tLine.length - 1 && tChord !== "") {
        allTokens.push(tChord);
        tChord = "";
      }
  
      prevChar = tChar;
      y++;
    }

    allTokens.push("</c->");
  }
console.log(allTokens.toString());
  
  // Transpose, account for table index out-of-bounds, and write to collection
  // Rebuild chord lines, including whitespace
  // Rebuild entire chord file and replace id="ukulele-chords"
}
