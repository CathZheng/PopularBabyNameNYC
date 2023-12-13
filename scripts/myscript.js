// add your JavaScript/D3 to this file
const data = [
  { letter: 'a', count: 300756},
  { letter: 'j', count: 231395},
  { letter: 'm', count: 198012},
  { letter: 'e', count: 146610},
  { letter: 's', count: 145342},
  { letter: 'l', count: 117731},
  { letter: 'c', count: 110384},
  { letter: 'd', count: 81661},
  { letter: 'n', count: 71296},
  { letter: 'k', count: 65935},
  { letter: 'r', count: 62074},
  { letter: 'b', count: 57961},
  { letter: 'g', count: 55640},
  { letter: 'i', count: 52483},
  { letter: 'h', count: 39644},
  { letter: 't', count: 36502},
  { letter: 'v', count: 30916},
  { letter: 'o', count: 29892},
  { letter: 'y', count: 26289},
  { letter: 'z', count: 24455},
  { letter: 'p', count: 24004},
  { letter: 'f', count: 21707},
  { letter: 'w', count: 14770},
  { letter: 'x', count: 5417},
  { letter: 'q', count: 1662},
  { letter: 'u', count: 1196},
];

const margin = { top: 20, right: 20, bottom: 50, left: 60 },
      width = 960 - margin.left - margin.right,
      height = 500 - margin.top - margin.bottom;

const svg = d3.select("div#plot").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

const y = d3.scaleBand()
            .domain(data.map(d => d.letter))
            .range([height, 0])
            .padding(0.1);

const x = d3.scaleLinear()
            .domain([0, d3.max(data, d => d.count)])
            .range([0, width]);

y.domain(data.map(d => d.letter));
x.domain([0, d3.max(data, d => d.count)]);

svg.append("g")
    .attr("transform", "translate(0," + height + ")")
    .call(d3.axisBottom(x));

svg.append("g")
    .call(d3.axisLeft(y));

svg.append("g")
    .attr("transform", `translate(0,${height})`)
    .call(d3.axisBottom(x));

svg.append("text")
          .attr("text-anchor", "end")
          .attr("x", width / 2)
          .attr("y", height + margin.top + 20)
          .text("Total Count");

svg.append("text")
          .attr("text-anchor", "end")
          .attr("transform", "rotate(-90)")
          .attr("y", -margin.left + 20)
          .attr("x", -height / 2)
          .attr("dy", "1em")
          .text("First Letter of first name");

const bars = svg.selectAll(".bar")
  .data(data)
  .enter().append("rect")
  .attr("class", "bar")
  .attr("y", d => y(d.letter))
  .attr("height", y.bandwidth())
  .attr("x", 0)
  .attr("width", 0);

bars.transition()
  .duration(2000)
  .attr("width", d => x(d.count));

