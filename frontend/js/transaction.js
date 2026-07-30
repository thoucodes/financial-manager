const token = localStorage.getItem("token");

if (!token) {
    alert("Please login first.");
    window.location.href = "login.html";
}

const transactionRows = document.getElementById("transaction-rows");
const filterType = document.getElementById("filter-type");
const filterCategory = document.getElementById("filter-category");
const searchInput = document.getElementById("search-input");
const pageButtons = document.querySelectorAll(".page-btn");

const PAGE_SIZE = 8;
let currentPage = 1;
let allTransactions = [];
let filteredTransactions = [];

const toast = document.getElementById("toast");

function showToast(message) {
    toast.textContent = message;
    toast.classList.remove("hidden");

    setTimeout(() => {
        toast.classList.add("hidden");
    }, 2500);
}

function getBadgeClass(category) {
    return `badge-${category.toLowerCase()}`;
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
            applyFilters();
        } else {
            alert("Session expired. Please login again.");
            localStorage.removeItem("token");
            window.location.href = "login.html";
        }
    } catch (error) {
        console.error(error);
    }
}

function applyFilters() {
    let filtered = allTransactions;

    if (filterType.value !== "all") {
        filtered = filtered.filter((t) => t.type === filterType.value);
    }

    if (filterCategory.value !== "all") {
        filtered = filtered.filter((t) => t.category.toLowerCase() === filterCategory.value);
    }

    const searchText = searchInput.value.trim().toLowerCase();
    if (searchText) {
        filtered = filtered.filter((t) => t.description.toLowerCase().includes(searchText));
    }

    filteredTransactions = filtered;
    currentPage = 1;
    renderPage(currentPage);
}

function renderPage(page) {
    const totalPages = Math.max(1, Math.ceil(filteredTransactions.length / PAGE_SIZE));

    if (page > totalPages || page < 1) {
        alert("This page is empty.");
        return;
    }

    currentPage = page;
    const start = (page - 1) * PAGE_SIZE;
    const pageItems = filteredTransactions.slice(start, start + PAGE_SIZE);

    renderRows(pageItems);
    updatePaginationUI(totalPages);
}

function renderRows(transactions) {
    transactionRows.innerHTML = "";

    if (transactions.length === 0) {
        transactionRows.innerHTML = `<tr><td colspan="5">No transactions found.</td></tr>`;
        return;
    }

    transactions.forEach((transaction) => {
        const dateStr = new Date(transaction.date).toLocaleDateString();
        const sign = transaction.type === "income" ? "+" : "-";
        const amountClass = transaction.type === "income" ? "amount-positive" : "amount-negative";

        transactionRows.innerHTML += `
            <tr data-id="${transaction._id}">
                <td>${dateStr}</td>
                <td>${transaction.description}</td>
                <td><span class="badge ${getBadgeClass(transaction.category)}">${transaction.category}</span></td>
                <td class="${amountClass}">${sign}₹${transaction.amount}</td>
                <td>
                    <div class="action-btns">
                        <button class="btn-action btn-edit" data-id="${transaction._id}">✎ Edit</button>
                        <button class="btn-action btn-delete" data-id="${transaction._id}">🗑 Delete</button>
                    </div>
                </td>
            </tr>
        `;
    });
}

function updatePaginationUI(totalPages) {
    pageButtons.forEach((btn) => {
        if (!btn.classList.contains("page-nav")) {
            const pageNum = parseInt(btn.textContent);
            btn.classList.toggle("active", pageNum === currentPage);
        }
    });
}

// Delete / Edit with confirmation popups
transactionRows.addEventListener("click", async (event) => {
    if (event.target.classList.contains("btn-delete")) {
        const id = event.target.dataset.id;
        const confirmDelete = confirm("Are you sure you want to delete this transaction?");
        if (!confirmDelete) return;

        try {
            const response = await fetch(`https://financial-manager-ulhs.onrender.com/api/transactions/${id}`, {
                method: "DELETE",
                headers: { "Authorization": token },
            });

            const data = await response.json();
            if (data.success) {
                loadTransactions();
            } else {
                alert(data.message);
            }
        } catch (error) {
            console.error(error);
        }
    }

    if (event.target.classList.contains("btn-edit")) {
        const id = event.target.dataset.id;
        const transaction = allTransactions.find((t) => t._id === id);

        const newAmount = prompt("Enter new amount:", transaction.amount);
        if (newAmount === null) return;

        const newDescription = prompt("Enter new description:", transaction.description);
        if (newDescription === null) return;

        const confirmUpdate = confirm("Save these changes?");
        if (!confirmUpdate) return;

        try {
            const response = await fetch(`https://financial-manager-ulhs.onrender.com/api/transactions/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": token,
                },
                body: JSON.stringify({ amount: newAmount, description: newDescription }),
            });

            const data = await response.json();
            if (data.success) {
                loadTransactions();
            } else {
                alert(data.message);
            }
        } catch (error) {
            console.error(error);
        }
    }
});

// Pagination buttons
pageButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
        if (btn.textContent.includes("Prev")) {
            renderPage(currentPage - 1);
        } else if (btn.textContent.includes("Next")) {
            renderPage(currentPage + 1);
        } else {
            renderPage(parseInt(btn.textContent));
        }
    });
});

filterType.addEventListener("change", applyFilters);
filterCategory.addEventListener("change", applyFilters);
searchInput.addEventListener("input", applyFilters);

// ---- Add Transaction Modal (same behavior as dashboard) ----
const addIncomeBtn = document.getElementById("nav-add-income");
const addExpenseBtn = document.getElementById("nav-add-expense");
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

addIncomeBtn.addEventListener("click", (event) => {
    event.preventDefault();
    transactionType = "income";
    modal.classList.remove("hidden");
    populateCategories(incomeCategories);
});

addExpenseBtn.addEventListener("click", (event) => {
    event.preventDefault();
    transactionType = "expense";
    modal.classList.remove("hidden");
    populateCategories(expenseCategories);
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
            showToast("Transaction added successfully!");
        } else {
            alert(data.message);
        }
    } catch (error) {
        console.error(error);
        alert("Something went wrong.");
    }
});

loadTransactions();