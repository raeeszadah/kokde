document.addEventListener("DOMContentLoaded", function () {
    loadTodos();
    loadExpenses();
    loadLendBorrow();
});

/* ---------------- NAVBAR FUNCTIONALITY ---------------- */
window.addEventListener("scroll", function () {
    let navbar = document.querySelector("header");
    if (window.scrollY > 50) {
        navbar.style.background = "#222";
    } else {
        navbar.style.background = "rgba(0, 0, 0, 0.8)";
    }
});

/* ---------------- SMOOTH SCROLLING ---------------- */
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener("click", function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute("href")).scrollIntoView({
            behavior: "smooth"
        });
    });
});

/* ---------------- TO-DO LIST FUNCTIONALITY ---------------- */
function addTodo() {
    let taskInput = document.getElementById("todoInput").value;
    let taskTime = document.getElementById("todoTime").value;
    let todoList = document.getElementById("todoList");

    if (taskInput === "" || taskTime === "") {
        alert("Please enter task and time!");
        return;
    }

    let li = document.createElement("li");
    li.innerHTML = `${taskInput} <span class="timer" data-time="${taskTime}"></span>
        <button class="delete" onclick="deleteTodo(this)">❌</button>`;
    
    todoList.appendChild(li);
    saveTodos();
    startTimer(li);
}

function deleteTodo(button) {
    button.parentElement.remove();
    saveTodos();
}

function startTimer(li) {
    let timeSpan = li.querySelector(".timer");
    let taskTime = new Date(timeSpan.getAttribute("data-time"));
    let countdown = setInterval(() => {
        let now = new Date();
        let diff = taskTime - now;

        if (diff <= 0) {
            timeSpan.innerHTML = "⏳ Time Up!";
            clearInterval(countdown);
            alert("Your task time is up! Did you complete it?");
        } else {
            let minutes = Math.floor(diff / 60000);
            let seconds = Math.floor((diff % 60000) / 1000);
            timeSpan.innerHTML = ⏳ ${minutes}m ${seconds}s;
        }
    }, 1000);
}

function saveTodos() {
    let todoList = document.getElementById("todoList").innerHTML;
    localStorage.setItem("todos", todoList);
}

function loadTodos() {
    let savedTodos = localStorage.getItem("todos");
    if (savedTodos) {
        document.getElementById("todoList").innerHTML = savedTodos;
    }
}

/* ---------------- EXPENSE TRACKER ---------------- */
let totalExpense = 0;
let remainingBalance = 5000;  // Default budget (can be customized)

function addExpense() {
    let name = document.getElementById("expenseName").value;
    let amount = parseFloat(document.getElementById("expenseAmount").value);
    let category = document.getElementById("expenseCategory").value;
    let expenseList = document.getElementById("expenseList");

    if (name === "" || isNaN(amount) || amount <= 0) {
        alert("Enter valid expense details!");
        return;
    }

    let li = document.createElement("li");
    li.innerHTML = `${name} - ₹${amount} <span>(${category})</span>
        <button class="delete" onclick="deleteExpense(this, ${amount})">❌</button>`;
    
    expenseList.appendChild(li);
    totalExpense += amount;
    remainingBalance -= amount;
    updateExpenseUI();
    saveExpenses();
}

function deleteExpense(button, amount) {
    button.parentElement.remove();
    totalExpense -= amount;
    remainingBalance += amount;
    updateExpenseUI();
    saveExpenses();
}

function updateExpenseUI() {
    document.getElementById("totalExpense").textContent = totalExpense;
    document.getElementById("remainingBalance").textContent = remainingBalance;
}

function saveExpenses() {
    let expenseList = document.getElementById("expenseList").innerHTML;
    localStorage.setItem("expenses", expenseList);
    localStorage.setItem("totalExpense", totalExpense);
    localStorage.setItem("remainingBalance", remainingBalance);
}

function loadExpenses() {
    let savedExpenses = localStorage.getItem("expenses");
    if (savedExpenses) {
        document.getElementById("expenseList").innerHTML = savedExpenses;
    }
    totalExpense = parseFloat(localStorage.getItem("totalExpense")) || 0;
    remainingBalance = parseFloat(localStorage.getItem("remainingBalance")) || 5000;
    updateExpenseUI();
}

/* ---------------- LEND/BORROW TRACKER ---------------- */
function addLendBorrow() {
    let person = document.getElementById("personName").value;
    let amount = parseFloat(document.getElementById("lendAmount").value);
    let type = document.getElementById("lendType").value;
    let lendList = document.getElementById("lendList");

    if (person === "" || isNaN(amount) || amount <= 0) {
        alert("Enter valid lend/borrow details!");
        return;
    }

    let li = document.createElement("li");
    li.innerHTML = `${person} - ₹${amount} <span>(${type})</span>
        <button class="delete" onclick="deleteLendBorrow(this)">❌</button>`;
    
    lendList.appendChild(li);
    saveLendBorrow();
}

function deleteLendBorrow(button) {
    button.parentElement.remove();
    saveLendBorrow();
}

function saveLendBorrow() {
    let lendList = document.getElementById("lendList").innerHTML;
    localStorage.setItem("lendBorrow", lendList);
}

function loadLendBorrow() {
    let savedLendBorrow = localStorage.getItem("lendBorrow");
    if (savedLendBorrow) {
        document.getElementById("lendList").innerHTML = savedLendBorrow;
    }
}