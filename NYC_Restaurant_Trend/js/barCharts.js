var xAxis = d3.svg.axis()
    .orient("bottom");

var yAxis = d3.svg.axis()
          .orient("left")
	        .ticks(5);  //Set rough # of ticks


var bar_scale = d3.scale.linear();

var barHeight = 20,barChartHeight = 222,barTitleText;

// Source from https://groups.google.com/forum/#!msg/d3-js/WC_7Xi6VV50/j1HK0vIWI-EJ
// a function activated after the transition ends

function endall(transition, callback) {
  var n = 0;
  transition.each(function() { ++n; })
            .each("end", function() { if (!--n) callback.apply(this, arguments); });
}

//end function

function BarChart_activate() {

  //Remove any exisitng elements
  barChart.selectAll("g").remove();
	barChart_other.selectAll("g").remove();

	//Set the bar chart dimension and location
	barChart.attr("width", 300)
			.attr("height", barChartHeight)
			.attr("transform","translate(500,355)")
			.style("visibility","visible")
			.style("opacity",0)
			.transition().duration(2014)
			.style("opacity",1);

	barChart_other.attr("width", 250)
			.attr("height", 20)
			.attr("transform","translate(500, " + (350 + barChartHeight) +")")
			.style("visibility","visible")
			.style("opacity",0)
			.transition().duration(2014)
			.style("opacity",1);

	//Create the bar scale for Bronxulation as the initialization
	bar_scale
		.range([0, 200])
		.domain([0,600]);

	//Set up axes
	xAxis
		.ticks(5)
		.scale(bar_scale)
		.tickFormat(numFormat);

	//Create a group for each bar
	var bar = barChart.selectAll("g")
		.data(cuisines)
		.enter().append("g")
		.attr("class", "barWrapper")
		.style("visibility","visible")
		.attr("transform", function(d, i) { return "translate(75," + (20 + (d.rank_Bronx-10) * (barHeight)) + ")"; })
		;


	//2015
	bar.append("rect")
		.attr("class","boro_2015")
		.style("fill","#DA6761")
		.style("fill-opacity", 0.8)
		.attr("width", 0)
		.attr("height", barHeight - 2);

	//2014
	bar.append("rect")
		.attr("class","boro_2014")
		.style("fill","#858483")
		.style("opacity", 0.8)
		.attr("width", 0)
		.attr("height", barHeight - 2);

	// Cuisine type  on the left of the axis
	bar.append("text")
		.attr("class", "barLabels")
		.attr("x", -10)
		.attr("y", 11)
		.style("text-anchor", "end")
		.style("font-size", 10)
		.style("font-weight", 300)
		.style("fill","#292929")
		.style("font-family", "'Open Sans', sans-serif")
		.text(function(d) { return d.cuisines; });

	//x axis
	barChart_other.append("g")
		.attr("class", "x axis")
		.attr("transform", "translate(85," + 2 + ")");

	// y axis
	barChart_other.append("g")
		.attr("class", "y axis")
		.attr("transform", "translate(65," + -barChartHeight + ")");

	var barTitle = barChart.append("g")
		.append("text")
		.attr("class","barTitle titleTop")
		.style("visibility","visible")
		.attr("transform", "translate(175,5)")
		.style("text-anchor", "middle");

	if (rVar == "Bronx") {Bronx_BarGraph();};
	if (rVar == "Brooklyn") {Brooklyn_BarGraph();};
  if (rVar == "Manhattan") {Manhattan_BarGraph();};
  if (rVar == "Queens") {Queens_BarGraph();};
}

//Update the bar graph to Bronx
function Bronx_BarGraph() {
	rVar = "Bronx";
  barTitleText = "Numbers of Restaurant (Bronx)";
	updateBar();
}//Bronx_BarGraph

//Update the bar graph to Brooklyn
function Brooklyn_BarGraph() {
	rVar = "Brooklyn";
  barTitleText = "Numbers of Restaurant (Brooklyn)";
	updateBar();
}//Brooklyn_BarGraph

function Manhattan_BarGraph() {
	rVar = "Manhattan";
  barTitleText = "Numbers of Restaurant (Manhattan)";
	updateBar();
}//Brooklyn_BarGraph


function Queens_BarGraph() {
	rVar = "Queens";
  barTitleText = "Numbers of Restaurant (Queens)";
	updateBar();
}//Queens_BarGraph


function StatenIsalnd_BarGraph() {
	rVar = "StatenIsalnd";
  barTitleText = "Numbers of Restaurant (Staten Isalnd)";
	updateBar();
}//StatenIsalnd_BarGraph

//Update the bar graph to the chosen dimension in the buttons
function updateBar() {
	bar_scale.domain([0,d3.max(cuisines, function(d) {return eval("d." + rVar + "_2015");})])
	xAxis.scale(bar_scale);

	barChart.selectAll(".barWrapper")
		.style("visibility","visible")
		.transition().duration(1000)
		.attr("transform", function(d, i) { return "translate(75," + (20 + eval("d.rank_" + rVar + "-1") * barHeight) + ")"; });

	barChart.selectAll(".boro_2015")
		.transition().duration(1000)
		.attr("width", function(d) {return bar_scale(eval("d." + rVar + "_2015"));})

	barChart.selectAll(".boro_2014")
		.transition().duration(1000)
		.attr("width", function(d) {return bar_scale(eval("d." + rVar + "_2014"));})

	//Update the x axis
	barChart_other.select(".x.axis")
		.transition().duration(1000)
		.call(xAxis);

	barChart.selectAll(".barTitle")
		.text(barTitleText);

}//updateBar
