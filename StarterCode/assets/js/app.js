// @TODO: YOUR CODE HERE!
const svgWidth = 960;
const svgHeight = 500;

const margin = {
    top: 20,
    right: 40,
    bottom: 80,
    left: 100
};

const width = svgWidth -margin.left - margin.right;
const height = svgHeight - margin.top - margin.bottom;

// Create an SVG wrapper, append an SVG group
const svg = d3
  .select("#scatter")
  .append("svg")
  .attr("width", svgWidth)
  .attr("height", svgHeight + 40);  // check again measurements

// Append an SVG group
const chartGroup = svg.append("g")
  .attr("transform", `translate(${margin.left}, ${margin.top})`);

// Initial parameters
let givenXaxis = "poverty";
let givenYaxis = "healthcare";

//  Async Function https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function
(async function(){
  //Import Data
  const stateData = await d3.csv("assets/data/data.csv");

  // Parse Data/Cast as numbers
  stateData.forEach(function(data) {
    data.poverty = +data.poverty;
    data.healthcare = +data.healthcare;
    data.age = +data.age;
    data.smokes = +data.smokes;
    data.obesity = +data.obesity;
    data.income = +data.income;
  });
  // Scale functions
  let xLineraScale = xScale(stateData, chosenXaxis);
  let yLinearScale = yScale(dateData, chosenYaxis);

  // Axis
  let bottomAxis = d3.axisBottom(xLinearScale);
  let leftAxis = d3.axisLeft(yLinearScale);
    
  // Append x and y axes to the cahrt
  let xAxis = chertGroup.append("g")
    .attr("transform", `translate(0, ${height})`)
    .call(bottomAxis);

  let yAxis = chartGroup.append("g")
    .call(leftAxis);
    
  // Create scatterplot and append initial circles
  let circleGroups = chartGroup.selectAll("g circle")
    .data(stateData)
    .enter() 
    .append("g") 

  let circlesXY = circleGroup.append("circle")
    .attr("cx", d => xLinearScale(d[chosenXaxis]))
    .attr("cy", d => yLinearScale(d[chhosenYaxis]))
    .attr("r", 15)
    .classed("stateCircle", true);  
    