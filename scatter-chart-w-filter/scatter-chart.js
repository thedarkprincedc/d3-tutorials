(function () {
    var width = 640;
    var height = 200;
    var padding = 20;

    function displayText(value) {
        d3.select("body")
            .append("h1")
            .text(value.name);
    }

    function getDate(d) {
        var strDate = new String(d);
        var year = strDate.substr(0, 4);
        var month = strDate.substr(4, 2) - 1;
        var day = strDate.substr(6, 2);

        return new Date(year, month, day)
    }

    function salesKPI(d) {
        if (d >= 250) {
            return "#33CC66";
        } else if (d < 250) {
            return "#666666";
        }
    }
    function showMinMax(values, name, currValue, type){
 
        if(type=="none"){
            
        } else if(type=="minMax"){

        } else if(type=="all"){
            return currValue;
        }
    }
    function displayChart(value) {
        let svg = d3.select("body").append("svg")
            .style("width", width)
            .style("height", height);
        var minDate = value.data[0]["month"];
        var maxDate = value.data[value.data.length - 1]["month"];
        let xScale = d3.scaleLinear()
            .domain([
                minDate,
                maxDate
            ]).range([padding, width - padding]);
        let yScale = d3.scaleLinear()
            .domain([0, d3.max(value.data, (v) => {
                return v.hits;
            })])
            .range([height - padding, 10]);
        let xAxisGen = d3.axisBottom(xScale)
        let yAxisGen = d3.axisLeft(yScale).ticks(4);
        let xAxis = svg.append("g").call(xAxisGen)
            .attr("class", "axis")
            .attr("transform", "translate(0," + (height - padding) + ")");
        let yAxis = svg.append("g").call(yAxisGen)
            .attr("class", "axis")
            .attr("transform", "translate(" + 20 + ",0)");

        let dots = svg.selectAll("circle")
            .data(value.data)
            .enter()
            .append("circle")
            .attr("cx", (d) => {
                return xScale(d.month);
            })
            .attr("cy", (d) => {
                return yScale(d.hits);
            })
            .attr("r", 5)
            .attr("fill", (d) => {
                return salesKPI(d.hits);
            });


        let labels = svg.append("g")
            .selectAll("text")
            .data(value.data)
            .enter()
                .append("text")
                .attr("x", (d) => {
                    return xScale(d.month) - padding;
                })
                .attr("y", (d) => {
                    return yScale(d.hits) - 5;
                })
                .text((d) => {
                    return showMinMax(value.data, "hits", d.hits, "all");
                })
                .style("font-size", "12px")
                .style("font-famly", "sans-serif")
                .style("fill", "#666666")
                .style("text-anchor", "start")
  
    }
    d3.json("../_data/test.1.json").then((data, index) => {
        data.forEach((value, index) => {
            displayText(value);
            displayChart(value);
        })
        d3.select("select")
        .on("change", (d) => {
            var selection = d3.select("#showLabel").node().value;
            d3.selectAll("text")
                .data(data[0].data)        
                .text((d, i, e) => {
                    console.log(d);
                    debugger;
                    return showMinMax(data[0].data, "hits", d.hits, selection);
                })
        })
    });
})();