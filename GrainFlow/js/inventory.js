const modal = document.getElementById("stockModal");
const stockForm = document.getElementById("stockForm");
const tableBody = document.querySelector("#inventoryTable tbody");
const searchInput = document.getElementById("searchInput");
const categoryFilter = document.getElementById("categoryFilter");

// =========================
// OPEN MODAL
// =========================

function openModal() {
  modal.style.display = "flex";
}

// =========================
// CLOSE MODAL
// =========================

function closeModal() {
  modal.style.display = "none";
  stockForm.reset();
}

// =========================
// ADD NEW STOCK
// =========================

stockForm.addEventListener("submit", function (event) {
  event.preventDefault();

  const itemName = document.getElementById("itemName").value.trim();

  const category = document.getElementById("itemCategory").value;

  const quantity = Number(document.getElementById("itemQuantity").value);

  const unit = document.getElementById("itemUnit").value;

  const supplier = document.getElementById("supplier").value.trim();

  // Decide stock status

  let status = "Available";
  let statusClass = "completed";

  if (quantity < 200) {
    status = "Low Stock";
    statusClass = "pending";
  }

  // Create new table row

  const newRow = document.createElement("tr");

  newRow.innerHTML = `

            <td>
                <strong>${itemName}</strong>
            </td>

            <td>${category}</td>

            <td>${quantity.toLocaleString()}</td>

            <td>${unit}</td>

            <td>
                <span class="status ${statusClass}">
                    ${status}
                </span>
            </td>

            <td>
                <button class="edit-btn">
                    Edit
                </button>
            </td>

        `;

  // Add row to table

  tableBody.appendChild(newRow);

  // Close popup

  closeModal();

  // Success message

  alert(itemName + " stock added successfully!");

  // Update search/filter

  applyFilters();
  updateSummaryCards();
});

// =========================
// SEARCH
// =========================

searchInput.addEventListener("input", applyFilters);

// =========================
// CATEGORY FILTER
// =========================

categoryFilter.addEventListener("change", applyFilters);

// =========================
// SEARCH + FILTER FUNCTION
// =========================

function applyFilters() {
  const searchText = searchInput.value.toLowerCase().trim();

  const selectedCategory = categoryFilter.value;

  const rows = tableBody.querySelectorAll("tr");

  rows.forEach(function (row) {
    const item = row.cells[0].innerText.toLowerCase();

    const category = row.cells[1].innerText;

    const matchesSearch = item.includes(searchText);

    const matchesCategory =
      selectedCategory === "all" || category === selectedCategory;

    if (matchesSearch && matchesCategory) {
      row.style.display = "";
    } else {
      row.style.display = "none";
    }
  });
}

// =========================
// CLOSE MODAL WHEN CLICKING OUTSIDE
// =========================

modal.addEventListener("click", function (event) {
  if (event.target === modal) {
    closeModal();
  }
});
// =========================
// STOCK OUT MODAL
// =========================

function openStockOutModal() {
  document.getElementById("stockOutModal").style.display = "flex";
}

function closeStockOutModal() {
  document.getElementById("stockOutModal").style.display = "none";
  document.getElementById("stockOutForm").reset();
}

// =========================
// STOCK OUT FORM
// =========================

document
  .getElementById("stockOutForm")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    const itemName = document.getElementById("stockOutItem").value;

    const quantity = Number(document.getElementById("stockOutQuantity").value);

    const reason = document.getElementById("stockOutReason").value;

    if (!itemName || !quantity || !reason) {
      alert("Please fill all fields.");
      return;
    }

    const rows = document.querySelectorAll("#inventoryTable tbody tr");

    let itemFound = false;

    rows.forEach(function (row) {
      const item = row.cells[0].innerText.trim();

      if (item === itemName) {
        itemFound = true;

        const quantityCell = row.cells[2];

        const currentQuantity = Number(
          quantityCell.innerText.replace(/,/g, ""),
        );

        if (quantity > currentQuantity) {
          alert(
            "Not enough stock available!\n" + "Available: " + currentQuantity,
          );

          return;
        }

        const newQuantity = currentQuantity - quantity;

        quantityCell.innerText = newQuantity.toLocaleString();

        const statusCell = row.cells[4];

        if (newQuantity < 200) {
          statusCell.innerHTML = `
                    <span class="status pending">
                        Low Stock
                    </span>
                `;
        } else {
          statusCell.innerHTML = `
                    <span class="status completed">
                        Available
                    </span>
                `;
        }
      }
    });

    if (!itemFound) {
      alert("Item not found in inventory.");
      return;
    }

    updateSummaryCards();
    closeStockOutModal();

    alert(
      itemName +
        " stock updated successfully!\n" +
        "Removed: " +
        quantity +
        " " +
        reason,
    );
    updateSummaryCards();
  });

// =========================
// CLOSE STOCK OUT MODAL
// =========================

document
  .getElementById("stockOutModal")
  .addEventListener("click", function (event) {
    if (event.target === this) {
      closeStockOutModal();
    }
  });

// =========================
// UPDATE SUMMARY CARDS
// =========================

function updateSummaryCards() {
  const rows = document.querySelectorAll("#inventoryTable tbody tr");

  let paddyTotal = 0;
  let riceTotal = 0;
  let totalStock = 0;

  rows.forEach(function (row) {
    const item = row.cells[0].innerText.trim();
    const category = row.cells[1].innerText.trim();

    const quantity = Number(row.cells[2].innerText.replace(/,/g, ""));

    totalStock += quantity;

    if (item === "Paddy") {
      paddyTotal += quantity;
    }

    if (category === "Finished Rice") {
      riceTotal += quantity;
    }
  });
  localStorage.setItem("grainflowTotalStock", totalStock);

  document.getElementById("totalPaddy").innerText =
    paddyTotal.toLocaleString() + " Kg";

  document.getElementById("totalRice").innerText =
    riceTotal.toLocaleString() + " Kg";
}
updateSummaryCards();
