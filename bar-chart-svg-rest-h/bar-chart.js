(function(){
    let width = 640;
    let height = 480;
    let barSize = 32;
    function displayText(data){
        d3.select("body")
            .append("h1")
            .text(data.name);
    }
    function getMaxValue(data){
        var maxValue = 0;
        data.forEach( (v, i) => {
            if(v > maxValue){
                maxValue = v;
            }
        })
        return maxValue;
    }


    function displayChart(data){
        var padding = 14;
        var viewHieght = getMaxValue(data);
        var svg = d3.select("body")
                    .append("svg")
                    .style("width", width)
                    .style("height", viewHieght);
        svg.selectAll("rect")
                .data(data)
                .enter()
                .append("rect")
                    .style("width", (d) => { return "32px"; } )
                    .style("height", (d) => { return d + "px"; })
                    .style("x", (d,i) => { return (i*barSize)+"px"; })
                    .style("y", (d,i) => { 
                        return (viewHieght) - d;
                    })
                    .style("fill", (d, i) => { return "rgb(0,"+(d*2)+",0)"; })
                    .on('mouseover', function(d, i, e) {
                        d3.select(e[i]).style("fill", "red");
                    
                    })
                    .on('mouseout', function(d, i, e) {
                        d3.select(e[i]).style("fill", "rgb(0,"+(d*2)+",0)");
                      
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
                    var padding = (barSize - calcWidth)/2;
                    return (d > 0) ? (i*barSize) + padding : 0; 
                })
                .attr("y", (d,i) => { 
                    return (d > 0) ? (viewHieght) - data[i] +16 : viewHieght-data[i] - 4 ;
                });
    }
    /////////////////////////
    d3.json("../_data/test.json").then((data) => {
        data.forEach((value, index) => {
            displayText(value);
            displayChart(value.data);
        })
    });
})();