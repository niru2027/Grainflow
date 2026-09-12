// =========================
// SUPPLIER MODAL
// =========================

function openSupplierModal() {
  document.getElementById("supplierModal").style.display = "flex";
}

function closeSupplierModal() {
  document.getElementById("supplierModal").style.display = "none";
  document.getElementById("supplierForm").reset();
}

// =========================
// ADD SUPPLIER
// =========================

document
  .getElementById("supplierForm")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    const supplierId = document.getElementById("supplierId").value.trim();

    const supplierName = document.getElementById("supplierName").value.trim();

    const phone = document.getElementById("supplierPhone").value.trim();

    const location = document.getElementById("supplierLocation").value.trim();

    const status = document.getElementById("supplierStatus").value;

    if (!supplierId || !supplierName || !phone || !location || !status) {
      alert("Please fill all fields.");
      return;
    }

    const tableBody = document.querySelector("#supplierTable tbody");

    const newRow = document.createElement("tr");

    newRow.innerHTML = `
            <td><strong>${supplierId}</strong></td>

            <td>${supplierName}</td>

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

    updateSupplierSummary();

    alert(
      "Supplier added successfully!\n\n" +
        "Supplier: " +
        supplierName +
        "\n" +
        "ID: " +
        supplierId,
    );

    closeSupplierModal();
  });

// =========================
// SUPPLIER SUMMARY
// =========================

function updateSupplierSummary() {
  const rows = document.querySelectorAll("#supplierTable tbody tr");

  let totalSuppliers = 0;
  let activeSuppliers = 0;
  let totalPurchases = 0;
  let pendingPayments = 0;

  rows.forEach(function (row) {
    totalSuppliers++;

    const status = row.cells[6].innerText.trim();

    const purchases = Number(
      row.cells[4].innerText.replace(/₹/g, "").replace(/,/g, ""),
    );

    const pending = Number(
      row.cells[5].innerText.replace(/₹/g, "").replace(/,/g, ""),
    );

    if (status === "Active") {
      activeSuppliers++;
    }

    totalPurchases += purchases;
    pendingPayments += pending;
  });

  document.getElementById("totalSuppliers").innerText = totalSuppliers;

  document.getElementById("activeSuppliers").innerText = activeSuppliers;

  document.getElementById("supplierPurchases").innerText =
    "₹" + totalPurchases.toLocaleString();

  document.getElementById("supplierPending").innerText =
    "₹" + pendingPayments.toLocaleString();
}

// =========================
// SEARCH SUPPLIERS
// =========================

document
  .getElementById("supplierSearch")
  .addEventListener("input", function () {
    const searchText = this.value.toLowerCase().trim();

    const rows = document.querySelectorAll("#supplierTable tbody tr");

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
// CLOSE MODAL
// =========================

document
  .getElementById("supplierModal")
  .addEventListener("click", function (event) {
    if (event.target === this) {
      closeSupplierModal();
    }
  });
