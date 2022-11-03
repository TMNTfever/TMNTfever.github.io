window.onload = () => {
    fetch("sidebar.html")
    .then(data => {
      return data.text()
    })
    .then( data => {
      document.getElementById("sidebar").innerHTML = data;
    })
}
