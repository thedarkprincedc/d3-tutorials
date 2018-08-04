(function(){
   var width = 640;
   var height = 200;
   function displayText(value){ 
       d3.select("body")
            .append("h1")
            .text(value.name);
   }

   function displayChart(value){
    let xScale = d3.scaleLinear()
                    .domain([
                        d3.min(value.data, (v) => { return v.month; }),
                        d3.max(value.data, (v) => { return v.month; })
                    ])
                    .range([0, width]);
    let yScale = d3.scaleLinear()
                    .domain([0, d3.max(value.data, (v) => { return v.hits})])
                    .range([height, 0]);
        let linefunc = d3.line()
            .x( (d) => { return xScale(d.month); })
            .y( (d) => { return yScale(d.hits); })
            .curve(d3.curveLinear); 
        
        let svg = d3.select("body").append("svg") 
            .style("width", width)
            .style("height", height);
        let viz = svg.append("path")
            .attr("d", linefunc(value.data))
            .attr("stroke", "purple")
            .attr("stroke-width", 2)
            .attr("fill", "none")
   }
   d3.json("../_data/test.1.json").then((data) => {
        data.forEach((value, index) => {
            displayText(value);
            displayChart(value);
        })
    });
})();