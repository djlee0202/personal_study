
	var rVar = "Bronx";

function section_B() {

	//Remove
	d3.select("#explanation")
		.transition().duration(500)
		.style("opacity",0)
		.call(endall, function() {
			d3.select("#explanation")
				.style("visibility","visible");
		});

	//Show the buttons
	d3.select(".btn-group")
		.style("visibility", "visible");


	//Show the text
	d3.select("#section")
		.style("visibility","visible")
		.transition().duration(1200)
		.style("opacity",1);

	//Show the text on the right
	d3.select("#section")
		.transition()
		.style("opacity",0)
		.call(endall, function() {
			d3.select("#section")
				.style("visibility","visible");
			//Change title
			d3.select("#sectionText")
				.html('<h2>'+rVar+'	</h2>');
		})
		.transition().duration(1000)
		.style("opacity",1);

	//Increase opacity of the map


	setTimeout(BarChart_activate(), 1200);

}
