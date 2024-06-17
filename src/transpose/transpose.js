const majSharp = [
  ["|1", ">1", "|2", ">2", "|3", "|4", ">4", "|5", ">5", "|6", ">6", "|7"],
  ["C" , "C#", "D" , "D#", "E" , "F" , "F#", "G" , "G#", "A" , "A#", "B" ],
  ["G" , "G#", "A" , "A#", "B" , "C" , "C#", "D" , "D#", "E" , "E#", "F#"],
  ["D" , "D#", "E" , "E#", "F#", "G" , "G#", "A" , "A#", "B" , "B#", "C#"],
  ["A" , "A#", "B" , "B#", "C#", "D" , "D#", "E" , "E#", "F#", "G" , "G#"],
  ["E" , "E#", "F#", "G" , "G#", "A" , "A#", "B" , "B#", "C#", "D" , "D#"],
  ["B" , "B#", "C#", "D" , "D#", "E" , "E#", "F#", "G" , "G#", "A" , "A#"],
  ["F#", "G" , "G#", "A" , "A#", "B" , "B#", "C#", "D" , "D#", "E" , "E#"],
  ["C#", "D" , "D#", "E" , "E#", "F#", "G" , "G#", "A" , "A#", "B" , "B#"]
];

const minSharp = [
  ["|1", ">1", "|2", "|3", ">3", "|4", ">4", "|5", "|6", ">6", "|7", ">7"],
  ["A" , "A#", "B" , "C" , "C#", "D" , "D#", "E" , "F" , "F#", "G" , "G#"],
  ["E" , "E#", "F#", "G" , "G#", "A" , "A#", "B" , "C" , "C#", "D" , "D#"],
  ["B" , "B#", "C#", "D" , "D#", "E" , "E#", "F#", "G" , "G#", "A" , "A#"],
  ["F#", "G" , "G#", "A" , "A#", "B" , "B#", "C#", "D" , "D#", "E" , "E#"],
  ["C#", "D" , "D#", "E" , "E#", "F#", "G" , "G#", "A" , "A#", "B" , "B#"],
  ["G#", "A" , "A#", "B" , "B#", "C#", "D" , "D#", "E" , "E#", "F#", "G" ],
  ["D#", "E" , "E#", "F#", "G" , "G#", "A" , "A#", "B" , "B#", "C#", "D" ],
  ["A#", "B" , "B#", "C#", "D" , "D#", "E" , "E#", "F#", "G" , "G#", "A" ]
];

const majFlat = [
  ["|1", "<2", "|2", "<3", "|3", "|4", "<5", "|5", "<6", "|6", "<7", "|7"],
  ["F" , "Gb", "G" , "Ab", "A" , "Bb", "Cb", "C" , "Db", "D" , "Eb", "E" ],
  ["Bb", "Cb", "C" , "Db", "D" , "Eb", "Fb", "F" , "Gb", "G" , "Ab", "A" ],
  ["Eb", "Fb", "F" , "Gb", "G" , "Ab", "A" , "Bb", "Cb", "C" , "Db", "D" ],
  ["Ab", "A" , "Bb", "Cb", "C" , "Db", "D" , "Eb", "Fb", "F" , "Gb", "G" ],
  ["Db", "D" , "Eb", "E" , "F" , "Gb", "G" , "Ab", "A" , "Bb", "B" , "C" ],
  ["Gb", "G" , "Ab", "A" , "Bb", "B" , "C" , "Db", "D" , "Eb", "E" , "F" ],
  ["Cb", "C" , "Db", "D" , "Eb", "E" , "F" , "Gb", "G" , "Ab", "A" , "Bb"]
];

const minFlat = [
  ["|1", "<2", "|2", "|3", "<4", "|4", "<5", "|5", "|6", "<7", "|7", "<1"],
  ["D" , "Eb", "E" , "F" , "Gb", "G" , "Ab", "A" , "Bb", "B" , "C" , "Db"],
  ["G" , "Ab", "A" , "Bb", "B" , "C" , "Db", "D" , "Eb", "E" , "F" , "Gb"],
  ["C" , "Db", "D" , "Eb", "E" , "F" , "Gb", "G" , "Ab", "A" , "Bb", "B" ],
  ["F" , "Gb", "G" , "Ab", "A" , "Bb", "B" , "C" , "Db", "D" , "Eb", "E" ],
  ["Bb", "B" , "C" , "Db", "D" , "Eb", "E" , "F" , "Gb", "G" , "Ab", "A" ],
  ["Eb", "E" , "F" , "Gb", "G" , "Ab", "A" , "Bb", "B" , "C" , "Db", "D" ],
  ["Ab", "A" , "Bb", "B" , "C" , "Db", "D" , "Eb", "E" , "F" , "Gb", "G" ]
];

function transpose(isUp) {
  // Determine the song's key, and whether it's major or minor
  var songKey = document.getElementById("ukulele-chords").getElementsByTagName("k-")[0].innerHTML;
  //var songKey = songKeyCollection[0].innerHTML;
  let isMaj;
console.log("key: " + songKey + ", majFlat: " + majFlat[1][0]);
  if(songKey.includes("m")) {
    isMaj = false;
    songKey = songKey.substring(0, str.length - 1);
  } else {
    isMIn = true;
  }
  
  // Determine the correct table to use and assign to new variable for manipulation
  let keyTable;
  
  switch(songKey) {
    case "":
    case "":
    case "":
      break;
  }
  
  // Retrieve HTMLCollection of <c-> tags
  var allChords = document.getElementById("ukulele-chords").getElementsByTagName("c-");

  // Tokenize collections with 3 columns, 1-abstract (|#,<#,>#), 2=flavor, 3=preceding whitespace
  // Populate collection with correct chords
  // Transpose, account for table overflow, and write to collection
  // Rebuild chord lines, including whitespace
  // Rebuild entire chord file and replace id="ukulele-chords"
}
