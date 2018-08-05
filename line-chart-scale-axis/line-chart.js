(function () {
    var width = 640;
    var height = 200;
    var padding = 20;
    function displayText(value) {
        d3.select("body")
            .append("h1")
            .text(value.name);
    }
    function getDate(d){
        var strDate = new String(d);
        var year = strDate.substr(0,4);
        var month = strDate.substr(4,2)-1;
        var day = strDate.substr(6,2);
     
        return new Date(year, month, day)
    }

    function displayChart(value) {
        var minDate = getDate(value.data[0]["month"]);
        var maxDate = getDate(value.data[value.data.length-1]["month"]);
        console.log("Min Date: %s\nMax Date %s", minDate, maxDate)
 
        let xScale = d3.scaleTime()
            .domain([ 
                minDate,
                maxDate
            ]).range([padding, width-padding]);

        let yScale = d3.scaleLinear()
            .domain([0, d3.max(value.data, (v) => { return v.hits; })])
            .range([height-padding, 10]);
            
        let xAxisGen = d3.axisBottom(xScale)
            .tickValues(value.data.map(function(d){ return getDate(d.month);}))
            .tickFormat(d3.timeFormat("%b"));
        let yAxisGen = d3.axisLeft(yScale).ticks(4);

        let linefunc = d3.line()
            .x((d) => { return xScale(getDate(d.month)); })
            .y((d) => { return yScale(d.hits); })
            .curve(d3.curveLinear);

        let svg = d3.select("body").append("svg")
            .style("width", width)
            .style("height", height);

        let xAxis = svg.append("g").call(xAxisGen)
            .attr("class", "axis")
            .attr("transform", "translate(0,"+(height-padding)+")");

        let yAxis = svg.append("g").call(yAxisGen)
                    .attr("class", "axis")
                    .attr("transform", "translate("+20+",0)");

        let viz = svg.append("path")
            .attr("d", linefunc(value.data))
            .attr("stroke", "purple")
            .attr("stroke-width", 2)
            .attr("fill", "none")
            
    }
    d3.json("../_data/test.2.json").then((data) => {
        data.forEach((value, index) => {
            displayText(value);
            displayChart(value);
        })
    });
})();