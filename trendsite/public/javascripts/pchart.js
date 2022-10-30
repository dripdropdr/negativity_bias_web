google.charts.load("current", { packages: ["corechart"] });
google.charts.setOnLoadCallback(drawChart);

let plrjson = {};

fetch("http://localhost:3000/polarity")
  .then((res) => res.json())
  .then((data) => (plrjson = data));

function drawChart() {

  var sum = Object.values(plrjson);
  console.log(sum);

  var positive = 0;
  var negative = 0;
  var neutral = 0;

  for(var i = 0; i < sum.length; i++){
    if(sum[i] > 0.1){
      positive = positive + 1;
    }
    else if(sum[i] >= 0){
      neutral = neutral + 1;
    }
    else{
      negative = negative + 1;
    }
  }
  var data = google.visualization.arrayToDataTable([
  ['Reaction', 'Percentage'],
  ['Positive', positive],
  ['Negative', negative],
  ['Neutral', neutral]
]);

  var options = {'title':'Total Negativity Bias', 'width':550, 'height':400};

  var chart = new google.visualization.PieChart(document.getElementById('piechart'));
  chart.draw(data, options);
}



