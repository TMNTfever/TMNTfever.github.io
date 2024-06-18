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
  var songKey = document.getElementById("ukulele-chords").getElementsByTagName("k-")[0].innerHTML;
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
console.log("Success - Row: " + keyRow + ", " + keyTable[x][0] + " = " + songKey);
    }
  }
  
  // Key was invalid, could be a sharp/flat key that is unrepresented ****DO SOMETHING ABOUT IT???****
  if(keyRow == 0) {
    console.log("Invalid Key: " + songKey);
    return;
  }
  
  // Populate abMap
  abMap = new Map();
  
  for(x = 0; x < 12; x++) {
    abMap.set(keyTable[0][x], keyTable[keyRow][x]);
  }
  
  // Retrieve HTMLCollection of <c-> tags
  var allLines = document.getElementById("ukulele-chords").getElementsByTagName("c-");
  var allChords = [];
  
  // Tokenize collections with 3 columns, 1=abstract (|#,<#,>#), 2=flavor, 3=preceding whitespace
  for(i = 0; i < allLines.length; i++) {
    
  }

  // Populate abMap with current key
  for(x = 0; x < keyTable[keyRow].length; x++) {
    abMap.set(keyTable[0][x], keyTable[keyRow][x]);
console.log(keyTable[0][x] + " : " + keyTable[keyRow][x]);
  }
  
  // Change abMap depending on transposing direction
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
  }

  // Populate collection with correct chords  
  // Transpose, account for table index out-of-bounds, and write to collection
  // Rebuild chord lines, including whitespace
  // Rebuild entire chord file and replace id="ukulele-chords"
}
