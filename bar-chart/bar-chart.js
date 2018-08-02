(function(){
    var data = [30,50,90,10,5];
    d3.select(".chart")
        .selectAll("div")
        .data(data)
            .enter()
            .append("div")
            .style("width", (d) => { return d + "px"; })
            .text((d) => { return d; });
})();