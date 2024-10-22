// document.addEventListener("DOMContentLoaded", function() {
//     const expenseList = document.getElementById("expenseList");
//     const addExpenseBtn = document.getElementById("addExpenseBtn");
//     const expenseModal = document.getElementById("expenseModal");
//     const closeBtn = document.querySelector(".close");
//     const expenseForm = document.getElementById("expenseForm");
//     const searchExpense = document.getElementById("searchExpense");

//     let expenses = [];

//     // Open modal to add expense
//     addExpenseBtn.addEventListener("click", () => {
//         expenseModal.style.display = "block";
//     });

//     // Close modal
//     closeBtn.addEventListener("click", () => {
//         expenseModal.style.display = "none";
//     });

//     // Add new expense
//     expenseForm.addEventListener("submit", (e) => {
//         e.preventDefault();
//         const title = document.getElementById("title").value;
//         const amount = document.getElementById("amount").value;
//         const date = document.getElementById("date").value;
//         const category = document.getElementById("category").value;
//         const description = document.getElementById("description").value;

//         const newExpense = {
//             title,
//             amount,
//             date,
//             category,
//             description,
//             id: Date.now()
//         };

//         expenses.push(newExpense);
//         displayExpenses();
//         expenseModal.style.display = "none";
//         expenseForm.reset();
//     });

  

//     function displayExpenses(filter = '') {
//         // expenseList.innerHTML = "";  // Clear the existing content before displaying the filtered expenses
    
//         expenses.filter(expense => {
//             if (filter === '') return true;
//             return expense.title.toLowerCase().includes(filter.toLowerCase()) || expense.description.toLowerCase().includes(filter.toLowerCase());
//         }).forEach(expense => {
//             const card = document.createElement("div");
//             card.classList.add("expense-card");
    
//             // Construct the inner HTML to match the style of the existing cards
//             card.innerHTML = `
//                 <div class="expense-info">
//                     <h4>${expense.title}</h4>
//                     <p>${new Date(expense.date).toLocaleDateString('en-IN', {
//                         day: 'numeric', month: 'short', year: 'numeric', weekday: 'long'
//                     })}</p>
//                     <p>${expense.description}</p>
//                 </div>
//                 <div class="expense-amount">
//                     <span>₹${parseFloat(expense.amount).toFixed(2)}</span>
//                     <span class="category-label ${expense.category.toLowerCase()}">${expense.category}</span>
//                 </div>
//                 <div class="expense-options">
//                     <button class="kebab-menu" onclick="toggleKebabMenu(${expense.id})">&#x22EE;</button>
//                     <div id="kebab-options-${expense.id}" class="dropdown-menu">
//                         <button class="edit" onclick="editExpense(${expense.id})">Edit</button>
//                         <button class="delete" onclick="deleteExpense(${expense.id})">Delete</button>
//                     </div>
//                 </div>
//             `;
    
//             // Append the card to the expense list
//             expenseList.appendChild(card);
//         });
//     }
    

//     // Search expenses
//     searchExpense.addEventListener("input", (e) => {
//         const filter = e.target.value;
//         displayExpenses(filter);
//     });

//     // Toggle kebab menu
//     window.toggleKebabMenu = (id) => {
//         const kebabMenu = document.getElementById(`kebab-options-${id}`);
//         kebabMenu.style.display = kebabMenu.style.display === "block" ? "none" : "block";
//     };

//     // Edit expense
//     window.editExpense = (id) => {
//         const expenseToEdit = expenses.find(exp => exp.id === id);
//         if (expenseToEdit) {
//             document.getElementById("title").value = expenseToEdit.title;
//             document.getElementById("amount").value = expenseToEdit.amount;
//             document.getElementById("date").value = expenseToEdit.date;
//             document.getElementById("category").value = expenseToEdit.category;
//             document.getElementById("description").value = expenseToEdit.description;
//             expenses = expenses.filter(exp => exp.id !== id);
//             expenseModal.style.display = "block";
//         }
//     };

//     // Delete expense
//     window.deleteExpense = (id) => {
//         expenses = expenses.filter(exp => exp.id !== id);
//         displayExpenses();
//     };

//     // Close modal if clicked outside
//     window.onclick = function(event) {
//         if (event.target == expenseModal) {
//             expenseModal.style.display = "none";
//         }
//     };
// });


document.addEventListener("DOMContentLoaded", function() {
    const expenseList = document.getElementById("expenseList");
    const addExpenseBtn = document.getElementById("addExpenseBtn");
    const expenseModal = document.getElementById("expenseModal");
    const closeBtn = document.querySelector(".close");
    const expenseForm = document.getElementById("expenseForm");
    const searchExpense = document.getElementById("searchExpense");

    let expenses = [];

    // Preexisting hardcoded expenses with IDs
    const hardcodedExpenses = [
        {
            title: "Office Commutation",
            amount: "1000.00",
            date: "2024-10-24",
            category: "Fuel",
            description: "Fuel expense from Gurugram",
            id: 1
        }
        // Add other hardcoded expenses here
    ];

    // Merge pre-existing expenses into expenses array
    expenses = [...hardcodedExpenses];

    // Display expenses including hardcoded ones
    displayExpenses();

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
        expenseList.innerHTML = "";  // Clear the existing content before displaying the filtered expenses
    
        expenses.filter(expense => {
            if (filter === '') return true;
            return expense.title.toLowerCase().includes(filter.toLowerCase()) || expense.description.toLowerCase().includes(filter.toLowerCase());
        }).forEach(expense => {
            const card = document.createElement("div");
            card.classList.add("expense-card");
            card.dataset.id = expense.id;  // Attach the ID to the card
    
            // Construct the inner HTML to match the style of the existing cards
            card.innerHTML = `
                <div class="expense-info">
                    <h4>${expense.title}</h4>
                    <p>${new Date(expense.date).toLocaleDateString('en-IN', {
                        day: 'numeric', month: 'short', year: 'numeric', weekday: 'long'
                    })}</p>
                    <p>${expense.description}</p>
                </div>
                <div class="expense-amount">
                    <span>₹${parseFloat(expense.amount).toFixed(2)}</span>
                    <span class="category-label ${expense.category.toLowerCase()}">${expense.category}</span>
                </div>
                <div class="expense-options">
                    <button class="kebab-menu" onclick="toggleKebabMenu(${expense.id})">&#x22EE;</button>
                    <div id="kebab-options-${expense.id}" class="dropdown-menu">
                        <button class="edit" onclick="editExpense(${expense.id})">Edit</button>
                        <button class="delete" onclick="deleteExpense(${expense.id})">Delete</button>
                    </div>
                </div>
            `;
    
            // Append the card to the expense list
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

            // Remove the current expense from the list (to update it after editing)
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


