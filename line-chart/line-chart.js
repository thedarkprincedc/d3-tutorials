(function(){
   var width = 640;
   var height = 480;
   function displayText(value){ 
       d3.select("body")
            .append("h1")
            .text(value.name);
   }

   function displayChart(value){
       
        let linefunc = d3.line()
            .x( (d) => { return d.month * 25; })
            .y( (d) => { return d.hits; })
            .curve(d3.curveLinear); 
        var screenSize = value.data.reduce(function(v, d){
            if(d.month * 25 > v.maxWidth){
                v.maxWidth = d.month * 25;
            }
            if(d.hits > v.maxHeight){
                v.maxHeight = d.hits;
            }
            return v;
        },{maxHeight: 0, maxWidth: 0})
        
        let svg = d3.select("body").append("svg") 
            .style("width", screenSize.maxWidth)
            .style("height", screenSize.maxHeight);
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