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

// Affichage des graphiques
function drawPieChart(yearObject) {
  const data = {
    popRock: yearObject.popRock,
    allOthers: yearObject.allOthers,
  }

  const color = d3.scaleOrdinal()
    .range(["#02DED8", "#FF3030"])

  const pie = d3.pie()
    .value(function (d) { return d[1] })
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
    .attr("transform", `translate(${width / 2}, ${height / 2})`);

  svg.selectAll()
    .data(data_ready)
    .join('path')
    .attr('d', d3.arc()
      .innerRadius(0)
      .outerRadius(radius)
    )
    .attr('fill', function (d) { return (color(d.data[1])) })
    .style("stroke-width", "2px")
    .style("opacity", 0.7)

}
//Affichage des iframes
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
//Afichage des sources du graphique
function displaySources(yearObject) {
  // Recherche des iframes dans le JSON
  const musicSources = yearObject.sources;

  // Mise à jour des iframes dans le HTML
  const paragrapheSources = document.querySelector('.sourcelink'); // Remplacez par la classe réelle

  if (paragrapheSources) {
    paragrapheSources.innerHTML = `<p class="sourcelink">Source : <a href="${musicSources}">${musicSources}</a></p>`;
  }
}

//Equalizer
function makeDots(heights, gap, viewportHeight) {
  var svgNS = "http://www.w3.org/2000/svg";
  var eq = document.getElementById("eq");
  var maxHeight = findMaxHeight();
  var w_radius = (100 - heights.length * gap) / heights.length / 2;
  var h_radius = (100 - maxHeight * gap) / maxHeight / 2;
  var radius = Math.min(w_radius, h_radius);

  for (var i = 0; i < heights.length; i++) {
    var h = heights[i];
    var x = i * radius * 2 + i * gap + radius;

    for (var j = 0; j < h; j++) {
      var yy = j * radius * 2 + j * gap;
      var y = viewportHeight - radius - yy;
      var id = 'dot_' + i + '_' + j;

      var dot = svgDot(id, x, y, radius);
      eq.appendChild(dot);
    }
  }

  function svgDot(id, cx, cy, r) {
    var d = document.createElementNS(svgNS, "circle");
    d.setAttributeNS(null, "id", id);
    d.setAttributeNS(null, "cx", cx);
    d.setAttributeNS(null, "cy", cy);
    d.setAttributeNS(null, "r", r);
    d.setAttributeNS(null, "class", "dot");

    return d;
  }

  function findMaxHeight() {
    maxHeight = heights[0];
    for (var i = 0; i < heights.length; i++) {
      if (heights[i] > maxHeight) {
        maxHeight = heights[i];
      }
    }

    return maxHeight;
  }
}

function animateDots(heights) {
  var lastStart = 0;
  for (var i = 0; i < heights.length; i++) {
    var height = heights[i];
    var start = Math.ceil(Math.random() * 2);
    if (start == lastStart) {
      start++;
    }
    animateColumn(i, start);
    lastStart = start;
  }

  function animateColumn(col, start) {
    var tln = new TimelineMax({ repeat: -1, yoyo: true });
    var count = 0;
    for (var i = start; i <= heights[col]; i++) {
      var dotid = '#dot_' + col + '_' + i;
      tln.from(dotid, 0.4, {
        autoAlpha: 0.5,
        ease: Sine.easeIn
      }, count * 0.25);
      count++;
    }
  }
}

var dotHeights = [5, 5, 6, 6, 5, 4, 4, 4, 6, 6, 8, 6, 7, 8, 9, 8, 7, 7, 7, 8, 9, 10, 11, 11, 12, 11, 10, 10];

makeDots(dotHeights, 0.75, 50);
animateDots(dotHeights);

//GSAP h1 animation
const maTimeline = gsap.timeline()

maTimeline.fromTo('h1', {
  x: 350,
  opacity: 0
},
  {
    x: 0,
    opacity: 1,
    duration: 1.5
  }
)

// appel au scroll
$(function() {
  $('a[href*=#]').on('click', function(e) {
    e.preventDefault();
    $('html, body').animate({ scrollTop: $($(this).attr('href')).offset().top}, 500, 'linear');
  });
});