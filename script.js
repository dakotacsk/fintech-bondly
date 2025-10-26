document.addEventListener('DOMContentLoaded', () => {
    const treasuryRatesEl = document.getElementById('treasury-rates').querySelector('p:first-child');
    const corporateBondsEl = document.getElementById('corporate-bonds').querySelector('p:first-child');
    const fedFundsRateEl = document.getElementById('fed-funds-rate').querySelector('p:first-child');
    const cpiDataEl = document.getElementById('cpi-data').querySelector('p:first-child');
    const alertModal = document.getElementById('alert-modal');
    const closeModal = document.getElementById('close-modal');

    // Simulate real-time data updates
    const updateRates = () => {
        treasuryRatesEl.textContent = `${(Math.random() * (3.5 - 2.5) + 2.5).toFixed(3)}%`;
        corporateBondsEl.textContent = `${(Math.random() * (4.5 - 3.5) + 3.5).toFixed(3)}%`;
        fedFundsRateEl.textContent = `${(Math.random() * (5.5 - 5.25) + 5.25).toFixed(3)}%`;
        cpiDataEl.textContent = `${(Math.random() * (3.2 - 2.8) + 2.8).toFixed(2)}%`;
    };

    setInterval(updateRates, 3000); // Update every 3 seconds
    updateRates(); // Initial update

    // Chart.js implementation
    const ctx = document.getElementById('bondChart').getContext('2d');
    const bondChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: Array.from({ length: 10 }, (_, i) => `T-${9 - i}`),
            datasets: [{
                label: 'Yield',
                data: Array.from({ length: 10 }, () => (Math.random() * (3.5 - 2.5) + 2.5).toFixed(3)),
                borderColor: 'var(--emerald-green)',
                backgroundColor: 'rgba(0, 122, 51, 0.1)',
                fill: true,
                tension: 0.4
            }]
        },
        options: {
            responsive: true,
            scales: {
                y: {
                    beginAtZero: false
                }
            },
            plugins: {
                legend: {
                    display: false
                }
            }
        }
    });

    // Simulate chart updates
    setInterval(() => {
        bondChart.data.labels.shift();
        bondChart.data.labels.push('Now');
        bondChart.data.datasets[0].data.shift();
        bondChart.data.datasets[0].data.push((Math.random() * (3.5 - 2.5) + 2.5).toFixed(3));
        bondChart.update();
    }, 5000);

    // Sidebar navigation
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            // e.preventDefault();
            navLinks.forEach(l => l.classList.remove('active'));
            link.classList.add('active');
        });
    });

    // Modal control
    const showAlert = () => {
        alertModal.classList.remove('hidden');
    };

    closeModal.addEventListener('click', () => {
        alertModal.classList.add('hidden');
    });

    // Example: show alert after 10 seconds
    setTimeout(showAlert, 10000);
});
