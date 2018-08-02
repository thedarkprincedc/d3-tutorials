(function(){
    let width = 640;
    let height = 480;
  
    function displayText(data){
        d3.select("body")
            .append("h1")
            .text(data.name);
    }
    function displayChart(data){
        var padding = 14;
        var svg = d3.select("body")
                    .append("svg")
                    .style("width", width)
                    .style("height", data.length * 16);
        svg.selectAll("rect")
                .data(data)
                .enter()
                .append("rect")
                    .style("width", (d) => { return d + "px"; })
                    .style("height", (d) => { return "16px"; })
                    .style("y", (d,i) => { return (i*16)+"px"; })
                    .style("fill", (d, i) => { return "rgb(0,"+(d*2)+",0)"; })
                    .on('mouseover', function(d) {
                       
                        //svg.select(this).attr("r", 10).style("fill", "red");
                    })
          
        var text = svg.selectAll("text")
            .data(data)
            .enter()
            .append("text")
            .text( (d,i) => { return d; })
                .style("text-anchor", "start")
                .style("fill", "red")
                .style("font-size", "16px")
                .attr("x", (d,i,e) => { 
                    var calcWidth = e[i].getComputedTextLength();
                    return (d > 0) ? (data[i] - calcWidth - 2) : 0;
                })
                .attr("y", (d,i) => { return ( (i*16) + padding) +"px";  })
    }
    /////////////////////////
    d3.json("../_data/test.json").then((data) => {
        data.forEach((value, index) => {
            displayText(value);
            displayChart(value.data);
        })
    });
})();