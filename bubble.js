const file = 'data.json';
const width = window.innerWidth;
const height = window.innerHeight;
const colors = {
    html: '#F16529',
    css: '#1C88C7',
    js: '#FCC700'
};
const generateChart = data => {
    const bubble = data => d3.pack()
        .size([width, height])
        .padding(4)(d3.hierarchy({ children: data }).sum(d => d.score));

    const svg = d3.select('#bubble-chart')
        .style('width', width)
        .style('height', height);
    
    const root = bubble(data);

    const defs = svg.append('svg:defs');

    const node = svg.selectAll()
        .data(root.children)
        .enter().append('g')
        .attr('transform', `translate(${width / 2}, ${height / 2})`);
    
        for (item of data) {
            defs.append("svg:pattern")
            .attr("id", "placeholderimg" + item.id)
            .attr("width", 400)
            .attr("height", 400)
            .attr("patternUnits", "userSpaceOnUse")
            .append("svg:image")
            .attr("xlink:href", item.img)
            .attr("width", 400)
            .attr("height", 400)
            .attr("x", 0)
            .attr("y", 0);
        }
    const circle = node.append('circle')
        .attr("transform", "translate(200,200)")
        .attr("cx", -200)
        .attr("cy", -200)
        .style("fill", d => "url(#placeholderimg" + d.data.id + ")")
        .style('stroke', '#222');


    node.transition()
        .ease(d3.easeExpInOut)
        .duration(1000)
        .attr('transform', d => `translate(${d.x}, ${d.y})`);
    
    circle.transition()
        .ease(d3.easeExpInOut)
        .duration(1000)
        .attr('r', d => d.r);
    };

(async () => {
    data = await d3.json(file).then(data => data);
    generateChart(data);
})();

