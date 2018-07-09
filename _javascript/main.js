function getRandomColor() {
  var letters = '0123456789ABCDEF';
  var color = '#';
  for (var i = 0; i < 6; i++ ) {
      color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

function renderChart(data, target, colorScheme, showLegend) {
  let labels = []
  let values = []

  for (i = 0; i < data.length; i++) {
    labels.push(data[i]["selector"])
    values.push(data[i]["count"])
  }

  let devices_canvas = document.getElementById(target)
  new Chart(devices_canvas, {
    type: 'doughnut',
    data: {
      labels: labels,
      datasets: [{
        data: values,
        backgroundColor: palette(colorScheme, values.length).map(function(hex) {
          return '#' + hex;
        })
      }]
    },
    options: {
      legend: {
         display: showLegend
      },
      responsive: true
    }
  })
}

document.addEventListener('DOMContentLoaded', () => {
  fetch("https://collectra.herokuapp.com/statistics.json").then(function (response) {
    return response.json()
  }).then(function (data) {
    let num_devices = data.total_count;
    document.getElementById("num_devices").innerHTML = num_devices
    document.getElementById("num_wrapper").style = ""

    // Setup device breakdown labels
    renderChart(data["by_device_model"], "devices-breakdown", "mpn65", false)
    renderChart(data["by_ios_version"], "version-breakdown", "mpn65", false)
    renderChart(data["by_electra_version"], "electra-version-breakdown", "mpn65", false)

    setInterval(() => {
      document.getElementById("num_devices").innerHTML = parseInt(document.getElementById("num_devices").innerHTML) + 1
    }, 1000)
  })
});
