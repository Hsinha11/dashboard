document.addEventListener("DOMContentLoaded", function() {
    const expenseList = document.getElementById("expenseList");
    const addExpenseBtn = document.getElementById("addExpenseBtn");
    const expenseModal = document.getElementById("expenseModal");
    const closeBtn = document.querySelector(".close");
    const expenseForm = document.getElementById("expenseForm");
    const searchExpense = document.getElementById("searchExpense");

    let expenses = [];

    // Open modal to add expense
    addExpenseBtn.addEventListener("click", () => {
        expenseModal.style.display = "block";
    });

    // Close modal
    closeBtn.addEventListener("click", () => {
        expenseModal.style.display = "none";
    });

    // Add new expense
    expenseForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const title = document.getElementById("title").value;
        const amount = document.getElementById("amount").value;
        const date = document.getElementById("date").value;
        const category = document.getElementById("category").value;
        const description = document.getElementById("description").value;

        const newExpense = {
            title,
            amount,
            date,
            category,
            description,
            id: Date.now()
        };

        expenses.push(newExpense);
        displayExpenses();
        expenseModal.style.display = "none";
        expenseForm.reset();
    });

    // Display expenses as cards
    function displayExpenses(filter = '') {
        expenseList.innerHTML = "";
        expenses.filter(expense => {
            if (filter === '') return true;
            return expense.title.toLowerCase().includes(filter.toLowerCase()) || expense.description.toLowerCase().includes(filter.toLowerCase());
        }).forEach(expense => {
            const card = document.createElement("div");
            card.classList.add("expense-card");
            card.innerHTML = `
                <h3>${expense.title}</h3>
                <p><strong>Date:</strong> ${expense.date}</p>
                <p><strong>Category:</strong> ${expense.category}</p>
                <p><strong>Description:</strong> ${expense.description}</p>
                <p class="amount">$${expense.amount}</p>
                <div class="kebab-menu" onclick="toggleKebabMenu(${expense.id})">&#x22EE;</div>
                <div id="kebab-options-${expense.id}" class="kebab-options">
                    <button onclick="editExpense(${expense.id})">Edit</button>
                    <button onclick="deleteExpense(${expense.id})">Delete</button>
                </div>
            `;
            expenseList.appendChild(card);
        });
    }

    // Search expenses
    searchExpense.addEventListener("input", (e) => {
        const filter = e.target.value;
        displayExpenses(filter);
    });

    // Toggle kebab menu
    window.toggleKebabMenu = (id) => {
        const kebabMenu = document.getElementById(`kebab-options-${id}`);
        kebabMenu.style.display = kebabMenu.style.display === "block" ? "none" : "block";
    };

    // Edit expense
    window.editExpense = (id) => {
        const expenseToEdit = expenses.find(exp => exp.id === id);
        if (expenseToEdit) {
            document.getElementById("title").value = expenseToEdit.title;
            document.getElementById("amount").value = expenseToEdit.amount;
            document.getElementById("date").value = expenseToEdit.date;
            document.getElementById("category").value = expenseToEdit.category;
            document.getElementById("description").value = expenseToEdit.description;
            expenses = expenses.filter(exp => exp.id !== id);
            expenseModal.style.display = "block";
        }
    };

    // Delete expense
    window.deleteExpense = (id) => {
        expenses = expenses.filter(exp => exp.id !== id);
        displayExpenses();
    };

    // Close modal if clicked outside
    window.onclick = function(event) {
        if (event.target == expenseModal) {
            expenseModal.style.display = "none";
        }
    };
});
