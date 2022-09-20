# TMNTfever.github.io
Website for TMNTfever

<!DOCTYPE html>
<html lang="en">

<!-- Head -->
<head>
  <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
  <meta name="description" content="A home for what I love.">
  <meta name="author" content="J.C. Reyes">

  <title>TMNTfever</title>

  <link href="src/bootstrap/css/bootstrap.min.css" rel="stylesheet">
  <link href="css/index.css" rel="stylesheet">
  <script src="src/jquery/jquery.min.js"></script>
  <script src="src/bootstrap/js/bootstrap.bundle.min.js"></script>
  <script src="src/papaparse/papaparse.min.js"></script>
  <script src="src/sorttable.js"></script>
</head>

<!-- Body -->
<body style="background-color:#212529">
<!-- Wrapper -->
<div class="d-flex" id="wrapper">
  <!-- Sidebar -->
  <div  id="sidebar-wrapper" class="bg-dark text-light">
    <div class="sidebar-heading">
      <a class="sidebar-logo" href="#"><img src="assets/TMNTfever.png" alt="TMNTfever"></a>
    </div>
    
    <div class="list-group list-group-flush">
      <a href="#" onclick="return toggle('pg0')" class="list-group-item list-group-item-action bg-dark text-light"><img src="assets/icon-home.png" alt="Home"> Home</a>
      <a href="#" onclick="return toggle('pg1')" class="list-group-item list-group-item-action bg-dark text-light"><img src="assets/icon-ukie.png" alt="Ukulele"> Ukulele</a>
      <a href="#" onclick="return toggle('pg2')" class="list-group-item list-group-item-action bg-dark text-light"><img src="assets/icon-fightstick.png" alt="Fightstick"> Fightstick</a>
      <a href="#" onclick="return toggle('pg3')" class="list-group-item list-group-item-action bg-dark text-light"><img src="assets/icon-resume.png" alt="Resume"> Resume</a>
      <a href="#" onclick="return toggle('pg4')" class="list-group-item list-group-item-action bg-dark text-light"><img src="assets/icon-contact.png" alt="Contact"> Contact</a>
    </div>
  </div>
  <!-- /#sidebar-wrapper -->

  <!-- Page Content -->
  <div id="pg" class="container-fluid text-light">
      <!-- Home Page -->
    <div id="pg0" class="pg">
      <header>
        <h1 class="mt-2">HOME</h1>
      </header>
      <p>Welcome to my website. I wasn't satisfied with what other websites were providing me in terms of storing ukulele chord sheets, so I wanted to make a space where I could customize the functionality. Enjoy and please credit me if you use my arrangements.</p>
      <iframe width="650" height="38" style="border: none;" src="https://free.timeanddate.com/clock/i8hv56om/n179/fn8/fs16/fcffdf00/tc343a40/pct/ftb/bas2/bacfff/pa8/tt0/th1/ta1"></iframe><br>
      <iframe width="650" height="450" style="border: none;" src="https://embed.windy.com/embed2.html?lat=28.206&lon=-80.687&detailLat=28.206&detailLon=-80.687&width=650&height=450&zoom=5&level=surface&overlay=wind&product=ecmwf&menu=&message=&marker=&calendar=now&pressure=&type=map&location=coordinates&detail=&metricWind=default&metricTemp=default&radarRange=-1"></iframe><br>
      <iframe width="650" height="366" style="border: none;" src="https://www.youtube.com/embed/videoseries?list=PLDHLbb1WuxUBf4p4hi6smedrilPEYRcMg" title="YouTube video player" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
    </div>
    
    <!-- Ukulele Page -->
    <div id="pg1" class="pg text-light">
      <header>
        <h1 class="mt-2">UKULELE</h1>
      </header>
      
      <table style="width: 100%;" class="table table-dark table-striped table-hover sortable">
        <thead>
          <tr id="tableHeader">
          </tr>
        </thead>
        <tbody id="tableBody">
        </tbody>
      </table>
    </div>
    
    <!-- Fightstick Page -->
    <div id="pg2" class="pg">
      <header>
        <h1 class="mt-2">FIGHTSTICK</h1>
      </header>
      
      <h3>Qanba Q4RAF - Tekken</h3>
      <img width=650 src="assets/fightstick-qanba.jpg" alt="Qanba Q4RAF">
      <p>This was a simple mod; just an art, lever, and button swap. The art was created by <a href="https://twitter.com/umasukesankana">Umasuke Sankana</a>, and used with his permission. I also drew in Gon myself matching his artstyle, since I felt I needed to fill in that negative space a bit. I wanted to draw Jun in there too, but couldn't think of a creative way to add her in without being covered by the lever, and without just awkwardly floating in mid-air.</p>
      <p>This fightstick was modded around the launch of Tekken 7 on PC, which explains the characters being left behind; there was no DLC released yet for T7. The lever is a Sanwa JLF with a bat-top (hard to see from this angle). I also replaced the shaft with a Phreakmods Link for easy storage when travelling. The buttons are all Sanwa as well. All of these parts were purchased from <a href="http://paradisearcadeshop.com">Paradise Arcade Shop</a>.</p>
      <br>
      
      <h3>Street Fighter 15th Anniversary - Pi Arcade</h3>
      <img width=650 src="assets/fightstick-sf15.jpg" alt="Street Fighter 15th Anniversary">
      <p>A much more involved project. This is the first fightstick that I bought with my own money. The original PCB was compatible with only PS2 and Xbox, so I replaced it with a Zero Delay PCB. The parts were all soldered and glued in, so I had to use some elbow greese to remove them. I kept the original art (which is beautiful), but it was such a pain removing it to swap out the lever. I'm just lucky the art wasn't damaged since this was fighstick was stored in a hot garage for over a decade.</p>
      <p>The buttons were worn out and getting stuck, and the stick springs had become too loose. I replaced all of the buttons and lever with Suzo-Happ parts, purchased through <a href="https://focusattack.com">Focus Attack</a>. And since I gutted the original PS2/Xbox components, I repurposed the Xbox memory card slot to house a USB hub. This hub plugs into a battery-powered Raspberry Pi 3B, which the fightstick is also connected to.</p>
      <p>There are two outputs from the chastise, one is an HDMI and the other is USB. Plugging in the USB to PC, you can use the fightstick to play games normally. Plugging in the HDMI to a TV and turning on the Raspberry Pi will turn the box into a portable arcade machine, with up to 4 players. And one last QOL improvement was adding some soft-grip material to the bottom and removing the rubber feet. Now it's much more comfortable to use on my lap.</p>
      <br>
    
      <h3>Etokki Omni - Black and Gold</h3>
      <p>Coming soon.</p>
      <br>
    </div>
    
    <!-- Resume Page -->
    <div id="pg3" class="pg">
      <header>
        <h1 class="mt-2">JULIAN-CHRIS D. REYES</h1>
      </header>
      
      <div class="flex-container">
        <div class="flex-item">Item 1</div>
        <div class="flex-item">Item 2</div>
        <div class="flex-item">Item 3</div>
        <div class="flex-item">Item 4</div>
      </div>
      
      <p>I am a Sr. Principal Software Quality Engineer looking to support cross-discipline in the Aeronautical industry. As a programmer, I bring a deep level of understanding software development. I also bring automation expertise which has improved the productivity and consistency of several quality organizations across multiple flight programs.</p>
      <h3>Work Experience</h3>
      <p></p>
      <h3>Education</h3>
      <p></p>
      <h3>Security Clearance</h3>
      <p></p>
      <h3>Technical Skills</h3>
      <p></p>
    </div>
    
    <!-- Contact Page -->
    <div id="pg4" class="pg">
      <header>
        <h1 class="mt-2">CONTACT</h1>
      </header><br>
      
      <img class="headshot" src="assets/headshot.jpg" alt="JC Reyes"><br>
      <p><img width=40 src="assets/contact-phone.png" alt="Phone Number"><a href="tel:7602173491"> (760) 217-3491</a></p>
      <p><img width=40 src="assets/contact-email.png" alt="Email Address"><a href="mailto:julianchris.reyes@gmail.com"> julianchris.reyes@gmail.com</a></p>
      <p><img width=40 src="assets/contact-youtube.png" alt="YouTube"><a href="https://www.youtube.com/frostyminiwheats"> https://www.youtube.com/frostyminiwheats</a></p>
      <p><img width=40 src="assets/contact-twitter.png" alt="Twitter"><a href="https://twitter.com/tmntfever"> https://www.twitter.com/TMNTfever</a></p>
      <p><img width=40 src="assets/contact-facebook.png" alt="Facebook"><a href="https://www.facebook.com/julianchris.reyes/"> https://www.facebook.com/julianchris.reyes/</a></p>
      <p><img width=40 src="assets/contact-reddit.webp" alt="YouTube"><a href="https://reddit.com/u/tmntfever"> https://www.reddit.com/u/tmntfever</a></p>
      <p><img width=40 src="assets/contact-steam.png" alt="Steam"><a href="https://steamcommunity.com/id/tmntfever/"> https://steamcommunity.com/id/tmntfever/</a></p>
      <p><img width=40 src="assets/contact-discord.png" alt="Discord"><a href="#"> KaosMonkey#1365</a></p>
      <p><img width=40 src="assets/contact-bnet.png" alt="Battle.net"><a href="#"> JCR#1383</a></p>
    </div>
    
    <!-- Sheet Page -->
    <div id="pg5" class="pg">
      <header>
        <h1 class="mt-2">Song Title</h1>
      </header>
    </div>
  </div>
  <!-- /#page-content-wrapper -->
</div>
<!-- /#wrapper -->

<!-- Custom Scripts -->
<script>
function toggle(IDS) {
    var sel = document.getElementById('pg').getElementsByTagName('div');
    for (var i=0; i<sel.length; i++) { 
      if (sel[i].id != IDS) { sel[i].style.display = 'none'; }
    }
    var status = document.getElementById(IDS).style.display;
    if (status == 'block') { document.getElementById(IDS).style.display = 'none'; }
                      else { document.getElementById(IDS).style.display = 'block'; }
    return false;
}

function createDataElement(htmlTag, innerText, idParent) {
  let node = document.createElement(htmlTag);
  let textnode = document.createTextNode(innerText);
  node.appendChild(textnode);
  document.getElementById(idParent).appendChild(node);
}

function createHeaderElement(columnText) {
  createDataElement("th", columnText, "tableHeader");
}

function createCellData(rowIndex, dataIndex, cellText) {
  if(dataIndex === 0) {
    let node = document.createElement("tr");
    node.setAttribute("id", "row" + rowIndex);
    document.getElementById("tableBody").appendChild(node);

    createDataElement("td", cellText, "row" + rowIndex);
  } else {
    createDataElement("td", cellText, "row" + rowIndex);
  }
}

var csvString = "Restaurant, Cheese, Mushrooms, Size by Inch, Extra Spicy, Price (€)\nA, yes, yes, 12, no, 6\nB, no, yes, 15, yes, 8\nC, no, no, 9, no, 5\nD, yes, no, 12, yes, 7\nE, yes, no, 12, yes, 7.5\nF, no, yes, 15, yes, 9";

Papa.parse(csvString, {
  complete: function(results) {
    for(let i = 0; i < results.data.length; i++) {
      if(i === 0) {
        for(let j = 0; j < results.data[i].length; j++) {
          createHeaderElement(results.data[i][j]);
        }
      }
      if(i > 0) {
        for(let j = 0; j < results.data[i].length; j++) {
          createCellData(i, j, results.data[i][j]);
        }
      }
    }
  }
});

</script>
</body>
</html>
