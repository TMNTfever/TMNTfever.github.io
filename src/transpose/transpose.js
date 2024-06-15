const majSharp = [
  ["|1", ">1", "|2", ">2", "|3", "4", ">4", "|5", ">5", "|6", ">6", "|7"],
  ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"],
  ["G", "G#", "A", "A#", "B", "C", "C#", "D", "D#", "E", "E#", "F#"],
  ["D", "D#", "E", "E#", "F#", "G", "G#", "A", "A#", "B", "B#", "C#"],
  ["A", "A#", "B", "B#", "C#", "D", "D#", "E", "E#", "F#", "Fx", "G#"],
  ["E", "E#", "F#", "Fx", "G#", "A", "A#", "B", "B#", "C#", "Cx", "D#"],
  ["B", "B#", "C#", "Cx", "D#", "E", "E#", "F#", "Fx", "G#", "Gx", "A#"],
  ["F#", "Fx", "G#", "Gx", "A#", "B", "B#", "C#", "Cx", "D#", "Dx", "E#"],
  ["C#", "Cx", "D#", "Dx", "E#", "F#", "Fx", "G#", "Gx", "A#", "Ax", "B#"]
];

const minSharp = [
  ["|1", "", "", "", "", "", "", "", "", "", "", ""],
  ["A", "", "", "", "", "", "", "", "", "", "", ""],
  ["E", "", "", "", "", "", "", "", "", "", "", ""],
  ["B", "", "", "", "", "", "", "", "", "", "", ""],
  ["F#", "", "", "", "", "", "", "", "", "", "", ""],
  ["C#", "", "", "", "", "", "", "", "", "", "", ""],
  ["G#", "", "", "", "", "", "", "", "", "", "", ""],
  ["D#", "", "", "", "", "", "", "", "", "", "", ""],
  ["A#", "", "", "", "", "", "", "", "", "", "", ""]
];

const majFlat = [
  ["|1", "", "", "", "", "", "", "", "", "", "", ""],
  ["F", "", "", "", "", "", "", "", "", "", "", ""],
  ["Bb", "", "", "", "", "", "", "", "", "", "", ""],
  ["Eb", "", "", "", "", "", "", "", "", "", "", ""],
  ["Ab", "", "", "", "", "", "", "", "", "", "", ""],
  ["Db", "", "", "", "", "", "", "", "", "", "", ""],
  ["Gb", "", "", "", "", "", "", "", "", "", "", ""],
  ["Cb", "", "", "", "", "", "", "", "", "", "", ""]
];

const minFlat = [
  ["|1", "", "", "", "", "", "", "", "", "", "", ""],
  ["D", "", "", "", "", "", "", "", "", "", "", ""],
  ["G", "", "", "", "", "", "", "", "", "", "", ""],
  ["C", "", "", "", "", "", "", "", "", "", "", ""],
  ["F", "", "", "", "", "", "", "", "", "", "", ""],
  ["Bb", "", "", "", "", "", "", "", "", "", "", ""],
  ["Eb", "", "", "", "", "", "", "", "", "", "", ""],
  ["Ab", "", "", "", "", "", "", "", "", "", "", ""]
];

function transposeUp() {
  var songKey = document.getElementById("ukulele-chords").getElementsByTageName("k-")[0].innerHTML;
  // Assign songKey variable and locate within key tables
  // Retrieve HTMLCollection of <c-> tags
  var allChords = document.getElementById("ukulele-chords").getElementsByTagName("c-");
  // Tokenize collections with 3 columns, 1-abstract (|#,<#,>#), 2=flavor, 3=preceding whitespace
  // Populate collection with correct chords
  // Transpose, account for table overflow, and write to collection
  // Rebuild chord lines, including whitespace
  // Rebuild entire chord file and replace id="ukulele-chords"
  
  console.log("Number of elements: " + allChords.length + ", first element: " + allChords[0].innerHTML);
}
