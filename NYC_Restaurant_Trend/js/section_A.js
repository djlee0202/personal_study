
function section_A() {


	//Remove the bar chart to the right - if present
	barChart.selectAll("g").remove();
	barChart_other.selectAll("g").remove();

		d3.select("#section")
			.transition().duration(1000)
			.style("opacity",0)
			.call(endall, function() {
				d3.select("#section")
					.style("visibility","visible");
			});;

	//Increase opacity of the map


	//Start explanation
	d3.select("#explanation")
		.style("visibility","visible")
		.style("width", 550 + "px")
		.html("<p>According to data from the U.S. Census Bureau, the five <br>"
		+ " boros of New York City differ significantly in terms of <br>"
		+ "demographic diversity, which can be a factor <br> determining the types of restaurants that open and thrive <br> "
		+ "in each neighborhood.<p>")
		.transition().duration(1000)
		.style("opacity",1);

}
