const expenseList = document.getElementById("expense-list");
const expenseChart = document.getElementById("expenseChart").getContext("2d");
const remainingBudgetElement = document.createElement('p');
let expenses = [];
let monthlyBudget = 100000;
let chart = null;

remainingBudgetElement.id = 'remaining-budget';
document.getElementById("profile").appendChild(remainingBudgetElement);
updateRemainingBudget();

document.getElementById("expense-amount").addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
        event.preventDefault();
        addExpense();
    }
});

function addExpense() {
    const name = document.getElementById("expense-name").value;
    const amount = parseFloat(document.getElementById("expense-amount").value);

    if (name && !isNaN(amount)) {
        expenses.push({ name, amount });
        monthlyBudget -= amount;  // Subtract the expense from the monthly budget
        updateExpenseList();
        updateRemainingBudget();
        updateChart();
        document.getElementById("expense-name").value = "";
        document.getElementById("expense-amount").value = "";
    }
}

function updateExpenseList() {
    expenseList.innerHTML = "";
    expenses.forEach((expense, index) => {
        const li = document.createElement("li");
        li.textContent = ${expense.name}: ₹${expense.amount};
        expenseList.appendChild(li);
    });
}

function updateRemainingBudget() {
    remainingBudgetElement.textContent = Remaining Budget: ₹${monthlyBudget};
}

function updateChart() {
    const labels = expenses.map(exp => exp.name);
    const data = expenses.map(exp => exp.amount);

    if (chart) {
        chart.destroy();
    }

    chart = new Chart(expenseChart, {
        type: 'pie',
        data: {
            labels: labels,
            datasets: [{
                label: 'Expenses',
                data: data,
                backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF', '#FF9F40'],
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            plugins: {
                legend: {
                    position: 'top',
                }
            }
        }
    });
}