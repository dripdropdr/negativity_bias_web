google.charts.load("current", { packages: ["corechart"] });
google.charts.setOnLoadCallback(drawChart);

let json = {};

fetch("http://localhost:3000/unique")
  .then((res) => res.json())
  .then((data) => (json = data));

function drawChart() {
  var data = google.visualization.arrayToDataTable([
    ["Contry", "Count"],
    [json[0][0], json[0][1]],
    [json[1][0], json[1][1]],
    [json[2][0], json[2][1]],
    [json[3][0], json[3][1]],
    [json[4][0], json[4][1]],
    [json[5][0], json[5][1]],
    [json[6][0], json[6][1]],
    [json[7][0], json[7][1]],
    [json[8][0], json[8][1]],
    [json[9][0], json[9][1]],
  ]);

  var options = {
    title: "The number of Trendings (Yesterday)",
    width: 700,
    height: 400,
  };

  var chart = new google.visualization.ColumnChart(
    document.getElementById("columnchart")
  );
  chart.draw(data, options);
}