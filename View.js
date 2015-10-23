define(function() {

  function View() {
    this.el = document.createElement('div');
    this.el.id = 'funnel';
  }

  View.prototype.render = function render(data) {
    var colours = [
    '#F4E8AE','#FAC5B8','#CAE8EA','#69BF2F',
    '#950040','#D6538C','#948671','#DEE1CF',
    ];

    var opts = {
      height: 300,
      width: 600,
    };

    var max = 5000;

    data = data || [{
      count: 3000,
      title: 'Awareness',
    }, {
      count: 1000,
      title: 'Interest',
    }, {
      count: 200,
      title: 'Desire',
    }, {
      count: 50,
      title: 'Action',
    },];

    var segmentHeight = opts.height / data.length;

    var svg = d3.select('#funnel')
      .append('svg')
      .attr({
        width: opts.width,
        height: opts.height,
      });

    var mentionScale = d3.scale.linear()
      .domain([0, max])
      .range([0, opts.width]);

    var stages = svg.selectAll('g')
      .data(data)
      .enter();

    var stageGroups = stages.append('g')
      .attr('transform', function(d, idx) {
        var width = mentionScale(d.count);
        var prevPoint = data[idx - 1];
        var offset = ((opts.width - width) / 2);
        return 'translate(' + offset + ',' + (segmentHeight * idx) + ')';
      });

    stageGroups.append('polygon')
      .attr('points', function(d, idx) {
        var topWidth = mentionScale(d.count);
        var nextPoint = data[idx + 1];
        var bottomWidth = (nextPoint) ? mentionScale(nextPoint.count) : topWidth;
        var offset = ((topWidth - bottomWidth) / 2);
        return [
          '0,0',
          topWidth + ',0',
          (offset + bottomWidth) + ',' + segmentHeight,
          offset + ',' + segmentHeight,
        ].join(' ');
      })
      .attr('fill', function(d, idx) {
        return colours[idx];
      })
      .on('click', function(d,i) {
        alert(d.title + ' -- ' + d.count);
      });

    stageGroups.append('foreignObject')
      .attr('class', 'funnel__label')
      .html(function(d) {
        return d.title + '<span class="funnel__count">(' + d.count + ')</span>';
      });
  };

  return View;
});
