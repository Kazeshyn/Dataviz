fetch('data.json')
const width = 450,
    height = 450,
    margin = 40;

const radius = Math.min(width, height) / 2 - margin;

const svg = d3.select("#my_dataviz")
  .append("svg")
    .attr("width", width)
    .attr("height", height)
  .append("g")
    .attr("transform", `translate(${width/2}, ${height/2})`);

const data = {a: 50.2, b: 49.8}

const color = d3.scaleOrdinal()
  .range(["#02DED8", "#FF3030"])

const pie = d3.pie()
  .value(function(d) {return d[1]})
const data_ready = pie(Object.entries(data))

svg
  .selectAll('whatever')
  .data(data_ready)
  .join('path')
  .attr('d', d3.arc()
    .innerRadius(0)
    .outerRadius(radius)
  )
  .attr('fill', function(d){ return(color(d.data[1])) })
  .style("stroke-width", "2px")
  .style("opacity", 0.7)