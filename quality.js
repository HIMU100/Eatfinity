document.addEventListener('DOMContentLoaded', function() {
    updateStats();

    initPieChart();
});

function updateStats() {
    const totalDonations = 50;
    const pointsEarned = totalDonations * 10;
    const totalRescued = 30;

    document.getElementById('totalDonations').textContent = totalDonations;
    document.getElementById('pointsEarned').textContent = pointsEarned;
    document.getElementById('totalRescued').textContent = totalRescued;
}

function initPieChart() {
    const ctx = document.getElementById('wasteBreakdownChart').getContext('2d');
    new Chart(ctx, {
        type: 'pie',
        data: {
            labels: ['Donated', 'Rescued', 'Wasted'],
            datasets: [{
                data: [50, 30, 20], 
                backgroundColor: ['#28a745', '#007bff', '#dc3545']
            }]
        },
        options: {
            responsive: true,
            title: {
                display: true,
                text: 'Food Waste Breakdown'
            }
        }
    });
}