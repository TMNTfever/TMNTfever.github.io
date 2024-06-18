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
var abMap = undefined; // Maps abstract IDs to chord for specific key

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
  
  try {
    songKey = document.getElementById("ukulele-chords").getElementsByTagName("k-")[0].innerHTML;
  } catch {
    console.log("Chord chart does not contain the <k-> tag.");
  }

  var isMaj;

  if(songKey.includes("m")) {
    isMaj = false;
    songKey = songKey.substring(0, str.length - 1);
  } else {
    isMaj = true;
  }
  
  // Assign keyTable to the major or minor table
  var keyTable;
  
  if(isMaj) {
    keyTable = majTable;
  } else {
    keyTable = minTable;
  }
  
  // Determine which row the current key is on in keyTable
  var keyRow = 0;
  
  for(x = 1; x < keyTable.length; x++) {
    if(keyTable[x][0] == songKey) {
      keyRow = x;
    }
  }
  
  // Key was invalid, could be a sharp/flat key that is unrepresented ****DO SOMETHING ABOUT IT???****
  if(keyRow == 0) {
    console.log("Invalid Key: " + songKey);
    return;
  }
  
  // Populate abMap with current key
  abMap = new Map();
  
  for(x = 0; x < keyTable[keyRow].length; x++) {
    abMap.set(keyTable[0][x], keyTable[keyRow][x]);
  }
  
  // Retrieve HTMLCollection of <c-> tags
  // Tokenize allLines into allTokens with 3 columns, 1=abstract (|#,<#,>#), 2=flavor, 3=preceding whitespace
  var allLines = document.getElementById("ukulele-chords").getElementsByTagName("c-");
  var allTokens;
  var tLine;
  var tChar;
  var tChord = "";
  var tSpace = "";
  var tFlavor = "";
  var tAbstract = "";
  var tokenIndex = 0;
  
  for(x = 0; x < allLines.length; x++) {
    tLine = allLines[x];
    allTokens[tokenIndex] = "<c->";
    tokenIndex += 1;
    
    for(y = 0; y < tLine.length; y++) {
      tChar = tLine.charAt(y);
      
      while(tChar == " ") {
        tSpace += tChar;
        y++;
        tChar = tLine.charAt(y);
      }

      allTokens[tokenIndex] = tSpace;
      tSpace = "";
      tokenIndex += 1;

      while(tChar != " ") {
        tChord += tChar;
        y++;
        tChar = tLine.charAt(y);
      }

      allTokens[tokenIndex] = tChord; ////////////////////////// Change to abstract chord and split to multi-array
      tokenIndex += 1;
    }
    
    allTokens[tokenIndex] = "</c->";
    tokenIndex += 1;
  }
console.log(allTokens.toString());
  // Re-populate abMap with new key depending on transpose direction
  if(isUp) {
    if(keyRow == 13) {
      keyRow = 1;
    } else {
      keyRow = keyRow + 1;
    }
  } else {
    if(keyRow == 1) {
      keyRow = 13;
    } else {
      keyRow = keyRow - 1;
    }
  }
  
  abMap = new Map();
  
  for(x = 0; x < keyTable[keyRow].length; x++) {
    abMap.set(keyTable[0][x], keyTable[keyRow][x]);
console.log(keyTable[0][x] + " : " + keyTable[keyRow][x]);
  }

  // Populate collection with correct chords  
  // Transpose, account for table index out-of-bounds, and write to collection
  // Rebuild chord lines, including whitespace
  // Rebuild entire chord file and replace id="ukulele-chords"
}
