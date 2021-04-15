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
function xScale(   , chosenXAxis) {
    // create scales
    var xLinearScale = d3.scaleLinear()
      .domain([d3.min(hairData, d => d[chosenXAxis]) * 0.8,
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
        return (`${d.  }<br>${label} ${d[chosenXAxis]}`); // Edit this line after d.
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
d3.csv("data.csv").then(function(data, err) {
    if(err) throw err);

    // Parse data  -- Do I really need it in hw ( Class activity Day 3 Act 12 vs HW)???
    data.forEach(function(data) {
      // Ask about this step!!!
    });



    // xLinearScale function above csv import
    var xLinearScale = xScale(data, chosenXAxis);

    // Create y scale function
    var yLinearScale = d3.scaleLinear()
      .domain([0, d3.max(data, d = > d. )]) // Edit the end of this line
      .range([height,0]);

    // Create initial axis functions
    var bottomAxis = d3.axisBottom(xLinearScale);
    var leftAxis = d3.axisLeft(yLinearScale);

    // Append x axis
    var xAxis = chartGroup.append("g")
      .classed("x-axis", true)
      .attr("transform", `translate(0, ${height})`)
      .call(bottomAxis);
      


})
