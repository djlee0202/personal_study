///////////////////////////////////////////////////////////////////////////
//////////////////// Set up and initiate svg containers ///////////////////
///////////////////////////////////////////////////////////////////////////

var margin = {
	top: 20,
	right: 20,
	bottom: 20,
	left: 20
};
var width = window.innerWidth - margin.left - margin.right - 20;
var height = window.innerHeight - margin.top - margin.bottom - 20;

//SVG container
var svg = d3.select("#weatherRadial")
	.append("svg")
	.attr("width", width + margin.left + margin.right)
	.attr("height", height + margin.top + margin.bottom)
	.append("g")
	.attr("transform", "translate(" + (margin.left + width/2) + "," + (margin.top + height/2) + ")");

//Step 01. Create scales
//Parses the date & time
var parseDate = d3.time.format("%Y-%m-%d").parse;

//Turn strings into actual numbers/dates
weathercolumbia.forEach(function(d) {d.date = parseDate(d.date);});

//Set the minimum inner radius and max outer radius of the chart
var	outerRadius = Math.min(width, height, 450)/2,
	innerRadius = outerRadius * 0.4;

//Base the color scale on average temperature extremes
var colorScale = d3.scale.linear()
	.domain([20, 60, 100])
	.range(["#2c7bb6", "#ffff8c", "#d7191c"])
	.interpolate(d3.interpolateHcl);


//Scale for the heights of the bar, not starting at zero to give the bars an initial offset outward
var barScale = d3.scale.linear()
	.range([innerRadius, outerRadius])
	.domain([-15,30]);

//Scale to turn the date into an angle of 360 degrees in total
//With the first datapoint (Jan 1st) on top
var angle = d3.scale.linear()
	.range([-180, 180])
	.domain(d3.extent(weathercolumbia, function(d) { return d.date; }));


//////////////////////////// Create Titles ////////////////////////////////


var textWrapper = svg.append("g").attr("class", "textWrapper")
	.attr("transform", "translate(" + Math.max(-width/2, -outerRadius - 170) + "," + 0 + ")");

//Append title
textWrapper.append("text")
	.attr("class", "title")
    .attr("x", -10)
    .attr("y", -outerRadius - 180)
    .text("Daily Temperatures : New York, 2015")

//Append credit

textWrapper.append("text")
	.attr("class", "credit")
    .attr("x", -10)
    .attr("y", -outerRadius - 150)
    .text("Data Location: https://darksky.net/dev/");


textWrapper.append("text")
	.attr("class", "credit")
    .attr("x", -10)
    .attr("y", -outerRadius - 130)
    .text("Source 01 : http://weather-radials.com/");

textWrapper.append("text")
.attr("class", "credit")
  .attr("x", -10)
  .attr("y", -outerRadius - 110)
  .text("Source 02 : http://bl.ocks.org/nbremer ");;

textWrapper.append("text")
	.attr("class", "credit")
    .attr("x", -10)
    .attr("y", -outerRadius - 90)
    .text("Created by Dongjin Lee");

///////////////////////////// Create Axes /////////////////////////////////


//Wrapper for the bars and to position it downward
var barWrapper = svg.append("g")
	.attr("transform", "translate(" + 0 + "," + 0 + ")");

//Draw gridlines below the bars
var axes = barWrapper.selectAll(".gridCircles")
 	.data([20,40,60,80])
 	.enter().append("g");
//Draw the circles
axes.append("circle")
 	.attr("class", "axisCircles")
 	.attr("r", function(d) { return barScale(d); });
//Draw the axis labels
axes.append("text")
	.attr("class", "axisText")
	.attr("y", function(d) { return barScale(d); })
	.attr("dy", "0.3em")
	.text(function(d) { return d + "°F"});

//Add January for reference
barWrapper.append("text")
	.attr("class", "january")
	.attr("x", 12)
	.attr("y", -outerRadius * 1.6)
	.attr("dy", "2em")
	.text("January");
//Add a line to split the year
barWrapper.append("line")
	.attr("class", "yearLine")
	.attr("x1", 0)
	.attr("y1", 0.0)
	.attr("x2", 0)
	.attr("y2", -outerRadius * 1.7);

//Draw the graph

//Draw a bar per day were the height is the difference between the minimum and maximum temperature
//And the color is based on the mean temperature
barWrapper.selectAll(".tempBar")
 	.data(weathercolumbia)
 	.enter().append("rect")
 	.attr("class", "tempBar")
 	.attr("transform", function(d,i) { return "rotate(" + (angle(d.date)) + ")"; })
 	.attr("width", 1.5)
	.attr("height", function(d,i) { return barScale(d.max_temp) - barScale(d.min_temp); })
 	.attr("x", -0.75)
 	.attr("y", function(d,i) {return barScale(d.min_temp); })
 	.style("fill", function(d) { return colorScale(d.mean_temp); });

///////////////////////////////////////////////////////////////////////////
//////////////// Create the gradient for the legend ///////////////////////
///////////////////////////////////////////////////////////////////////////

//Extra scale since the color scale is interpolated
var tempScale = d3.scale.linear()
	.domain([20, 100])
	.range([0, width]);

//Calculate the variables for the temp gradient
var numStops = 10;
tempRange = tempScale.domain();
tempRange[2] = tempRange[1] - tempRange[0];
tempPoint = [];
for(var i = 0; i < numStops; i++) {
	tempPoint.push(i * tempRange[2]/(numStops-1) + tempRange[0]);
}//for i

//Create the gradient
svg.append("defs")
	.append("linearGradient")
	.attr("id", "legend-weather")
	.attr("x1", "0%").attr("y1", "0%")
	.attr("x2", "100%").attr("y2", "0%")
	.selectAll("stop")
	.data(d3.range(numStops))
	.enter().append("stop")
	.attr("offset", function(d,i) { return tempScale( tempPoint[i] )/width; })
	.attr("stop-color", function(d,i) { return colorScale( tempPoint[i] ); });

///////////////////////////////////////////////////////////////////////////
////////////////////////// Draw the legend ////////////////////////////////
///////////////////////////////////////////////////////////////////////////

var legendWidth = Math.min(outerRadius*1.4, 400);

//Color Legend container
var legendsvg = svg.append("g")
	.attr("class", "legendWrapper")
	.attr("transform", "translate(" + 0 + "," + (outerRadius + 70) + ")");

//Draw the Rectangle
legendsvg.append("rect")
	.attr("class", "legendRect")
	.attr("x", -legendWidth/2)
	.attr("y", -250)
	.attr("rx", 0)
	.attr("width", legendWidth)
	.attr("height", 8)
	.style("fill", "url(#legend-weather)");

//Append title
legendsvg.append("text")
	.attr("class", "legendTitle")
	.attr("x", 0)
	.attr("y", -260)
	.style("text-anchor", "middle")
	.text("Average Daily Temperature");

//Set scale for x-axis
var xScale = d3.scale.linear()
	 .range([-legendWidth/2, legendWidth/2])
	 .domain([20,100] );

//Define x-axis
var xAxis = d3.svg.axis()
	  .orient("bottom")
	  .ticks(10)
	  .tickFormat(function(d) { return d + "°F"; })
	  .scale(xScale);

//Set up X axis
legendsvg.append("g")
	.attr("class", "axis")
	.attr("transform", "translate(0," + (-240) + ")")
	.call(xAxis);
