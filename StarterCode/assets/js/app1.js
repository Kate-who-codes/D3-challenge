// @TODO: YOUR CODE HERE!
var svgWidth = 960;
var svgHeight = 500;

var margin = {
  top: 20,
  right: 40,
  bottom: 60,
  left: 100
};

var width = svgWidth - margin.left - margin.right;
var height = svgHeight - margin.top - margin.bottom;

var circRadius;
function crGet() {
  if (width <= 530) {
    circRadius = 5;
  }
  else {
    circRadius = 10;
  }
}
crGet();

// Create an SVG wrapper, append an SVG group that will hold our chart, and shift the latter by left and top margins.
var svg = d3.select("#scatter")
  .append("svg")
  .attr("width", svgWidth)
  .attr("height", svgHeight);

var chartGroup = svg.append("g")
  .attr("transform", `translate(${margin.left}, ${margin.top})`);

  // Import Data
d3.csv("assets/data/data.csv").then(function(healthData) {

    // Step 1: Parse Data/Cast as numbers
    // ==============================
    healthData.forEach(function(data) {
      data.poverty = +data.poverty;
      data.smokes = +data.smokes;
      console.log(data.poverty)
      console.log(data.smokes)
    });
    

    // Step 2: Create scale functions
    // ==============================
    var xLinearScale = d3.scaleLinear()
      .domain([8, d3.max(healthData, d => d.poverty)])
      .range([0, width]);

    var yLinearScale = d3.scaleLinear()
      .domain([5, d3.max(healthData, d => d.smokes)])
      .range([height, 0]);

    // Step 3: Create axis functions
    // ==============================
    var bottomAxis = d3.axisBottom(xLinearScale);
    var leftAxis = d3.axisLeft(yLinearScale);

    // Step 4: Append Axes to the chart
    // ==============================
    chartGroup.append("g")
      .attr("transform", `translate(0, ${height})`)
      .call(bottomAxis);

    chartGroup.append("g")
      .call(leftAxis);

      // Step 5: Create Circles
    // ==============================
    chartGroup.selectAll("circle")
    .data(healthData)
    .enter()
    .append("circle")
    .attr("cx", d => xLinearScale(d.poverty))
    .attr("cy", d => yLinearScale(d.smokes))
    .attr("r", 20)
    .attr("class", "stateCircle");
    // .attr("fill", "pink")
    // .attr("opacity", ".5");

    // chartGroup.selectAll("circle")
    // .data(healthData)
    // .enter()
    // .append("text")
    // .text(d => d.abbr)
    // .attr("dx", d => xLinearScale(d.poverty))
    // .attr("dy", d => yLinearScale(d.smokes))
    // .attr("font-size", 5)
    // .attr("class", "stateText");

    chartGroup.selectAll("dog")
    .data(healthData)
    .enter()
    .append("text")
    .text(d => d.abbr)
    .attr("dx", d => xLinearScale(d.poverty))
    .attr("dy", d => yLinearScale(d.smokes) + circRadius / 2.5)
    .attr("font-size", circRadius)
    .attr("class", "stateText");





    // Create axes labels
    chartGroup.append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 0 - margin.left + 40)
      .attr("x", 0 - (height / 2))
      .attr("dy", "1em")
      .attr("class", "aText")
      .text("Smokers (%)");

    chartGroup.append("text")
      .attr("transform", `translate(${width / 2}, ${height + margin.top + 30})`)
      .attr("class", "aText")
      .text("Poverty (%)");
    

    //   var node = svg.selectAll("g")
    //             .healthdata(data)
    //             .enter()
    //             .append("g");

    // node.append("circle")
    //     .attr("class", "dot")
    //     .attr("cx", function(d) { return x(d.x); })
    //     .attr("cy", function(d) { return y(d.y); })
    //     .attr("r", 12);

    // node.append("text")
    //     .attr("x", function(d) { return x(d.x); })
    //     .attr("y", function(d) { return y(d.y); })
    //     .text("fooLabelsOfScatterPoints");

  }).catch(function(error) {
    console.log(error);
});