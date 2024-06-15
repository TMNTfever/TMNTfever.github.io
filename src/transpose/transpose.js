function transposeUp() {
  // Define arrays/tables for major-flat, minor-flat, major-sharp, and minor-sharp keys
  // Retrieve HTMLCollection of <k-> tag
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
