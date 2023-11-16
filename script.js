fetch('data.json')
  .then(response => response.json())
  .then(jsonData => {
    drawPieChart(jsonData[0])

    // Ecouteur de clics sur les boutons
    document.querySelector('.stat nav').addEventListener('click', (event) => {
      const year = parseInt(event.target.dataset.annee);

      const yearObject = jsonData.filter((obj) => obj.year === year)[0]

      // console.log(yearObject)
      drawPieChart(yearObject);
      displayIframesByYear(yearObject);
      displaySources(yearObject);
      // fillRect(yearObject)
    })
  });

// INITIALISATION

// FONCTIONS UTILITAIRES
function drawPieChart(yearObject) {
  const data = {
    popRock: yearObject.popRock,
    allOthers: yearObject.allOthers,
  }

  const color = d3.scaleOrdinal()
    .range(["#02DED8", "#FF3030"])

  const pie = d3.pie()
    .value(function(d) {return d[1]})
  const data_ready = pie(Object.entries(data))

  // console.log(data_ready);

  const width = 450,
    height = 450,
    margin = 40;

  const radius = Math.min(width, height) / 2 - margin;

  // a faire avec d3 plutôt... voir https://d3-graph-gallery.com/graph/pie_changeData.html
  document.getElementById('my_dataviz').innerHTML = '';

  const svg = d3.select("#my_dataviz")
  .append("svg")
    .attr("width", width)
    .attr("height", height)
  .append("g")
    .attr("transform", `translate(${width/2}, ${height/2})`);
  
  svg.selectAll()   
  .data(data_ready)
    .join('path')
    .attr('d', d3.arc()
      .innerRadius(0)
      .outerRadius(radius)
    )
    .attr('fill', function(d){ return(color(d.data[1])) })
    .style("stroke-width", "2px")
    .style("opacity", 0.7)
    
}

function displayIframesByYear(yearObject) {
  // Recherche des iframes dans le JSON
  const iframePop = yearObject.songPop;
  const iframeRock = yearObject.songRock;

  // Mise à jour des iframes dans le HTML
  const iframePopElement = document.querySelector('.iframepop'); // Remplacez par la classe réelle
  const iframeRockElement = document.querySelector('.iframerock'); // Remplacez par la classe réelle

  if (iframePopElement) {
    iframePopElement.innerHTML = `<div class="iframepop">${iframePop}</div>`;
  }

  if (iframeRockElement) {
    iframeRockElement.innerHTML = `<div class="iframerock">${iframeRock}</div>`;
  }
}

function displaySources(yearObject) {
  // Recherche des iframes dans le JSON
  const musicSources = yearObject.sources;

  // Mise à jour des iframes dans le HTML
  const paragrapheSources = document.querySelector('.sourcelink'); // Remplacez par la classe réelle

  if (paragrapheSources) {
    paragrapheSources.innerHTML = `<p class="sourcelink">Source : ${musicSources}</p>`;
  }
}
