// Food Waste Prediction Model - JavaScript Implementation
class FoodWastePredictor {
    constructor() {
        // Model coefficients based on training data
        this.slope = 0.83;
        this.intercept = 7;
    }

    predict(foodCooked) {
        return Math.round(this.slope * foodCooked + this.intercept);
    }

    batchPredict(foodCookedArray) {
        return foodCookedArray.map(amount => this.predict(amount));
    }
}

// Dummy data for demonstrations
const dummyData = {
    // Training data from the original model
    trainingData: {
        foodCooked: [100, 200, 300, 400, 500, 600, 700],
        foodSaved: [90, 180, 250, 330, 410, 500, 580]
    },

    // Monthly food cooked data (in tons)
    monthlyFoodCooked: [150, 180, 220, 280, 320, 380, 450, 420, 500, 580, 520, 620],

    // Daily predictions for the current week
    weeklyData: [
        { day: 'Monday', foodCooked: 320, predicted: null },
        { day: 'Tuesday', foodCooked: 280, predicted: null },
        { day: 'Wednesday', foodCooked: 450, predicted: null },
        { day: 'Thursday', foodCooked: 380, predicted: null },
        { day: 'Friday', foodCooked: 520, predicted: null },
        { day: 'Saturday', foodCooked: 600, predicted: null },
        { day: 'Sunday', foodCooked: 420, predicted: null }
    ],

    // Restaurant-wise data
    restaurantData: [
        { name: 'Taj Restaurant', foodCooked: 250, type: 'Fine Dining' },
        { name: 'Delhi Bakery', foodCooked: 180, type: 'Bakery' },
        { name: 'Food Court Mall', foodCooked: 420, type: 'Food Court' },
        { name: 'Street Food Corner', foodCooked: 150, type: 'Street Food' },
        { name: 'Hotel Grand', foodCooked: 380, type: 'Hotel' },
        { name: 'Cafeteria Plus', foodCooked: 320, type: 'Cafeteria' }
    ]
};

// Initialize the ML model
const model = new FoodWastePredictor();

// Generate predictions for all dummy data
function generatePredictions() {
    // Add predictions to weekly data
    dummyData.weeklyData.forEach(day => {
        day.predicted = model.predict(day.foodCooked);
    });

    // Add predictions to restaurant data
    dummyData.restaurantData.forEach(restaurant => {
        restaurant.predicted = model.predict(restaurant.foodCooked);
    });

    // Generate monthly predictions
    dummyData.monthlyPredictions = model.batchPredict(dummyData.monthlyFoodCooked);
}

// Create prediction trend chart
function createPredictionChart() {
    const ctx = document.getElementById('predictionChart').getContext('2d');

    new Chart(ctx, {
        type: 'scatter',
        data: {
            datasets: [{
                label: 'Historical Data Points',
                data: dummyData.trainingData.foodCooked.map((cooked, i) => ({
                    x: cooked,
                    y: dummyData.trainingData.foodSaved[i]
                })),
                backgroundColor: '#16a34a',
                borderColor: '#16a34a',
                pointRadius: 8,
                pointHoverRadius: 12
            }, {
                label: 'ML Prediction Line',
                data: [
                    { x: 0, y: model.predict(0) },
                    { x: 800, y: model.predict(800) }
                ],
                type: 'line',
                borderColor: '#ea580c',
                backgroundColor: 'transparent',
                borderWidth: 3,
                pointRadius: 0,
                fill: false
            }, {
                label: 'Current Week Predictions',
                data: dummyData.weeklyData.map(day => ({
                    x: day.foodCooked,
                    y: day.predicted
                })),
                backgroundColor: '#3b82f6',
                borderColor: '#3b82f6',
                pointRadius: 6,
                pointHoverRadius: 10
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                title: {
                    display: true,
                    text: 'Food Waste Prediction Model - Live Data',
                    font: { size: 16 }
                },
                legend: {
                    display: true,
                    position: 'top'
                },
                tooltip: {
                    callbacks: {
                        label: function (context) {
                            if (context.datasetIndex === 2) {
                                const dayIndex = context.dataIndex;
                                const day = dummyData.weeklyData[dayIndex];
                                return `${day.day}: ${context.parsed.x}kg cooked → ${context.parsed.y}kg saved`;
                            }
                            return `${context.parsed.x}kg cooked → ${context.parsed.y}kg saved`;
                        }
                    }
                }
            },
            scales: {
                x: {
                    title: {
                        display: true,
                        text: 'Food Cooked (kg)',
                        font: { size: 14 }
                    }
                },
                y: {
                    title: {
                        display: true,
                        text: 'Food Saved from Waste (kg)',
                        font: { size: 14 }
                    }
                }
            }
        }
    });
}

// Create monthly projection chart
function createMonthlyChart() {
    const ctx = document.getElementById('monthlyChart').getContext('2d');

    new Chart(ctx, {
        type: 'line',
        data: {
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
            datasets: [{
                label: 'Food Cooked (tons)',
                data: dummyData.monthlyFoodCooked,
                borderColor: '#6b7280',
                backgroundColor: 'rgba(107,114,128,0.1)',
                tension: 0.4,
                pointRadius: 4
            }, {
                label: 'Food Saved (tons)',
                data: dummyData.monthlyPredictions,
                fill: true,
                borderColor: '#16a34a',
                backgroundColor: 'rgba(34,197,94,0.2)',
                tension: 0.4,
                pointRadius: 6,
                pointHoverRadius: 8
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                title: {
                    display: true,
                    text: '2025 Monthly Food Waste Reduction Projection',
                    font: { size: 16 }
                },
                legend: {
                    display: true,
                    position: 'top'
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    title: {
                        display: true,
                        text: 'Amount (tons)',
                        font: { size: 14 }
                    }
                }
            }
        }
    });
}

// Create weekly predictions chart
function createWeeklyChart() {
    const ctx = document.getElementById('weeklyChart').getContext('2d');

    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: dummyData.weeklyData.map(d => d.day),
            datasets: [{
                label: 'Food Cooked (kg)',
                data: dummyData.weeklyData.map(d => d.foodCooked),
                backgroundColor: 'rgba(107,114,128,0.6)',
                borderColor: '#6b7280',
                borderWidth: 1
            }, {
                label: 'Predicted Food Saved (kg)',
                data: dummyData.weeklyData.map(d => d.predicted),
                backgroundColor: 'rgba(34,197,94,0.6)',
                borderColor: '#16a34a',
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                title: {
                    display: true,
                    text: 'This Week\'s Food Waste Predictions',
                    font: { size: 16 }
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    title: {
                        display: true,
                        text: 'Amount (kg)'
                    }
                }
            }
        }
    });
}

// Create restaurant predictions table
function createRestaurantTable() {
    const tableBody = document.getElementById('restaurantTableBody');
    if (!tableBody) return;

    tableBody.innerHTML = '';

    dummyData.restaurantData.forEach(restaurant => {
        const row = document.createElement('tr');
        row.className = 'hover:bg-gray-50';

        row.innerHTML = `
            <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">${restaurant.name}</td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${restaurant.type}</td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">${restaurant.foodCooked} kg</td>
            <td class="px-6 py-4 whitespace-nowrap text-sm font-semibold text-green-600">${restaurant.predicted} kg</td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${Math.round((restaurant.predicted / restaurant.foodCooked) * 100)}%</td>
        `;

        tableBody.appendChild(row);
    });
}

// Update live statistics
function updateLiveStats() {
    const totalFoodCooked = dummyData.weeklyData.reduce((sum, day) => sum + day.foodCooked, 0);
    const totalFoodSaved = dummyData.weeklyData.reduce((sum, day) => sum + day.predicted, 0);
    const averageEfficiency = Math.round((totalFoodSaved / totalFoodCooked) * 100);

    // Update summary cards
    const summaryData = {
        'total-cooked': totalFoodCooked.toLocaleString(),
        'total-saved': totalFoodSaved.toLocaleString(),
        'efficiency': averageEfficiency
    };

    Object.keys(summaryData).forEach(id => {
        const element = document.getElementById(id);
        if (element) {
            element.textContent = summaryData[id] + (id === 'efficiency' ? '%' : ' kg');
        }
    });
}

// Animate counter numbers
function animateCounters() {
    const counters = document.querySelectorAll('#impact-ticker .text-5xl');
    counters.forEach(counter => {
        const target = parseInt(counter.textContent.replace(/,/g, ''));
        let current = 0;
        const increment = target / 100;

        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                counter.textContent = target.toLocaleString();
                clearInterval(timer);
            } else {
                counter.textContent = Math.floor(current).toLocaleString();
            }
        }, 30);
    });
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', function () {
    // Generate all predictions
    generatePredictions();

    // Create charts
    setTimeout(() => {
        createPredictionChart();
        createMonthlyChart();
        if (document.getElementById('weeklyChart')) {
            createWeeklyChart();
        }
    }, 100);

    // Create restaurant table
    createRestaurantTable();

    // Update live stats
    updateLiveStats();

    // Set up intersection observer for counter animation
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounters();
                observer.unobserve(entry.target);
            }
        });
    });

    const impactSection = document.getElementById('impact-ticker');
    if (impactSection) {
        observer.observe(impactSection);
    }

    console.log('Food Waste Prediction System Initialized');
    console.log('Weekly Predictions:', dummyData.weeklyData);
    console.log('Restaurant Predictions:', dummyData.restaurantData);
});

// Export for potential use in other scripts
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { FoodWastePredictor, dummyData, model };
}