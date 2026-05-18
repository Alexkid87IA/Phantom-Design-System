// Shared sparkline SVG generator
export function sparkline(data, width, height, opts) {
  var o = opts || {};
  var color = o.color || 'currentColor';
  var opacity = o.opacity || 0.3;
  var fill = o.fill || false;
  var preserveAR = o.preserveAspectRatio || '';

  var max = Math.max.apply(null, data);
  var min = Math.min.apply(null, data);
  var range = max - min || 1;
  var points = data.map(function(v, i) {
    var x = (i / (data.length - 1)) * width;
    var y = height - ((v - min) / range) * (height * 0.8) - height * 0.1;
    return x + ',' + y;
  }).join(' ');

  var svgWidth = preserveAR ? '100%' : width;
  var par = preserveAR ? ' preserveAspectRatio="' + preserveAR + '"' : '';
  var pos = preserveAR ? 'display:block' : 'position:absolute;bottom:0;left:0;right:0';

  return '<svg width="' + svgWidth + '" height="' + height + '" viewBox="0 0 ' + width + ' ' + height + '"' + par + ' style="' + pos + ';opacity:' + opacity + '">'
    + '<polyline points="' + points + '" fill="none" stroke="' + color + '" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />'
    + '</svg>';
}
