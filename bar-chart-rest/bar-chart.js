(function(){
    let width = 640;
    let height = 480;
    function displayText(data){
        d3.select("body")
            .append("h1")
            .text(data.name);
    }
    function displayChart(data){
        d3.select("body")
            .append("div")
            .attr("class", "chart")
            .selectAll("div")
            .data(data)
            .enter()
            .append("div")
            .style("width", (d) => { return d + "px"; })
            .text((d) => { return d; });
    }
    /////////////////////////
    d3.json("./test.json").then((data) => {
        data.forEach((value, index) => {
            displayText(value);
            displayChart(value.data);
        })
    });
})();