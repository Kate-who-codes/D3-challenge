var svgWidth = 960;
var svgHeight = 500;

var margin = {
    tip: 20,
    right: 40,
    bottom: 80,
    left: 100
};

var width = svgWidth -margin.left - margin.right;
var height = svgHeight - margin.top - margin.bottom;

// Create an SVG wrapper, append an SVG group that will hold our chart,
// and shift the latter by left and top margins
var svg = d3
  .select(".chart")
  .append("svg")
  .attr("width", svgWidth)
  .attr("height", svgHeight);

// Append an SVG group
var chartGroup = svg.append("g")
  .attr("transform", `translate(${margin.left}, ${margin.top})`);

// Initial Params -- I need to edit this
var chosenXAxis = " ";

// Function used for updating x-scale var upon click on axis label -- Edit this
function xScale(data, chosenXAxis) {
    // create scales
    var xLinearScale = d3.scaleLinear()
      .domain([d3.min(ata, d => d[chosenXAxis]) * 0.8,
    ])
    .range([0, width]);


    return xLinearScale;

}

// Function used for updating xAxis var upon click on axis label
function renderAxes(newScale, xAxis) {
    var bottomAxis = d3.axisBottom(newScale);

    xAxis.transition()
    .duration(1000)
    .call(bottomAxis);

    return xAxis;
}

// Function used for updating circles group with a transition to new circles

function renderCircles(circlesGroup, newScale, chosenAxis) { 

  circlesGroup.transition()
  .duration(1000)
  .attr("cx", d => newScale(d[chosenAxis]));
  
return circleGroup;
}

// Function used for updating circles group with new tooltip
function updateToolTip(chosenXAxis, circlesGroup) { 

    var label;

    if (chosenXAxis === " "){  //Edit this
        label = " :"; //Edit this
    }
    else {
        label = "# of :"; //Edit this
    }

    var ToolTip = d3.tip()
      .attr("class", "tooltip")
      .offset([80, -60])
      .html(function(d) {
        return (`${d.states }<br>${label} ${d[chosenXAxis]}`); // Edit this line after d.
      });
    
    circlesGroup.call(toolTip);

    circlesGroup.on("mouseover", function(data) {
        toolTip.show(data);
    })
      // "Onmouse" event
      .on("mouseout", function(data, index) {
          toolTip.hide(data);
      });

    return circlesGroup;  
}

// Retrieve data from the CSV file and execute everything below
d3.csv("assets/data/data.csv").then(function(data, err) {
    if(err) { throw err 
  };

    // Parse data  --  ( Class activity Day 3 Act 12 vs HW)???
    data.forEach(function(data) {
      data.poverty = +data.poverty;
      data.healthcare = +data.healthcare;
      data.age = +data.age;
      data.smokes = +data.smokes;
      data.obesity = +data.obesity;
      data.income = +data.income;

      // Ask about this step!!!
    });



    // xLinearScale function above csv import
    var xLinearScale = xScale(data, chosenXAxis);

    // Create y scale function
    var yLinearScale = d3.scaleLinear()
      .domain([0, d3.max(data.poverty)]) // Edit the end of this line
      .range([height,0]);

    // Create initial axis functions
    var bottomAxis = d3.axisBottom(xLinearScale);
    var leftAxis = d3.axisLeft(yLinearScale);

    // Append x axis
    var xAxis = chartGroup.append("g")
      .classed("x-axis", true)
      .attr("transform", `translate(0, ${height})`)
      .call(bottomAxis);

    // Append y axis
    chartGroup.append("g")
       .call(leftAxis);
       
    // Append initial circles
    var circlesGroup = chartGroup.selectAll("circle")
      .data(data)
      .enter()
      .append("circle")
      .attr("cx", d => xLinearScale(d[chosenXAxis]))
      .attr("cy", d => yLinearScale(d.data.poverty))  
      .attr("r", 20)
      .attr("fill", "pink")
      .attr("opacity", "5")
      
    // Create group for two x-axis labels
  var labelsGroup = chartGroup.append("g")
    .attr("transform", `translate(${width / 2}, ${height + 20})`);

  var Label = labelsGroup.append("text") // Edit 
  .attr("x", 0)
  .attr("y", 20)
  .attr("value", " poverty") // Edit and value to grab for event listener
  .classed("active", true)
  .text(")");  // Edit

  var Label = labelsGroup.append("text") // Label
  .attr("x", 0)
  .attr("y", 40)
  .attr("value", "") // Edit , value to grab for event listener
  .classed("inactive", true)
  .text("# "); // Edit

// append y axis
  chartGroup.append("text")
  .attr("transform", "rotate(-90)")
  .attr("y", 0 - margin.left)
  .attr("x", 0 - (height / 2))
  .attr("dy", "1em")
  .classed("axis-text", true)
  .text(""); // Edit

// updateToolTip function above csv import
var circlesGroup = updateToolTip(chosenXAxis, circlesGroup);

// x axis labels event listener
labelsGroup.selectAll("text")
  .on("click", function() {
    // get value of selection
    var value = d3.select(this).attr("value");
    if (value != chosenXAxis) {

      // replaces chosenXAxis with value
      chosenXAxis = value;

      // console.log(chosenXAxis)

      // functions here found above csv import
      // updates x scale for new data
      xLinearScale = xScale(data, chosenXAxis);

      // updates x axis with transition
      xAxis = renderAxes(xLinearScale, xAxis);

      // updates circles with new x values
      circlesGroup = renderCircles(circlesGroup, xLinearScale, chosenXAxis);

      // updates tooltips with new info
      circlesGroup = updateToolTip(chosenXAxis, circlesGroup);

      // changes classes to change bold text
      if (chosenXAxis === "") { // Edit in quotes
        Label // Edit label name
          .classed("active", true)
          .classed("inactive", false);
        povertyLabel
          .classed("active", false)
          .classed("inactive", true);
      }
      else {
        Label  // Edit label name
          .classed("active", false)
          .classed("inactive", true);
        Label
          .classed("active", true)
          .classed("inactive", false);
      }
    }
  });
}).catch(function(error) {
console.log(error);


})
