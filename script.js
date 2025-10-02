

        // Initialize Chart
        document.addEventListener('DOMContentLoaded', function() {
            const ctx = document.getElementById('priceChart').getContext('2d');
            const priceChart = new Chart(ctx, {
                type: 'line',
                data: {
                    labels: ['10:00', '10:15', '10:30', '10:45', '11:00', '11:15', '11:30'],
                    datasets: [{
                        label: 'BTC/USD',
                        data: [45000, 45200, 45100, 45300, 45500, 45400, 45600],
                        borderColor: '#0066ff',
                        backgroundColor: 'rgba(0, 102, 255, 0.1)',
                        borderWidth: 2,
                        fill: true,
                        tension: 0.4
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: {
                            display: false
                        }
                    },
                    scales: {
                        y: {
                            grid: {
                                color: 'rgba(255, 255, 255, 0.1)'
                            },
                            ticks: {
                                color: 'rgba(255, 255, 255, 0.7)'
                            }
                        },
                        x: {
                            grid: {
                                color: 'rgba(255, 255, 255, 0.1)'
                            },
                            ticks: {
                                color: 'rgba(255, 255, 255, 0.7)'
                            }
                        }
                    }
                }
            });

            // Mode Toggle
            const modeToggle = document.getElementById('modeToggle');
            const modeLabel = document.getElementById('modeLabel');
            const currentMode = document.getElementById('currentMode');

            modeToggle.addEventListener('change', function() {
                if (this.checked) {
                    modeLabel.textContent = 'Trading Mode';
                    currentMode.textContent = 'TRADING MODE';
                    currentMode.className = 'badge bg-info fs-6 p-2';
                } else {
                    modeLabel.textContent = 'Training Mode';
                    currentMode.textContent = 'TRAINING MODE';
                    currentMode.className = 'badge bg-success fs-6 p-2';
                }
            });

            // Control Buttons
            document.getElementById('startBtn').addEventListener('click', function() {
                document.getElementById('botStatus').textContent = 'RUNNING';
                document.getElementById('botStatus').className = 'status-running';
            });

            document.getElementById('pauseBtn').addEventListener('click', function() {
                document.getElementById('botStatus').textContent = 'PAUSED';
                document.getElementById('botStatus').className = 'status-idle';
            });

            document.getElementById('resetBtn').addEventListener('click', function() {
                document.getElementById('botStatus').textContent = 'IDLE';
                document.getElementById('botStatus').className = 'status-idle';
            });
        });
        //Filter 
        function myFunction() {
  var input, filter, table, tr, td, i, txtValue;
  input = document.getElementById("myInput");
  filter = input.value.toUpperCase();
  table = document.getElementById("myTable");
  tr = table.getElementsByTagName("tr");
  for (i = 0; i < tr.length; i++) {
    td = tr[i].getElementsByTagName("td")[0];
    if (td) {
      txtValue = td.textContent || td.innerText;
      if (txtValue.toUpperCase().indexOf(filter) > -1) {
        tr[i].style.display = "";
      } else {
        tr[i].style.display = "none";
      }
    }       
  }
}