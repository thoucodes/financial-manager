const token = localStorage.getItem("token");

if (!token) {
    alert("Please login first.");
    window.location.href = "login.html";
}

const transactionRows = document.getElementById("transaction-rows");
const userNameSpan = document.querySelector(".user-name");
const totalBalanceEl = document.getElementById("total-balance");
const totalIncomeEl = document.getElementById("total-income");
const totalExpenseEl = document.getElementById("total-expense");

const filterType = document.getElementById("filter-type");
const yearSelect = document.getElementById("year-select");
const monthSelect = document.getElementById("month-select");

let allTransactions = [];

const toast = document.getElementById("toast");

function showToast(message) {
    toast.textContent = message;
    toast.classList.remove("hidden");

    setTimeout(() => {
        toast.classList.add("hidden");
    }, 2500);
}

async function loadUser() {
    try {
        const response = await fetch("https://financial-manager-ulhs.onrender.com/api/auth/me", {
            method: "GET",
            headers: { "Authorization": token },
        });

        const data = await response.json();

        if (data.success) {
            userNameSpan.textContent = data.user.fullname;
            populateYearOptions(data.user.createdAt);
        } else {
            alert("Session expired. Please login again.");
            localStorage.removeItem("token");
            window.location.href = "login.html";
        }
    } catch (error) {
        console.error(error);
    }
}

function populateYearOptions(createdAt) {
    const startYear = new Date(createdAt).getFullYear();
    const currentYear = new Date().getFullYear();
    const endYear = currentYear + 10; // shows 10 years into the future

    yearSelect.innerHTML = "";

    for (let year = endYear; year >= startYear; year--) {
        const option = document.createElement("option");
        option.value = year;
        option.textContent = year;
        yearSelect.appendChild(option);
    }
}

async function loadTransactions() {
    try {
        const response = await fetch("https://financial-manager-ulhs.onrender.com/api/transactions", {
            method: "GET",
            headers: { "Authorization": token },
        });

        const data = await response.json();

        if (data.success) {
            allTransactions = data.transactions;
            applyFilter();
        }
    } catch (error) {
        console.error(error);
    }
}

function applyFilter() {
    let filtered = allTransactions;

    if (filterType.value === "year") {
        const year = yearSelect.value;
        filtered = allTransactions.filter((t) => t.date.startsWith(year));
    } else if (filterType.value === "month") {
        const year = yearSelect.value;
        const month = monthSelect.value;
        filtered = allTransactions.filter((t) => t.date.startsWith(`${year}-${month}`));
    }

    renderSummary(filtered);
    renderRecentTransactions(filtered);
}

function renderSummary(transactions) {
    let income = 0;
    let expense = 0;

    transactions.forEach((t) => {
        if (t.type === "income") {
            income += t.amount;
        } else {
            expense += t.amount;
        }
    });

    const balance = income - expense;

    totalBalanceEl.textContent = `₹${balance.toFixed(2)}`;
    totalIncomeEl.textContent = `+₹${income.toFixed(2)}`;
    totalExpenseEl.textContent = `-₹${expense.toFixed(2)}`;
}

function renderRecentTransactions(transactions) {
    transactionRows.innerHTML = "";

    const recent = transactions.slice(0, 5);

    recent.forEach((transaction) => {
        const dateStr = new Date(transaction.date).toLocaleDateString();

        transactionRows.innerHTML += `
            <tr>
                <td>${dateStr}</td>
                <td>${transaction.category}</td>
                <td>${transaction.description}</td>
                <td class="${transaction.type === "income" ? "amount-positive" : "amount-negative"}">
                    ${transaction.type === "income" ? "+" : "-"}₹${transaction.amount}
                </td>
            </tr>
        `;
    });
}

filterType.addEventListener("change", () => {
    if (filterType.value === "year") {
        yearSelect.classList.remove("hidden");
        monthSelect.classList.add("hidden");
    } else if (filterType.value === "month") {
        yearSelect.classList.remove("hidden");
        monthSelect.classList.remove("hidden");
    } else {
        yearSelect.classList.add("hidden");
        monthSelect.classList.add("hidden");
    }

    applyFilter();
});

yearSelect.addEventListener("change", applyFilter);
monthSelect.addEventListener("change", applyFilter);

const addIncomeBtn = document.getElementById("add-income");
const addExpenseBtn = document.getElementById("add-expense");
const modal = document.getElementById("transaction-modal");
const cancelBtn = document.getElementById("cancel-btn");
const transactionForm = document.getElementById("transaction-form");
const category = document.getElementById("category");
const description = document.getElementById("description");
const amount = document.getElementById("amount");
const date = document.getElementById("date");
const incomeCategories = ["Salary", "Scholarship", "Others"];
const expenseCategories = ["Food", "Transport", "Shopping", "Medical", "Education", "Others"];

function populateCategories(categoryList) {
    category.innerHTML = "";

    categoryList.forEach((cat) => {
        const option = document.createElement("option");
        option.value = cat;
        option.textContent = cat;
        category.appendChild(option);
    });
}

let transactionType = "";

addIncomeBtn.addEventListener("click", () => {
    transactionType = "income";
    populateCategories(incomeCategories);
    modal.classList.remove("hidden");
});

addExpenseBtn.addEventListener("click", () => {
    transactionType = "expense";
    populateCategories(expenseCategories);
    modal.classList.remove("hidden");
});

cancelBtn.addEventListener("click", () => {
    modal.classList.add("hidden");
});

transactionForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    const transactionData = {
        type: transactionType,
        category: category.value,
        description: description.value,
        amount: amount.value,
        date: date.value,
    };

    try {
        const response = await fetch("https://financial-manager-ulhs.onrender.com/api/transactions/create", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": token,
            },
            body: JSON.stringify(transactionData),
        });

        const data = await response.json();

        if (data.success) {
            modal.classList.add("hidden");
            transactionForm.reset();
            loadTransactions();
            showToast("Transaction added successfully!")
        } else {
            alert(data.message);
        }
    } catch (error) {
        console.error(error);
        alert("Something went wrong.");
    }
});

loadUser();
loadTransactions();