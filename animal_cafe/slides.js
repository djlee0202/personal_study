(function() {
    var margin = { top: 50, left: 50, right: 50, bottom: 50},
    height = 800 - margin.top - margin.bottom,
    width = 1200 - margin.left - margin.right;

  var root = d3.select("#graphic")
        .append("svg")
        .attr("height", height + margin.top + margin.bottom)
        .attr("width", width + margin.left + margin.right)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  var svg = root.append("g");

  var map = svg.append("g")
               .attr("id", "map")

  var places = svg.append("g")
                  .attr("id", "places");

  var projection = d3.geo.mercator()
      .center([126.9895, 37.5651])
      .scale(100000)
      .translate([width/2, height/2]);

  var path = d3.geo.path().projection(projection);

  d3.json("seoul_municipalities_topo_simple.json",

  function(error, data) {
    var features = topojson.feature(data, data.objects.seoul_municipalities_geo).features;
    map.selectAll('path')
       .data(features)
       .enter().append('path')
       .attr('class', function(d) {
          // console.log();
          return 'municipality c' + d.properties.code })
       .attr('d', path)
       .style("opacity", 0) ;


    map.selectAll('text')
        .data(features)
      .enter().append("text")
        .attr("transform", function(d) { return "translate(" + path.centroid(d) + ")"; })
        .attr("dy", ".35em")
        .attr("class", "municipality-label")
        .text(function(d) { return d.properties.name_eng; })
        .style("opacity", 0)
  });
// 서울 지도 준비 완료

  // d3.csv("places.csv", function(data) {
  //     places.selectAll("circle")
  //         .data(data)
  //       .enter().append("circle")
  //         .attr("cx", function(d) { return projection([d.lon, d.lat])[0]; })
  //         .attr("cy", function(d) { return projection([d.lon, d.lat])[1]; })
  //         .attr("r", 10);
  //
  //     places.selectAll("text")
  //         .data(data)
  //       .enter().append("text")
  //         .attr("x", function(d) { return projection([d.lon, d.lat])[0]; })
  //         .attr("y", function(d) { return projection([d.lon, d.lat])[1] + 8; })
  //         .text(function(d) { return d.name });
  // });


// here is the part where i need to fix

  d3.queue()
    .defer(d3.csv, "places.csv")
    .await(ready)

  // for inspiration:
  // hue, 0-360
  var lineScale = d3.scaleLinear().domain([1, 15]).range([0, 'height']);

  var defs = places.append('defs');

  defs.append("pattern")
      .attr("id","jon-snow")
      .attr("height", "100%")
      .attr("width", "100%")
      .attr("patternContentUnits", "objectBoundingBox")
      .append("image")
      .attr("height", 1)
      .attr("width", 1)
      .attr("preserveAspectRatio", "none")
      .attr("xmlns:xlink", "http://www.w3.org/1999/xlink")
      .attr("xlink:href", "snow.jpg")

  function ready(error, datapoints) {

    // draw a bunch of circles
    // but don't give them a position
    // don't give them a radius
    // just make the circles exist
    // and give them a class of 'colordot'

    // find all of the color dots (there are none)
    // bind them to data
    // add new circles
    // and give them each a class of 'colordot'

    places.selectAll(".colordot")
      .data(datapoints)
      .enter().append("circle")
      .attr("class", "colordot")
      .style("fill", "#fff")
      .style("opacity", .5)      // set the element opacity
      .style("stroke", "black")    // set the line colour

  // 1) set the color of all of the circles
  // when you hit slide 2,
  // 2) make them all radius 4
  // 3) move them to the center of the svg






    // var images = defs.selectAll(".cafe-pattern")
    //                  .data(datapoints)
    //                  .enter().append("pattern")
    //                  .attr("class", "cafe-pattern")
    //                  .attr("height", "100%")
    //                  .attr("width", "100%")
    //                  .attr("id", function(d) {
    //                    // everyone has a unique name, so this sould be okay
    //                    return d.name.toLowerCase().replace(/ /g, "-")
    //                  })
    //                   .attr("patternContentUnits", "objectBoundingBox")
    //                   .append("image")
    //                   .attr("height", 48)
    //                   .attr("width", 48)
    //                   .attr("preserveAspectRatio", "none")
    //                   .attr("xmlns:xlink", "http://www.w3.org/1999/xlink")
    //                   .attr("xlink:href", 'http://placekitten.com/g/48/48')
    //                   .attr("x", function(d) { return -25;})
    //                   .attr("y", function(d) { return -25;})

        ;

    var colordots = places.selectAll(".colordot")
                          .attr("cx", function(d) { return projection([d.lon, d.lat])[0]; })
                          .attr("cy", function(d) { return projection([d.lon, d.lat])[1]; })
                          .attr("r", 0)
                          .style("fill", "#fff")
                          .style("fill", "url(#jon-snow)");

    //
    places.selectAll(".colortext")
          .data(datapoints)
          .enter().append("text")
          .attr("class", "colortext")
          .attr("x", function(d) { return projection([d.lon, d.lat])[0]; })
          .attr("y", function(d) { return projection([d.lon, d.lat])[1]; })
          .text(function(d) {return d.name})
          .attr("dy", 5)
          .attr("dx", 20)
          .style("opacity", 0)


    // 사진 넣기



      // var setEvents = images
      //         // Append hero text
      //         .on( 'click', function (d) {
      //             d3.select("h1").html("A");
      //             d3.select("h2").html("B");
      //             d3.select("h3").html ("C" );
      //          })
      //
      //          .on( 'mouseenter', function() {
      //            // select element in current context
      //            d3.select( this )
      //              .transition()
      //              .attr("x", function(d) { return -60;})
      //              .attr("y", function(d) { return -60;})
      //              .attr("height", 100)
      //              .attr("width", 100);
      //          })
      //          // set back
      //          .on( 'mouseleave', function() {
      //            d3.select( this )
      //              .transition()
      //              .attr("x", function(d) { return -25;})
      //              .attr("y", function(d) { return -25;})
      //              .attr("height", 50)
      //              .attr("width", 50);
      //          });
      //
      //         .on( 'mouseenter', function() {
      //           // select element in current context
      //           d3.select( this )
      //             .transition()
      //             .attr("x", function(d) { return -60;})
      //             .attr("y", function(d) { return -60;})
      //             .attr("height", 100)
      //             .attr("width", 100);
      //         })
      //         // set back
      //         .on( 'mouseleave', function() {
      //           d3.select( this )
      //             .transition()
      //             .attr("x", function(d) { return -25;})
      //             .attr("y", function(d) { return -25;})
      //             .attr("height", 50)
      //             .attr("width", 50);
      //         });
      //
      //




    // Listen for slidein events and slideout events
    // console.log("Just slid into slide 2")
    // console.log("Just slid out of slide 4")



// Slide 2--------------------------------------------------------------------
    d3.select("#slide-1").on('slidein', function() {
    places.selectAll(".colortext")
    .transition()
    .duration(600)
    .style("opacity", 1)

    map.selectAll('path')
    .transition()
    .duration(600)
    .style("opacity", 1)

    places.selectAll(".colordot")
    .transition()
    .duration(1200)
    .attr("r", 20)
    .style("opacity", .5)

    })

    d3.select("#slide-1").on('slideout', function() {
      map.selectAll('path')
      .transition()
      .duration(2500)
      .style("opacity", 0)
    })


// Slide 2--------------------------------------------------------------------
    d3.select("#slide-2").on('slidein', function() {
      // get all of the color dots!
      // then filter to only the ones with a chinese name
      // a.k.a. "if your name_chinese is not an empty string"
      places.selectAll(".colordot")
      .transition()
      .duration(2500)
      .attr("r", 20)
      .attr("cx", function(d, i) {return i % 2 * 80;})
      .attr("cy", function(d, i) {return parseInt(i / 30) * 20;})

      places.selectAll(".colortext")
      .transition()
      .duration(2500)
      .attr("x", function(d, i) {return i % 2* 80;})
      .attr("y", function(d, i) {return parseInt(i / 10) * 200;})
      .attr("dy", 5)
      .attr("dx", 15)
    })

    d3.select("#slide-2").on('slideout', function() {
      // console.log("Just slid out of slide 2")
    })



// Slide 3--------------------------------------------------------------------
    d3.select("#slide-3").on('slidein', function() {
      // get all of the color dots!
      // then filter to only the ones with a chinese name
      // a.k.a. "if your name_chinese is not an empty string"
      svg.selectAll(".colordot")
        .transition()
        .duration(750)
        .attr("r", function(d) {
          if(d.name_chinese != "") {
            return 2;
          } else {
            return 0;
          }
        })
        .attr("cx", function(d) {
          var a = angleScaleHue(d.Hue);
          var r = radiusScaleLightness(d.Lightness);
          return r * Math.sin(a) + width / 2;
        })
        .attr("cy", function(d) {
          var a = angleScaleHue(d.Hue);
          var r = radiusScaleLightness(d.Lightness);
          return r * Math.cos(a) + height / 2;
        })
    })

    d3.select("#slide-3").on('slideout', function() {
      // console.log("Just slid out of slide 3")
    })

// Slide 4--------------------------------------------------------------------
    d3.select("#slide-4").on('slidein', function() {

    })

    d3.select("#slide-4").on('slideout', function() {
      // console.log("Just slid out of slide 4")
    })


  }
})();
