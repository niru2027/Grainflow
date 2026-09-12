// =========================
// CUSTOMER MODAL
// =========================

function openCustomerModal() {
  document.getElementById("customerModal").style.display = "flex";
}

function closeCustomerModal() {
  document.getElementById("customerModal").style.display = "none";
  document.getElementById("customerForm").reset();
}

// =========================
// ADD CUSTOMER
// =========================

document
  .getElementById("customerForm")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    const customerId = document.getElementById("customerId").value.trim();

    const customerName = document.getElementById("customerName").value.trim();

    const phone = document.getElementById("customerPhone").value.trim();

    const location = document.getElementById("customerLocation").value.trim();

    const status = document.getElementById("customerStatus").value;

    if (!customerId || !customerName || !phone || !location || !status) {
      alert("Please fill all fields.");
      return;
    }

    const tableBody = document.querySelector("#customerTable tbody");

    const newRow = document.createElement("tr");

    newRow.innerHTML = `
            <td><strong>${customerId}</strong></td>

            <td>${customerName}</td>

            <td>${phone}</td>

            <td>${location}</td>

            <td>₹0</td>

            <td>₹0</td>

            <td>
                <span class="status ${
                  status === "Active" ? "completed" : "pending"
                }">
                    ${status}
                </span>
            </td>

            <td>
                <button class="edit-btn">Edit</button>
            </td>
        `;

    tableBody.appendChild(newRow);

    updateCustomerSummary();

    alert(
      "Customer added successfully!\n\n" +
        "Customer: " +
        customerName +
        "\n" +
        "ID: " +
        customerId,
    );

    closeCustomerModal();
  });

// =========================
// CUSTOMER SUMMARY
// =========================

function updateCustomerSummary() {
  const rows = document.querySelectorAll("#customerTable tbody tr");

  let totalCustomers = 0;
  let activeCustomers = 0;
  let totalSales = 0;
  let outstanding = 0;

  rows.forEach(function (row) {
    totalCustomers++;

    const status = row.cells[6].innerText.trim();

    const sales = Number(
      row.cells[4].innerText.replace(/₹/g, "").replace(/,/g, ""),
    );

    const due = Number(
      row.cells[5].innerText.replace(/₹/g, "").replace(/,/g, ""),
    );

    if (status === "Active") {
      activeCustomers++;
    }

    totalSales += sales;
    outstanding += due;
  });

  document.getElementById("totalCustomers").innerText = totalCustomers;

  document.getElementById("activeCustomers").innerText = activeCustomers;

  document.getElementById("customerSales").innerText =
    "₹" + totalSales.toLocaleString();

  document.getElementById("outstandingAmount").innerText =
    "₹" + outstanding.toLocaleString();
}

// =========================
// SEARCH CUSTOMERS
// =========================

document
  .getElementById("customerSearch")
  .addEventListener("input", function () {
    const searchText = this.value.toLowerCase().trim();

    const rows = document.querySelectorAll("#customerTable tbody tr");

    rows.forEach(function (row) {
      const id = row.cells[0].innerText.toLowerCase();

      const name = row.cells[1].innerText.toLowerCase();

      const phone = row.cells[2].innerText.toLowerCase();

      if (
        id.includes(searchText) ||
        name.includes(searchText) ||
        phone.includes(searchText)
      ) {
        row.style.display = "";
      } else {
        row.style.display = "none";
      }
    });
  });

// =========================
// CLOSE MODAL ON OUTSIDE CLICK
// =========================

document
  .getElementById("customerModal")
  .addEventListener("click", function (event) {
    if (event.target === this) {
      closeCustomerModal();
    }
  });
